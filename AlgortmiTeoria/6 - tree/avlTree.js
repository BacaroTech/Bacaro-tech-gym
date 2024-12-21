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
- Radice (this.root): Il nodo principale dell'albero.
- Foglia (Leaf): Nodo senza figli.
- Sottoalbero (Subtree): Ogni albero formato dai nodi discendenti di un nodo specifico.
- Altezza del Nodo: La lunghezza del percorso più lungo verso una foglia a partire da quel nodo.

OPERAZIONI PRINCIPALI:
- inserisci(key): Inserisce una chiave nell'albero AVL. Dopo ogni inserimento, l'altezza dei nodi
viene aggiornata e, se necessario, vengono eseguite rotazioni per mantenere il bilanciamento.
- cerca(key): Determina se una chiave è presente nell'albero AVL. Naviga efficientemente attraverso 
l'albero sfruttando la proprietà di ricerca.
- elimina(key): Rimuove un nodo specifico, bilanciando l'albero AVL con rotazioni quando necessario.
- visitaInOrdine(): Attraversa l'albero in ordine crescente(pre ordine).
- getAltezza(): Restituisce la profondità massima dell'albero AVL.

MECCANISMI DI BILANCIAMENTO:
- Rotazione Sinistra (Left Rotation): Utilizzata quando un sottoalbero destro diventa troppo alto.
- Rotazione Destra (Right Rotation): Utilizzata quando un sottoalbero sinistro diventa troppo alto.
- Rotazione Sinistra-Destra (Left-Right Rotation): Utilizzata quando un sottoalbero sinistro del nodo destro è sbilanciato.
- Rotazione Destra-Sinistra (Right-Left Rotation): Utilizzata quando un sottoalbero destro del nodo sinistro è sbilanciato.

EFFICIENZA:
- Le operazioni di ricerca, inserimento e rimozione hanno complessità temporale 𝑂(log 𝑛), grazie alla struttura bilanciata.
- La complessità spaziale è 𝑂(𝑛), dove 𝑛 è il numero di nodi nell'albero.

VANTAGGI DELL'ALBERO AVL:
- Mantiene sempre una struttura bilanciata, garantendo prestazioni prevedibili.
- Migliora l'efficienza rispetto ai BST tradizionali in applicazioni con frequenti inserimenti e cancellazioni.

