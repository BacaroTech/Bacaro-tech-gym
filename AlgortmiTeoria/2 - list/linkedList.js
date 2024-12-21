/*
La classe `ListaSemplice` implementa una struttura dati di tipo lista semplice, una sequenza di nodi collegati che 
memorizzano dati in modo dinamico. A differenza degli array, le liste semplici non hanno una dimensione fissa e permettono 
di aggiungere o rimuovere elementi senza dover ridimensionare l'intera struttura. Tuttavia, l'accesso agli elementi 
avviene in modo sequenziale, poiché non è possibile accedere direttamente a una posizione specifica.

STRUTTURA DATI:
Una lista semplice è composta da una sequenza di nodi. Ogni nodo ha due attributi:
- `data`: il valore contenuto nel nodo.
- `next`: il riferimento al nodo successivo nella lista. Se il nodo è l'ultimo, il valore di `next` sarà `null`.

La lista è gestita tramite un nodo testa (head), che è il primo nodo della lista. La testa fornisce l'accesso alla struttura 
e viene aggiornata durante l'inserimento o la rimozione di elementi.

PROBLEMA DELLA FRAGILITÀ DELLA TESTA:
La fragilità della testa deriva dal fatto che, man mano che si scorre la lista, il riferimento alla testa può essere 
modificato, portando a una perdita del puntamento all'inizio della lista. Ecco un esempio:
- Lista: `2 → 5`
- Testa: `2`

Se scorriamo la lista per cercare un valore, il puntamento alla testa potrebbe essere perso:
- Lista: `null`
- Testa: `null`

Per evitare questo problema, è consigliabile utilizzare una copia della testa durante l'iterazione. In questo modo, 
la testa originale rimane intatta e si evita che il puntamento alla lista venga compromesso.

OPERAZIONI PRINCIPALI:
- inserisciInTesta(valore): Aggiunge un nuovo nodo all'inizio della lista.
- inserisciInCoda(valore): Aggiunge un nuovo nodo alla fine della lista.
- rimuovi(valore): Rimuove il primo nodo che contiene il valore specificato.
- cerca(valore): Restituisce il primo nodo che contiene il valore cercato.
- stampaLista(): Stampa tutti gli elementi della lista, partendo dalla testa.

PRESTAZIONI:
Le operazioni di inserimento e rimozione, quando avvengono all'inizio della lista, 
sono efficienti con una complessità di O(1). Tuttavia, l'accesso agli elementi e la ricerca di un valore 
richiedono di scorrere l'intera lista, il che implica una complessità di O(n).
*/

//struttura dati che rappresenta il singolo nodo
class ListNode {
    constructor(data) {
        this.data = data //valore del nodo
        this.next = null //valore successivo puntato, nel caso sia l'ultimo nodo questo avrà come valore null                
    }
}

class LinkedList {
    //si inizializza la lista con il nodo passato, se ne vi è uno, altrimenti la testa la si mette a null
    constructor(head = null) {
        this.head = head //primo elemento della lista, attenzione alla sua fragilità
    }

    //ritorna il numero di elementi della lista
    size() {
        let count = 0; 
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }

    //ritorna l'ultimo nodo della lista
    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode
    }

    //aggiunge un nodo alla fine, questa funzione prende anche il nome di append
    add(newNode){
        this.getLast().next = newNode
    }

    //rimuove tutti gli elementi che hanno come valore v
    remove(v){
        let iter = this.head;
        if(iter && iter.next){
            while (iter && iter.next) {
                if(iter.next.data == v){
                    iter.next = iter.next.next;
                }
                iter = iter.next
            }
        }else if(iter && !iter.next){
            if(iter.data == v ){
                this.head = null
            }
        }
    }

    //permette di tornare il valore di una certa posizione, se esiste, altrimenti null
    at(pos){
        let iter = this.head;
        let i = 0; 
        while(iter){
            if(i == pos)
                return iter.data;
            iter = iter.next;
            i++;
        }
        return null;
    }
    
    //permette di stampare la lista
    print(){
        let iter = this.head;
        let listToPrint = "vuota";
        if(iter){
            listToPrint = "";
            while(iter){
                if(iter.next){
                    listToPrint += iter.data + "->";
                }else{
                    listToPrint += iter.data;
                }
                iter = iter.next;
            }
        }
        console.log("visualizza tutta la lista:", listToPrint);
    }
}

//test della struttura dati 
let node1 = new ListNode(7);
let node2 = new ListNode(5);
let list = new LinkedList(node1)

list.add(node2);
console.log("elemento in posizione 0:", list.at(0));
console.log("grandezza della lista:", list.size());
list.print();