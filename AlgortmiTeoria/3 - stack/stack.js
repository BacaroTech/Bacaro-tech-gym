/*
La classe `Stack` implementa una struttura dati di tipo pila, basata sul principio Last In, First Out (LIFO), 
in cui l'ultimo elemento aggiunto è il primo a essere rimosso. Questo la rende ideale per scenari in cui è 
necessario gestire dati seguendo un ordine inverso rispetto all'inserimento.

STRUTTURA DATI:
Uno stack è costituito da una collezione di elementi disposti in ordine lineare. 
Le operazioni di inserimento (push) e rimozione (pop) avvengono sempre all'estremità superiore della pila, 
detta cima dello stack. Gli elementi al di sotto della cima rimangono temporaneamente inaccessibili fino 
alla rimozione di quelli superiori.

OPERAZIONI PRINCIPALI:
- push(element): Inserisce un elemento in cima allo stack.
- pop(): Rimuove e restituisce l'elemento in cima allo stack. Restituisce `undefined` se lo stack è vuoto.
- peek(): Restituisce il valore dell'elemento in cima allo stack senza rimuoverlo.
- isEmpty(): Verifica se lo stack è vuoto. Restituisce `true` se non contiene elementi, altrimenti `false`.
- size(): Restituisce il numero totale di elementi presenti nello stack.
- printStack(): Stampa il contenuto dello stack, partendo dall'elemento in cima fino alla base.

PRESTAZIONI:
Le operazioni principali dello stack (`push`, `pop`, `peek`, `isEmpty`) hanno complessità temporale costante, O(1), 
poiché non è necessario spostare o ridistribuire gli elementi. 
Questo lo rende una scelta ottimale per scenari che richiedono frequenti inserimenti e rimozioni in ordine LIFO.
*/

class Stack {

    // Array usato per implementare lo stack -> è possibile implementare lo stack usando le liste(consigliato)
    constructor() {
        this.items = [];
    }

    // push() --> inserimento in testa => O(1)
    push(element) {
        this.items.push(element);
    }
    
    // pop() --> rimozione in testa, ritornando l'elemento rimosso => O(1)
    pop() {
        if (this.isEmpty())
            return 'Lo stack è vuoto'
        return this.items.pop();
    }

    // peek() --> restituisce l'elemento in testa dello stack senza eliminarlo => O(1)
    peek() {
        return this.items[this.items.length - 1];
    }

    // isEmpty() --> restituisce true se lo stack è vuoto, false altrimenti => O(1)
    isEmpty() {
        return this.items.length == 0;
    }

    // printStack() --> stampa la struttura dati partendo dalla testa => O(n)
    printStack() {
        let nodeVisited = [];
        for (let i = 0; i < this.items.length; i++)
            nodeVisited.push(this.items[i]);
        return nodeVisited;
    }
}

// test della struttura dati 
let stack = new Stack();
console.log("verifica se lo stack è vuoto:", stack.isEmpty()); 
console.log("eliminazione elemento:", stack.pop());
stack.push(10);
stack.push(20);
stack.push(30);
console.log("stampa tutti gli elementi dello stack:", stack.printStack());
console.log("osservare l'elemento in testa:", stack.peek());
console.log("rimozione dell'elemento in testa:", stack.pop());
console.log("stampa di tutti gli elementi dopo aver rimosso la testa:", stack.printStack());