/*
I grafi non orientati sono una collezione di nodi (vertici) connessi tramite archi, 
dove ciascun arco rappresenta una relazione bidirezionale tra due nodi.

PROPRIETÀ PRINCIPALI:
- Un grafo non orientato è rappresentato come una coppia (V, E):
  - V: L'insieme di vertici (nodi).
  - E: L'insieme di archi (coppie non ordinate di vertici).
- Gli archi non hanno direzione: se esiste un arco tra `A` e `B`, si può navigare sia da `A` a `B` che da `B` a `A`.

TERMINOLOGIA:
- Vertice (Vertex): Un singolo nodo del grafo.
- Arco (Edge): Una connessione tra due vertici.
- Grado di un Vertice (Degree): Il numero di archi connessi a un vertice.
- Percorso (Path): Una sequenza di vertici connessi da archi.
- Ciclo (Cycle): Un percorso chiuso in cui l'inizio e la fine coincidono.
- Componente Connessa (Connected Component): Un sottoinsieme di vertici in cui ogni coppia è connessa direttamente o tramite altri vertici.

OPERAZIONI PRINCIPALI:
- aggiungiVertice(vertex): Aggiunge un nuovo vertice al grafo, se il vertice esiste già, l'operazione è ignorata.
- aggiungiArco(vertex1, vertex2): Crea un arco tra due vertici. Se i vertici non esistono, vengono aggiunti 
automaticamente al grafo.
- rimuoviArco(vertex1, vertex2): Rimuove l'arco tra due vertici, se esiste.
- rimuoviVertice(vertex): Rimuove un vertice e tutti gli archi ad esso connessi.
- verificaConnesso(vertex1, vertex2): Verifica se esiste un percorso tra due vertici.
- visitaAmpiezza(vertex): Effettua un'attraversamento in ampiezza (BFS) a partire da un vertice.
- visitaProfondità(vertex): Effettua un'attraversamento in profondità (DFS) a partire da un vertice.

RAPPRESENTAZIONE:
- Lista di Adiacenza: Ogni vertice è associato a una lista di vertici adiacenti.
  Esempio: { A: [B, C], B: [A, D], C: [A], D: [B] }

EFFICIENZA:
- Inserimento di un vertice: 𝑂(1)
- Inserimento di un arco: 𝑂(1)
- Rimozione di un arco: 𝑂(d), dove d è il grado del vertice più connesso.
- Attraversamento del grafo (DFS o BFS): 𝑂(𝑉 + 𝐸), dove 𝑉 è il numero di vertici e 𝐸 il numero di archi.

APPLICAZIONI:
I grafi non orientati sono utilizzati in vari contesti reali e algoritmici, come:
- Rappresentazione di reti sociali.
- Modellazione di mappe stradali.
- Gestione di reti di computer.
- Pianificazione di percorsi (senza direzione).
- Analisi di connessioni nei sistemi complessi.

VANTAGGI:
- Struttura flessibile per rappresentare una vasta gamma di problemi.
- Le operazioni possono essere ottimizzate grazie alla rappresentazione scelta (lista o matrice di adiacenza).

LIMITAZIONI:
- I grafi molto densi possono richiedere grandi quantità di memoria se rappresentati con una lista di adiacenza.
- Operazioni come la rimozione di un arco o la verifica di connessione possono essere meno efficienti rispetto a strutture specializzate.

NB:
I grafi non orientati forniscono una base per implementare molteplici algoritmi fondamentali, come 
il calcolo delle componenti connesse, il rilevamento di cicli, e l'individuazione del cammino minimo.
*/


class Graph {
    adjacencyList;

    constructor() {
        this.adjacencyList = {};
    }

    // aggiungiVertice(vertex) --> Aggiunge un vertice al grafo
    aggiungiVertice(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // aggiungiArco(vertex1, vertex2) --> Aggiunge un arco non orientato tra due vertici
    aggiungiArco(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1]) {
            this.aggiungiVertice(vertex1);
        }
        if (!this.adjacencyList[vertex2]) {
            this.aggiungiVertice(vertex2);
        }
        this.adjacencyList[vertex1].push(vertex2);
        this.adjacencyList[vertex2].push(vertex1);
    }

    // rimuoviArco(vertex1, vertex2) --> Rimuove un arco tra due vertici
    rimuoviArco(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            (v) => v !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            (v) => v !== vertex1
        );
    }

    // rimuoviVertice(vertex) --> Rimuove un vertice e tutti i relativi archi
    rimuoviVertice(vertex) {
        while (this.adjacencyList[vertex]?.length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.rimuoviArco(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }

    // display() --> Visualizza il grafo
    display() {
        for (const vertex in this.adjacencyList) {
            console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ") ? this.adjacencyList[vertex].join(", ") : "NULL" }`);
        }
    }

    // verificaConnesso --> Verifica se il grafo è connesso
    verificaConnesso() {
        const visitati = new Set();

        // Funzione per la visita in profondità
        const dfs = (vertex) => {
            visitati.add(vertex);
            for (const vicino of this.adjacencyList[vertex]) {
                if (!visitati.has(vicino)) {
                    dfs(vicino);
                }
            }
        };

        // Prende un nodo iniziale qualsiasi
        const startVertex = Object.keys(this.adjacencyList)[0];
        if (!startVertex) return true; // Grafo vuoto è considerato connesso

        dfs(startVertex);

        // Controlla se tutti i nodi sono stati visitati
        return Object.keys(this.adjacencyList).length === visitati.size;
    }

    // visitaAmpiezza(start) --> Visita in ampiezza (Breadth-First Search - BFS)
    visitaAmpiezza(start) {
        const visitati = new Set();
        const risultato = [];
        const coda = [start];

        visitati.add(start);

        while (coda.length > 0) {
            const nodo = coda.shift();
            risultato.push(nodo);

            for (const vicino of this.adjacencyList[nodo]) {
                if (!visitati.has(vicino)) {
                    visitati.add(vicino);
                    coda.push(vicino);
                }
            }
        }

        return risultato;
    }

    // visitaProfondita(start) --> Visita in profondità (Depth-First Search - DFS)
    visitaProfondita(start) {
        const visitati = new Set();
        const risultato = [];

        const dfs = (vertex) => {
            visitati.add(vertex);
            risultato.push(vertex);

            for (const vicino of this.adjacencyList[vertex]) {
                if (!visitati.has(vicino)) {
                    dfs(vicino);
                }
            }
        };

        dfs(start);
        return risultato;
    }
}

// test della struttura dati
const graph = new Graph();

graph.aggiungiVertice("A");
graph.aggiungiVertice("B");
graph.aggiungiVertice("C");

graph.aggiungiArco("A", "B");
graph.aggiungiArco("A", "C");
graph.aggiungiArco("B", "C");

graph.display();

console.log("\nGrafo connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));

graph.rimuoviArco("A", "C");
console.log("\nDopo aver rimosso l'arco A-C:");
graph.display();

graph.rimuoviVertice("B");
console.log("\nDopo aver rimosso il vertice B:");
graph.display();

console.log("\nGrafo connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));
