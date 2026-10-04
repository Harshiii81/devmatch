// server.js — starts the server
// (forcing fresh deploy)

require('dotenv').config();
const app = require('./app');

console.log('DEBUG — SESSION_SECRET is set:', !!process.env.SESSION_SECRET);
console.log('DEBUG — DB_HOST value:', process.env.DB_HOST);
console.log('DEBUG — all env keys:', Object.keys(process.env).filter(k => k.startsWith('DB_') || k === 'SESSION_SECRET'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`DevMatch server running on http://localhost:${PORT}`);
});