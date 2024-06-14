function plusOne(digits: number[]): number[] {
    let rest: number = 1;
    let i:number = digits.length-1;
    let sumNumber: number[] = [];

    do{
        let valueNumber: number = digits[i]+rest;
        rest = 0;
        if(valueNumber >= 10){
            rest = 1;   
            sumNumber.unshift(valueNumber-10)
        } else{
            sumNumber.unshift(valueNumber)
        }
        i--;
    }while(i >= 0)
    
    if(rest)
        sumNumber.unshift(1)

    return sumNumber
};