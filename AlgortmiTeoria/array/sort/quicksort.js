/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://en.wikipedia.org/wiki/Quicksort#/media/File:Sorting_quicksort_anim.gif

Questo algoritmo funziona come segue
- si decide una regola che determina se un elemento sia il "pivot" o meno(si solito è o il primo o ultimo elemento)
- si posiziona al centro dell'array il pivot
- si esegue in modo ricorsivo questa procedura per la parte a sx del pivot che a dx del pivot

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
quickSort(arr, 0, arr.length - 1)
console.log(arr);