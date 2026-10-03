// public/js/liveSearch.js — fetches and renders projects from our own REST API

async function fetchAndRenderProjects(skill = '', projectType = '') {
  const container = document.getElementById('resultsContainer');
  container.innerHTML = '<p>Loading projects...</p>';

  try {
    const params = new URLSearchParams();
    if (skill) params.append('skill', skill);
    if (projectType) params.append('projectType', projectType);

    const response = await fetch(`/api/projects?${params.toString()}`);
    const data = await response.json();

    if (!data.success) {
      container.innerHTML = '<p>Something went wrong loading projects.</p>';
      return;
    }

    if (data.projects.length === 0) {
      container.innerHTML = '<p>No projects found matching your search.</p>';
      return;
    }

    container.innerHTML = data.projects.map(project => `
      <div class="project-card">
        <h3><a href="/projects/${project.id}">${project.title}</a></h3>
        <p>${project.description.substring(0, 100)}${project.description.length > 100 ? '...' : ''}</p>
        <p><strong>Skills:</strong> ${project.required_skills || 'None listed'}</p>
        <p><strong>Team:</strong> ${project.current_team_size} / ${project.team_size}</p>
        <p><strong>Type:</strong> ${project.project_type || 'Not specified'}</p>
        <p><strong>Posted by:</strong> ${project.owner_name}</p>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<p>Failed to load projects. Please try again.</p>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAndRenderProjects(); // load all projects on page load

  document.getElementById('searchBtn').addEventListener('click', () => {
    const skill = document.getElementById('skillInput').value.trim();
    const projectType = document.getElementById('typeInput').value;
    fetchAndRenderProjects(skill, projectType);
  });
});