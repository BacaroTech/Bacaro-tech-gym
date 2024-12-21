/*
La classe AlberoBinario implementa una struttura dati ad albero binario, nata per rappresentare relazioni gerarchiche, 
che memorizza i dati in una gerarchia di nodi. 
Ogni nodo dell'albero contiene un valore e fino a due figli, chiamati figlio sinistro e figlio destro.

TERMINOLOGIA:
- Nodo: Ogni elemento di un albero binario che contiene un valore e due puntatori (sinistro e destro).
- Radice (Root): Il nodo principale dell'albero. È il punto di partenza di tutte le operazioni.
- Foglia (Leaf): Un nodo senza figli, ovvero con entrambi i puntatori (sinistro e destro) nulli.
- Sottoalbero (Subtree): Ogni albero formato dai nodi discendenti di un nodo specifico (sinistro o destro).
- Figlio (Child): Nodo collegato direttamente a un altro nodo superiore (padre).
- Padre (Parent): Nodo che ha almeno un collegamento verso un figlio.
- Fratelli (Siblings): Nodi che condividono lo stesso padre.
- Albero Vuoto: Un albero senza nodi (radice nulla).
- Profondità di un Nodo (Node Depth): La distanza (in termini di livelli) di un nodo dalla radice.
- Altezza di un Nodo (Node Height): La distanza dal nodo alla foglia più distante.
- Livello (Level): L'insieme di tutti i nodi alla stessa profondità.
- Altezza dell'Albero (Tree Height): La lunghezza del percorso più lungo dalla radice a una foglia.
- Dimensione dell'Albero (Size): Numero totale di nodi nell'albero

OPERAZIONI DI VISITA:
- Pre-Ordine (Pre-Order Traversal): Nodo corrente → Sottoalbero sinistro → Sottoalbero destro.
- In-Ordine / Simmetrico (In-Order Traversal): Sottoalbero sinistro → Nodo corrente → Sottoalbero destro.
- Post-Ordine (Post-Order Traversal): Sottoalbero sinistro → Sottoalbero destro → Nodo corrente.
- Livello (Level-Order Traversal): Visita livello per livello (spesso implementata con una cod

OPERAZIONI:
- inserisci(valore): Inserisce un nuovo nodo nell'albero
- cerca(valore): Verifica se un determinato valore è presente nell'albero.
- elimina(valore): Rimuove un nodo con il valore specificato
- visitaInOrdine(): Restituisce i valori dell'albero seguendo una visita in ordine (in-order traversal), 
ovvero attraversando prima il sottoalbero sinistro, poi il nodo corrente, e infine il sottoalbero destro.
- visitaPreOrdine(): Esegue una visita pre-ordine (pre-order traversal), visitando 
prima il nodo corrente, poi il sottoalbero sinistro e infine il sottoalbero destro.
- visitaPostOrdine(): Esegue una visita post-ordine (post-order traversal), visitando prima 
i sottoalberi (sinistro e destro) e poi il nodo corrente.
- altezza(): Calcola la profondità massima dell'albero.
- contaNodi(): Restituisce il numero totale di nodi presenti nell'albero.

PRESTAZIONI:
Grazie alla sua struttura gerarchica, l'albero binario è ideale per rappresentare e manipolare 
dati con relazioni ordinate. Le operazioni principali, come l'inserimento e la ricerca, 
sono generalmente eseguite in tempo 𝑂(log 𝑛) per alberi bilanciati, ma possono degradare a O(n) in caso di alberi sbilanciati.

NB SULLA FRAGILITA':
Per lavorare sugli alberi senza rischiare di perdere informazioni, è consigliabile passare una copia 
del nodo corrente a una funzione ausiliaria. Questo approccio consente di preservare un riferimento di 
backup al nodo originale, evitando di perdere il puntamento durante le operazioni.

Grazie agli effetti collaterali (side effects), eventuali modifiche apportate alla copia si rifletteranno 
automaticamente sull'originale. Questo metodo è simile a come si manipolano le liste: la copia mantiene 
il collegamento alla struttura originale, garantendo la coerenza dei dati.
*/

