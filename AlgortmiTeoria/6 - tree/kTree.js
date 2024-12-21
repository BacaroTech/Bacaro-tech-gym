/*
La classe AlberoKAri implementa una struttura dati ad albero k-ario, progettata per rappresentare 
relazioni gerarchiche più complesse rispetto a un albero binario. 
Ogni nodo di un albero k-ario può avere fino a k figli, permettendo una maggiore flessibilità 
nella rappresentazione dei dati.

TERMINOLOGIA:
- Nodo: Ogni elemento di un albero k-ario che contiene un valore e un array di puntatori ai figli.
- Radice (Root): Il nodo principale dell'albero. È il punto di partenza di tutte le operazioni.
- Foglia (Leaf): Un nodo senza figli, ovvero il cui array di figli è vuoto.
- Sottoalbero (Subtree): Ogni albero formato dai nodi discendenti di un nodo specifico.
- Figlio (Child): Nodo collegato direttamente a un altro nodo superiore (padre).
- Padre (Parent): Nodo che ha almeno un collegamento verso uno o più figli.
- Fratelli (Siblings): Nodi che condividono lo stesso padre.
- Albero Vuoto: Un albero senza nodi (radice nulla).
- Profondità di un Nodo (Node Depth): La distanza (in termini di livelli) di un nodo dalla radice.
- Altezza di un Nodo (Node Height): La distanza dal nodo alla foglia più distante.
- Livello (Level): L'insieme di tutti i nodi alla stessa profondità.
- Altezza dell'Albero (Tree Height): La lunghezza del percorso più lungo dalla radice a una foglia.
- Dimensione dell'Albero (Size): Numero totale di nodi nell'albero.

OPERAZIONI DI VISITA:
- Visita Pre-Ordine (Pre-Order Traversal): Nodo corrente → Sottoalberi in ordine.
- Visita Post-Ordine (Post-Order Traversal): Sottoalberi → Nodo corrente.
- Visita Livello (Level-Order Traversal): Visita i nodi livello per livello (spesso implementata con una coda).

OPERAZIONI PRINCIPALI:
- inserisci(valore, padre): Inserisce un nuovo nodo con il valore specificato sotto un nodo padre specifico.
- cerca(valore): Verifica se un determinato valore è presente nell'albero.
- elimina(valore): Rimuove un nodo con il valore specificato e collega i suoi figli al padre (se esiste).
- visitaPreOrdine(): Restituisce i valori dell'albero seguendo una visita pre-ordine (pre-order traversal).
- visitaPostOrdine(): Restituisce i valori dell'albero seguendo una visita post-ordine (post-order traversal).
- altezza(): Calcola la profondità massima dell'albero.
- contaNodi(): Restituisce il numero totale di nodi presenti nell'albero.

PRESTAZIONI:
Grazie alla struttura che consente di avere fino a k figli per nodo, l'albero k-ario è ideale per rappresentare dati gerarchici complessi, come sistemi di file o gerarchie organizzative. 
Le operazioni principali, come l'inserimento e la ricerca, dipendono dal valore di k e dalla profondità dell'albero:
- Tempo medio:O(log_k n) per alberi bilanciati.
- Tempo peggiore: O(n) in caso di alberi completamente sbilanciati.
*/

// Classe NodoKArio
class NodoKArio {
    constructor(valore) {
        this.valore = valore;      // Valore del nodo
        this.figli = [];           // Array dei figli -> altri nodiKari
    }

    // Aggiunge un figlio al nodo, nell'array dei figli/fratelli del nodo appena inserito
    aggiungiFiglio(nuovoFiglio) {
        this.figli.push(nuovoFiglio);
    }
}

// Classe AlberoKArio
class AlberoKArio {
    constructor() {
        this.radice = null; // Puntatore al nodo radice
    }

    // inserisci(valore, valorePadre = null) --> Inserisce un nodo sotto un nodo esistente specifico
    inserisci(valore, valorePadre = null) {
        const nuovoNodo = new NodoKArio(valore);
        if (!this.radice) {
            // Se l'albero è vuoto, imposta il nodo come radice
            this.radice = nuovoNodo;
        } else {
            // Cerca il nodo padre e aggiungi il nuovo nodo come figlio
            const padre = this.cercaNodo(this.radice, valorePadre);
            if (!padre) {
                throw new Error(`Nodo padre con valore ${valorePadre} non trovato.`);
            }
            padre.aggiungiFiglio(nuovoNodo);
        }
    }

    // cerca(valore) --> Ricerca di un nodo nell'albero
    cerca(valore) {
        return !!this.cercaNodo(this.radice, valore);
    }

