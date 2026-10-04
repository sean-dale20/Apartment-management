function fizzBuzz(num){
    for(let i = 0; i <= num; i++)
    if(i % 2 === 0){
        console.log("Buzz");

    }
    else if(i % 2 === 0 && i % 3 === 0){
        console.log("FizzBuzz");
    }
    else{
        console.log(i);
    }
}


console.log(fizzBuzz(15));