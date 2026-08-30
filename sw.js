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

const CACHE_NAME = 'rastreador-pessoal-shell-v1';

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
