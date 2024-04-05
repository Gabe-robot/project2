const router = require('express').Router();

const storyRoutes = require('./storyRoutes');
const userRoutes = require('./userRoutes');

router.use('/story', storyRoutes);
router.use('/user', userRoutes);

module.exports = router;
