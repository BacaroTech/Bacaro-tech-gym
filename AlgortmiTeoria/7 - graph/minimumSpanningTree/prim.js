/*
L'algoritmo di Prim è utilizzato per trovare un albero ricoprente minimo (Minimum Spanning Tree - MST) in un grafo connesso e pesato. 
L'MST è un sottoinsieme di archi che collega tutti i vertici senza cicli e con la somma minima dei pesi.

FUNZIONAMENTO:
- Si parte da un nodo sorgente.
- Si seleziona l'arco più leggero che connette un nodo già visitato con uno non visitato.
- Si ripete il processo fino a visitare tutti i nodi.

COMPLESSITÀ:
- Tempo: O(E log V) con una coda di priorità.
- Spazio: O(V + E) per memorizzare il grafo.

APPLICAZIONI:
- Reti di comunicazione.
- Progettazione di circuiti.
- Reti di distribuzione.
*/

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // Aggiunge un vertice al grafo
    aggiungiVertice(vertice) {
        if (!this.adjacencyList[vertice]) {
            this.adjacencyList[vertice] = [];
        }
    }

    // Aggiunge un arco non orientato con peso
    aggiungiArco(u, v, peso) {
        if (!this.adjacencyList[u]) this.aggiungiVertice(u);
        if (!this.adjacencyList[v]) this.aggiungiVertice(v);
        this.adjacencyList[u].push({ nodo: v, peso });
        this.adjacencyList[v].push({ nodo: u, peso });
    }

    // Metodo per visualizzare il grafo
    display() {
        for (const vertice in this.adjacencyList) {
            const archi = this.adjacencyList[vertice]
                .map(arco => `${arco.nodo}(${arco.peso})`)
                .join(', ');
            console.log(`${vertice} -> ${archi}`);
        }
    }

    // Implementazione dell'algoritmo di Prim
    prim(sorgente) {
        const distanze = {};
        const visitati = new Set();
        const predecessori = {};

        // Inizializza le distanze
        for (const vertice in this.adjacencyList) {
            distanze[vertice] = Infinity;
            predecessori[vertice] = null;
        }
        distanze[sorgente] = 0;

        while (visitati.size < Object.keys(this.adjacencyList).length) {
            // Seleziona il nodo con la distanza minima non ancora visitato
            let nodoCorrente = null;
            for (const vertice in distanze) {
                if (!visitati.has(vertice) && (nodoCorrente === null || distanze[vertice] < distanze[nodoCorrente])) {
                    nodoCorrente = vertice;
                }
            }

            visitati.add(nodoCorrente);

            // Aggiorna le distanze dei vicini
            for (const arco of this.adjacencyList[nodoCorrente]) {
                const { nodo, peso } = arco;
                if (!visitati.has(nodo) && peso < distanze[nodo]) {
                    distanze[nodo] = peso;
                    predecessori[nodo] = nodoCorrente;
                }
            }
        }

        // Costruisce il MST
        const mst = [];
        for (const vertice in predecessori) {
            if (predecessori[vertice] !== null) {
                mst.push({ da: predecessori[vertice], a: vertice, peso: distanze[vertice] });
            }
        }

        return mst;
    }
}

// Test dell'algoritmo di Prim
const grafo = new Graph();
grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 5);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 3);
grafo.aggiungiArco('C', 'E', 6);
grafo.aggiungiArco('D', 'E', 7);

grafo.display();

const mst = grafo.prim('A');
console.log("Albero dicopertura Minimo (MST):", mst);
