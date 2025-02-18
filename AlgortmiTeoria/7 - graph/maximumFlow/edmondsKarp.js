/*
L'algoritmo di Edmonds-Karp è una specifica implementazione dell'algoritmo di Ford-Fulkerson che utilizza una ricerca in ampiezza (BFS) per trovare i percorsi aumentanti.

FUNZIONAMENTO:
- Utilizza BFS per trovare il percorso aumentante più breve in termini di numero di archi.
- Aggiorna il flusso residuo lungo i percorsi trovati.

COMPLESSITÀ:
- O(V * E²) nella peggiore delle ipotesi.

APPLICAZIONI:
- Reti di comunicazione.
- Reti di trasporto.
- Sistemi di gestione delle risorse.
*/

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // Aggiunge un vertice al grafo
    aggiungiVertice(vertice) {
        if (!this.adjacencyList[vertice]) {
            this.adjacencyList[vertice] = {};
        }
    }

    // Aggiunge un arco orientato con capacità
    aggiungiArco(u, v, capacita) {
        if (!this.adjacencyList[u]) this.aggiungiVertice(u);
        if (!this.adjacencyList[v]) this.aggiungiVertice(v);
        this.adjacencyList[u][v] = capacita;
        if (!this.adjacencyList[v][u]) this.adjacencyList[v][u] = 0; // arco residuo
    }

    // Metodo per visualizzare il grafo
    display() {
        for (const vertice in this.adjacencyList) {
            const archi = Object.entries(this.adjacencyList[vertice])
                .map(([nodo, capacita]) => `${nodo}(${capacita})`)
                .join(', ');
            console.log(`${vertice} -> ${archi}`);
        }
    }

    // Algoritmo di Edmonds-Karp (Ford-Fulkerson con BFS)
    edmondsKarp(sorgente, destinazione) {
        let flussoMassimo = 0;

        const bfs = () => {
            const coda = [sorgente];
            const predecessore = {};
            const visitato = new Set([sorgente]);

            while (coda.length) {
                const nodo = coda.shift();

                for (const vicino in this.adjacencyList[nodo]) {
                    const capacitaResidua = this.adjacencyList[nodo][vicino];
                    if (capacitaResidua > 0 && !visitato.has(vicino)) {
                        predecessore[vicino] = nodo;
                        if (vicino === destinazione) {
                            return predecessore;
                        }
                        visitato.add(vicino);
                        coda.push(vicino);
                    }
                }
            }
            return null;
        };

        let percorso;
        while ((percorso = bfs())) {
            let flusso = Infinity;
            let nodo = destinazione;
            while (nodo !== sorgente) {
                const predecessore = percorso[nodo];
                flusso = Math.min(flusso, this.adjacencyList[predecessore][nodo]);
                nodo = predecessore;
            }

            nodo = destinazione;
            while (nodo !== sorgente) {
                const predecessore = percorso[nodo];
                this.adjacencyList[predecessore][nodo] -= flusso;
                this.adjacencyList[nodo][predecessore] += flusso;
                nodo = predecessore;
            }

            flussoMassimo += flusso;
        }

        return flussoMassimo;
    }
}

// Test dell'algoritmo di Edmonds-Karp
const grafo = new Graph();
grafo.aggiungiArco('S', 'A', 10);
grafo.aggiungiArco('S', 'B', 5);
grafo.aggiungiArco('A', 'B', 15);
grafo.aggiungiArco('A', 'C', 10);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 10);
grafo.aggiungiArco('C', 'T', 10);
grafo.aggiungiArco('D', 'T', 10);

grafo.display();

const flussoMassimo = grafo.edmondsKarp('S', 'T');
console.log("Flusso massimo con Edmonds-Karp:", flussoMassimo);
