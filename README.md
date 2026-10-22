# RASTREADOR PESSOAL

### Treine com propósito. Acompanhe sua evolução. Supere seus próprios resultados.

**Treino, nutrição e desempenho em um único lugar.**

O **Rastreador Pessoal** é um aplicativo web progressivo (PWA) desenvolvido para transformar a maneira de organizar treinos, registrar alimentação e acompanhar a evolução física.

Mais do que um diário de academia, é um painel pessoal de desempenho: cada série, cada carga, cada refeição e cada conquista contribuem para uma visão mais completa do seu progresso.

`PWA` · `Mobile-first` · `Offline` · `HTML / CSS / JavaScript` · `Supabase`

---

## O que é o Rastreador?

Um sistema integrado de acompanhamento físico, criado para ser simples durante o treino e detalhado na hora de analisar os resultados.

**A proposta é unir três pilares:**

- **Treinar:** planejar, executar e registrar cada sessão com praticidade.
- **Evoluir:** acompanhar cargas, volume, consistência e recordes pessoais.
- **Organizar:** controlar alimentação, metas nutricionais e histórico em um só aplicativo.

Tudo em uma interface escura, minimalista, responsiva e otimizada para o uso diário no celular.

---

## Funcionalidades

### 01 — Treinos inteligentes

Organize sua rotina de musculação com liberdade e acompanhe cada detalhe da execução.

- Criação e personalização de treinos e exercícios.
- Organização de blocos de treino e programação semanal.
- Reordenação por arrastar e soltar (*drag-and-drop*).
- Registro de séries, repetições, cargas e RIR.
- Acompanhamento de séries concluídas em tempo real.
- Cronômetro de treino e temporizador de descanso.
- Consulta aos resultados de sessões anteriores.
- Identificação automática de recordes pessoais.
- Sugestões de progressão de carga e repetições.
- Registro de observações e desempenho por exercício.

### 02 — Workout Director

**Seu treino se adapta ao seu tempo.**

Nem todo dia é possível passar uma hora na academia. O Workout Director permite criar versões mais curtas de uma sessão considerando o tempo disponível.

O sistema utiliza estimativas de duração para ajustar a quantidade de séries, oferecendo uma alternativa mais prática para dias corridos.

**O mais importante:** o planejamento original é preservado. A adaptação vale para a sessão escolhida.

### 03 — Histórico e evolução

Os dados registrados são transformados em informações úteis para acompanhar o progresso ao longo do tempo.

| Recurso | O que acompanha |
|---|---|
| Histórico de sessões | Treinos realizados e resultados registrados |
| Progressão de cargas | Evolução de desempenho por exercício |
| Volume de treino | Carga total movimentada e tendências |
| Recordes pessoais | Melhores marcas alcançadas |
| Consistência | Frequência e distribuição dos treinos |
| Mapa de calor | Dias de atividade ao longo do tempo |
| Resumo semanal | Séries, volume, recordes e foco muscular |
| Peso corporal | Evolução dos registros ao longo do tempo |

O objetivo é tornar a evolução mensurável, facilitando a comparação entre sessões e períodos.

### 04 — Nutrição e metas

Acompanhe sua alimentação sem depender de outro aplicativo.

- Registro das refeições realizadas.
- Contagem de calorias e macronutrientes.
- Metas personalizadas de calorias, proteínas, carboidratos e gorduras.
- Comparação entre consumo diário e objetivos nutricionais.
- Visualização do progresso alimentar.
- Opções de refeições e importação de dieta personalizada.
- Histórico de registros alimentares.

### 05 — Conexões

**O progresso também pode ser compartilhado.**

O sistema de Conexões permite acompanhar atividades de outras pessoas dentro do aplicativo.

- Conectar-se com outros usuários.
- Compartilhar sessões de treino.
- Acompanhar atividades e consistência.
- Interagir por meio de reações.
- Gerenciar permissões e privacidade das informações compartilhadas.

O compartilhamento é controlado pelo usuário, separando informações pessoais de atividades disponíveis para suas conexões.

### 06 — Sincronização e funcionamento offline

