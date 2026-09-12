const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");

function renderRepositories(repositories) {
  repositoryCount.textContent = `${repositories.length} ${repositories.length === 1 ? "repository" : "repositories"}`;

  repositoryList.replaceChildren(
    ...repositories.map((repository) => {
      const article = document.createElement("article");
      article.className = "repository";

      const content = document.createElement("div");
      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = repository.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = repository.name;
      title.append(link);

      const description = document.createElement("p");
      description.className = "repository-description";
      description.textContent = repository.description;

      const meta = document.createElement("div");
      meta.className = "repository-meta";
      meta.append(
        createMetaItem(repository.language),
        createMetaItem(`${repository.stars.toLocaleString()} stars`)
      );

      content.append(title, description, meta);
      article.append(content);
      return article;
    })
  );
}

function createMetaItem(text) {
  const item = document.createElement("span");
  item.textContent = text;
  return item;
}

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load repository data: ${response.status}`);
    }
    return response.json();
  })
  .then(renderRepositories)
  .catch((error) => {
    repositoryCount.textContent = "";
    repositoryList.replaceChildren();
    const message = document.createElement("p");
    message.className = "status-message";
    message.textContent = error.message;
    repositoryList.append(message);
  });