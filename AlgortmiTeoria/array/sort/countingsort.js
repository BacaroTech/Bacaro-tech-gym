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
