document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  const GITHUB_USERNAME = "ShalvexNovachrono";
  const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;

  const projectsContainer = document.getElementById("projects-container");

  async function fetchGitHubProjects() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const repos = await response.json();

      projectsContainer.innerHTML = "";

      repos.forEach((repo) => {
        if (repo.fork) {
          return;
        }

        const projectEl = document.createElement("div");
        projectEl.classList.add("project");

        projectEl.innerHTML = `
                    <div class="details">
                        <div class="name">${repo.name}</div>
                        <div class="description">
                            ${repo.description || "No description available."}
                        </div>
                        <div class="project-meta">
                            ${
                repo.language
                  ? `
                                <span class="language">
                                    <span class="language-dot" style="background-color: ${getLanguageColor(
                    repo.language
                  )};"></span>
                                    ${repo.language}
                                </span>`
                  : ""
              }
                            <span class="stars">
                                <i class="fa fa-star"></i> ${
                  repo.stargazers_count
                }
                            </span>
                        </div>
                        <div class="links">
                            <a href="${
                repo.html_url
              }" target="_blank">View on GitHub</a>
                        </div>
                    </div>
                `;
        projectsContainer.appendChild(projectEl);
      });
    } catch (error) {
      projectsContainer.innerHTML =
        "<p>Failed to load projects. Please try again later.</p>";
      console.error("Error fetching GitHub repos:", error);
    }
  }

  function getLanguageColor(language) {
    const colors = {
      JavaScript: "#f1e05a",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Python: "#3572A5",
      Java: "#b07219",
      Shell: "#89e051",
      TypeScript: "#2b7489",
      "C++": "#f34b7d",
      "C#": "#178600",
      C: "#555555",
      PHP: "#4F5D95",
    };
    return colors[language] || "#ccc"; 
  }

  fetchGitHubProjects();
});