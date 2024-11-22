/*
Questo algoritmo consente di verificare la presenza (o meno) di un elemento all'interno di un array.  
Non utilizza alcun ragionamento specifico sugli elementi dell'array, ma li scorre uno ad uno fino a:  
- Trovare l'elemento cercato (e fermarsi).  
- Terminare il ciclo senza trovare l'elemento.  

Output
- **0...n-1**: Restituisce la posizione dell'elemento trovato.  
- **-1**: Se l'elemento non è presente nell'array.  

Complessità
- **Caso peggiore:** O(n)  
Nel caso peggiore, l'algoritmo deve scorrere tutti gli elementi dell'array prima di terminare.  
*/

function linearSearch(array, num) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === num) {
            return i;
        }
    }
    return -1;
}

let numbers = [1, 3, 5, 7, 8, 9];
console.log(linearSearch(numbers, 8)); // -> 4
console.log(linearSearch(numbers, 28)); // -> -1 
