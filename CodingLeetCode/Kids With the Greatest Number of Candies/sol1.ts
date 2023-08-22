function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    let maxCandies: number = Math.max(...candies);
    let resultesCandies: boolean[] = [];
    candies.forEach(candiesForChild => {
        if(candiesForChild + extraCandies >= maxCandies){
            resultesCandies.push(true);
        }else{
            resultesCandies.push(false);
        }
    })
    return resultesCandies;
    
};