const router = require('express').Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPass = process.env.ADMIN_PASSWORD || 'quickturf_admin_2024';
  if (password === adminPass) {
    res.json({ success: true, token: 'admin_authenticated' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

module.exports = router;
