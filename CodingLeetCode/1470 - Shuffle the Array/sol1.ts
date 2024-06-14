function shuffle(nums: number[], n: number): number[] {
    let numsShuffle: number[] = [];
    let halfSize = nums.length / 2;

    for(let i = 0; i < n; i++){
        numsShuffle.push(nums[i]);
        numsShuffle.push(nums[i + halfSize]);
    }
    
    return numsShuffle;
};