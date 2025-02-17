/*
L'algoritmo di Bellman-Ford è utilizzato per trovare il percorso più breve da un nodo sorgente a tutti gli altri nodi in un grafo, anche in presenza di archi con pesi negativi.

FUNZIONAMENTO:
- Inizializza la distanza di tutti i nodi a infinito, tranne il nodo sorgente che è impostato a 0.
- Per ogni vertice, si rilassano tutti gli archi ripetutamente. Un arco (u, v) viene rilassato se si trova un percorso più corto per raggiungere v passando per u.
- Dopo aver eseguito questo processo per |V| - 1 iterazioni (dove |V| è il numero di vertici), si esegue un ulteriore controllo per rilevare cicli negativi. Se si riesce ancora a rilassare un arco, allora esiste un ciclo negativo raggiungibile dalla sorgente.

COMPLESSITÀ:
- Tempo: O(V * E), dove V è il numero di vertici ed E il numero di archi.
- Spazio: O(V) per memorizzare le distanze.

APPLICAZIONI:
- Reti di telecomunicazione.
- Calcolo di percorsi con costi variabili.
- Rilevamento di cicli negativi nei grafi.
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

    // Aggiunge un arco orientato con peso
    aggiungiArco(u, v, peso) {
        if (!this.adjacencyList[u]) this.aggiungiVertice(u);
        if (!this.adjacencyList[v]) this.aggiungiVertice(v);
        this.adjacencyList[u].push({ nodo: v, peso });
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

    // Implementazione dell'algoritmo di Bellman-Ford
    bellmanFord(sorgente) {
        const distanze = {};
        for (const vertice in this.adjacencyList) {
            distanze[vertice] = Infinity;
        }
        distanze[sorgente] = 0;

        // Rilassamento degli archi per |V| - 1 volte
        const vertici = Object.keys(this.adjacencyList);
        for (let i = 0; i < vertici.length - 1; i++) {
            for (const vertice in this.adjacencyList) {
                for (const arco of this.adjacencyList[vertice]) {
                    const { nodo, peso } = arco;
                    if (distanze[vertice] + peso < distanze[nodo]) {
                        distanze[nodo] = distanze[vertice] + peso;
                    }
                }
            }
        }

        // Controllo per cicli negativi
        for (const vertice in this.adjacencyList) {
            for (const arco of this.adjacencyList[vertice]) {
                const { nodo, peso } = arco;
                if (distanze[vertice] + peso < distanze[nodo]) {
                    throw new Error("Rilevato ciclo negativo!");
                }
            }
        }

        return distanze;
    }
}

// Test dell'algoritmo
const grafo = new Graph();
grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 3);
grafo.aggiungiArco('B', 'D', 2);
grafo.aggiungiArco('B', 'E', 3);
grafo.aggiungiArco('C', 'B', 1);
grafo.aggiungiArco('C', 'D', 4);
grafo.aggiungiArco('D', 'E', 1);
grafo.aggiungiArco('E', 'A', -7); // Arco con peso negativo

grafo.display();

try {
    const distanze = grafo.bellmanFord('A');
    console.log("Distanze minime da 'A':", distanze);
} catch (error) {
    console.error(error.message);
}
