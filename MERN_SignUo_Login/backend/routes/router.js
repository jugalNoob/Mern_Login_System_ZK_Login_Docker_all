const express = require("express");
const router = new express.Router();
const controllers=require("../controollers/userControllers")
const authenticate =require('../middleware/authenticate.js')

const metricsRouter = require('../monitoring/monit');



router.use(metricsRouter)

router.get("/",controllers.first )
router.post("/signin",controllers.forms )
router.post("/signup",controllers.login )
router.patch("/update",controllers.update )


router.get('/Count', authenticate, controllers.auth);



router.get("/logout",controllers.logout)
module.exports = router;