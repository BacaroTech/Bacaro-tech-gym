/*
La classe AlberoBinarioRicerca implementa una struttura dati di albero binario di ricerca (Binary Search Tree, BST),
progettata per organizzare i dati in modo tale da consentire operazioni di ricerca, inserimento e rimozione efficienti.
Ogni nodo dell'albero contiene un valore unico e rispetta una proprietà fondamentale che lo distingue dagli alberi binari generici.

PROPRIETÀ DI RICERCA:
- Ogni nodo ha un valore unico.
- Per ogni nodo `N`:
  - Tutti i nodi nel sottoalbero sinistro hanno valori strettamente minori di `N.value`.
  - Tutti i nodi nel sottoalbero destro hanno valori strettamente maggiori di `N.value`.
- Questa proprietà garantisce che un albero binario di ricerca sia sempre ordinato e consente una ricerca binaria efficiente.

TERMINOLOGIA:
- Nodo: Ogni elemento dell'albero che contiene un valore e due puntatori (sinistro e destro).
- Radice (Root): Il nodo principale dell'albero.
- Foglia (Leaf): Nodo senza figli (entrambi i puntatori sono nulli).
- Sottoalbero (Subtree): Ogni albero formato dai nodi discendenti di un nodo specifico.
- Padre (Parent): Nodo con almeno un figlio.
- Figlio (Child): Nodo collegato direttamente a un padre.
- Altezza dell'Albero (Tree Height): La lunghezza del percorso più lungo dalla radice a una foglia.

OPERAZIONI:
- inserisci(valore): Inserisce un nuovo nodo nell'albero rispettando la proprietà di ricerca.
  - Se il valore è minore del nodo corrente, si prosegue nel sottoalbero sinistro.
  - Se il valore è maggiore, si prosegue nel sottoalbero destro.
- cerca(valore): Determina se un valore è presente nell'albero.
  - Si basa sulla proprietà di ricerca per navigare nell'albero in modo efficiente.
  - Complessità nel caso migliore: 𝑂(log 𝑛) per alberi bilanciati.
- elimina(valore): Rimuove un nodo specifico dall'albero, gestendo i seguenti casi:
  - Nodo senza figli: Il nodo viene semplicemente rimosso.
  - Nodo con un solo figlio: Il nodo viene sostituito dal figlio.
  - Nodo con due figli: Si trova il successore in ordine (il minimo del sottoalbero destro) e lo si sostituisce al nodo da eliminare.
- visitaInOrdine(): Attraversa l'albero in ordine crescente.
- visitaPreOrdine(): Attraversa l'albero partendo dal nodo corrente.
- visitaPostOrdine(): Attraversa l'albero visitando prima i sottoalberi.
- altezza(): Calcola la profondità massima dell'albero.
- contaNodi(): Restituisce il numero totale di nodi nell'albero.

EFFICIENZA:
- Grazie alla sua struttura ordinata, le operazioni di ricerca, inserimento e rimozione richiedono tempo 𝑂(log 𝑛) per un albero bilanciato.
- Tuttavia, l'efficienza degrada a 𝑂(𝑛) in caso di alberi sbilanciati (ad esempio, quando si inseriscono valori in ordine crescente o decrescente).

VANTAGGI DELLA PROPRIETÀ DI RICERCA:
- Consente di trovare rapidamente un valore seguendo un percorso dall'alto verso il basso, evitando di visitare tutti i nodi.
- Facilita operazioni come il recupero del minimo/massimo e il calcolo dei successori o predecessori di un nodo.

OPERAZIONI AUSILIARIE:
- getMin(): Restituisce il valore minimo nell'albero (il nodo più a sinistra).
- getMax(): Restituisce il valore massimo nell'albero (il nodo più a destra).
- isBalanced(): Verifica se l'albero è bilanciato (le altezze dei sottoalberi di ogni nodo differiscono al massimo di 1).

NB SULLA FRAGILITÀ:
Come per gli alberi binari, è consigliabile utilizzare funzioni ricorsive ausiliarie per gestire i sottoalberi,
preservando i riferimenti ai nodi principali per evitare perdite di dati durante le operazioni.
Le modifiche ai sottoalberi vengono automaticamente propagate grazie al collegamento diretto tra nodi.

APPLICAZIONI:
Gli alberi binari di ricerca trovano applicazione in numerosi contesti, tra cui:
- Strutture di database.
- Implementazione di insiemi e mappe ordinate.
- Algoritmi di ordinamento.
- Risoluzione di problemi di intervalli e gerarchie.
*/


