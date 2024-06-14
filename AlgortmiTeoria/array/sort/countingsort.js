

function countSort(inputArray) {
    const N = inputArray.length;
 
    // Finding the maximum element of inputArray
    let M = 0;
    for (let i = 0; i < N; i++) {
        M = Math.max(M, inputArray[i]);
    }
 
    // Initializing countArray with 0
    const countArray = new Array(M + 1).fill(0);
 
    // Mapping each element of inputArray as an index of countArray
    for (let i = 0; i < N; i++) {
        countArray[inputArray[i]]++;
    }
 
    // Calculating prefix sum at every index of countArray
    for (let i = 1; i <= M; i++) {
        countArray[i] += countArray[i - 1];
    }
 
    // Creating outputArray from countArray
    const outputArray = new Array(N);
    for (let i = N - 1; i >= 0; i--) {
        outputArray[countArray[inputArray[i]] - 1] = inputArray[i];
        countArray[inputArray[i]]--;
    }
 
    return outputArray;
}
 
// Driver code
const inputArray = [4, 3, 12, 1, 5, 5, 3, 9];
 
// Sorting the input array
const outputArray = countSort(inputArray);
 
// Printing the sorted array
console.log(outputArray.join(' '));