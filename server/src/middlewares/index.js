const Role = require('../database/schemas/Role');

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

async function isLoggedInSafe(req, res, next) {
  const userRole = await Role.findOne({ value: 'Admin' });
  req.user.role === userRole || req.user._id === req.body.log_id
    ? next()
    : res.sendStatus(401);
}

/* async function isAdmin(req, res, next) {
  const userRole = await Role.findOne({ value: 'Admin' });
  req.user.role === userRole ? next() : res.sendStatus(401);
} */

module.exports = { isLoggedIn, isLoggedInSafe };