OPERAZIONI AUSILIARIE:
- getMin(): Restituisce la chiave minima nell'albero.
- getMax(): Restituisce la chiave massima nell'albero.
- isBalance(): Verifica se l'albero soddisfa la proprietà di bilanciamento.

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
    constructor() {
        this.root = null;
    }

    // getAltezza(node) --> Funzione per ottenere l'altezza di un nodo
    getAltezza(node) {
        return node ? node.height : 0;
    }

    // isBalance(node) --> Funzione per ottenere il fattore di bilanciamento
    isBalance(node) {
        return node ? this.getAltezza(node.left) - this.getAltezza(node.right) : 0;
    }

    // rotateRight(z) --> Rotazione a destra
    rotateRight(z) {
        let y = z.left;
        let T3 = y.right;

        y.right = z;
        z.left = T3;

        z.height = 1 + Math.max(this.getAltezza(z.left), this.getAltezza(z.right));
        y.height = 1 + Math.max(this.getAltezza(y.left), this.getAltezza(y.right));

        return y;
    }

    // rotateLeft(z) --> Rotazione a sinistra
    rotateLeft(z) {
        let y = z.right;
        let T2 = y.left;

        y.left = z;
        z.right = T2;

        z.height = 1 + Math.max(this.getAltezza(z.left), this.getAltezza(z.right));
        y.height = 1 + Math.max(this.getAltezza(y.left), this.getAltezza(y.right));

        return y;
    }

    // inserisci(node, key) --> funzione asuliaria che inserisce un nodo
    inserisci(node, key) {
        // Passo base: inserisci il nodo come in un albero binario di ricerca
        if (!node) {
            return new Node(key);
        }

        if (key < node.key) {
            node.left = this.inserisci(node.left, key);
        } else if (key > node.key) {
            node.right = this.inserisci(node.right, key);
        } else {
            return node; // Chiavi duplicate non sono permesse
        }

        // Aggiorna l'altezza del nodo corrente
        node.height = 1 + Math.max(this.getAltezza(node.left), this.getAltezza(node.right));

        // Ottieni il fattore di bilanciamento
        const balance = this.isBalance(node);

        // Rotazioni per bilanciare l'albero
        // Caso sinistra-sinistra
        if (balance > 1 && key < node.left.key) {
            return this.rotateRight(node);
        }

        // Caso destra-destra
        if (balance < -1 && key > node.right.key) {
            return this.rotateLeft(node);
        }

        // Caso sinistra-destra
        if (balance > 1 && key > node.left.key) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        // Caso destra-sinistra
        if (balance < -1 && key < node.right.key) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // inserisciKey(key) --> Wrapper per inserire un valore nell'albero
    inserisciKey(key) {
        this.root = this.inserisci(this.root, key);
    }

    // visitaInOrdine(node = this.root) --> Visita in ordine
    visitaInOrdine(node = this.root) {
        if (node) {
            let visitedNode = [];
            this.auxVisitaInOrdine(node, visitedNode);
            console.log(visitedNode);
        }
    }

    //auxVisitaInOrdine --> dato un nodo, si va a popolare l'array visitedNode con ogni nodo vistato
    auxVisitaInOrdine(node, visitedNode){
        if (node) {
            this.auxVisitaInOrdine(node.left, visitedNode);
            visitedNode.push(node.key);
            this.auxVisitaInOrdine(node.right, visitedNode);
        }
    }

    // cerca(node, key) --> funzione ausiliara che cerca un nodo con una chiave specifica
    cerca(node, key) {
        if (!node || node.key === key) {
            return node;
        }

        if (key < node.key) {
            return this.cerca(node.left, key);
        }

        return this.cerca(node.right, key);
    }

    // cercaKey(key) --> Wrapper per la ricerca
    cercaKey(key) {
        return this.cerca(this.root, key);
    }

    // getMinNode(node) --> funzione ausliaria che trova il nodo con il valore minimo
    getMinNode(node) {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    // getMin() --> Restituisce il valore minimo nell'albero
    getMin() {
        if (!this.root) return null;
        return this.getMinNode(this.root).key;
    }

    // getMaxNode(node) --> Funzione ausiliaria che trova il nodo con il valore massimo
    getMaxNode(node) {
        while (node.right) {
            node = node.right;
        }
        return node;
    }

    // getMax() --> Restituisce il valore massimo nell'albero
    getMax() {
        if (!this.root) return null;
        return this.getMaxNode(this.root).key;
    }

    // elimina(node, key) --> funzione ausiliaria per eliminazione di un nodo
    elimina(node, key) {
        if (!node) return node;

        if (key < node.key) {
            node.left = this.elimina(node.left, key);
        } else if (key > node.key) {
            node.right = this.elimina(node.right, key);
        } else {
            // Nodo con uno o nessun figlio
            if (!node.left || !node.right) {
                node = node.left || node.right;
            } else {
                // Nodo con due figli
                const temp = this.getMinNode(node.right);
                node.key = temp.key;
                node.right = this.elimina(node.right, temp.key);
            }
        }

        if (!node) return node;

        // Aggiorna altezza del nodo corrente
        node.height = 1 + Math.max(this.getAltezza(node.left), this.getAltezza(node.right));

        // Bilanciamento
        const balance = this.isBalance(node);

        // Rotazioni per bilanciare l'albero
        if (balance > 1 && this.isBalance(node.left) >= 0) {
            return this.rotateRight(node);
        }

        if (balance > 1 && this.isBalance(node.left) < 0) {
            node.left = this.rotateLeft(node.left);
            return this.rotateRight(node);
        }

        if (balance < -1 && this.isBalance(node.right) <= 0) {
            return this.rotateLeft(node);
        }

        if (balance < -1 && this.isBalance(node.right) > 0) {
            node.right = this.rotateRight(node.right);
            return this.rotateLeft(node);
        }

        return node;
    }

    // eliminaKey(key) --> Wrapper per eliminare un nodo
    eliminaKey(key) {
        this.root = this.elimina(this.root, key);
    }
}

// test della struttura dati
const tree = new AVLTree();
tree.inserisciKey(10);
tree.inserisciKey(20);
tree.inserisciKey(5);
tree.inserisciKey(6);
tree.inserisciKey(8);

console.log("Visita in ordine:");
tree.visitaInOrdine();

console.log("Min:", tree.getMin());
console.log("Max:", tree.getMax());

tree.eliminaKey(10);
console.log("Visita in ordine dopo eliminazione:");
tree.visitaInOrdine();
