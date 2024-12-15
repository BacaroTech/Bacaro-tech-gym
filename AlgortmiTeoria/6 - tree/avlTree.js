/*
La classe AVLTree implementa una struttura dati di albero AVL (Adelson-Velsky e Landis),
una variante bilanciata degli alberi binari di ricerca (Binary Search Tree, BST).
Gli alberi AVL mantengono un bilanciamento delle altezze dei sottoalberi per garantire operazioni efficienti,
risolvendo il problema degli alberi binari sbilanciati.

PROPRIETÀ DI BILANCIAMENTO:
- Ogni nodo nell'albero AVL soddisfa la proprietà di bilanciamento:
  |altezza(sottoalbero sinistro) - altezza(sottoalbero destro)| <= 1
- Questa proprietà viene mantenuta dinamicamente attraverso rotazioni durante le operazioni di inserimento e rimozione.

PROPRIETÀ DI RICERCA:
- Come in un BST, per ogni nodo `N`:
  - Tutti i nodi nel sottoalbero sinistro hanno valori strettamente minori di `N.key`.
  - Tutti i nodi nel sottoalbero destro hanno valori strettamente maggiori di `N.key`.

TERMINOLOGIA:
- Nodo: Ogni elemento dell'albero contenente una chiave, una altezza e puntatori ai figli.
- Radice (Root): Il nodo principale dell'albero.
- Foglia (Leaf): Nodo senza figli.
- Sottoalbero (Subtree): Ogni albero formato dai nodi discendenti di un nodo specifico.
- Altezza del Nodo: La lunghezza del percorso più lungo verso una foglia a partire da quel nodo.

OPERAZIONI PRINCIPALI:
- inserisci(key):
  - Inserisce una chiave nell'albero AVL.
  - Dopo ogni inserimento, l'altezza dei nodi viene aggiornata e, se necessario, vengono eseguite rotazioni per mantenere il bilanciamento.
- cerca(key):
  - Determina se una chiave è presente nell'albero AVL.
  - Naviga efficientemente attraverso l'albero sfruttando la proprietà di ricerca.
- elimina(key):
  - Rimuove un nodo specifico, bilanciando l'albero AVL con rotazioni quando necessario.
- visitaInOrdine():
  - Attraversa l'albero in ordine crescente.
- altezza():
  - Restituisce la profondità massima dell'albero AVL.

MECCANISMI DI BILANCIAMENTO:
- Rotazione Sinistra (Left Rotation):
  - Utilizzata quando un sottoalbero destro diventa troppo alto.
- Rotazione Destra (Right Rotation):
  - Utilizzata quando un sottoalbero sinistro diventa troppo alto.
- Rotazione Sinistra-Destra (Left-Right Rotation):
  - Utilizzata quando un sottoalbero sinistro del nodo destro è sbilanciato.
- Rotazione Destra-Sinistra (Right-Left Rotation):
  - Utilizzata quando un sottoalbero destro del nodo sinistro è sbilanciato.

EFFICIENZA:
- Le operazioni di ricerca, inserimento e rimozione hanno complessità temporale 𝑂(log 𝑛), grazie alla struttura bilanciata.
- La complessità spaziale è 𝑂(𝑛), dove 𝑛 è il numero di nodi nell'albero.

VANTAGGI DELL'ALBERO AVL:
- Mantiene sempre una struttura bilanciata, garantendo prestazioni prevedibili.
- Migliora l'efficienza rispetto ai BST tradizionali in applicazioni con frequenti inserimenti e cancellazioni.

OPERAZIONI AUSILIARIE:
- getMin(): Restituisce la chiave minima nell'albero.
- getMax(): Restituisce la chiave massima nell'albero.
- isBalanced(): Verifica se l'albero soddisfa la proprietà di bilanciamento.

APPLICAZIONI:
Gli alberi AVL sono utilizzati in contesti dove è richiesto un accesso rapido ai dati e un aggiornamento frequente, ad esempio:
- Database con indici ordinati.
- Motori di ricerca.
- Implementazioni di insiemi ordinati e mappe.
- Algoritmi per gestione di intervalli e dati gerarchici.

NB:
Gli alberi AVL richiedono maggiore complessità di gestione rispetto ai BST semplici, ma il costo è giustificato nei casi in cui il 
bilanciamento migliora le prestazioni complessive.
*/

class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    // Funzione per ottenere l'altezza di un nodo
    getHeight(node) {
        return node ? node.height : 0;
    }

    // Funzione per ottenere il fattore di bilanciamento
    getBalance(node) {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    // Rotazione a destra
    rotateRight(z) {
        let y = z.left;
        let T3 = y.right;

        y.right = z;
        z.left = T3;

        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

        return y;
    }

    // Rotazione a sinistra
    rotateLeft(z) {
        let y = z.right;
        let T2 = y.left;

        y.left = z;
        z.right = T2;

        z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right));
        y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right));

        return y;
    }

    // Inserimento di un nodo
    insert(root, key) {
        // Passo base: inserisci il nodo come in un albero binario di ricerca
        if (!root) {
            return new Node(key);
        } else if (key < root.key) {
            root.left = this.insert(root.left, key);
        } else {
            root.right = this.insert(root.right, key);
        }

        // Aggiorna l'altezza del nodo corrente
        root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

        // Ottieni il fattore di bilanciamento
        const balance = this.getBalance(root);

        // Rotazioni per bilanciare l'albero
        // Caso sinistra-sinistra
        if (balance > 1 && key < root.left.key) {
            return this.rotateRight(root);
        }

        // Caso destra-destra
        if (balance < -1 && key > root.right.key) {
            return this.rotateLeft(root);
        }

        // Caso sinistra-destra
        if (balance > 1 && key > root.left.key) {
            root.left = this.rotateLeft(root.left);
            return this.rotateRight(root);
        }

        // Caso destra-sinistra
        if (balance < -1 && key < root.right.key) {
            root.right = this.rotateRight(root.right);
            return this.rotateLeft(root);
        }

        return root;
    }

    // Funzione per stampare l'albero (in-order traversal)
    inOrderTraversal(root) {
        if (root) {
            this.inOrderTraversal(root.left);
            console.log(root.key);
            this.inOrderTraversal(root.right);
        }
    }

    // Funzione per trovare un nodo
    find(root, key) {
        if (!root) {
            return null;
        } else if (key === root.key) {
            return root;
        } else if (key < root.key) {
            return this.find(root.left, key);
        } else {
            return this.find(root.right, key);
        }
    }
}

// Esempio di utilizzo
const avlTree = new AVLTree();
let root = null;

// Inserimento di nodi
const elements = [10, 20, 30, 40, 50, 25];
elements.forEach((elem) => {
    root = avlTree.insert(root, elem);
});

// Stampa dell'albero in ordine
console.log("In-order traversal dell'albero AVL:");
avlTree.inOrderTraversal(root);

// Ricerca di un nodo
const keyToFind = 25;
const foundNode = avlTree.find(root, keyToFind);
console.log(foundNode ? `Nodo trovato: ${foundNode.key}` : "Nodo non trovato");
