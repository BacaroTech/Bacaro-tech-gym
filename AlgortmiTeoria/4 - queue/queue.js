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