O Rastreador foi desenvolvido para continuar útil mesmo sem conexão constante com a internet.

- Armazenamento local no navegador.
- Sincronização em nuvem utilizando Supabase.
- Acesso aos dados em diferentes dispositivos.
- Registro de alterações durante períodos offline.
- Tratamento de conflitos de sincronização.
- Indicadores de conexão e diagnóstico do sync.
- Exportação de cópia de segurança em JSON.

**Seus registros não precisam depender exclusivamente de uma conexão ativa para serem feitos.**

A sincronização e as funções sociais exigem conexão quando precisam acessar a nuvem.

---

## Uma experiência pensada para o celular

O Rastreador utiliza tecnologia **Progressive Web App (PWA)**, permitindo ser adicionado à tela inicial de dispositivos compatíveis.

Isso proporciona uma experiência semelhante à de um aplicativo instalado, sem exigir uma publicação em loja de aplicativos.

**Principais características:**

- Interface responsiva para celular e desktop.
- Navegação otimizada para toque.
- Visual dark com hierarquia tipográfica.
- Fluxo de treino focado em praticidade.
- Persistência de dados locais.
- Suporte a funcionalidades offline.
- Notificações de descanso nos ambientes compatíveis.

---

## Tecnologias utilizadas

| Tecnologia | Aplicação |
|---|---|
| HTML5 | Estrutura e interface |
| CSS3 | Identidade visual, responsividade e animações |
| JavaScript | Lógica dos treinos, cálculos e interações |
| IndexedDB / localStorage | Persistência local |
| Supabase | Autenticação, banco de dados e sincronização |
| Service Worker | Recursos de PWA e funcionamento offline |
| Web Push / VAPID | Infraestrutura de notificações |
| GitHub Pages | Hospedagem web |

O projeto utiliza uma arquitetura leve, priorizando uma aplicação acessível diretamente pelo navegador.

---

## Como utilizar

**No computador**

Acesse a versão publicada pelo GitHub Pages e utilize o aplicativo diretamente no navegador.

**No iPhone**

1. Abra o aplicativo pelo Safari.
2. Toque no botão de compartilhamento.
3. Selecione **Adicionar à Tela de Início**.
4. Abra o Rastreador pelo ícone criado.

**Sincronização**

Para acessar as funcionalidades em nuvem, entre com sua conta no painel de sincronização.

O aplicativo também pode ser utilizado localmente, com algumas funcionalidades limitadas quando não houver autenticação ou conexão.

---

## Próximos passos

O Rastreador está em desenvolvimento contínuo. Algumas funcionalidades planejadas para futuras versões incluem:

- [x] Registro completo de séries e cargas.
- [x] Acompanhamento de progressão e recordes.
- [x] Histórico visual e resumos semanais.
- [x] Controle nutricional e metas.
- [x] Sincronização em nuvem.
- [x] Sistema de Conexões.
- [x] Reordenação de treinos e exercícios.
- [x] Workout Director — adaptação ao tempo disponível.
- [ ] **Modo Caos** — substituição de exercícios quando equipamentos estiverem ocupados.
- [ ] **Anatomy Live** — visualização anatômica dos músculos trabalhados no relatório final.
- [ ] **Ghost Mode** — comparação interativa com sessões anteriores.
- [ ] Variantes personalizadas de treinos.
- [ ] Novas experiências sociais e desafios.

O foco do desenvolvimento é incorporar funcionalidades úteis sem comprometer a estabilidade dos registros existentes.

---

## Filosofia do projeto

O Rastreador nasceu de uma ideia simples:

**Registrar um treino é fácil. Entender sua evolução é o que realmente importa.**

Cada funcionalidade é pensada para reduzir o trabalho de registrar informações e aumentar a capacidade de interpretar resultados.

Sem excesso de telas. Sem complexidade desnecessária. Sem perder o controle dos próprios dados.

O objetivo é construir uma ferramenta que acompanhe a evolução do usuário — desde a primeira série até seus próximos recordes.

---

### RASTREADOR PESSOAL

**Seu treino tem história. Sua evolução também.**

*Projeto pessoal em desenvolvimento contínuo.*
