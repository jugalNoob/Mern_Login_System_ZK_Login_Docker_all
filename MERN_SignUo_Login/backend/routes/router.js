const express = require("express");
const router = new express.Router();
const controllers=require("../controollers/userControllers")
const authenticate =require('../middleware/authenticate.js')

const metricsRouter = require('../monitoring/monit');



router.use(metricsRouter)

router.get("/home/jugal", controllers.first);
router.post("/signin",controllers.forms )
router.post("/signup",controllers.login )
router.patch("/update",controllers.update )


// API v1 route
router.get("/v1/user/:id", async (req, res) => {
    const userId = req.params.id;
    // Your logic to fetch the user by ID in version 1 of the API
    res.send(`User ID: ${userId} (API v1)`);
});




router.get('/Count', authenticate, controllers.auth);



router.get("/logout",controllers.logout)
module.exports = router;
