/*
/*
Le liste semplici sono strutture dati utilizzate per collezionare elementi di qualsiasi tipo.  
A differenza degli array, hanno una dimensione variabile, il che le rende molto flessibili da usare.  
Tuttavia, soffrono di una fragilità intrinseca, ovvero la dipendenza dalla testa della lista.  

Inoltre, a differenza degli array, non è possibile accedere direttamente a un elemento in una posizione specifica.  
Non possiamo usare un operatore di indicizzazione, ma dobbiamo scorrere l'intera lista per trovare il valore nella posizione desiderata.  

Una lista semplice è composta da due elementi principali:  
- **Nodi**, che contengono due attributi:  
  - `data`: il valore del nodo.  
  - `next`: il riferimento al nodo successivo. Se il nodo è l'ultimo della lista, il valore di `next` sarà `null`.  
- **Testa**: il nodo iniziale della lista, che rappresenta il punto di partenza.  

Problema della fragilità della testa
Consideriamo il seguente esempio:  
- Nodi: 2 → 5  
- Testa: 2  

Se scorriamo la lista per cercare un valore, possiamo arrivare a questa situazione:  
- Nodi: `null`  
- Testa: `null`  

Questo accade perché la variabile che contiene la testa della lista viene modificata man mano che avanziamo verso il nodo successivo, fino a raggiungere `null`, che rappresenta la fine della lista (ossia una lista vuota).  

Soluzione al problema
Per evitare questo problema, è sufficiente creare una copia della testa della lista e scorrere la struttura dati utilizzando questa copia temporanea.  
In questo modo, la testa originale rimane intatta e possiamo continuare a utilizzarla senza compromettere l'integrità della lista.  
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
        console.log("lista:", listToPrint);
    }
}

//test della struttura dati 
let node1 = new ListNode(7);
let node2 = new ListNode(5);
let list = new LinkedList(node1)

list.add(node2);
console.log(list.at(0));
console.log(list.size());
list.print();