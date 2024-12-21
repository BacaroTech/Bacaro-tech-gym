/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://en.wikipedia.org/wiki/Bubble_sort#/media/File:Bubble-sort-example-300px.gif

Questo algoritmo funziona seguendo questi passaggi:  
1. Si considerano due elementi consecutivi (una coppia) dell'array. Ci sono due casi:  
   - Se il primo elemento è **minore o uguale** al secondo, la coppia rimane invariata.  
     Esempio: \( 1,3 \to 1,3 \)  
   - Se il primo elemento è **maggiore** del secondo, i due elementi vengono scambiati.  
     Esempio: \( 3,2 \to 2,3 \)  
2. Questa operazione di confronto e, se necessario, di scambio viene effettuata per ogni coppia di elementi nell'array.  
3. Un insieme completo di confronti e scambi che coinvolge tutti gli elementi dell'array si chiama **passata**.  
4. L'algoritmo termina quando una passata non richiede alcuno scambio, segnalando che l'array è ordinato.  

Output
l'array ordinato

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
const arr = [234, 43, 55, 63, 5, 6, 235, 547];
console.log("pre ordinamento:", arr);
bblSort(arr)
console.log("post ordinamento:", arr);