class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    // insert(value) --> inserisce un valore nell'albero rispettando la proprieta di ricerca
    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return this;
        }

        let current = this.root;
        while (true) {
            // valori duplicati non consentiti
            if (value === current.value) return undefined; 
            if (value < current.value) {
                if (!current.left) {
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if (!current.right) {
                    current.right = newNode;
                    return this;
                }
                current = current.right;
            }
        }
    }

    // find(value) --> cerca un valore nell'albero sfruttando la proprietà di ricerca
    find(value) {
        if (!this.root) return false;
        let current = this.root;
        while (current) {
            if (value === current.value) return true;
            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }

    // remove(value) --> rimuove un nodo dall'albero
    remove(value) {
        const removeNode = (node, value) => {
            if (!node) return null;
            if (value < node.value) {
                node.left = removeNode(node.left, value);
                return node;
            } else if (value > node.value) {
                node.right = removeNode(node.right, value);
                return node;
            } else {
                // Caso 1: Nessun figlio
                if (!node.left && !node.right) return null;
                // Caso 2: Un figlio
                if (!node.left) return node.right;
                if (!node.right) return node.left;
                // Caso 3: Due figli
                let temp = this.getMin(node.right);
                node.value = temp;
                node.right = removeNode(node.right, temp);
                return node;
            }
        };
        this.root = removeNode(this.root, value);
    }

    // getMin(node = this.root) --> rrova il valore minimo in un sottoalbero sfruttando la proprietà di ricerca
    getMin(node) {
        while (node.left) {
            node = node.left;
        }
        return node.value;
    }

    // getMax(node) --> trova il valore massimo in un sottoalbero sfruttando la proprietà di ricerca
    getMax(node) {
        while (node.right) {
            node = node.right;
        }
        return node.value;
    }

    // isBalanced() --> verifica che l'albero sia bilanciato, false altrimenti
    isBalanced() {
        const checkBalance = (node) => {
          if (!node) return { balanced: true, height: 0 };
    
          const left = checkBalance(node.left);
          const right = checkBalance(node.right);
    
          const balanced = left.balanced && right.balanced && Math.abs(left.height - right.height) <= 1;
          const height = Math.max(left.height, right.height) + 1;
    
          return { balanced, height };
        };
    
        return checkBalance(this.root).balanced;
    }

    // inOrderTraversal(node) --> prepara le variabili per eseguire la stampa richiamando la funzione ausiliaria
    inOrderTraversal() {
        let result = [];
        let node = this.root;
        return this.auxInOrderTraversal(node, result)
    }

    // auxInOrderTraversal(node) --> stampa l'albero in ordine (in-order traversal)[sx - r - dx]
    auxInOrderTraversal(node, result) {
        if (node) {
            this.auxInOrderTraversal(node.left, result);
            result.push(node.value);
            this.auxInOrderTraversal(node.right, result);
        }
        return result;
    }
}

// test della struttura dati
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(13);
bst.insert(18);

console.log("In-order Traversal:", bst.inOrderTraversal());
console.log("Find 7:", bst.find(7)); 
console.log("Find 20:", bst.find(20)); 

bst.remove(10);
console.log("In-order Traversal after removing 10:", bst.inOrderTraversal());
