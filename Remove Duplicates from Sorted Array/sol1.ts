function removeDuplicates(nums: number[]): number {
    
    let i = 1;
    while(i < nums.length){
        console.log(nums[i], nums[i-1]);
        if(nums[i] == nums[i-1]){
            let x = nums.splice(i, 1);
            console.log(i, " remove this: ", x)
        }else{
            i++;
        }
    }

    return nums.length;
};

