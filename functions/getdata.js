export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname === "/") {
      const { results } = await env.DB.prepare(
        "SELECT name, type, link FROM projects"
      ).all();

      // Create HTML string from the results
      const projectsHtml = results
        .map(
          (project) => `
          <a class="projectshowcase" href="${project.link}">
              <div>
                  <h2>${project.name}</h2>
                  <p>${project.type}</p>
              </div>
          </a>
        `
        )
        .join("");

      return new Response(projectsHtml, {
        headers: {
          "Content-Type": "text/html",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return new Response("Visit the root path (/) to see all projects", {
      status: 404,
    });
  },
};
