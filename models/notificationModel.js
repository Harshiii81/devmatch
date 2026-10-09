// models/notificationModel.js

const db = require('../config/db');

async function createNotification(userId, message, link) {
  await db.query(
    'INSERT INTO notifications (user_id, message, link) VALUES (?, ?, ?)',
    [userId, message, link]
  );
}

async function findNotificationsByUser(userId) {
  const [rows] = await db.query(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC, id DESC LIMIT 50',
    [userId]
  );
  return rows;
}

async function countUnread(userId) {
  const [rows] = await db.query(
    'SELECT COUNT(*) AS total FROM notifications WHERE user_id = ? AND is_read = FALSE',
    [userId]
  );
  return rows[0].total;
}

async function markAllAsRead(userId) {
  await db.query(
    'UPDATE notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
    [userId]
  );
}

module.exports = { createNotification, findNotificationsByUser, countUnread, markAllAsRead };