function finders(arr1, arr2){

let same = [];

    for(let i = 0; i < 100; i++){
        if(arr1.includes(arr2[i])){
           same.push(arr1[i])
        }
    }
    return same;
}

console.log(finders([1,2,4,5,6,7,8],[2,3,5,8,10]));