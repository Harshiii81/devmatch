// public/js/liveSearch.js — fetches and renders projects from our own REST API

// Turns special characters into harmless text, so project data can never run as code
function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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

    container.innerHTML = data.projects.map(project => {
      const description = project.description || '';
      const shortDescription = description.substring(0, 100) + (description.length > 100 ? '...' : '');

      return `
      <div class="project-card">
        <h3><a href="/projects/${escapeHtml(project.id)}">${escapeHtml(project.title)}</a></h3>
        <p>${escapeHtml(shortDescription)}</p>
        <p><strong>Skills:</strong> ${escapeHtml(project.required_skills || 'None listed')}</p>
        <p><strong>Team:</strong> ${escapeHtml(project.current_team_size)} / ${escapeHtml(project.team_size)}</p>
        <p><strong>Type:</strong> ${escapeHtml(project.project_type || 'Not specified')}</p>
        <p><strong>Posted by:</strong> <a class="owner-link" href="/users/${escapeHtml(project.owner_id)}">${escapeHtml(project.owner_name)}</a></p>
      </div>
    `;
    }).join('');
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