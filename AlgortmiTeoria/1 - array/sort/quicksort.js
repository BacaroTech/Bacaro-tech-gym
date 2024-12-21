/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://en.wikipedia.org/wiki/Quicksort#/media/File:Sorting_quicksort_anim.gif

Questo algoritmo funziona come segue:
1. Si sceglie una regola per determinare quale elemento sia il "pivot" (di solito è il primo o l'ultimo elemento dell'array).
2. Il pivot viene posizionato al centro dell'array.
3. La procedura viene eseguita ricorsivamente sulla parte dell'array a sinistra del pivot e su quella a destra del pivot.

Output
l'array ordinato, come side effect

Complessita' nel caso peggiore: O(n^2)
*/

function partition(arr, low, high) { 
    let pivot = arr[high]; 
    let i = low - 1; 
  
    for (let j = low; j <= high - 1; j++) { 
        // If current element is smaller than the pivot 
        if (arr[j] < pivot) { 
            // Increment index of smaller element 
            i++; 
            // Swap elements 
            [arr[i], arr[j]] = [arr[j], arr[i]];  
        } 
    } 
    // Swap pivot to its correct position 
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  
    return i + 1; // Return the partition index 
} 
  
function quickSort(arr, low, high) { 
    if (low >= high) return ; 
    let pi = partition(arr, low, high); 
  
    quickSort(arr, low, pi - 1); 
    quickSort(arr, pi + 1, high); 
} 
  
// Test sort
const arr = [10, 80, 30, 90, 40];   
console.log("pre ordinamento:", arr);
quickSort(arr, 0, arr.length - 1)
console.log("post ordinamento:", arr);