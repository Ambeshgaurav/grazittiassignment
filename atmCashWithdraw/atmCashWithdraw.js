const response=require("../Errrofile/responses")

function dispenseWithoutDenomination(inputAmount,balance) {
   
   inputAmount=parseInt(inputAmount)
   balance=parseInt(balance)
   return new Promise((resolve,reject)=>
   {
      let notes = [];     
      if (inputAmount != 0 && inputAmount % 10 == 0 && inputAmount <= balance) {
         let notes1000 = Math.floor(inputAmount / 1000);
      
         
         let notes500 = Math.floor((inputAmount - (notes1000 * 1000)) / 500);
         let notes200 = Math.floor((inputAmount - ((notes1000 * 1000) + (notes500 * 500))) / 200);
         let notes100 = Math.floor((inputAmount - ((notes1000 * 1000) + (notes500 * 500) + (notes200 * 200))) / 100);
         let notes50 = Math.floor((inputAmount - ((notes1000 * 1000) + (notes500 * 500) + (notes200 * 200) + (notes100 * 100))) / 50);
         let notes20 = Math.floor((inputAmount - ((notes1000 * 1000) + (notes500 * 500) + (notes200 * 200) + (notes100 * 100) + (notes50 * 50))) / 20);
         let notes10 = Math.floor((inputAmount - ((notes1000 * 1000) + (notes500 * 500) + (notes200 * 200) + (notes100 * 100) + (notes50 * 50) + (notes20 * 20))) / 10);
         let notes_data={};
         if(notes1000)
         {
            notes_data.onethousands=notes1000
            notes.push(notes_data);
            notes_data={}

         }
         if(notes500)
         {
            notes_data.fivehundreads=notes500
            notes.push(notes_data);
            notes_data={}


         }
         if(notes200)
         {
            notes_data.twohundreads=notes200
            notes.push(notes_data);
            notes_data={}


         }
         if(notes100)
         {
            notes_data.onehundreads=notes100
            notes.push(notes_data);
            notes_data={}


         }
         if(notes50)
         {
            notes_data.fifty=notes50
            notes.push(notes_data);
            notes_data={}

         }
         if(notes20)
         {
            notes_data.twenty=notes20
            notes.push(notes_data);
            notes_data={}


         }
         if(notes10)
         {
            notes_data.ten=notes10
            notes.push(notes_data);
            notes_data={}


         }     
         resolve(notes) 
      }
      else if (inputAmount % 10 != 0 || inputAmount < 10) {
         resolve(0)
         console.log("Invalid amount entered, amount should be multiples of 10");
      }
      else{
         reject()
      }
   })
  
}



function dispenseWithDenomination(inputAmount,balance, notes1) {
    return new Promise ((resolve,reject)=>
    {
      inputAmount=parseInt(inputAmount)
      balance=parseInt(balance)
      let notes_data={};
   
      let notes = [];
     //  var balance = 20000;
      let updatedbalance = inputAmount;
      let count=0;
  
   
      if (inputAmount !== 0 && inputAmount % 10 == 0 && inputAmount <= balance) {
         let notes1000, notes500, notes200, notes100, notes50, notes20, notes10;
         if (notes1[0]) {
            notes1000 = Math.floor(updatedbalance / 1000);
            updatedbalance = (updatedbalance - (notes1000 * 1000))
           
            count++;
         }
         if (notes1[1]  || updatedbalance == 500 || count>=1) {
            notes500 = Math.floor((updatedbalance) / 500);
            updatedbalance = (updatedbalance - (notes500 * 500))
            
            count++;
            console.log("=================500",notes500);
            
         }
         if (notes1[2] || updatedbalance == 200 || count>=1) {
   
   
            notes200 = Math.floor((updatedbalance) / 200);
            updatedbalance = (updatedbalance - (notes200 * 200))
           
            count++;
            console.log("=================200",notes200,updatedbalance);
   
         }
         if (notes1[3]  || updatedbalance == 100 || count>=1) {
            notes100 = Math.floor((updatedbalance) / 100);
            updatedbalance = (updatedbalance - (notes100 * 100))
            
            count++
            console.log("=================100",notes100);
         }
         if (notes1[4] || updatedbalance == 50 || count>=1) {
            notes50 = Math.floor((updatedbalance) / 50);
            updatedbalance = (updatedbalance - (notes50 * 50))
            
            count++
         }
         if (notes1[5] || updatedbalance == 20 || count>=1) {
            notes20 = Math.floor((updatedbalance) / 20);
            updatedbalance = (updatedbalance - (notes20 * 20))
           
            count++
         }
         if (notes1[6] || updatedbalance == 10 || count>=1) {
            notes10 = Math.floor((updatedbalance) / 10);
            updatedbalance = (updatedbalance - (notes10 * 10))
            
           
         }
         if(notes1000)
           {
              notes_data.onethousands=notes1000
              notes.push(notes_data);
              notes_data={}
  
           }
           if(notes500)
           {
              notes_data.fivehundreads=notes500
              notes.push(notes_data);
              notes_data={}
  
  
           }
           if(notes200)
           {
              notes_data.twohundreads=notes200
              notes.push(notes_data);
              notes_data={}
  
  
           }
           if(notes100)
           {
              notes_data.onehundreads=notes100
              notes.push(notes_data);
              notes_data={}
  
  
           }
           if(notes50)
           {
              notes_data.fifty=notes50
              notes.push(notes_data);
              notes_data={}
  
           }
           if(notes20)
           {
              notes_data.twenty=notes20
              notes.push(notes_data);
              notes_data={}
  
  
           }
           if(notes10)
           {
              notes_data.ten=notes10
              notes.push(notes_data);
              notes_data={}
  
  
           }     
           resolve(notes)
      }
       
      else if (inputAmount % 10 != 0 || inputAmount < 10) {
         resolve(0)
         
      }
      else 
      {
         reject()
      }

    })
    
 }
 
module.exports={
    dispenseWithoutDenomination:dispenseWithoutDenomination,
    dispenseWithDenomination:dispenseWithDenomination


}