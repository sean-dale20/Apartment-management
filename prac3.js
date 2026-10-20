function Reverse(arr){
    let string = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === "egg"){
            string.push(arr[i]);
        }
        
        else if (arr[i] === "milk"){
           string.push(arr[i]);
        }


        if (string[i] === "eggs" || string[i] === "milk"){
           return true;
        }
        


    }
    return false;
  
}


console.log(Reverse(["bread","egg","butter", "milk"]));
