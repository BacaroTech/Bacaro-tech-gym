/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://en.wikipedia.org/wiki/Bubble_sort#/media/File:Bubble-sort-example-300px.gif

Questo algoritmo funziona come segue
- prende la prima coppia di elementi e ci sono 2 casistiche
    - nel caso in cui il primo elemento sia minore del secondo la coppia rimane cosi' com'e' => 1,3 -> 1,3
    - nel caso opposto, la coppia viene scambiata => 3,2 -> 2,3
- questa azione di scambio viene fatta per ogni elemento
- un'insieme di scambi che interessano tutti gli elmenti viene chiamata "passata"
- l'algoritmo termina quando si verifica una "passata" senza nessuno scambio

Output
l'array ordinato, come side effect

Complessita' nel caso peggiore: O(n^2)
*/

// Creating the bblSort function
function bblSort(arr) {
    for (let i = 0; i < arr.length; i++) {

        // Last i elements are already in place  
        for (let j = 0; j < (arr.length - i - 1); j++) {

            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (arr[j] > arr[j + 1]) {

                // If the condition is true
                // then swap them
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}

// Test sort
let arr = [234, 43, 55, 63, 5, 6, 235, 547];
bblSort(arr);
console.log(arr);
