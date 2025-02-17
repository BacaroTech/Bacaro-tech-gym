/*
Algoritmo di Dijkstra per Grafi Orientati

L'algoritmo di Dijkstra calcola il percorso minimo da un nodo sorgente a tutti gli altri nodi in un grafo orientato e pesato con pesi non negativi.

PROPRIETÀ PRINCIPALI:
- Utilizza una struttura dati (spesso una coda di priorità) per selezionare il nodo con la distanza minima.
- Funziona correttamente solo con pesi non negativi.
- Complessità: O(V + E log V) con implementazione tramite min-heap.

OPERAZIONI PRINCIPALI:
- aggiungiVertice(vertex): Aggiunge un vertice al grafo.
- aggiungiArco(vertex1, vertex2, peso): Aggiunge un arco orientato con peso.
- dijkstra(start): Calcola i percorsi minimi dal nodo start.

RAPPRESENTAZIONE:
- Lista di Adiacenza con pesi.

ESEMPIO DI UTILIZZO:
- Calcolo del percorso più breve in una rete stradale.
- Routing nei protocolli di rete.
- Pianificazione di percorsi in sistemi di trasporto.

SPIEGAZIONE DEL FUNZIONAMENTO:

Partendo dal nodo 'A', l'algoritmo assegna inizialmente a tutti i nodi una distanza infinita tranne che a 'A', che ha distanza 0.
Ad ogni passo, si sceglie il nodo con la distanza minima non ancora visitato e si aggiornano le distanze dei suoi vicini se si trova un percorso più corto.

ESEMPIO DI USCITA:
A -> B(4), C(2)
B -> C(5), D(10)
C -> D(3), E(4)
D -> E(7)
E -> 
Distanze minime da A: { A: 0, B: 4, C: 2, D: 5, E: 6 }
Predecessori: { A: null, B: 'A', C: 'A', D: 'C', E: 'C' }

In questo caso:
- Il percorso minimo da A a E è A -> C -> E con costo 6.
*/

class Graph {
    constructor() {
        this.adjacencyList = {};
    }

    // Aggiunge un vertice
    aggiungiVertice(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // Aggiunge un arco orientato con peso
    aggiungiArco(vertex1, vertex2, peso) {
        if (!this.adjacencyList[vertex1]) {
            this.aggiungiVertice(vertex1);
        }
        if (!this.adjacencyList[vertex2]) {
            this.aggiungiVertice(vertex2);
        }
        this.adjacencyList[vertex1].push({ node: vertex2, peso });
    }

    // Algoritmo di Dijkstra
    dijkstra(start) {
        const distanze = {};
        const visitati = new Set();
        const predecessori = {};

        // Inizializzazione delle distanze
        for (let vertice in this.adjacencyList) {
            distanze[vertice] = Infinity;
            predecessori[vertice] = null;
        }
        distanze[start] = 0;

        while (visitati.size < Object.keys(this.adjacencyList).length) {
            let nodoCorrente = this.minDistanza(distanze, visitati);
            if (nodoCorrente === null) break;

            visitati.add(nodoCorrente);

            for (let vicino of this.adjacencyList[nodoCorrente]) {
                let nuovaDistanza = distanze[nodoCorrente] + vicino.peso;
                if (nuovaDistanza < distanze[vicino.node]) {
                    distanze[vicino.node] = nuovaDistanza;
                    predecessori[vicino.node] = nodoCorrente;
                }
            }
        }

        return { distanze, predecessori };
    }

    // Trova il nodo con la distanza minima non ancora visitato
    minDistanza(distanze, visitati) {
        let minDistanza = Infinity;
        let nodoMinimo = null;

        for (let nodo in distanze) {
            if (!visitati.has(nodo) && distanze[nodo] < minDistanza) {
                minDistanza = distanze[nodo];
                nodoMinimo = nodo;
            }
        }
        return nodoMinimo;
    }

    // Visualizza il grafo
    display() {
        for (let vertex in this.adjacencyList) {
            const edges = this.adjacencyList[vertex].map(e => `${e.node}(${e.peso})`).join(', ');
            console.log(`${vertex} -> ${edges}`);
        }
    }
}

// Test dell'algoritmo di Dijkstra
const graph = new Graph();

graph.aggiungiArco('A', 'B', 4);
graph.aggiungiArco('A', 'C', 2);
graph.aggiungiArco('B', 'C', 5);
graph.aggiungiArco('B', 'D', 10);
graph.aggiungiArco('C', 'D', 3);
graph.aggiungiArco('D', 'E', 7);
graph.aggiungiArco('C', 'E', 4);

graph.display();

const risultato = graph.dijkstra('A');
console.log('Distanze minime da A:', risultato.distanze);
console.log('Predecessori:', risultato.predecessori);