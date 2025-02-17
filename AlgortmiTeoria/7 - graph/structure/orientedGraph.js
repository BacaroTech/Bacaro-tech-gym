/*
I grafi orientati sono una collezione di nodi (vertici) connessi tramite archi direzionati,
dove ciascun arco rappresenta una relazione unidirezionale tra due nodi.

PROPRIETÀ PRINCIPALI:
- Un grafo orientato è rappresentato come una coppia (V, E):
  - V: L'insieme di vertici (nodi).
  - E: L'insieme di archi (coppie ordinate di vertici).
- Gli archi hanno direzione: se esiste un arco da `A` a `B`, si può navigare solo da `A` a `B` e non viceversa.

TERMINOLOGIA:
- Vertice (Vertex): Un singolo nodo del grafo.
- Arco (Edge): Una connessione direzionata tra due vertici.
- Grado di Entrata (In-Degree): Numero di archi che arrivano a un vertice.
- Grado di Uscita (Out-Degree): Numero di archi che partono da un vertice.
- Percorso (Path): Una sequenza di vertici connessi da archi direzionati.
- Ciclo (Cycle): Un percorso chiuso in cui l'inizio e la fine coincidono.
- Componente Fortemente Connessa: Un sottoinsieme di vertici in cui ogni coppia è connessa reciprocamente.

OPERAZIONI PRINCIPALI:
- aggiungiVertice(vertex): Aggiunge un nuovo vertice al grafo, se il vertice esiste già, l'operazione è ignorata.
- aggiungiArco(vertex1, vertex2): Crea un arco orientato da vertex1 a vertex2. Se i vertici non esistono, vengono aggiunti automaticamente.
- rimuoviArco(vertex1, vertex2): Rimuove l'arco direzionato da vertex1 a vertex2, se esiste.
- rimuoviVertice(vertex): Rimuove un vertice e tutti gli archi ad esso connessi.
- verificaConnesso(): Verifica se il grafo è fortemente connesso.
- visitaAmpiezza(vertex): Effettua un'attraversamento in ampiezza (BFS) a partire da un vertice.
- visitaProfondità(vertex): Effettua un'attraversamento in profondità (DFS) a partire da un vertice.

RAPPRESENTAZIONE:
- Lista di Adiacenza: Ogni vertice è associato a una lista di vertici raggiungibili.
  Esempio: { A: [B, C], B: [D], C: [], D: [B] }

EFFICIENZA:
- Inserimento di un vertice: 𝑂(1)
- Inserimento di un arco: 𝑂(1)
- Rimozione di un arco: 𝑂(d), dove d è il grado di uscita del vertice.
- Attraversamento del grafo (DFS o BFS): 𝑂(𝑉 + 𝐸), dove 𝑉 è il numero di vertici e 𝐸 il numero di archi.

APPLICAZIONI:
I grafi orientati sono utilizzati in vari contesti reali e algoritmici, come:
- Rappresentazione di reti sociali con relazioni asimmetriche.
- Modellazione di flussi di dati.
- Gestione di reti di computer.
- Pianificazione di percorsi con direzione.
- Analisi di dipendenze nei sistemi complessi.

VANTAGGI:
- Rappresentano relazioni asimmetriche in modo naturale.
- Utili per modellare processi sequenziali e dipendenze.

LIMITAZIONI:
- La comprensione visiva può essere più complessa rispetto ai grafi non orientati.
- La connettività è più difficile da analizzare, richiedendo algoritmi specifici.

NB:
I grafi orientati sono fondamentali per algoritmi come il calcolo delle componenti fortemente connesse, il rilevamento di cicli orientati e il calcolo dei percorsi minimi.
*/


class DirectedGraph {
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

    // aggiungiArco(vertex1, vertex2) --> Aggiunge un arco orientato da vertex1 a vertex2
    aggiungiArco(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1]) {
            this.aggiungiVertice(vertex1);
        }
        if (!this.adjacencyList[vertex2]) {
            this.aggiungiVertice(vertex2);
        }
        this.adjacencyList[vertex1].push(vertex2);
    }

    // rimuoviArco(vertex1, vertex2) --> Rimuove un arco orientato
    rimuoviArco(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            (v) => v !== vertex2
        );
    }

    // rimuoviVertice(vertex) --> Rimuove un vertice e tutti gli archi associati
    rimuoviVertice(vertex) {
        // Rimuove il vertice dalla lista di adiacenza
        delete this.adjacencyList[vertex];

        // Rimuove tutti gli archi che puntano a questo vertice
        for (const key in this.adjacencyList) {
            this.adjacencyList[key] = this.adjacencyList[key].filter(
                (v) => v !== vertex
            );
        }
    }

    // display() --> Visualizza il grafo
    display() {
        for (const vertex in this.adjacencyList) {
            console.log(`${vertex} -> ${this.adjacencyList[vertex].join(", ") || "NULL"}`);
        }
    }

    // verificaConnesso() --> Verifica se il grafo è fortemente connesso
    verificaConnesso() {
        const vertices = Object.keys(this.adjacencyList);
        if (vertices.length === 0) return true;

        const visitati = new Set();

        // Funzione DFS
        const dfs = (start) => {
            const stack = [start];
            visitati.add(start);

            while (stack.length) {
                const vertex = stack.pop();
                for (const vicino of this.adjacencyList[vertex]) {
                    if (!visitati.has(vicino)) {
                        visitati.add(vicino);
                        stack.push(vicino);
                    }
                }
            }
        };

        dfs(vertices[0]);

        // Controlla se tutti i nodi sono stati visitati
        if (visitati.size !== vertices.length) return false;

        return true;
    }

    // visitaAmpiezza(start) --> Visita in ampiezza (BFS)
    visitaAmpiezza(start) {
        const visitati = new Set();
        const risultato = [];
        const coda = [start];

        visitati.add(start);

        while (coda.length) {
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

    // visitaProfondita(start) --> Visita in profondità (DFS)
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
const graph = new DirectedGraph();

graph.aggiungiVertice("A");
graph.aggiungiVertice("B");
graph.aggiungiVertice("C");

graph.aggiungiArco("A", "B");
graph.aggiungiArco("A", "C");
graph.aggiungiArco("B", "C");

graph.display();

console.log("\nGrafo fortemente connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));

graph.rimuoviArco("A", "C");
console.log("\nDopo aver rimosso l'arco A->C:");
graph.display();

graph.rimuoviVertice("B");
console.log("\nDopo aver rimosso il vertice B:");
graph.display();

console.log("\nGrafo fortemente connesso:", graph.verificaConnesso());
console.log("Visita in ampiezza da A:", graph.visitaAmpiezza("A"));
console.log("Visita in profondità da A:", graph.visitaProfondita("A"));
