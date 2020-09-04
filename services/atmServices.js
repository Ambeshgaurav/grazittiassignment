const connectMysql=require('../config/config')


function balanceEnquiry(data)
{

    return new Promise((resolve,reject)=>
    {
        let sql="select balance from user where cardNumber=?"
        connectMysql.connection.query(sql,[data.cardNumber],function(err,rows)
        {
            if(err)
            {
                reject(err)
            }
            else 
            {
                resolve(rows)
            }
        })
    
    })

}
function registerUser(data) {
    return new Promise((resolve, reject) => {
        connectMysql.connection.query("select email from user where email=?", [data.email], function (err, rows) {
            if (err) {
                reject(err)
            }
            else if (rows && rows.length) {

                resolve(0)
               
                
            }
            else {
                var sql = ("insert into user (email,cardNumber,balance) values(?,?,?)");
                connectMysql.connection.query(sql, [data.email,data.cardNumber,data.balance], function (err, rows) {
                    console.log(err,rows);
                    
                    if (err)
                        reject(err)
                    else { 
                        resolve(rows)
                    }

                });
            }


        });

    });

}
function UpdateBalance(data)
{

    return new Promise((resolve,reject)=>
    {
        let sql="update user set balance=? where cardNumber=?"
        connectMysql.connection.query(sql,[data.balance,data.cardNumber],function(err,rows)
        {
            if(err)
            {
                reject(err)
            }
            else 
            {
                resolve(rows)
            }
        })
    
    })

}




module.exports={
    registerUser:registerUser,
    balanceEnquiry:balanceEnquiry,
    UpdateBalance:UpdateBalance
}