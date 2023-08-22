function isPalindrome(x: number): boolean {
    if(x < 0){
        return false;
    }else{
        let digits = x.toString().split('');
        let digitsArray = digits.map(Number)
        let checked = true;
        for(let i = 0; i < digitsArray.length; i++){
            if(digitsArray[i] != digitsArray[digitsArray.length - 1 - i]){
                checked = false;
            }
        }
        return checked;
    }
};