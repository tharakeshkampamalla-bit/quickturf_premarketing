const router = require('express').Router();
const { createLead, getLeads, deleteLead } = require('../controllers/leadController');

router.post('/', createLead);
router.get('/', getLeads);
router.delete('/:id', deleteLead);

module.exports = router;
