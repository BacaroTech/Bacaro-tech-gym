/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Counting_sort#/media/File:Counting_Sort_Animation.gif

Questo algoritmo ha una precondizione
Gli elmenti si devono trovare in un intervallo tra 0 e K

Questo algoritmo funziona come segue
- viene creare un array di supporto grande K posizioni chiamato "array delle occorrenze" e viene inzializzato tutto a zero
- viene visionato l'array di partenza e ogni elemento viene preso come posizione dell'array delle occorenze => 5 -> countArray[5]++
- viene modificato l'array delle occorenze in modo tale che al suo interno viene calcolata la somma dei prefissi per ogni indice di countArray
- utilizzando i prefissi calcolati al passo precedente viene ordinato l'array di partenza

Output
l'array ordinato, tramite side effect

Complessita' nel caso peggiore: O(n + k)
*/

function countSort(inputArray) {
    const N = inputArray.length;
 
    // Finding the maximum element of inputArray
    let M = 0;
    for (let i = 0; i < N; i++) {
        M = Math.max(M, inputArray[i]);
    }
 
    // Initializing countArray with 0
    const countArray = new Array(M + 1).fill(0);
 
    // Mapping each element of inputArray as an index of countArray
    for (let i = 0; i < N; i++) {
        countArray[inputArray[i]]++;
    }
 
    // Calculating prefix sum at every index of countArray
    for (let i = 1; i <= M; i++) {
        countArray[i] += countArray[i - 1];
    }
 
    // Changing inputArray from countArray
    for (let i = N - 1; i >= 0; i--) {
        inputArray[countArray[inputArray[i]] - 1] = inputArray[i];
        inputArray[inputArray[i]]--;
    }
 
    return inputArray;
}
 
// Test sort
const inputArray = [4, 3, 12, 1, 5, 5, 3, 9];
console.log(countSort(inputArray););
