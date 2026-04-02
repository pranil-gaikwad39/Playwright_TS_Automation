
//prime number 
// const isPrime =(num)=>{
// let prime = false ;
// count= 0 ;
// for(let i =1 ; i<=num;i++){
//     if(num%i===0){
//         count++;
//     }
// }
// if(count===2){
//     prime = true ;

// }
//     return prime ;


// }
// console.log(isPrime(1));

// //find repeating character in a string
// const findRepeatingchr = (str) => {
//     let res = '';
//     let fre = {};
//     let seen = {};

//     for (let ch of str) {
//         fre[ch] = (fre[ch] || 0) + 1;

//     }

//     let firstNonRepeat = '';
//     for (let ch of str) {
//         if (fre[ch] === 1) {
//             firstNonRepeat = ch;
//             break;
//         }

//     }
//     for (let i = 0; i < str.length; i++){

//         let ch = str[i];
//         if(fre[ch]>1){

//             if(!seen[ch]){
//                 res += ch;
//                 seen[ch] = true ;
//             }else{
//                 res += '#';
//             }


//         }else{
//             if(i===0){
//                 res += ch;
//             }else if(i>0 && res[i-1] === '#'){
//                 res += firstNonRepeat ;
            
//         }else{
//             res += res[i-1];
//         }
//     }
    
//     } 

// return res ;

// }

// console.log(findRepeatingchr('abc'));

// const ifEven =(num)=>{
//     if(num%2===0){
//         return true ;
//     }else{
//         return false ;
//     }
// }

function nearPalindrome(num){

   
    // let a =num ;
    // let b = num ;
    // let palin  ;
    // c = true ;
    // while(c){
        
    //     a--;
    //     b++;
    //     a.toString().split('').reverse().join('');
    //      b.toString().split('').reverse().join('');
    //     if(b===num){
    //        return b;

    //         c = false ;
            
    //     }else if (a===num){
    //         return a;
    //         c = false ;
            
    //     }

    // }

    // return palin ;


    let count = 1 ;
    let c = true ;

    while(c){
       let i = (num-count).toString().split('').reverse().join('');
       if(i===(num-count).toString()){
        c=false ;
        return i ;

       }
       let j = (num+count).toString().split('').reverse().join('');
       if(j===(num+count).toString()){
        c=false ;
        return j ;
       }
       count++ ;

      
    }
}
console.log(nearPalindrome(123));

function maxProfit(prices){

let buyprice = prices[0] ;
let maxprofit = 0 ;
let profit =0;
    for(let i = 0 ; i<prices.length ; i ++){

    if(prices[i]<buyprice){
        buyprice=prices[i];
    }

    profit = prices[i]-buyprice ;
    if(profit>maxprofit){
        maxprofit= profit ;
    }

    }

    return maxprofit ;

    }
console.log(maxProfit([7,6,8,3,1]));


 const isArmstrong=(num)=>{
    let digit = num.toString().length;
    console.log(digit);
    let temp = num ; 
    let sum = 0 ;

    while(temp>0){

        sum = sum + (temp%10)**digit ;
        console.log(sum);
        temp = Math.floor(temp/10);
       

    }
     if (sum === num){
        return true ;
     }else{
        return false ;
     }
 }
 console.log(isArmstrong(153));


 const findDuplicate = (arr)=>  {

    for(let k = 0 ; k<arr.length ; k++){

        if(arr.indexOf(arr[k])!== arr.lastIndexOf(arr[k])){
            return arr[k];
        }
    }
    return null ;
 }
 console.log(findDuplicate([1, 2, 4, 4, 1, 3, 7, 5, 5, 2]));

 const findorderDuplicate = (arr)=>  {

    for(let k = 0 ; k<arr.length ; k++){

        if(arr[k]===arr[k+1]){
            return arr[k];
        }
    }
    return null ;
 }
 console.log(findorderDuplicate([1, 2, 4, 4, 1, 3, 7, 5, 5, 2]));

 function findNearest(num){

 let a = num ; 
 let b = num ;
 let count = 1 ;
 let c = true ;
    while(c){

        let r =(a-count).toString().split('').reverse().join('') ;
        if((a-count).toString() === r ){
            c=false ;
            return a-count ;
        }
        let u = (b+count).toString().split('').reverse().join('');
        if((b+count).toString() === u){
            c=false ;
            return b+count ;
        }
        count ++ ;
    

    }
 }
 console.log(findNearest(123));

 function longestSubstring(str){

    let long = 0 ;

    for(let i= 0 ; i<str.length; i++){
        let s = str.substring(i,str.length);


        
    }
 }
 function fibonacci(){
    let num = 0; 
    let num2 = 1 ;
    let temp ; 
    
    for(let i = 0 ;i<8 ; i++){
       
       console.log(num); //0 ,1 ,1 ,2
       temp = num+num2 ; // 1,2 , 3
       num = num2 ; // 1,1 ,2 
       num2 = temp ; // 1,2 , 3
       
       
    }
    
}
fibonacci();