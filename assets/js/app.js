const STORAGE_THEME_KEY = "integrafarma_theme";
const LEGACY_THEME_KEY = "theme";
const STORAGE_FEEDBACK_KEY = "integrafarma_tutorial_feedback_v1";

const TUTORIALS = {
  cadastro: {
    title: "Cadastro de usuarios",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  entrada: {
    title: "Entrada de medicamentos",
    url: "https://www.youtube.com/embed/L_jWHffIx5E",
  },
  movimentacao: {
    title: "Movimentacao entre estoques",
    url: "https://www.youtube.com/embed/5qap5aO4i9A",
  },
  dispensacao: {
    title: "Dispensacao",
    url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
  },
};

const byId = (id) => document.getElementById(id);

function safeParseJson(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn("Falha ao ler JSON salvo.", error);
    return fallback;
  }
}

function getThemePreference() {
  const saved = localStorage.getItem(STORAGE_THEME_KEY);
  if (saved) return saved;

  const legacy = localStorage.getItem(LEGACY_THEME_KEY);
  if (legacy) {
    localStorage.setItem(STORAGE_THEME_KEY, legacy);
    return legacy;
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem(STORAGE_THEME_KEY, theme);
}

function initTheme() {
  const button = byId("themeToggle");
  const label = byId("themeLabel");
  if (!button || !label) return;

  applyTheme(getThemePreference());
  label.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "Escuro" : "Claro";

  button.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    label.textContent = next === "dark" ? "Escuro" : "Claro";
  });
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function initTutorialSearch() {
  const input = byId("tutorialSearch");
  const cards = [...document.querySelectorAll(".tutorial-card")];
  if (!input || !cards.length) return;

  input.addEventListener("input", () => {
    const query = normalizeText(input.value);
    cards.forEach((card) => {
      const title = normalizeText(card.querySelector("h4")?.textContent || "");
      const desc = normalizeText(card.querySelector("p")?.textContent || "");
      const tags = normalizeText(card.dataset.tags || "");
      const show = !query || title.includes(query) || desc.includes(query) || tags.includes(query);
      card.classList.toggle("is-hidden", !show);
    });
  });
}

function openModal(modal) {
  modal.classList.remove("hidden");
}

function closeModal(modal) {
  modal.classList.add("hidden");
}

function initVideoModal() {
  const modal = byId("videoModal");
  const closeButton = byId("closeVideoModal");
  const title = byId("videoModalTitle");
  const player = byId("videoPlayer");
  const triggers = [...document.querySelectorAll("[data-open-tutorial]")];
  if (!modal || !closeButton || !title || !player || !triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.openTutorial;
      const tutorial = TUTORIALS[key];
      if (!tutorial) return;
      title.textContent = tutorial.title;
      player.src = `${tutorial.url}?autoplay=1&rel=0`;
      openModal(modal);
    });
  });

  closeButton.addEventListener("click", () => {
    player.src = "";
    closeModal(modal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target !== modal) return;
    player.src = "";
    closeModal(modal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!modal.classList.contains("hidden")) {
      player.src = "";
      closeModal(modal);
    }
  });
}

function getFeedbackState() {
  return safeParseJson(localStorage.getItem(STORAGE_FEEDBACK_KEY), {});
}

function saveFeedbackState(state) {
  localStorage.setItem(STORAGE_FEEDBACK_KEY, JSON.stringify(state));
}

function feedbackSummary(item) {
  const yes = Number(item?.yes || 0);
  const no = Number(item?.no || 0);
  const total = yes + no;
  if (!total) return "Sem avaliacoes ainda.";
  return `${total} avaliacao(oes): ${yes} sim, ${no} nao.`;
}

function renderFeedbackCounters(state) {
  Object.keys(TUTORIALS).forEach((tutorialKey) => {
    const counter = byId(`feedbackCount-${tutorialKey}`);
    if (!counter) return;
    counter.textContent = feedbackSummary(state[tutorialKey]);
  });
}

function initFeedback() {
  const buttons = [...document.querySelectorAll("[data-feedback][data-tutorial]")];
  if (!buttons.length) return;

  const state = getFeedbackState();
  renderFeedbackCounters(state);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const tutorial = button.dataset.tutorial;
      const answer = button.dataset.feedback;
      if (!TUTORIALS[tutorial]) return;

      if (!state[tutorial]) {
        state[tutorial] = { yes: 0, no: 0 };
      }

      if (answer === "yes") {
        state[tutorial].yes += 1;
      } else {
        state[tutorial].no += 1;
      }

      saveFeedbackState(state);
      renderFeedbackCounters(state);
      button.blur();
    });
  });
}

function initPanelModal() {
  const openButton = byId("openPanelModal");
  const modal = byId("panelModal");
  const closeButton = byId("closePanelModal");
  if (!openButton || !modal || !closeButton) return;

  openButton.addEventListener("click", () => openModal(modal));
  closeButton.addEventListener("click", () => closeModal(modal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal(modal);
    }
  });
}

function initYear() {
  const year = byId("currentYear");
  if (!year) return;
  year.textContent = String(new Date().getFullYear());
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initTutorialSearch();
  initVideoModal();
  initFeedback();
  initPanelModal();
  initYear();
});
