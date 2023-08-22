/**
 Do not return anything, modify nums in-place instead.
 */
 function moveZeroes(nums: number[]): void {
    let zeroRemoved: number = 0;
    let i:number = 0;
    while(i < nums.length){
        if(nums[i] == 0){
            nums.splice(i, 1);
            zeroRemoved++;
        }else{
            i++;
        }
    }
    for(let i = 0; i < zeroRemoved; i++){
        nums.push(0);
    }
};