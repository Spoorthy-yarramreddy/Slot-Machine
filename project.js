
const prompt =require("prompt-sync")();

const ROWS=3;
const COLS=3;

const SYMBOLS_COUNT= {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOL_VALUES={
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}


const deposit = () => {
 while(true){
    const depositAmount=prompt("Enter deposit amount: ");
  const numberDepositAmount=parseFloat(depositAmount);
     if(isNaN(numberDepositAmount) || numberDepositAmount<=0){
         console.log("Invalid deposit amount, try again.");
     }
     else{
         return numberDepositAmount;
     }
 }
};

const lines = () => {
 while(true){
    const numberOfLines=prompt("Enter no.of lines to bet: ");
    const numberNumberOfLines=parseFloat(numberOfLines);
     if(isNaN(numberNumberOfLines) || numberNumberOfLines<=0){
         console.log("Invalid no.of lines, try again.");
     }
     else{
         return numberNumberOfLines;
     }
 }
};

const betPerLine = (balance,numberOfLines) => {
 while(true){
     const betAmount=prompt("Enter bet amount per line: ");
     const numberBetAmount=parseFloat(betAmount);
     if(isNaN(numberBetAmount) || numberBetAmount<=0 || numberBetAmount>balance/numberOfLines)
     {
         console.log("Invalid bet amount, try again.")
     }
     else{
         return numberBetAmount;
     }
 }
};

const spin=() => {
 const symbols=[];
 for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
   for(let i=0;i<count;i++){
       symbols.push(symbol);
   }
 }
 const reels=[[],[],[]];
for(let i=0;i<COLS;i++){
    const reelSymbols=[...symbols];
    for(let j=0;j<ROWS;j++){
        const randomIndex=Math.floor(Math.random() * reelSymbols.length)
        const selectedSymbol=reelSymbols[randomIndex];
       reels[i].push(selectedSymbol);
       reelSymbols.splice(randomIndex,1);
    }
}
return reels;
};

const transpose = (reels) => {
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }
  return rows;
};
const print =(rows) => {
 for(const row of rows){
     let rowString="";
     for(const [i,symbol] of row.entries()){
         rowString+=symbol;
         if(i!=row.length-1){
             rowString+=" | ";
         }
     }
     console.log(rowString);
 }
};

const getWinnings = (rows, betAmount,numberOfLines) => {
    let winnings =0;
   for(let row=0;row<numberOfLines;row++){
       const symbols=rows[row];
       let allSame=true;

       for(const symbol of symbols){
           if(symbol!=symbols[0]){
               allSame=false;
               break;
           }
       }
       if(allSame==true){
           winnings+=betAmount*SYMBOL_VALUES[symbols[0]];
       }
   }
   return winnings;
};
const game = () => {

let balance=deposit();
while(true){
console.log("You have a balance of $" + balance);
const numberOfLines=lines();
const betAmount = betPerLine(balance,numberOfLines);
balance-=numberOfLines*betAmount;
const reels = spin();
const rows=transpose(reels);
print(rows);
const winnings=getWinnings(rows,betAmount,numberOfLines);
balance+=winnings;
console.log("You won $"+ winnings.toString());
if(balance<=0){
    console.log("You ran out of money");
    break;
}
const playAgain= prompt("Do you want to play again (y/n) : ");
if(playAgain!= 'y'){
    break;
}
}
};

game();