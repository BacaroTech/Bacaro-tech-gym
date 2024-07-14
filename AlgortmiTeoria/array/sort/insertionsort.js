/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Insertion_sort#/media/File:Sorting_insertion_sort_anim.gif

Questo algoritmo funziona come segue
- si assume che il primo elemento sia ordianto
- da secondo elemento, compreso, si confronta esso con tutti gli elementi ordinati
    - se l'elemento è maggiore del massimo ordinato allora si aggiunge l'elemento in fine
    - se l'elemento si dovrebbe trovare "in mezzo" ad altri elementi allora si fa spazio facendo uno shift delle posizioni
- si ripete la procedura con un almento ordinato in più 

Output
l'array ordinato

Complessita' nel caso peggiore: O(n^2)
*/

// Function to sort an array using insertion sort
function insertionSort(arr, n)  
{  
    let i, key, j;  
    for (i = 1; i < n; i++) 
    {  
        key = arr[i];  
        j = i - 1;  

        while (j >= 0 && arr[j] > key) 
        {  
            arr[j + 1] = arr[j];  
            j = j - 1;  
        }  
        arr[j + 1] = key;  
    } 
    return arr 
}   
  
// Test sort
const arr = [12, 11, 13, 5, 6 ];  
console.log(insertionSort(arr, arr.length));  
