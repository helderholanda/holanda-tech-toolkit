
let tools = [];
let activeCategory = "all";

const categoryNames = {
  windows: "Windows",
  office: "Office",
  drivers: "Drivers",
  utilities: "Utilitários",
  security: "Segurança"
};

const grid = document.getElementById("toolGrid");
const empty = document.getElementById("emptyState");
const search = document.getElementById("searchInput");

async function loadTools() {
  try {
    const response = await fetch("programas.json");

    if (!response.ok) {
      throw new Error("Não foi possível carregar programas.json");
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato inválido em programas.json");
    }

    tools = data;
    renderTools();

  } catch (error) {
    console.error(error);

    grid.innerHTML = `
      <p class="load-error">
        Erro ao carregar o catálogo. Confira se o arquivo
        programas.json está publicado junto com index.html.
      </p>
    `;
  }
}

function createActionButton(text, url, extraClass = "") {
  const button = document.createElement("button");

  button.className = "download-button ready " + extraClass;
  button.textContent = text;

  button.addEventListener("click", () => {
    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  return button;
}

function renderTools() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");

  const filtered = tools.filter(tool => {
    const categoryMatch =
      activeCategory === "all" ||
      tool.category === activeCategory;

    const text = `
      ${tool.name || ""}
      ${tool.description || ""}
      ${tool.tag || ""}
    `.toLocaleLowerCase("pt-BR");

    return categoryMatch && text.includes(term);
  });

  grid.innerHTML = "";
  empty.hidden = filtered.length !== 0;

  filtered.forEach(tool => {
    const ready = Boolean(tool.url && tool.url.trim());
    const tutorialReady = Boolean(
      tool.tutorialUrl && tool.tutorialUrl.trim()
    );

    const card = document.createElement("article");
    card.className = "tool-card";

    const top = document.createElement("div");
    top.className = "tool-top";

    const icon = document.createElement("div");
    icon.className = "tool-icon";
    icon.textContent = tool.icon || "•";

    const tag = document.createElement("span");
    tag.className = "tool-tag";
    tag.textContent =
      tool.tag ||
      categoryNames[tool.category] ||
      "FERRAMENTA";

    top.append(icon, tag);

    const title = document.createElement("h3");
    title.textContent = tool.name || "Ferramenta";

    const desc = document.createElement("p");
    desc.textContent = tool.description || "";

    const bottom = document.createElement("div");
    bottom.className = "tool-bottom";

    const status = document.createElement("span");
    status.className = "tool-status";

    if (ready && tutorialReady) {
      status.textContent = "Instalador e tutorial disponíveis";
    } else if (ready) {
      status.textContent = "Disponível para download";
    } else if (tutorialReady) {
      status.textContent = "Tutorial disponível";
    } else {
      status.textContent = tool.status || "Link a configurar";
    }

    const actions = document.createElement("div");
    actions.className = "tool-actions";

    if (ready) {
      const button = createActionButton(
        tool.button || "Download",
        tool.url
      );

      actions.append(button);
    } else {
      const button = document.createElement("button");

      button.className = "download-button";
      button.textContent = "Em preparação";
      button.disabled = true;

      actions.append(button);
    }

    if (tutorialReady) {
      const tutorialButton = createActionButton(
        tool.tutorialButton || "Abrir tutorial",
        tool.tutorialUrl,
        "tutorial-button"
      );

      actions.append(tutorialButton);
    }

    bottom.append(status, actions);
    card.append(top, title, desc, bottom);

    grid.append(card);
  });
}

function setCategory(category) {
  activeCategory = category;

  document.querySelectorAll("[data-category]").forEach(button => {
    button.classList.toggle(
      "active",
      button.classList.contains("nav-item") &&
      button.dataset.category === category
    );

    button.classList.toggle(
      "selected",
      button.classList.contains("pill") &&
      button.dataset.category === category
    );
  });

  renderTools();
}

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
  });
});

search.addEventListener("input", renderTools);

document.getElementById("year").textContent =
  new Date().getFullYear();

loadTools();
