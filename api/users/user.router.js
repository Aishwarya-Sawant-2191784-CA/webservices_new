const router = require("express").Router();
const {
    createUser,
    login,
    getUserByUserId,
    getUsers,
    updateUsers
} = require("./user.controller");
router.get("/", getUsers); //Routes to access all apis
router.post("/", createUser);
router.get("/:id", getUserByUserId);
router.post("/login", login);
router.patch("/", updateUsers);

module.exports = router;
