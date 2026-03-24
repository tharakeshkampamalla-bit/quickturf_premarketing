const express = require('express');
const router = express.Router();

// POST /api/admin/login - verify admin secret
router.post('/login', (req, res) => {
  const { secret } = req.body;
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  res.json({ success: true, message: 'Authenticated', token: process.env.ADMIN_SECRET });
});

module.exports = router;
