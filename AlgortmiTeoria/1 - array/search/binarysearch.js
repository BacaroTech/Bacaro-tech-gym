/*
Questo algoritmo consente di verificare la presenza (o meno) di un elemento all'interno di un array.  
Per applicare la ricerca binaria, **l'array deve essere ordinato** (non importa se in ordine crescente o decrescente). Questo requisito è fondamentale poiché l'algoritmo si basa su una logica che divide l'array in parti progressivamente più piccole.  

Funzionamento della ricerca binaria
1. Si considerano gli estremi dell'array (inizialmente 0 e n-1, ma che verranno modificati ricorsivamente).  
2. Si calcola la metà dell'array.  
3. Si verifica se l'elemento centrale corrisponde a quello da cercare:  
   - **Se sì**, restituisce la posizione centrale.  
   - **Se no**, ci sono due sottocasi:  
     - **Elemento centrale maggiore** rispetto a quello cercato:  
       Si esegue la ricorsione considerando solo la prima metà dell'array, impostando i nuovi estremi come inizio e posizione centrale esclusa.  
     - **Elemento centrale minore** rispetto a quello cercato:  
       Si esegue la ricorsione considerando solo la seconda metà dell'array, impostando i nuovi estremi come posizione centrale esclusa e fine.  

Output
- Se l'elemento viene trovato, restituisce la posizione (compresa tra 0 e n-1).  
- Se l'elemento non è presente, restituisce `-1`.  

Complessità
- **Caso peggiore:** O(log n) 
Questo è dovuto al fatto che l'algoritmo dimezza la dimensione dell'array a ogni iterazione.

*/

function recursiveFunction (arr, x, start, end) {
    // Base Condition
    if (start > end)
        return -1;

    // Find the middle index
    let mid = Math.floor((start + end) / 2);
    
    // Compare mid with given key x
    if (arr[mid] === x)
        return mid;
    
    // If element at mid is greater than x,
    // search in the left half of mid
    if (arr[mid] > x)
        return recursiveFunction(arr, x, start, mid - 1);
    else
        // If element at mid is smaller than x,
        // search in the right half of mid
        return recursiveFunction(arr, x, mid + 1, end);
}

let arr = [1, 3, 5, 7, 8, 9];
console.log("visualizza array:", arr);
console.log("ricerca all'interno dell'array dell'elemento 5 con ricerca binaria:", 
  recursiveFunction(arr, 5, 0, arr.length - 1) !== -1 ? recursiveFunction(arr, 5, 0, arr.length - 1) !== -1 : "non trovato"  ); 
console.log("ricerca all'interno dell'array dell'elemento 12 con ricerca binaria:", 
  recursiveFunction(arr, 12, 0, arr.length - 1) !== -1 ? recursiveFunction(arr, 12, 0, arr.length - 1) !== -1 : "non trovato" ); 