// Classe Nodo
class Nodo {
    constructor(valore) {
        this.valore = valore; // Valore del nodo
        this.sinistro = null; // Puntatore al figlio sinistro
        this.destro = null;   // Puntatore al figlio destro
    }
}

// Classe Albero
class AlberoBinario {
    constructor() {
        this.radice = null; // Puntatore al nodo radice
    }

    // inserisci(valore) --> Inserimento di un valore nell'albero
    inserisci(valore) {
        const nuovoNodo = new Nodo(valore);
        if (!this.radice) {
            this.radice = nuovoNodo;
        } else {
            this.inserisciNodo(this.radice, nuovoNodo);
        }
    }

    // inserisciNodo(nodoCorrente, nuovoNodo) --> funzione ausiliaria per l'inserimento del nodo
    inserisciNodo(nodoCorrente, nuovoNodo) {
        if (nuovoNodo.valore < nodoCorrente.valore) {
            if (!nodoCorrente.sinistro) {
                nodoCorrente.sinistro = nuovoNodo;
            } else {
                this.inserisciNodo(nodoCorrente.sinistro, nuovoNodo);
            }
        } else {
            if (!nodoCorrente.destro) {
                nodoCorrente.destro = nuovoNodo;
            } else {
                this.inserisciNodo(nodoCorrente.destro, nuovoNodo);
            }
        }
    }

    // cerca(valore) --> Ricerca di un valore nell'albero
    cerca(valore) {
        return this.cercaNodo(this.radice, valore);
    }
 
    // cercaNodo(nodoCorrente, valore) --> Funzione ausiliaria per cercare un nodo all'interno di un albero
    cercaNodo(nodoCorrente, valore) {
        if (!nodoCorrente) return false;
        if (nodoCorrente.valore === valore) return true;
        return valore < nodoCorrente.valore
            ? this.cercaNodo(nodoCorrente.sinistro, valore)
            : this.cercaNodo(nodoCorrente.destro, valore);
    }

    // visitaInOrdine() --> Visita simmetrica(sx - r - dx)
    visitaInOrdine() {
        const valori = [];
        this.visitaInOrdineNodo(this.radice, valori);
        return valori;
    }

    // visitaInOrdineNodo(nodoCorrente, valori) --> funzione ausiliaria per visita simmetrica
    visitaInOrdineNodo(nodoCorrente, valori) {
        if (nodoCorrente) {
            this.visitaInOrdineNodo(nodoCorrente.sinistro, valori);
            valori.push(nodoCorrente.valore);
            this.visitaInOrdineNodo(nodoCorrente.destro, valori);
        }
    }

    // visitaPreOrdine() --> Visita in pre ordine(radice - sx - dx)
    visitaPreOrdine() {
        const valori = [];
        this.visitaPreOrdineNodo(this.radice, valori);
        return valori;
    }
    
    // visitaPreOrdineNodo(nodoCorrente, valori) --> funzione ausiliaria per visita in pre ordine
    visitaPreOrdineNodo(nodoCorrente, valori) {
        if (nodoCorrente) {
            valori.push(nodoCorrente.valore); // Visita il nodo corrente
            this.visitaPreOrdineNodo(nodoCorrente.sinistro, valori); 
            this.visitaPreOrdineNodo(nodoCorrente.destro, valori);   
        }
    }

    // visitaPostOrdine() --> visita in post ordine(sx - dx - radice)
    visitaPostOrdine() {
        const valori = [];
        this.visitaPostOrdineNodo(this.radice, valori);
        return valori;
    }
    
    // visitaPostOrdineNodo(nodoCorrente, valori) --> funzione ausiliaria per visita in post ordine
    visitaPostOrdineNodo(nodoCorrente, valori) {
        if (nodoCorrente) {
            this.visitaPostOrdineNodo(nodoCorrente.sinistro, valori); 
            this.visitaPostOrdineNodo(nodoCorrente.destro, valori);   
            valori.push(nodoCorrente.valore); 
        }
    }

