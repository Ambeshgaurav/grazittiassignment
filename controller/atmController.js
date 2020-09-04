const servicemysql = require("../services/atmServices");

const response = require('../Errrofile/responses')
const atmWithDraw = require("../atmCashWithdraw/atmCashWithdraw")

async function CashwithDrawal(req, res) {
  try {
    const user = req.body;
    if (!user && !user.cardNumber && !user.inputbalance) {
     return  response.missingParameterResponse(res, 422, "Parameters Missing")
    }
    let find_balance_data = {}
    find_balance_data.cardNumber = user.cardNumber;
    let find_balance = await servicemysql.balanceEnquiry(find_balance_data)
  
    
    if (parseInt(find_balance[0].balance)< parseInt( user.inputbalance)) {
      return  response.inSufficientBalance(res, 403, "Insufficient balance")
    }
    if (!user.prefered_notes) {
      let find_no_notes = await atmWithDraw.dispenseWithoutDenomination(user.inputbalance, find_balance[0].balance)
      let updated_data = {}
      updated_data.balance = find_balance[0].balance - user.inputbalance
      updated_data.cardNumber = user.cardNumber
      let update_balance = await servicemysql.UpdateBalance(updated_data)

       return response.actionComplete(res, 200, "cash withdraw successfully ", find_no_notes)
    }
    else {
      let find_no_notes = await atmWithDraw.dispenseWithDenomination(user.inputbalance, find_balance[0].balance, user.prefered_notes)
   
      let updated_data = {}
      updated_data.balance = find_balance[0].balance - user.inputbalance
      updated_data.cardNumber = user.cardNumber
      let update_balance = await servicemysql.UpdateBalance(updated_data)
       return response.actionComplete(res, 200, "cash withdraw successfully ", find_no_notes)
    }

  }
  catch (err) {
  return  response.errorHandling(res, 404, err)
  }

}
async function balanceEnquiry(req, res) {
  try {
    const user = req.body;
    if (!user && !user.cardNumber) {
      return  response.missingParameterResponse(res, 422, "Parameters Missing")
    }
    let balance_find_data = {}
    balance_find_data.cardnumber = user.cardNumber;
    let find_balance = await servicemysql.balanceEnquiry(balance_find_data)
    if (!find_balance[0].balance) {
       return response.invalidUser(res, 403, "Card details not found")
    }
     return response.actionComplete(res, 200, "balance found", find_balance[0].balance)

  }
  catch (err) {

     return response.errorHandling(res, 404, err)
  }

}
async function Registeruser(req, res) {
  try {
    const user = req.body;
    if (!user && !user.cardNumber && !user.balance && user.email) {
       return response.missingParameterResponse(res, 422, "Parameters Missing")
    }
    let insert_data = {};
    insert_data.email = user.email;
    insert_data.cardNumber = user.cardNumber;
    insert_data.balance = user.balance;
    

    let insert_user = await servicemysql.registerUser(insert_data)
    if (insert_user == 0) {
       return response.userAlreadyExits(res, 409, "user already exits")
    }
  return  response.actionComplete(res, 201, "user successfully registered", insert_user)

  }
  catch (err) {

   return  response.errorHandling(res, 404, err)
  }

}


module.exports = {
  CashwithDrawal: CashwithDrawal,
  balanceEnquiry: balanceEnquiry,
  Registeruser: Registeruser

}
