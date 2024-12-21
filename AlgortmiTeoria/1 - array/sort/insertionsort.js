/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Insertion_sort#/media/File:Sorting_insertion_sort_anim.gif

Questo algoritmo funziona come segue:
1. Si assume che il primo elemento dell'array sia già ordinato.
2. A partire dal secondo elemento (incluso), si confronta l'elemento corrente con quelli già ordinati:
    - Se l'elemento è maggiore del massimo ordinato, viene aggiunto alla fine della sezione ordinata.
    - Se l'elemento deve trovarsi "in mezzo" agli altri elementi ordinati, si crea spazio facendo uno shift
      delle posizioni degli elementi successivi.
3. La procedura viene ripetuta, espandendo la parte ordinata dell'array di un elemento alla volta.

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
console.log("pre ordinamento:", arr);
console.log("post ordinamento:", insertionSort(arr, arr.length));

