# IntegraFarma Oeiras

Portal municipal de acesso, capacitacao e dados para fortalecer a assistencia
farmaceutica no SUS de Oeiras-PI.

## Descricao

Este repositorio publica o novo portal web do **IntegraFarma Oeiras**. O
projeto reposiciona a experiencia municipal com marca propria, mantendo o
sistema oficial como base operacional e conectando, em um unico ambiente:

- Guia Municipal de Medicamentos
- Gestao de Acessos e Vinculos
- Trilha de Aprendizagem (videos)
- Painel de Inteligencia (em expansao)

## Modulos e links oficiais

- Guia Municipal de Medicamentos:
  `https://erosbarbosa.github.io/medicamentos/`
- Gestao de Acessos e Vinculos:
  `https://erosbarbosa.github.io/cadastrohorus/formulario/index.html?v=v6.7`
- Suporte tecnico (WhatsApp):
  `https://wa.me/5589994350078`

## Funcionalidades da versao atual

- Hub de modulos com foco em operacao farmaceutica municipal.
- Busca de tutoriais por palavra-chave.
- Modal de video com fechamento por clique externo e tecla ESC.
- Feedback rapido "Sim/Nao" por tutorial.
- Modo claro/escuro com persistencia em `localStorage`.
- Layout responsivo para desktop, tablet e smartphone.

## Estrutura de arquivos

```text
index.html
assets/
  css/
    styles.css
  js/
    app.js
HórusOeiras.html   (legado; nao e mais a entrada principal)
README.md
LICENSE
```

## Publicacao no GitHub Pages

1. Garanta que a branch `main` esteja atualizada.
2. Em **Settings > Pages**, selecione:
3. **Source**: Deploy from a branch.
4. **Branch**: `main` / `(root)`.
5. A URL principal passa a carregar por `index.html` na raiz.

## Tecnologias

- HTML5
- CSS3 (design system proprio)
- JavaScript vanilla
- Google Fonts (`Sora`, `Plus Jakarta Sans`)

## Desenvolvedor

**Eros Fernandes Aquino do Nascimento Barbosa**

- Engenheiro de Software
- Pos-graduado em Inteligencia Artificial
- MBA em Ciberseguranca e Gestao de Risco
- Professor SEDUC-PI (Analise e Desenvolvimento de Sistemas)
- Coordenador de Tecnologia e Informacao da Secretaria Municipal de Saude de Oeiras

## Licenca

Uso institucional da Secretaria Municipal de Saude de Oeiras, conforme
`LICENSE`.
