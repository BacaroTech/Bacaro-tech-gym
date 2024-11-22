/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://en.wikipedia.org/wiki/Selection_sort#/media/File:Selection-Sort-Animation.gif

Questo algoritmo funziona come segue:
1. Viene determinato il minimo nell'array.
2. Il minimo viene scambiato con il primo elemento dell'array.
3. Si esegue una seconda passata dell'algoritmo su un sotto-array che va dalla posizione 1 alla posizione n.

Output
l'array ordinato

Complessita' nel caso peggiore: O(n^2)
*/

function selectionSort(inputArr) {
    let n = inputArr.length;

    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        if (min != i) {
            // Swapping the elements
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;
        }
    }
    return inputArr;
}

// Test sort
let arr = [234, 43, 55, 63, 5, 6, 235, 547];
console.log(selectionSort(arr));