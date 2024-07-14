/*
Le liste semplici sono strutture dati che servono per collezionare elementi di qualsisi natura
A differenza degli array hanno una dimensione variabile è questo le rende molto lastici da usare
Purtroppo però soffrono di una fragilità intrinseca, ovvero la testa
Inoltre, a differenza degli array non è possibile ottenere un lemento in una certa posizione specifica
come ben sappiamo è possibile fare tramite l'operatore di assegnamento, ma è necessario scorrere
tutta la lista per trovare il valore a una certa posizione

Una lista ha 2 componetni
- nodi che la compongo, ed essi hanno 2 valori
    - data => valore del nodo
    - next => valore successivo puntato, nel caso sia l'ultimo nodo questo avrà come valore null    
- testa, essa ha un nodo che rappresenta quello di partenza 

Problema di fragilità
Nodi 2->5
Testa 2

Se noi scorriamo la lista ci troviamo che 
Nodi null
Testa null

Questo avviene perchè la variabile che contiene il valore di partenza è stata modificata
fino al raggiungimento del valore null, nodo finale che rappresenza la lista vuota

Per risolvere questo problema basta copiarsi la testa della lista e scorrere la struttura dati
tramite questo clone usa e getta
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