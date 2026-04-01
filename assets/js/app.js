const STORAGE_THEME_KEY = "integrafarma_theme";
const LEGACY_THEME_KEY = "theme";
const STORAGE_FEEDBACK_KEY = "integrafarma_tutorial_feedback_v1";

// Atualize os links dos vídeos aqui quando você me enviar.
const TUTORIALS = {
  cadastro: {
    title: "Cadastro de usuários",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "3-5 min",
    stage: "Etapa 1",
  },
  entrada: {
    title: "Entrada de medicamentos",
    url: "https://www.youtube.com/watch?v=L_jWHffIx5E",
    duration: "4-6 min",
    stage: "Etapa 2",
  },
  movimentacao: {
    title: "Movimentação entre estoques",
    url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
    duration: "4-6 min",
    stage: "Etapa 3",
  },
  dispensacao: {
    title: "Dispensação",
    url: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
    duration: "5-8 min",
    stage: "Etapa 4",
  },
};

const byId = (id) => document.getElementById(id);

function toEmbedUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";

  if (value.includes("youtube.com/embed/")) {
    return value;
  }

  const watchMatch = value.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  const shortMatch = value.match(/youtu\.be\/([^?&/]+)/);
  if (shortMatch?.[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  return value;
}

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
  const meta = byId("videoModalMeta");
  const player = byId("videoPlayer");
  const triggers = [...document.querySelectorAll("[data-open-tutorial]")];
  if (!modal || !closeButton || !title || !meta || !player || !triggers.length) return;

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const key = trigger.dataset.openTutorial;
      const tutorial = TUTORIALS[key];
      if (!tutorial) return;
      title.textContent = tutorial.title;
      meta.textContent = `${tutorial.stage || "Treinamento"} • ${tutorial.duration || "Duração não informada"}`;
      const embedUrl = toEmbedUrl(tutorial.url);
      player.src = `${embedUrl}?autoplay=1&rel=0`;
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

function initTutorialMeta() {
  const fields = [...document.querySelectorAll("[data-tutorial-meta]")];
  if (!fields.length) return;

  fields.forEach((field) => {
    const key = field.dataset.tutorialMeta;
    const tutorial = TUTORIALS[key];
    if (!tutorial) return;
    field.textContent = `${tutorial.stage || "Treinamento"} • ${tutorial.duration || "Duração não informada"}`;
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
  if (!total) return "";
  return `${total} avaliação(ões): ${yes} sim, ${no} não.`;
}

function renderFeedbackCounters(state) {
  Object.keys(TUTORIALS).forEach((tutorialKey) => {
    const counter = byId(`feedbackCount-${tutorialKey}`);
    if (!counter) return;
    const summary = feedbackSummary(state[tutorialKey]);
    counter.textContent = summary;
    counter.hidden = !summary;
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

      buttons
        .filter((item) => item.dataset.tutorial === tutorial)
        .forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      saveFeedbackState(state);
      renderFeedbackCounters(state);
      showFeedbackToast("Feedback registrado. Obrigado.");
      button.blur();
    });
  });
}

function showFeedbackToast(message) {
  const toast = byId("feedbackToast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("hidden");
  clearTimeout(showFeedbackToast.timer);
  showFeedbackToast.timer = setTimeout(() => toast.classList.add("hidden"), 1800);
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

function initReveal() {
  const items = [...document.querySelectorAll("[data-reveal]")];
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
    observer.observe(item);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initReveal();
  initTutorialMeta();
  initTutorialSearch();
  initVideoModal();
  initFeedback();
  initPanelModal();
  initYear();
});
