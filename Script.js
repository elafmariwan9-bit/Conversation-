
/* ==========================================
   THE CONVERSATION CLUB
   script.js — complete website functionality
   ========================================== */

(() => {
  "use strict";

  /* ---------- QUESTION LIBRARY ---------- */

  const questions = window.CONVERSATION_QUESTIONS || [];
  const categories = window.CONVERSATION_CATEGORIES || {};

  if (!questions.length) {
    console.error("Questions could not be loaded. Check questions.js.");
    return;
  }

  /* ---------- ELEMENTS ---------- */

  const $ = (id) => document.getElementById(id);

  const el = {
    questionText: $("questionText"),
    questionCategory: $("questionCategory"),
    questionNumber: $("questionNumber"),
    questionHint: $("questionHint"),
    followUpBox: $("followUpBox"),
    followUpText: $("followUpText"),
    favoriteButton: $("favoriteButton"),
    showFollowUpButton: $("showFollowUpButton"),
    newQuestionButton: $("newQuestionButton"),
    depthFilter: $("depthFilter"),
    modeSelect: $("modeSelect"),
    remainingCount: $("remainingCount"),
    favoritesCount: $("favoritesCount"),
    favoritesSectionCount: $("favoritesSectionCount"),
    navFavoritesCount: $("navFavoritesCount"),
    answersCount: $("answersCount"),
    progressFill: $("progressFill"),
    roundNote: $("roundNote"),
    favoritesList: $("favoritesList"),
    favoritesEmpty: $("favoritesEmpty"),
    savedAnswersList: $("savedAnswersList"),
    answersEmpty: $("answersEmpty"),
    answerInput: $("answerInput"),
    saveAnswerButton: $("saveAnswerButton"),
    clearAnswerButton: $("clearAnswerButton"),
    toast: $("toast"),
    menuToggle: $("menuToggle"),
    mainNav: $("mainNav")
  };

  /* ---------- SAVED DATA ---------- */

  const STORAGE_KEYS = {
    favorites: "conversationClubFavorites_v1",
    answers: "conversationClubAnswers_v1"
  };

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn("Could not read saved website data:", error);
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("Could not save website data:", error);
      showToast("Your browser could not save this. Check storage settings.");
      return false;
    }
  }

  const storedFavorites = readStorage(STORAGE_KEYS.favorites, []);
  const storedAnswers = readStorage(STORAGE_KEYS.answers, []);

  const favoriteIds = new Set(
    Array.isArray(storedFavorites)
      ? storedFavorites.filter(Number.isFinite)
      : []
  );

  let savedAnswers = Array.isArray(storedAnswers)
    ? storedAnswers.filter(
        (item) =>
          item &&
          Number.isFinite(item.questionId) &&
          typeof item.question === "string" &&
          typeof item.answer === "string"
      )
    : [];

  /* ---------- GAME STATE ---------- */

  let currentCategory = "all";
  let currentQuestion = questions[0];
  let askedIds = new Set();
  let roundNumber = 1;
  let followUpVisible = false;
  let toastTimer = null;

  const categoryNames = {
    all: "All Categories",
    ...Object.fromEntries(
      Object.entries(categories).map(([key, value]) => [
        key,
        value.label
      ])
    )
  };

  /* ---------- HELPERS ---------- */

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return replacements[character];
    });
  }

  function showToast(message) {
    if (!el.toast) return;

    el.toast.textContent = message;
    el.toast.classList.add("show");

    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      el.toast.classList.remove("show");
    }, 2600);
  }

  function getCategoryName(category) {
    return categoryNames[category] || "Conversation";
  }

  function getFilteredQuestions() {
    const depth = el.depthFilter ? el.depthFilter.value : "all";

    return questions.filter((question) => {
      const matchesCategory =
        currentCategory === "all" ||
        question.category === currentCategory;

      const matchesDepth =
        depth === "all" || question.depth === depth;

      return matchesCategory && matchesDepth;
    });
  }

  function saveFavorites() {
    return writeStorage(
      STORAGE_KEYS.favorites,
      Array.from(favoriteIds)
    );
  }

  function saveAnswersToStorage() {
    return writeStorage(STORAGE_KEYS.answers, savedAnswers);
  }

  /* ---------- QUESTION DISPLAY ---------- */

  function updateQuestionDisplay() {
    if (!currentQuestion) return;

    el.questionText.textContent = currentQuestion.question;

    el.questionCategory.textContent =
      getCategoryName(currentQuestion.category).toUpperCase();

    const pool = getFilteredQuestions();
    const remaining = pool.filter(
      (question) => !askedIds.has(question.id)
    ).length;

    el.questionNumber.textContent =
      `Round ${roundNumber} · ${currentQuestion.depth}`;

    el.questionHint.textContent = getModeHint();

    el.remainingCount.textContent = remaining;

    if (el.progressFill) {
      const progress =
        pool.length > 0
          ? ((pool.length - remaining) / pool.length) * 100
          : 0;

      el.progressFill.style.width = `${Math.min(100, progress)}%`;
    }

    updateFavoriteButton();

    followUpVisible = false;
    el.followUpBox.hidden = true;
    el.followUpText.textContent = currentQuestion.followUp || "";

    el.showFollowUpButton.textContent = "Ask a follow-up";

    if (el.answerInput) {
      el.answerInput.value = "";
    }

    updateAnswerEditor();

    if (el.roundNote) {
      el.roundNote.textContent =
        pool.length === 0
          ? "No questions match these filters. Try another category or depth."
          : remaining === 0
            ? "You've explored every question in this round!"
            : "Take your time. Good conversations don't need to be rushed.";
    }
  }

  function getModeHint() {
    const mode = el.modeSelect ? el.modeSelect.value : "myself";

    const hints = {
      myself: "A little moment to reflect, just for you.",
      friends: "Take turns answering, and let the stories unfold.",
      group: "Everyone can answer, or pass the question along.",
      partner: "Take turns sharing. Listening matters just as much."
    };

    return hints[mode] || hints.myself;
  }

  function getNextQuestion() {
    const pool = getFilteredQuestions();

    if (pool.length === 0) {
      showToast("No questions match these filters. Try another selection.");
      return;
    }

    let available = pool.filter(
      (question) => !askedIds.has(question.id)
    );

    if (available.length === 0) {
      askedIds = new Set();
      roundNumber += 1;
      available = pool.slice();

      if (el.roundNote) {
        el.roundNote.textContent =
          "A new round begins! All questions are available again.";
      }

      showToast("New round! All questions are available again.");
    }

    let nextQuestion = available[
      Math.floor(Math.random() * available.length)
    ];

    // Avoid immediately showing the same question when alternatives exist.
    if (available.length > 1 && currentQuestion) {
      let attempts = 0;

      while (
        nextQuestion.id === currentQuestion.id &&
        attempts < 10
      ) {
        nextQuestion = available[
          Math.floor(Math.random() * available.length)
        ];
        attempts += 1;
      }
    }

    currentQuestion = nextQuestion;
    askedIds.add(currentQuestion.id);

    updateQuestionDisplay();
  }

  function changeCategory(category) {
    if (category !== "all" && !categories[category]) {
      return;
    }

    currentCategory = category;
    askedIds = new Set();
    roundNumber = 1;

    document.querySelectorAll("[data-category]").forEach((button) => {
      const selected = button.dataset.category === category;

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    getNextQuestion();

    const gameSection = $("play");

    if (gameSection) {
      gameSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  /* ---------- FAVORITES ---------- */

  function updateFavoriteButton() {
    if (!currentQuestion) return;

    const isFavorite = favoriteIds.has(currentQuestion.id);

    el.favoriteButton.classList.toggle("is-favorite", isFavorite);
    el.favoriteButton.setAttribute(
      "aria-pressed",
      String(isFavorite)
    );

    el.favoriteButton.setAttribute(
      "aria-label",
      isFavorite ? "Remove from favorites" : "Add to favorites"
    );

    el.favoriteButton.innerHTML = isFavorite
      ? "♥ <span>Favorited</span>"
      : "♡ <span>Favorite</span>";
  }

  function toggleFavorite() {
    if (!currentQuestion) return;

    if (favoriteIds.has(currentQuestion.id)) {
      favoriteIds.delete(currentQuestion.id);
      showToast("Removed from your favorites.");
    } else {
      favoriteIds.add(currentQuestion.id);
      showToast("Added to your favorites ♡");
    }

    saveFavorites();
    updateFavoriteButton();
    renderFavorites();
    updateCounters();
  }

  function renderFavorites() {
    const favorites = questions.filter((question) =>
      favoriteIds.has(question.id)
    );

    el.favoritesEmpty.hidden = favorites.length > 0;

    el.favoritesList.innerHTML = favorites
      .map(
        (question) => `
          <article class="saved-item">
            <div class="saved-item-top">
              <span class="saved-item-category">
                ${escapeHTML(getCategoryName(question.category))}
              </span>
              <span class="saved-item-category">
                ${escapeHTML(question.depth)}
              </span>
            </div>

            <p class="saved-item-question">
              ${escapeHTML(question.question)}
            </p>

            <div class="saved-item-actions">
              <button
                class="small-action"
                type="button"
                data-action="ask-favorite"
                data-id="${question.id}"
              >Ask this question ↗</button>

              <button
                class="small-action delete-action"
                type="button"
                data-action="remove-favorite"
                data-id="${question.id}"
              >Remove ♥</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  function loadFavoriteQuestion(id) {
    const question = questions.find((item) => item.id === id);

    if (!question) return;

    currentCategory = "all";
    askedIds = new Set();
    roundNumber = 1;
    currentQuestion = question;
    askedIds.add(question.id);

    document.querySelectorAll("[data-category]").forEach((button) => {
      const selected = button.dataset.category === "all";

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    updateQuestionDisplay();

    if ($("play")) {
      $("play").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }

  /* ---------- SAVED ANSWERS ---------- */

  function saveCurrentAnswer() {
    if (!currentQuestion) return;

    const answer = el.answerInput.value.trim();

    if (!answer) {
      showToast("Write an answer before saving it.");
      el.answerInput.focus();
      return;
    }

    const existingIndex = savedAnswers.findIndex(
      (item) => item.questionId === currentQuestion.id
    );

    const entry = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      question: currentQuestion.question,
      answer,
      updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      savedAnswers[existingIndex] = entry;
    } else {
      savedAnswers.unshift(entry);
    }

    if (!saveAnswersToStorage()) return;

    renderSavedAnswers();
    updateCounters();

    showToast(
      existingIndex >= 0
        ? "Your answer has been updated ♡"
        : "Your answer has been saved ♡"
    );
  }

  function renderSavedAnswers() {
    el.answersEmpty.hidden = savedAnswers.length > 0;

    el.savedAnswersList.innerHTML = savedAnswers
      .map(
        (item) => `
          <article class="saved-item">
            <div class="saved-item-top">
              <span class="saved-item-category">
                ${escapeHTML(getCategoryName(item.category))}
              </span>
              <span class="saved-item-category">
                ${escapeHTML(formatDate(item.updatedAt))}
              </span>
            </div>

            <p class="saved-item-question">
              ${escapeHTML(item.question)}
            </p>

            <div class="saved-item-answer">${escapeHTML(item.answer)}</div>

            <div class="saved-item-actions">
              <button
                class="small-action"
                type="button"
                data-action="edit-answer"
                data-id="${item.questionId}"
              >Edit answer ✎</button>

              <button
                class="small-action"
                type="button"
                data-action="revisit-answer"
                data-id="${item.questionId}"
              >Revisit question ↗</button>

              <button
                class="small-action delete-action"
                type="button"
                data-action="delete-answer"
                data-id="${item.questionId}"
              >Delete</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  function formatDate(value) {
    if (!value) return "";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "";

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function findQuestion(id) {
    return questions.find((question) => question.id === id);
  }

  function editSavedAnswer(id) {
    const entry = savedAnswers.find(
      (item) => item.questionId === id
    );

    if (!entry) return;

    const question = findQuestion(id);

    if (question) {
      currentQuestion = question;
      currentCategory = "all";
      askedIds = new Set([question.id]);

      document.querySelectorAll("[data-category]").forEach((button) => {
        const selected = button.dataset.category === "all";

        button.classList.toggle("selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });

      updateQuestionDisplay();
    }

    el.answerInput.value = entry.answer;

    if ($("saved")) {
      $("saved").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    el.answerInput.focus();
    showToast("You can now edit your answer.");
  }

  function deleteSavedAnswer(id) {
    const previousLength = savedAnswers.length;

    savedAnswers = savedAnswers.filter(
      (item) => item.questionId !== id
    );

    if (savedAnswers.length === previousLength) return;

    if (!saveAnswersToStorage()) return;

    renderSavedAnswers();
    updateCounters();
    showToast("Saved answer deleted.");
  }

  /* ---------- COUNTERS ---------- */

  function updateCounters() {
    const favoriteCount = favoriteIds.size;
    const answerCount = savedAnswers.length;

    el.favoritesCount.textContent = favoriteCount;
    el.favoritesSectionCount.textContent =
      `${favoriteCount} saved`;

    el.navFavoritesCount.textContent = favoriteCount;
    el.answersCount.textContent = `${answerCount} saved`;
  }

  /* ---------- FOLLOW-UP ---------- */

  function toggleFollowUp() {
    if (!currentQuestion) return;

    followUpVisible = !followUpVisible;
    el.followUpBox.hidden = !followUpVisible;

    el.showFollowUpButton.textContent = followUpVisible
      ? "Hide follow-up"
      : "Ask a follow-up";
  }

  /* ---------- MOBILE NAVIGATION ---------- */

  function closeMobileMenu() {
    el.mainNav.classList.remove("open");
    el.menuToggle.setAttribute("aria-expanded", "false");
    el.menuToggle.textContent = "☰";
  }

  function toggleMobileMenu() {
    const isOpen = el.mainNav.classList.toggle("open");

    el.menuToggle.setAttribute("aria-expanded", String(isOpen));
    el.menuToggle.textContent = isOpen ? "✕" : "☰";
  }

  /* ---------- EVENT LISTENERS ---------- */

  el.newQuestionButton.addEventListener("click", getNextQuestion);

  el.favoriteButton.addEventListener("click", toggleFavorite);

  el.showFollowUpButton.addEventListener("click", toggleFollowUp);

  el.saveAnswerButton.addEventListener("click", saveCurrentAnswer);

  el.clearAnswerButton.addEventListener("click", () => {
    el.answerInput.value = "";
    showToast("Answer box cleared.");
  });

  el.depthFilter.addEventListener("change", () => {
    askedIds = new Set();
    roundNumber = 1;
    getNextQuestion();
  });

  el.modeSelect.addEventListener("change", () => {
    el.questionHint.textContent = getModeHint();
    showToast("Conversation mode updated.");
  });

  document.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      changeCategory(button.dataset.category);
    });
  });

  el.favoritesList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);

    if (button.dataset.action === "ask-favorite") {
      loadFavoriteQuestion(id);
    }

    if (button.dataset.action === "remove-favorite") {
      favoriteIds.delete(id);
      saveFavorites();
      renderFavorites();
      updateCounters();
      updateFavoriteButton();
      showToast("Removed from your favorites.");
    }
  });

  el.savedAnswersList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const id = Number(button.dataset.id);

    switch (button.dataset.action) {
      case "edit-answer":
        editSavedAnswer(id);
        break;

      case "revisit-answer":
        loadFavoriteQuestion(id);
        break;

      case "delete-answer":
        deleteSavedAnswer(id);
        break;
    }
  });

  el.menuToggle.addEventListener("click", toggleMobileMenu);

  el.mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      el.mainNav.classList.contains("open")
    ) {
      closeMobileMenu();
    }
  });

  /* ---------- START THE WEBSITE ---------- */

  function initialize() {
    renderFavorites();
    renderSavedAnswers();
    updateCounters();

    document.querySelectorAll("[data-category]").forEach((button) => {
      const selected = button.dataset.category === "all";

      button.classList.toggle("selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    // Start with a random question, then prevent repeats in this round.
    currentQuestion = null;
    getNextQuestion();

    console.log(
      `The Conversation Club is ready: ${questions.length} questions loaded.`
    );
  }

  initialize();
})();
