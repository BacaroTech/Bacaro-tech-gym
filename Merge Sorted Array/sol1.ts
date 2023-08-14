/**
 Do not return anything, modify nums1 in-place instead.
 */
 function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i:number = 0
    let j: number = 0;
    let ultimateArray: number[] = [];
  
    while(i < m && j < n){
        if(nums1[i] < nums2[j]){
            ultimateArray.push(nums1[i]);
            i++;
        }else{
            ultimateArray.push(nums2[j]);
            j++;
        }
    }

    while(i < m){
        ultimateArray.push(nums1[i]);
        i++;
    }

    while(j < n){
        ultimateArray.push(nums2[j]);
        j++;
    }

    for(let i = 0; i < m+n; i++){
        nums1[i] = ultimateArray[i];
    }
};