/*
La classe `MyMap` implementa una struttura dati di tipo mappa (o dizionario) in JavaScript, progettata 
per memorizzare coppie chiave-valore.  Grazie a una funzione di hash, la mappa garantisce un accesso rapido ai dati, 
rendendola ideale per gestire associazioni chiave-valore.

STRUTTURA DATI:
La mappa utilizza un array come struttura sottostante per archiviare i dati. 
Una funzione di hash converte ogni chiave in un indice dell'array. Per risolvere eventuali 
collisioni (quando due chiavi producono lo stesso indice), viene implementato il chaining, ossia 
ogni elemento dell'array è una lista (o array) di coppie chiave-valore.

OPERAZIONI PRINCIPALI:
- set(key, value): Inserisce una nuova coppia chiave-valore nella mappa. Se la chiave esiste già, aggiorna il valore associato.
- get(key): Restituisce il valore associato a una chiave specifica. Se la chiave non è presente, restituisce `undefined`.
- has(key): Verifica se una chiave esiste nella mappa e restituisce un valore booleano (`true` o `false`).
- delete(key): Rimuove una coppia chiave-valore dalla mappa. Restituisce `true` 
se l'elemento è stato eliminato, altrimenti `false`.
- keys(): Restituisce un array contenente tutte le chiavi presenti nella mappa.
- values(): Restituisce un array contenente tutti i valori presenti nella mappa.
- size(): Restituisce il numero totale di coppie chiave-valore attualmente presenti nella mappa.
- clear(): Svuota completamente la mappa, rimuovendo tutte le coppie chiave-valore.

PRESTAZIONI:
Grazie alla funzione di hash e al chaining, le operazioni principali (`set`, `get`, `has`, `delete`) 
sono generalmente eseguite in tempo O(1), rendendo la mappa particolarmente efficiente. 
Tuttavia, in caso di collisioni frequenti, il tempo di esecuzione può degradare a O(n), 
dove n è il numero di coppie chiave-valore nella mappa.
*/

class MyMap {
    constructor() {
        this.items = []
        this.itemsInsert = 0
    }

    // hash(key) --> Funzione di hash per convertire una chiave in un indice
    hash(key) {
        return Math.round(key.length * 1.5)
    }

    // set(key, value) --> Aggiunge una coppia chiave-valore
    set(key, value) {
        const index = this.hash(key) // Calcola l'indice della chiave
        if (!this.items[index]) {
            this.items[index] = { key, value } // Crea una lista se non esiste già
            this.itemsInsert++
            console.log('Chiave "' + key + '" inserita correttamente')
        } else {
            console.log('La chiave è gia presente')
        }
    }

    // get(key) --> Ottiene il valore per una determinata chiave
    get(key) {
        const index = this.hash(key) // Calcola l'indice della chiave
        if (!this.items[index]) {
            return undefined // Restituisce undefined se non ci sono elementi in questo bucket
        } else {
            return this.items[index].value
        }
    }

    // has(key) --> Controlla se una chiave esiste nella mappa
    has(key) {
        const index = this.hash(key) // Calcola l'indice della chiave
        if (!this.items[index]) {
            return false // Restituisce false se il bucket è vuoto
        } else {
            return true
        }
    }

    // delete(key) --> Rimuove una coppia chiave-valore presa in inuput
    delete(key) {
        const index = this.hash(key) // Calcola l'indice della chiave
        if (!this.items[index]) {
            return false // Restituisce false se il bucket è vuoto
        } else {
            this.items.splice(index) // Rimuove l'elemento dalla lista
            this.itemsInsert--
            return true
        }
    }

    // keys() --> Restituisce tutte le chiavi nella mappa
    keys() {
        return this.items.map(item => item.key)
    }

    // values() --> Restituisce tutti i valori nella mappa
    values() {
        return this.items.map(item => item.value)
    }

    // printAll() --> Stampa sia le chiavi che i valori associati
    printAll() {
        console.log("key: ", this.keys());
        console.log("value: ", this.values());
    }

    // size() --> Restituisce la dimensione della mappa
    size() {
        return this.itemsInsert
    }

    // clear() --> Svuota la struttura dati
    clear() {
        this.items = []
        this.itemsInsert = 0;
    }
}

// test della struttura dati
const myMap = new MyMap()
myMap.set("name", "Alice")
myMap.set("age", 25)
myMap.set("country", "Italy")
myMap.printAll()

console.log("Ricerca all'interno della mappa del campo name:", myMap.get("name"))  
console.log("Ricerca all'interno della mappa del campo age:", myMap.has("age"))   
console.log("Numero di elementi della mappa:", myMap.size())       

myMap.delete("country")
myMap.printAll()
console.log("Ricerca all'interno della mappa del campo country dopo la sua rimozione:", myMap.has("country"))   

myMap.clear()
console.log("Numero di elementi della mappa dopo il clear:", myMap.size())           
