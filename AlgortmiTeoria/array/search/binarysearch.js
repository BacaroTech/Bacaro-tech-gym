/*
Questo algoritmo permette di verificare la presenza(o meno) di un elemento all'interno di un array.
Per applicare la ricerca binaria L'ARRAY DEVE ESSERE ORDINATO(non importa l'ordine), questo perche' 
l'agoritmo segue questa logica
- prende gli estremi dell'array(all'inizio 0 e n-1 ma poi si modificheranno in modo ricorsivo)
- calcola la meta' dell'array
- verifica se l'elemento a meta' corrisponde con l'elemento da cercare
- nel caso positivo, restituisce la posizione centrale
- nel caso negativo, ci sono 2 sottocasi
    - se l'elemento a meta' e' maggiore rispetto a quello cercato -> ricorsione inserendo come estremi l'inizio e come fine la posizione centrale(escludendo l'altra meta')
    - se l'elemento a meta' e' minore rispetto a quello cercato -> ricorsione inserendo come estremi come inizio la posizione centrale e la fine (escludendo l'altra meta')

Output
0...n-1 -> posizione dell'elemento trovato
-1 -> se l'elmento non e' presente

Complessita' nel caso peggiore: O(log n)
*/

function recursiveFunction (arr, x, start, end) {
    // Base Condition
    if (start > end)
        return -1;

    // Find the middle index
    let mid = Math.floor((start + end) / 2);
    
    // Compare mid with given key x
    if (arr[mid] === x)
        return mid;
    
    // If element at mid is greater than x,
    // search in the left half of mid
    if (arr[mid] > x)
        return recursiveFunction(arr, x, start, mid - 1);
    else
        // If element at mid is smaller than x,
        // search in the right half of mid
        return recursiveFunction(arr, x, mid + 1, end);
}

let arr = [1, 3, 5, 7, 8, 9];
console.log( (recursiveFunction(arr, 5, 0, arr.length - 1)); // -> 2
console.log( (recursiveFunction(arr, 12, 0, arr.length - 1)); // -> -1
