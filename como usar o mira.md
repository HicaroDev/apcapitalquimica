# Como Usar o Mira — Manual de Comandos

O Mira é um sistema de criação de apresentações HTML animadas com D3.js. Cada comando é chamado digitando `/nome-do-comando` no chat.

---

## Pipeline Principal (criar um deck do zero)

| Comando | O que faz |
|---------|-----------|
| `/mira-extract` | Lê uma fonte (PDF, pasta, texto) e extrai um briefing estruturado |
| `/mira-planner` | Planeja os slides: quantos, ordem, conteúdo de cada um |
| `/mira-copywriter` | Refina os textos com copywriting para máximo impacto |
| `/mira-builder` | Monta o HTML/CSS dos slides com glassmorphism |
| `/mira-animator` | Anima cada slide com D3.js + loop interno obrigatório |
| `/mira-validator` | Valida se o HTML está correto e segue o padrão |

**Ordem:** extract → planner → copywriter → builder + animator → validator

---

## Criação e Gestão de Decks

| Comando | O que faz |
|---------|-----------|
| `/mira-new` | Cria um novo deck do zero (coleta tema, template, referências) |
| `/mira-references` | Adiciona ou organiza as fontes de conteúdo de um tema |

---

## Animações e Efeitos

| Comando | O que faz |
|---------|-----------|
| `/mira-animator` | Cria slide animado com D3.js e looping contínuo |
| `/mira-animated-metaphor` | Transforma a animação numa metáfora visual (ex: fábrica → pipeline) |
| `/mira-svg-animator` | Anima um SVG que o usuário fornece (bater asas, girar, pulsar) |
| `/mira-svg-morph` | Morfa um SVG em outro em loop contínuo |
| `/mira-icon-morph` | Morfa ícones da API do Iconify em loop |
| `/mira-img-animator` | Anima uma imagem (partículas, dissolve, explode, wave) |
| `/mira-size-animator` | Ajusta o tamanho das animações (escala 1 a 10) |

---

## Imagens e Visuais

| Comando | O que faz |
|---------|-----------|
| `/mira-visuals` | Gera imagens estáticas (painéis, infográficos, diagramas) via D3 |
| `/mira-image` | Coloca uma imagem que o usuário já tem num slide |
| `/mira-image-prompt` | Cria prompts JSON para gerar imagens com IA (Midjourney, DALL-E) |
| `/mira-image-template` | Cria um template de deck a partir de uma imagem de referência |

---

## Gráficos e Dados

| Comando | O que faz |
|---------|-----------|
| `/mira-chart` | Cria gráficos de dados (barras, linhas, pizza, scatter) via D3 |
| `/mira-chart-race` | Cria gráfico de corrida (dados temporais animados, ranking ao longo do tempo) |

---

## Interação ao Vivo

| Comando | O que faz |
|---------|-----------|
| `/mira-survey` | Enquete ao vivo: plateia vota via QR, resultado atualiza no slide |
| `/mira-quiz` | Quiz ao vivo: pergunta com resposta correta, revelação controlada |
| `/mira-qrcode` | Gera QR code escaneável embutido no slide |

---

## Formatos e Exportação

| Comando | O que faz |
|---------|-----------|
| `/mira-vertical` | Converte deck para formato 9:16 (Reels, Shorts, TikTok) |
| `/mira-squared` | Converte deck para formato 1:1 (feed Instagram, LinkedIn) |
| `/mira-thirds` | Aplica regra dos terços (2/3 animação + 1/3 livre para câmera/texto) |
| `/mira-slide-to-video` | Gera vídeo .mp4 a partir de slides (Chrome headless + ffmpeg) |
| `/mira-transition-dissolve` | Aplica transição dissolve (crossfade) entre slides |
| `/mira-offline` | Converte deck para offline (self-contained, sem CDN) |

---

## Elementos Especiais

| Comando | O que faz |
|---------|-----------|
| `/mira-3d` | Adiciona elementos 3D reais (CSS 3D, Three.js, glTF) |
| `/mira-tactics` | Mesa tática de futebol com jogadores animados |
| `/mira-remote-control` | Liga deck ao celular (espelhamento + controle remoto) |

---

## Outros

| Comando | O que faz |
|---------|-----------|
| `/mira-get-videos` | Baixa vídeos de fundo para os slides |

---

## Regras Importantes

1. **Regra Zero de Animação:** toda animação ENTRA com coreografia e DEPOIS continua em loop interno. Animação estática é proibida.
2. **Tema:** use sempre as CSS variables do tema (`var(--mira-primary)`, etc.) — nunca cores hardcoded.
3. **Idioma:** todo texto visível em português brasileiro com acentuação correta.
4. **Fontes:** o conteúdo vem de fontes vinculadas em `mira.config.json`. Nunca crie arquivos dentro delas.
5. **Templates:** blueprints em `mira-templates/slides/`, decks completos em `mira-templates/decks/`.

---

## Atalhos do Deck (durante apresentação)

| Tecla | Ação |
|-------|------|
| `→` `↓` `PageDown` | Próximo slide |
| `←` `↑` `PageUp` | Slide anterior |
| `Home` | Primeiro slide |
| `End` | Último slide |
| `F` | Tela cheia (fullscreen) |
