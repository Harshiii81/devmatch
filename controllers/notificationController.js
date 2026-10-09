// controllers/notificationController.js

const { findNotificationsByUser, markAllAsRead } = require('../models/notificationModel');

async function viewNotifications(req, res) {
  const notifications = await findNotificationsByUser(req.session.userId);

  // Opening the page marks everything as read
  await markAllAsRead(req.session.userId);

  // The navbar count was calculated before we marked them read, so reset it here
  res.locals.unreadCount = 0;

  res.render('notifications/index', { notifications });
}

module.exports = { viewNotifications };