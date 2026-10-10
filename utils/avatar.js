// utils/avatar.js

// Turns "https://github.com/username" into that user's GitHub avatar image URL.
// Anything that isn't exactly a GitHub profile link returns null (we then show a letter avatar).
function getGithubAvatarUrl(githubUrl) {
  if (!githubUrl) return null;

  const match = String(githubUrl)
    .trim()
    .match(/^https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?)\/?$/i);

  if (!match) return null;

  return `https://github.com/${match[1]}.png?size=120`;
}

module.exports = { getGithubAvatarUrl };