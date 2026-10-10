// utils/avatar.js

// Turns "https://github.com/username" into that user's GitHub avatar image URL.
// Anything that isn't exactly a GitHub profile link returns null (we then show a letter avatar).
// size is limited to a few known values, so nobody can pass in something unexpected.
function getGithubAvatarUrl(githubUrl, size = 120) {
  if (!githubUrl) return null;

  const match = String(githubUrl)
    .trim()
    .match(/^https?:\/\/(?:www\.)?github\.com\/([A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?)\/?$/i);

  if (!match) return null;

  const safeSize = [60, 120, 240, 460].includes(Number(size)) ? Number(size) : 120;

  return `https://github.com/${match[1]}.png?size=${safeSize}`;
}

module.exports = { getGithubAvatarUrl };