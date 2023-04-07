const router = require('express').Router();
const userRoute = require('./users_route');
const thoughtRoute = require('./thoughts_route');

router.use('/users', userRoute);
router.use('/thoughts', thoughtRoute);

module.exports = router;