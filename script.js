// Wait for the HTML document to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // --- Logic for Responsive Navigation Dropdown ---
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");

  // Toggle the 'active' class on the nav links when the button is clicked
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // --- Logic for fetching GitHub Projects ---
  const GITHUB_USERNAME = "ShalvexNovachrono";
  const apiUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&direction=desc`;

  const projectsContainer = document.getElementById("projects-container");

  // Function to fetch and display repositories
  async function fetchGitHubProjects() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const repos = await response.json();

      // Clear the "Loading..." message
      projectsContainer.innerHTML = "";

      // Loop through each repository and create a card for it
      repos.forEach((repo) => {
        // Skip forked repositories if you want
        if (repo.fork) {
          return;
        }

        const projectEl = document.createElement("div");
        projectEl.classList.add("project");

        // Use innerHTML to build the card structure
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

  // A simple function to assign colors to languages
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
    return colors[language] || "#ccc"; // Default color
  }

  // Call the function to start the process
  fetchGitHubProjects();
});