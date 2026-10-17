/* ==========================================================================
   SERVICE WORKER — Rastreador Pessoal
   --------------------------------------------------------------------------
   Objetivo desta primeira etapa: apenas tornar o app INSTALÁVEL como PWA.
   Não implementa cache offline agressivo de propósito — estratégia
   conservadora, para não causar inconsistência com os dados pessoais
   (que continuam 100% em IndexedDB, este arquivo não toca neles).

   Escopo: este arquivo deve ser servido a partir da raiz do projeto
   (ex: /rastreador-pessoal/sw.js) e registrado com escopo relativo
   ("./") a partir do index.html, para funcionar corretamente dentro
   do subdiretório do GitHub Pages.
========================================================================== */

const CACHE_NAME = 'rastreador-pessoal-shell-v2';

/* Apenas o "app shell" mínimo — os próprios arquivos do projeto,
   com caminhos relativos a este sw.js (que fica na raiz do projeto).
   Nada de dados do usuário, nada de CDN/API externa aqui. */
const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .catch((err) => {
        // Não falha a instalação do SW só porque um item do shell não
        // pôde ser cacheado agora (ex: primeira execução sem rede).
        console.warn('[sw] falha ao pré-cachear app shell:', err);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Só GET.
  if(req.method !== 'GET') return;

  const url = new URL(req.url);

  // NUNCA interceptar origens externas (fontes do Google, CDN do PapaParse,
  // chamadas à API da Anthropic, etc.) — deixa o navegador tratar normalmente.
  if(url.origin !== self.location.origin) return;

  // Estratégia conservadora: network-first, com fallback pro cache do
  // app shell só se a rede falhar (ex: sem conexão momentânea).
  // Isso evita servir uma versão desatualizada do index.html por padrão,
  // já que o app ainda está em desenvolvimento ativo.
  event.respondWith(
    fetch(req)
      .then((res) => {
        // Atualiza o cache do shell em segundo plano com a versão mais nova,
        // só para os arquivos que fazem parte do APP_SHELL.
        const isShellFile = APP_SHELL.some((p) => url.pathname.endsWith(p.replace('./', '')));
        if(isShellFile && res && res.ok){
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});

/* ==========================================================================
   NOTIFICAÇÕES PUSH — fim do descanso
   --------------------------------------------------------------------------
   O servidor (Edge Function push-dispatch) envia um push criptografado
   (aes128gcm) assinado com VAPID. Este handler SEMPRE mostra uma notificação
   (exigência do iOS/Safari: userVisibleOnly, sem push "silencioso").
   - App visível: o app já tocou o aviso local; a notificação sai silenciosa e
     é fechada logo em seguida, para não duplicar o alerta.
   - App em segundo plano / tela bloqueada: notificação normal.
   O push não altera nenhum dado do app (só avisa).
========================================================================== */
self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = {}; }
  const title = d.title || 'Descanso finalizado';
  const tag = 'rest-' + (d.rest_id || 'done');

  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const visible = wins.some((c) => c.visibilityState === 'visible');
    await self.registration.showNotification(title, {
      body: d.body || 'Hora da próxima série',
      tag,
      icon: './icon-192.png',
      badge: './icon-192.png',
      silent: visible || d.sound === false,
      data: { url: './index.html', rest_id: d.rest_id || null, session_id: d.session_id || null },
    });
    wins.forEach((c) => { try { c.postMessage({ type: 'rest_push', rest_id: d.rest_id || null, session_id: d.session_id || null }); } catch (e) {} });
    if (visible) {
      /* já alertado dentro do app: remove o banner em seguida */
      await new Promise((r) => setTimeout(r, 1200));
      const list = await self.registration.getNotifications({ tag });
      list.forEach((n) => n.close());
    }
  })());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil((async () => {
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of wins) {
      if ('focus' in c) { try { await c.focus(); return; } catch (e) {} }
    }
    if (self.clients.openWindow) await self.clients.openWindow(target);
  })());
});
