/*
La classe `MyMap` implementa una mappa (o dizionario) in JavaScript che memorizza coppie chiave-valore.

La struttura dati sottostante è un array che utilizza una funzione di hash per determinare l'indice in cui
memorizzare i dati. La funzione di hash converte una chiave in un indice e i dati vengono gestiti in un array
di liste (chaining) per risolvere le collisioni.

Le operazioni principali supportate dalla mappa includono:

- set(key, value): Inserisce una nuova coppia chiave-valore nella mappa.
- get(key): Restituisce il valore associato a una chiave specifica.
- has(key): Verifica se una chiave esiste nella mappa.
- delete(key): Rimuove una coppia chiave-valore dalla mappa.
- keys(): Restituisce tutte le chiavi presenti nella mappa.
- values(): Restituisce tutti i valori presenti nella mappa.
- size(): Restituisce la dimensione (numero di coppie) della mappa.
- clear(): Svuota la mappa.

La mappa è progettata per essere dinamica e supporta l'inserimento, la ricerca e la rimozione efficienti delle coppie
chiave-valore. Grazie alla funzione di hash e al chaining, le operazioni principali sono generalmente eseguite in
tempo costante, O(1), a meno che non si verifichino collisioni frequenti.
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
        console.log(index)
        if (!this.items[index]) {
            this.items[index] = { key, value } // Crea una lista se non esiste già
            this.itemsInsert++
            console.log('Chiave inserita correttamente')
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

console.log(myMap.get("name"))  
console.log(myMap.has("age"))   
console.log(myMap.size())       

myMap.delete("country")
myMap.printAll()
console.log(myMap.has("country"))   

myMap.clear()
console.log(myMap.size())           
