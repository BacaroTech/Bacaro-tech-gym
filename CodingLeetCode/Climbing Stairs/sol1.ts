function climbStairs(n: number): number {
    //return climbStairsRec(n, 1) + climbStairsRec(n, 2);
    
    if (n == 0 || n == 1) {
        return 1;
    }
    let prev = 1, curr = 1;
    for (let i = 2; i <= n; i++) {
        let temp = curr;
        curr = prev + curr;
        prev = temp;
    }
    return curr;
    
};

/*
TO MUCH TIME!
function climbStairsRec(n: number, step: number): number {
    if(n < step || n == 0){
        return 0;
    }else{
        if(n-step == 0){
            return 1;
        }else{
            let one: number = 0;
            let two: number = 0;
            if(n-step >= 1)
                one = climbStairsRec(n-step, 1)
            if(n-step >= 2)
                two = climbStairsRec(n-step, 2); 
            return one+ two;
        }
    }
}*/