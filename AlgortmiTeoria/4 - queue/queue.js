/*
La classe `Queue` implementa una struttura dati di tipo coda, basata sul principio First In, First Out (FIFO), 
in cui il primo elemento aggiunto è il primo a essere rimosso. Questo la rende ideale per scenari in cui è necessario 
gestire i dati in ordine di arrivo, come nella gestione delle risorse o delle richieste in un sistema.

STRUTTURA DATI:
Una coda è costituita da una sequenza di elementi disposti in ordine lineare. 
Gli elementi vengono inseriti in fondo alla coda e rimossi dalla testa. 
Le operazioni di inserimento (enqueue) e rimozione (dequeue) avvengono sempre rispettivamente alla fine e all'inizio della coda, 
mentre gli elementi rimanenti si spostano automaticamente.

OPERAZIONI PRINCIPALI:
- enqueue(element): Aggiunge un elemento alla fine della coda.
- dequeue(): Rimuove e restituisce l'elemento all'inizio della coda. Restituisce `undefined` se la coda è vuota.
- peek(): Restituisce il valore dell'elemento in testa alla coda senza rimuoverlo.
- isEmpty(): Verifica se la coda è vuota. Restituisce `true` se non contiene elementi, altrimenti `false`.
- size(): Restituisce il numero totale di elementi presenti nella coda.
- printQueue(): Stampa il contenuto della coda, partendo dall'elemento in testa fino alla fine.

PRESTAZIONI:
Le operazioni principali della coda (`enqueue`, `dequeue`, `peek`, `isEmpty`) hanno una complessità temporale O(1), 
poiché l'inserimento e la rimozione avvengono sempre rispettivamente alla fine e all'inizio della coda. 
Questo la rende adatta a scenari che richiedono la gestione di dati in ordine di arrivo o per implementare 
algoritmi che seguono il modello FIFO.
*/

class Queue {
    
    // Array usato per implementare le code -> è possibile implementare le code usando le liste(consigliato)
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    
    // enqueue() --> inserimento in coda => O(1)
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
        return item + ' inserted'
    }
    
    // dequeue() --> rimozione in testa, ritornando l'elemento rimosso => O(1)
    dequeue() {
        if(this.isEmpty)
            console.log('coda vuota') 
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    
    // peek() --> restituisce l'elemento in testa dello stack senza eliminarlo => O(1)
    peek() {
        return this.items[this.frontIndex]
    }

    // isEmpty() --> restituisce true se lo stack è vuoto, false altrimenti => O(1)
    isEmpty() {
        return this.items.frontIndex === this.items.backIndex
    }
    
    // printStack() --> stampa la struttura dati partendo dalla testa => O(n)
    printQueue() {
        let str = ""
        if (this.isEmpty()) {
            console.log('La coda è vuota')
            return
        }

        for (let i = this.frontIndex; i < this.backIndex; i++) {
            str += this.items[i] + " "
        }
        return str
    }
}

// test della struttura dati
const queue = new Queue()
console.log(queue.enqueue(7))
console.log(queue.enqueue(2))
console.log(queue.enqueue(6))
console.log(queue.enqueue(4))
console.log(queue.dequeue())
console.log(queue.peek())
console.log(queue.printQueue());
