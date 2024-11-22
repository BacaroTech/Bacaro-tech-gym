/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Radix_sort#/media/File:Radix.JPG

Questo algoritmo ha una precondizione:
Le cifre dei singoli elementi devono trovarsi in un intervallo tra 0 e K.

Funzionamento:
1. Vengono presi i numeri che compongono l'array.
2. Ogni numero viene ordinato dalla cifra meno significativa a quella più significativa.
   Esempio: 142, 456, 228.
3. Passo 1: ordino le cifre di 142 -> 1, 4, 2 diventa 1, 2, 4.
4. Passo 2: ordino le cifre di 456 -> 4, 5, 2 diventa 2, 4, 5.
5. Passo 3: ordino le cifre di 228 -> 2, 6, 8 diventa 2, 6, 8.
6. L'array finale ordinato sarà: 142, 228, 456.

Output
l'array ordinato

Complessita' nel caso peggiore: O(m(n + k)), dove 
- m sono i numeri
- n sono le cifre
- k sono e' il massimo dell'intervallo
*/

function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
  }

function digitCount(num) {
    if (num === 0) return 1
    return Math.floor(Math.log10(Math.abs(num))) + 1
}

function mostDigits(nums) {
    let maxDigits = 0
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]))
    }
    return maxDigits
}

function radixSort(arrOfNums) {
    let maxDigitCount = mostDigits(arrOfNums)
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []) // [[], [], [],...]
        for (let i = 0; i < arrOfNums.length; i++) {
            let digit = getDigit(arrOfNums[i], k)
            digitBuckets[digit].push(arrOfNums[i])
        }
        // New order after each loop
        arrOfNums = [].concat(...digitBuckets)
    }
    return arrOfNums
}

// Test sort
const arr = [1, 33, 444, 0, 3, 2]
console.log(radixSort(arr)) 
