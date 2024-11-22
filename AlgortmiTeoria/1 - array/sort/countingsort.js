/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Counting_sort#/media/File:Counting_Sort_Animation.gif

Descrizione dell'algoritmo
Questo algoritmo presenta una **precondizione fondamentale**:  
- Gli elementi dell'array devono trovarsi in un intervallo compreso tra **0** e **K**.  

Funzionamento
1. **Creazione di un array di supporto:**  
   - Viene creato un array di supporto di dimensione **K** chiamato "array delle occorrenze" (o `countArray`).  
   - Tutti i valori di questo array vengono inizializzati a **0**.  
2. **Conteggio delle occorrenze:**  
   - L'algoritmo scorre l'array di partenza e utilizza ogni elemento come indice nell'array delle occorrenze.  
   - Incrementa il valore corrispondente in `countArray` di 1.  
     Esempio: se l'elemento è **5**, viene eseguito `countArray[5]++`.  
3. **Calcolo delle somme prefix:**  
   - Viene modificato l'array delle occorrenze per calcolare la somma cumulativa (o somma dei prefissi) per ogni indice.  
   - Ogni posizione di `countArray` conterrà il numero totale di elementi minori o uguali a quell'indice.  
4. **Ordinamento dell'array di partenza:**  
   - Utilizzando i prefissi calcolati nel passo precedente, l'algoritmo determina la posizione corretta di ogni elemento nell'array ordinato.  

Questo processo garantisce un ordinamento stabile e rapido per array che soddisfano la precondizione iniziale.  

Output
l'array ordinato

Complessita' nel caso peggiore: O(n + k)
*/

function countingSort(arr, min, max)
  {
    let i = min,
        j = 0,
        len = arr.length,
        count = [];

    for (i; i <= max; i++)
    {
        count[i] = 0;
    }

    for (i = 0; i < len; i++)
    {
        count[arr[i]] += 1;
    }

    for (i = min; i <= max; i++)
    {
        while (count[i] > 0)
        {
            arr[j] = i;
            j++;
            count[i]--;
        }
    }
    return arr;
}

 
// Test sort
const inputArray = [4, 3, 12, 1, 5, 5, 3, 9];
console.log(countingSort(inputArray));
