
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
    if (!response.ok) throw new Error("Não foi possível carregar programas.json");
    tools = await response.json();
    renderTools();
  } catch (error) {
    grid.innerHTML = '<p class="load-error">Erro ao carregar o catálogo. Confira se o arquivo programas.json está publicado junto com index.html.</p>';
  }
}

function renderTools() {
  const term = search.value.trim().toLocaleLowerCase("pt-BR");

  const filtered = tools.filter(tool => {
    const categoryMatch = activeCategory === "all" || tool.category === activeCategory;
    const text = `${tool.name} ${tool.description} ${tool.tag}`.toLocaleLowerCase("pt-BR");
    return categoryMatch && text.includes(term);
  });

  grid.innerHTML = "";
  empty.hidden = filtered.length !== 0;

  filtered.forEach(tool => {
    const ready = Boolean(tool.url && tool.url.trim());
    const tutorialReady = Boolean(tool.tutorialUrl && tool.tutorialUrl.trim());

    const card = document.createElement("article");
    card.className = "tool-card";

    const top = document.createElement("div");
    top.className = "tool-top";

    const icon = document.createElement("div");
    icon.className = "tool-icon";
    icon.textContent = tool.icon || "•";

    const tag = document.createElement("span");
    tag.className = "tool-tag";
    tag.textContent = tool.tag || categoryNames[tool.category] || "FERRAMENTA";

    top.append(icon, tag);

    const title = document.createElement("h3");
    title.textContent = tool.name;

    const desc = document.createElement("p");
    desc.textContent = tool.description;

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

    const button = document.createElement("button");
    button.className = "download-button" + (ready ? " ready" : "");
    button.textContent = ready ? (tool.button || "Download") : "Em preparação";
    button.disabled = !ready;

    if (ready) {
      button.addEventListener("click", () => {
        window.open(tool.url, "_blank", "noopener,noreferrer");
      });
    }

    actions.append(button);

    if (tutorialReady) {
      const tutorialButton = document.createElement("button");
      tutorialButton.className = "download-button ready tutorial-button";
      tutorialButton.textContent = tool.tutorialButton || "Abrir tutorial";

      tutorialButton.addEventListener("click", () => {
        window.open(tool.tutorialUrl, "_blank", "noopener,noreferrer");
      });

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
      button.classList.contains("nav-item") && button.dataset.category === category
    );

    button.classList.toggle(
      "selected",
      button.classList.contains("pill") && button.dataset.category === category
    );
  });

  renderTools();
}

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => setCategory(button.dataset.category));
});

search.addEventListener("input", renderTools);

document.getElementById("year").textContent = new Date().getFullYear();

loadTools();
