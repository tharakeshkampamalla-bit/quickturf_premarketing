const router = require('express').Router();
const { getImages, deleteImage } = require('../controllers/mediaController');

router.get('/', getImages);
router.delete('/:id', deleteImage);
module.exports = router;
