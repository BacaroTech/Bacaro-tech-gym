/*
L'algoritmo di Kruskal è utilizzato per trovare un albero ricoprente minimo (Minimum Spanning Tree - MST) in un grafo connesso e pesato.
L'MST è un sottoinsieme di archi che collega tutti i vertici senza cicli e con la somma minima dei pesi.

FUNZIONAMENTO:
- Ordina tutti gli archi in ordine crescente di peso.
- Inizia con un grafo vuoto e aggiunge archi ordinati uno alla volta.
- Se l'aggiunta di un arco non crea un ciclo, lo si include nel MST.
- Si ripete fino a includere (V - 1) archi, dove V è il numero di vertici.

COMPLESSITÀ:
- Tempo: O(E log E) principalmente per l'ordinamento degli archi.
- Spazio: O(V + E) per memorizzare il grafo e le strutture di supporto.

APPLICAZIONI:
- Progettazione di reti di telecomunicazione.
- Distribuzione efficiente di risorse.
- Progettazione di reti di trasporto.
*/

class Graph {
    constructor() {
        this.adjacencyList = {};
        this.edges = [];
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
        this.edges.push({ da: u, a: v, peso });
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

    // Implementazione dell'algoritmo di Kruskal
    kruskal() {
        const mst = [];
        const parent = {};

        // Inizializza ciascun vertice come proprio genitore
        for (const vertice in this.adjacencyList) {
            parent[vertice] = vertice;
        }

        // Funzione per trovare il rappresentante (radice) di un insieme
        const find = (nodo) => {
            if (parent[nodo] === nodo) return nodo;
            return parent[nodo] = find(parent[nodo]);
        };

        // Funzione per unire due insiemi
        const union = (nodo1, nodo2) => {
            const radice1 = find(nodo1);
            const radice2 = find(nodo2);
            if (radice1 !== radice2) {
                parent[radice2] = radice1;
                return true;
            }
            return false;
        };

        // Ordina gli archi per peso crescente
        this.edges.sort((a, b) => a.peso - b.peso);

        // Scansiona gli archi e aggiunge solo quelli che non creano cicli
        for (const { da, a, peso } of this.edges) {
            if (union(da, a)) {
                mst.push({ da, a, peso });
            }
        }

        return mst;
    }
}

// Test dell'algoritmo di Kruskal
const grafo = new Graph();
grafo.aggiungiArco('A', 'B', 4);
grafo.aggiungiArco('A', 'C', 2);
grafo.aggiungiArco('B', 'C', 5);
grafo.aggiungiArco('B', 'D', 10);
grafo.aggiungiArco('C', 'D', 3);
grafo.aggiungiArco('C', 'E', 6);
grafo.aggiungiArco('D', 'E', 7);

grafo.display();

const mst = grafo.kruskal();
console.log("Albero Ricoprente Minimo (MST):", mst);