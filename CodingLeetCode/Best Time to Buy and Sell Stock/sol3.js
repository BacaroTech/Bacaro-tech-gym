/**
* @param {number[]} prices
* @return {number}
*/
var maxProfit = function(prices) {
    let max = 0;
    let currentIndex = 0;
    let minVal = prices[0];
    for(i = 0; i < prices.length; i++){
        if(prices[i] < minVal){
            minVal = prices[i];
            currentIndex = i;
        }
        if(prices[i]- prices[currentIndex] > max){
            max = prices[i]-prices[currentIndex];
        }
    }
    return max;
};