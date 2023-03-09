const express = require("express");
const {
    displayAllUser, addUser,

    deleteUser,
    updateUser,
    displaySingleUser
} = require('../Controller/userController');
const router = express.Router();

router.get('/', displayAllUser);
router.get('/:email', displaySingleUser);
router.post('/user', addUser);
router.patch('/:id', updateUser);
// router.get('/:email',displayByEmail);
router.delete('/:id', deleteUser);
// router.patch('/:id',updateUser);
module.exports = router;
