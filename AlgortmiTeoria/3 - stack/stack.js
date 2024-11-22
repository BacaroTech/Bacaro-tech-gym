/*
/**
Uno stack è una struttura dati che segue la logica "Last In, First Out" (LIFO), 
ovvero l'ultimo elemento inserito è il primo ad essere rimosso.

Funzionamento:
1. Gli elementi vengono aggiunti allo stack tramite l'operazione di "push".
2. Gli elementi vengono rimossi dallo stack tramite l'operazione di "pop".
3. È possibile accedere al valore dell'elemento in cima allo stack tramite l'operazione "peek" senza rimuoverlo.
4. L'operazione "isEmpty" permette di verificare se lo stack è vuoto.
5. La procedura "printStack" permette di stampare il contenuto partendo dalla testa

Un esempio di uso comune di uno stack è nella gestione delle chiamate 
di funzione (call stack) nei linguaggi di programmazione.
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
        let str = "";
        for (let i = 0; i < this.items.length; i++)
            str += this.items[i] + " ";
        return str;
    }
}

// test della struttura dati 
let stack = new Stack();
console.log(stack.isEmpty()); 
console.log(stack.pop());
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.printStack());
console.log(stack.peek());
console.log(stack.pop());
console.log(stack.printStack());