# OPESP Website

## Ordem dos Parlamentares do Estado de São Paulo

Website institucional completo da OPESP — Ordem dos Parlamentares do Estado de São Paulo, entidade civil de direito privado fundada em 21 de maio de 1994.

---

## Estrutura de Arquivos

```
opesp-website/
├── index.html          # Página inicial com hero, stats, sobre, serviços, eventos, notícias
├── historia.html       # Nossa história com linha do tempo e objetivos
├── premio.html         # Prêmio Top Business — destaques, edições e depoimentos
├── consultoria.html    # Consultoria e assessoria legislativa
├── eventos.html        # Eventos realizados pela OPESP
├── membros.html        # Quadro de membros com filtros e busca
├── noticias.html       # Notícias e artigos institucionais
├── videos.html         # Galeria de vídeos dos eventos
├── parcerias.html      # Parceiros estratégicos da OPESP
├── seja-membro.html    # Formulário de pré-cadastro para novos membros
├── contato.html        # Formulário de contato e informações
├── css/
│   └── styles.css      # Estilos completos com animações e responsividade
├── js/
│   └── main.js         # JavaScript completo com todas as interações
└── README.md           # Este arquivo
```

---

## Como Executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno. Não é necessário servidor ou instalação.

```bash
# No terminal (Linux/macOS):
open index.html

# Ou simplesmente arraste o arquivo para o navegador
```

Para melhor experiência de desenvolvimento, use uma extensão como **Live Server** no VS Code.

---

## Funcionalidades

### JavaScript (js/main.js)
- **Preloader** — Overlay animado com spinner, desaparece após carregamento
- **Navegação** — Estado scrolled com blur, menu hamburger mobile com drawer
- **Scroll suave** — Links internos com scroll suave
- **Voltar ao topo** — Botão flutuante aparece após rolar 300px
- **Contadores animados** — Números nas stats animam ao entrar no viewport
- **Animações de scroll** — Elementos `.fade-in` animam ao entrar no viewport
- **Filtro de membros** — Botões filtram cards por categoria
- **Busca de membros** — Campo de busca filtra cards pelo nome
- **Toast de formulário** — Feedback visual após envio de formulários
- **Carrossel de parceiros** — Scroll infinito automático (quando presente)
- **Transição de páginas** — Fade out suave ao navegar entre páginas
- **Parallax no hero** — Efeito parallax no background da home
- **Partículas** — 20 partículas flutuantes geradas dinamicamente no hero
- **Link ativo** — Destaque automático do link da página atual na navegação

### CSS (css/styles.css)
- **Design System** com variáveis CSS (cores, fontes, espaçamentos)
- **Preloader** full-screen com spinner animado
- **Navegação fixa** com backdrop-filter no scroll
- **Skyline CSS** com 30 prédios de alturas variadas
- **Partículas animadas** com keyframe `float`
- **Timeline alternada** para página de história
- **Cards** de serviços, membros, notícias, vídeos, parceiros
- **Formulários** estilizados com estados de foco
- **Toast notifications** animadas
- **Back-to-top** flutuante
- **Responsividade** completa (1200px, 1024px, 768px, 480px)

---

## Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura semântica das 11 páginas |
| CSS3 | Estilos, animações, grid, flexbox, variáveis |
| JavaScript (ES6+) | Interatividade, IntersectionObserver, DOM |
| Google Fonts | Playfair Display + Montserrat |
| Font Awesome 6 | Ícones em todo o site |

---

## Paleta de Cores

| Nome | Hex |
|---|---|
| Dourado | `#C9A84C` |
| Dourado claro | `#E2C26E` |
| Dourado escuro | `#A07C30` |
| Navy | `#0D1B35` |
| Navy médio | `#1A2E55` |
| Navy claro | `#243A6A` |
| Branco | `#FFFFFF` |
| Off-white | `#F8F6F0` |

---

## Informações Institucionais

- **Entidade:** OPESP — Ordem dos Parlamentares do Estado de São Paulo
- **Fundação:** 21 de maio de 1994
- **Registro:** nº 282.360/94
- **Base Legal:** Lei Federal nº 10.406/2002 (Código Civil Brasileiro)
- **Presidenta:** Gabriela Lima
- **Mantenedora:** Aslam Innovations
- **Localização:** São Paulo, SP — Brasil

---

© 2026 OPESP — Todos os direitos reservados.