    // cercaNodo(nodoCorrente, valore) --> Funzione ausiliaria per trovare un valore all'interno dell'albero
    cercaNodo(nodoCorrente, valore) {
        if (!nodoCorrente) return null;
        if (nodoCorrente.valore === valore) return nodoCorrente;

        // Cerca ricorsivamente nei figli
        for (const figlio of nodoCorrente.figli) {
            const risultato = this.cercaNodo(figlio, valore);
            if (risultato) return risultato;
        }
        return null;
    }

    // visitaPreOrdine() --> Visita pre-ordine(radice - figli)
    visitaPreOrdine() {
        const risultati = [];
        const visita = (nodo) => {
            if (!nodo) return;
            risultati.push(nodo.valore); // Visita il nodo corrente
            for (let figlio of nodo.figli) {
                visita(figlio); // Visita ricorsivamente i figli
            }
        };
        visita(this.radice);
        return risultati;
    }

    // visitaPostOrdine() --> Visita post-ordine(figli - radice)
    visitaPostOrdine() {
        const risultati = [];
        const visita = (nodo) => {
            if (!nodo) return;
            for (let figlio of nodo.figli) {
                visita(figlio); // Visita ricorsivamente i figli
            }
            risultati.push(nodo.valore); // Visita il nodo corrente
        };
        visita(this.radice);
        return risultati;
    }

     // elimina(valore) --> Elimina un nodo dall'albero
     elimina(valore) {
        if (!this.radice) return;
        if (this.radice.valore === valore) {
            // Se il nodo da eliminare è la radice
            this.radice = null;
        } else {
            this.eliminaNodo(this.radice, valore);
        }
    }

    // eliminaNodo(nodoCorrente, valore) --> Funzione ausiliaria per eliminare un nodo dall'albero
    eliminaNodo(nodoCorrente, valore) {
        if (!nodoCorrente) return;

        nodoCorrente.figli = nodoCorrente.figli.filter(figlio => {
            if (figlio.valore === valore) return false; // Rimuovi il nodo figlio
            this.eliminaNodo(figlio, valore); // Continua la ricerca nei sotto-alberi
            return true;
        });
    }

    // altezza() --> Calcola l'altezza dell'albero
    altezza() {
        const calcolaAltezza = (nodo) => {
            if (!nodo) return 0;
            let altezzaMassima = 0;
            for (let figlio of nodo.figli) {
                altezzaMassima = Math.max(altezzaMassima, calcolaAltezza(figlio));
            }
            return altezzaMassima + 1; // Aggiungi 1 per includere il nodo corrente
        };
        return calcolaAltezza(this.radice);
    }

    // contaNodi() --> Conta il numero totale di nodi nell'albero
    contaNodi() {
        const conta = (nodo) => {
            if (!nodo) return 0;
            let totale = 1; // Conta il nodo corrente
            for (let figlio of nodo.figli) {
                totale += conta(figlio); // Conta ricorsivamente i figli
            }
            return totale;
        };
        return conta(this.radice);
    }

    // visitaInProfondita --> Effettua una visita in profondità sull'albero
    visitaInProfondita() {
        const risultato = [];

        // Funzione di supporto per la DFS
        const dfs = (nodo) => {
            if (!nodo) return;
            risultato.push(nodo.valore); // Aggiunge il valore del nodo visitato
            for (const figlio of nodo.figli) {
                dfs(figlio); // Visita i figli ricorsivamente
            }
        };

        dfs(this.radice); // Avvia la DFS dalla radice
        return risultato;
    }
}

// test della struttura dati
const albero = new AlberoKArio();

console.log("Inserimento di nodi nell'albero k-ario...");
albero.inserisci(1);            // Radice
albero.inserisci(2, 1);         // Figlio di 1
albero.inserisci(3, 1);         // Figlio di 1
albero.inserisci(4, 1);         // Figlio di 1
albero.inserisci(5, 2);         // Figlio di 2
albero.inserisci(6, 2);         // Figlio di 2
albero.inserisci(7, 3);         // Figlio di 3
albero.inserisci(8, 3);         // Figlio di 3

console.log("Ricerca di valori:");
console.log("Cerca 6:", albero.cerca(6)); // true
console.log("Cerca 10:", albero.cerca(10)); // false

console.log("Eliminazione di un nodo (3)");
albero.elimina(3);
console.log("Visita in profondità dopo eliminazione:", albero.visitaInProfondita());

console.log("Visita Pre-Ordine:", albero.visitaPreOrdine());
console.log("Visita Post-Ordine:", albero.visitaPostOrdine());
console.log("Altezza dell'albero:", albero.altezza());
console.log("Numero totale di nodi:", albero.contaNodi());

