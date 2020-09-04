const router = require("express").Router();
const controller= require('../controller/atmController')
// const authentication= require('../Middleware/Auth')






router.post('/Register',controller.Registeruser);
router.post('/balanceEnquiry',controller.balanceEnquiry);
router.post('/cashWithdrawal',controller.CashwithDrawal);






module.exports = router;