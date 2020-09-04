// response file for error and completion task


function actionComplete(res, statusCode, message, data) {
    let response = {
        data: data,
        message: message,
        statusCode: statusCode,
    }
    res.send(JSON.stringify(response));



}

function invalidUser(res, statusCode, message) {
    let response = {
        message: message,
        statusCode: statusCode,
    }
    res.send(JSON.stringify(response));
}

function errorHandling(res, statusCode, message) {
    let response = {
        message: message,
        statusCode: statusCode,
    }
    res.send(JSON.stringify(response));


}
function userAlreadyExits(res, statusCode, message) {
    let response = {
        message: message,
        statusCode: statusCode,
    }
    res.send(JSON.stringify(response));


}
function inSufficientBalance(res, statusCode, message) {
    let response = {
        message: message,
        statusCode: statusCode,
    }
    res.send(JSON.stringify(response));


}

module.exports = {
    actionComplete: actionComplete,
    errorHandling: errorHandling,
    invalidUser: invalidUser,
    userAlreadyExits: userAlreadyExits,
    inSufficientBalance: inSufficientBalance

}