    // elimina(valore) --> Eliminazione di un nodo
    elimina(valore) {
        this.radice = this.eliminaNodo(this.radice, valore);
    }

    // eliminaNodo(nodoCorrente, valore) --> Funzione ausiliaria per cancellare uno specifico nodo dall'albero
    eliminaNodo(nodoCorrente, valore) {
        if (!nodoCorrente) return null;

        if (valore < nodoCorrente.valore) {
            nodoCorrente.sinistro = this.eliminaNodo(nodoCorrente.sinistro, valore);
        } else if (valore > nodoCorrente.valore) {
            nodoCorrente.destro = this.eliminaNodo(nodoCorrente.destro, valore);
        } else {
            // Nodo con uno o nessun figlio
            if (!nodoCorrente.sinistro) return nodoCorrente.destro;
            if (!nodoCorrente.destro) return nodoCorrente.sinistro;

            // Nodo con due figli
            const minValore = this.trovaMinimo(nodoCorrente.destro);
            nodoCorrente.valore = minValore;
            nodoCorrente.destro = this.eliminaNodo(nodoCorrente.destro, minValore);
        }

        return nodoCorrente;
    }

    trovaMinimo(nodo) {
        while (nodo.sinistro) nodo = nodo.sinistro;
        return nodo.valore;
    }

    // altezza() --> calcola l'altezza dell'albero
    altezza() {
        return this.calcolaAltezza(this.radice);
    }
    
    // calcolaAltezza(nodoCorrente) --> funzione ausiliaria per calcolare l'altezza dell'albero
    calcolaAltezza(nodoCorrente) {
        if (!nodoCorrente) return 0;
        const altezzaSinistro = this.calcolaAltezza(nodoCorrente.sinistro);
        const altezzaDestro = this.calcolaAltezza(nodoCorrente.destro);
        return Math.max(altezzaSinistro, altezzaDestro) + 1; // Aggiungi 1 per il nodo corrente
    }
    
    // contaNodi() --> restituisce il numero di nodi di cui è composto l'albero
    contaNodi() {
        return this.contaNodiRicorsivo(this.radice);
    }
    
    // contaNodiRicorsivo(nodoCorrente) --> funzione ausiliaria per contare il numero di nodi di cui è composto l'albero
    contaNodiRicorsivo(nodoCorrente) {
        if (!nodoCorrente) return 0;
        const contaSinistro = this.contaNodiRicorsivo(nodoCorrente.sinistro);
        const contaDestro = this.contaNodiRicorsivo(nodoCorrente.destro);
        return contaSinistro + contaDestro + 1; // Conta il nodo corrente
    }
}

// test della struttura dati
const albero = new AlberoBinario();

console.log("Inserimento di valori nell'albero...");
albero.inserisci(50);
albero.inserisci(30);
albero.inserisci(70);
albero.inserisci(20);
albero.inserisci(40);
albero.inserisci(60);
albero.inserisci(80);

console.log("Visita in ordine (In-Order Traversal):", albero.visitaInOrdine());

console.log("Ricerca di valori:");
console.log("Cerca 40:", albero.cerca(40)); // true
console.log("Cerca 100:", albero.cerca(100)); // false

console.log("Eliminazione di un nodo (30)");
albero.elimina(30);
console.log("Visita in ordine dopo eliminazione:", albero.visitaInOrdine());

console.log("Visita Pre-Ordine:", albero.visitaPreOrdine()); // [10, 5, 3, 7, 15]
console.log("Visita Post-Ordine:", albero.visitaPostOrdine()); // [3, 7, 5, 15, 10]
console.log("Altezza dell'albero:", albero.altezza()); // 3
console.log("Numero totale di nodi:", albero.contaNodi()); // 5


