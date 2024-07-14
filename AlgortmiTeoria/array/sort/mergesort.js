/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Merge_sort#/media/File:Merge_sort_animation2.gif

Questo algoritmo funziona come segue
- si divide l'array in singoli micro array di 1 elemento ciascuni(dividendo sempre a meta)
- si ricompone l'array partendo dai singoli elementi e ordinadnoli  

Output
l'array ordinato

Complessita' nel caso peggiore: O(nlogn)
*/

function merge(left, right) {
    let sortedArr = [] // the sorted items will go here
    while (left.length && right.length) {
        // Insert the smallest item into sortedArr
        if (left[0] < right[0]) {
            sortedArr.push(left.shift())
        } else {
            sortedArr.push(right.shift())
        }
    }
    // Use spread operators to create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right]
}

function mergeSort(arr) {
// Base case
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    // Recursive calls
    let left = mergeSort(arr.slice(0, mid))
    let right = mergeSort(arr.slice(mid))
    return merge(left, right)
}

//Test sort
const arr = [3, 5, 8, 5, 99, 1];
console.log(mergeSort(arr));
