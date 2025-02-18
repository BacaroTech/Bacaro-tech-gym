/*
L'algoritmo di Ford-Fulkerson viene utilizzato per calcolare il flusso massimo in un grafo connesso e pesato, dove i pesi rappresentano le capacità.

FUNZIONAMENTO:
- Si parte con un flusso iniziale pari a 0.
- Si cerca un percorso dalla sorgente alla destinazione con capacità residua disponibile.
- Si aumenta il flusso lungo questo percorso della quantità massima consentita dalla capacità residua.
- Si ripete il processo finché non esistono più percorsi aumentanti.

COMPLESSITÀ:
- Dipende dalla tecnica di ricerca: con BFS (Edmonds-Karp) O(V * E²).

APPLICAZIONI:
- Reti di comunicazione.
- Trasporto di risorse.
- Flusso di dati su reti.
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

    // Algoritmo di Ford-Fulkerson (utilizza BFS per trovare percorsi aumentanti)
    fordFulkerson(sorgente, destinazione) {
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

// Test dell'algoritmo di Ford-Fulkerson
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

const flussoMassimo = grafo.fordFulkerson('S', 'T');
console.log("Flusso massimo:", flussoMassimo);
