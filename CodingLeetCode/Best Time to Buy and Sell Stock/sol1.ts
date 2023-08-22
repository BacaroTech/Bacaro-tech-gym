/*
brute force :(
function maxProfit(prices: number[]): number {
    let max = 0;

    for(let i = 0; i < prices.length; i++){
        for(let j = i+1; j < prices.length; j++){
            if(max < prices[j] - prices[i]){
                max = prices[j] - prices[i]
            }
        }
    }

    return max;
};*/

function maxProfit(prices: number[]): number {
    let min = prices[0];
    let minPos = 0;
    let max = prices[1];
    let maxPos = 1;
    let maxProfit = max - min;

    for(let i = 1; i < prices.length; i++){
        if(min > prices[i]){
            min = prices[i];
            minPos = i;
            maxPos = -1
        }else if(maxPos == -1 || max < prices[i] && i > minPos){
            max = prices[i];
            if(maxProfit < max - min){
                maxProfit = max - min
            }
        }
    }

    if(maxPos == 0 || maxProfit < 0 || prices.length == 1){
        maxProfit = 0;
    }

    return maxProfit;
};