/*
Questo algoritmo permette di verificare la presenza(o meno) di un elemento all'interno di un array.
Non sfrutta nessun ragionamento sugli elementi dell'array, ma ne scorre uno ad uno e si ferma quando
trova l'elmento che stiamo cercando

Output
0...n-1 -> posizione dell'elemento trovato
-1 -> se l'elmento non e' presente

Complessita' nel caso peggiore: O(n)
*/

function linearSearch(array, num) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === num) {
            return i;
        }
    }
    return -1;
}

linearSearch(numbers, 8); // -> 4
linearSearch(numbers, 28); // -> -1 
