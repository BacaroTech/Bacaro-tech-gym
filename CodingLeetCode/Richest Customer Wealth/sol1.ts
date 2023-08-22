function maximumWealth(accounts: number[][]): number {
    let max = 0;
    accounts.forEach((row: number[]) => {
        let sum = 0;
        row.forEach((coll: number) => {
            sum += coll
        })  
        if(sum > max)
            max = sum;
    })
    return max;
};