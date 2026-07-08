# Controle pelo Celular — Manual Rápido

## O que é

O Controle pelo Celular permite que você apresente o deck do notebook e controle tudo pelo celular: avançar/voltar slides, espelhar o que está no palco, e até desenhar por cima (caneta digital).

## Pré-requisitos

- **Node.js** instalado no notebook (versão 18 ou superior). Baixe em [nodejs.org](https://nodejs.org) se não tiver.
- Notebook e celular **na mesma rede Wi-Fi** (ou hotspot do celular).

## Como usar

### 1. Abra o atalho

Dê duplo clique em **`Apresentar com celular.bat`** que está na pasta raiz do deck (`decks/capital-quimica/`).

O servidor vai subir e o deck vai abrir automaticamente no navegador do notebook.

### 2. Escaneie o QR Code

No canto superior esquerdo do deck, um **QR Code** vai aparecer. Escaneie com a câmera do celular.

> Se o Windows pedir permissão pelo firewall, clique em **PERMITIR** (mesmo que a rede seja pública ou hotspot).

### 3. Pronto!

O celular agora mostra o mesmo slide que está no palco. Na parte de baixo da tela do celular, dois botões grandes aparecem:

- **◀** — Voltar slide
- **▶** — Avançar slide

No notebook, a apresentação fica limpa (sem barras de controle).

## Papéis por aparelho

| Aparelho | Função | O que aparece |
|----------|--------|---------------|
| **Notebook** (que apresenta) | Palco | Slide limpo, só o QR no início |
| **Celular** (escaneou o QR) | Controle + Espelho | Slide espelhado + setas de navegação |

Se mais aparelhos escanearem o mesmo QR, eles entram como **espelho** (só acompanham, não controlam).

## Funcionalidades extras no celular

- **Caneta digital (draw):** Na barra superior do celular, toque no ícone de lápis para ativar o modo desenho. Você pode traçar círculos, setas e anotações sobre o slide — tudo aparece sincronizado no palco.
- **Sair do draw:** Toque no ícone de lápis novamente para desativar.

## Como parar

Basta fechar a janela do navegador no notebook ou apertar **Ctrl+C** no terminal onde o servidor está rodando.

## Solução de problemas

| Problema | Solução |
|----------|---------|
| "Node.js não foi encontrado" | Instale o Node.js em [nodejs.org](https://nodejs.org) e clique duas vezes no atalho de novo |
| Firewall bloqueando | Clique em PERMITIR quando o Windows perguntar |
| Celular não conecta | Verifique se ambos estão na mesma rede Wi-Fi |
| QR não aparece | Aguarde alguns segundos; o servidor pode estar iniciando |
| Slide não sincroniza | Recarregue o QR no celular (feche e escaneie de novo) |

## Estrutura dos arquivos

```
decks/capital-quimica/
├── Apresentar com celular.bat    ← atalho (duplo clique)
├── index.html                    ← apresentação
└── mira/
    ├── mira-remote-server.cjs    ← servidor de sincronização
    └── mira-remote.html          ← shell do espelhamento
```
