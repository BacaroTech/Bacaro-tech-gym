/*
Questo algoritmo permette di mettere in ordine un array in base agli elementi che lo compongono
visualizzazione: https://it.wikipedia.org/wiki/Radix_sort#/media/File:Radix.JPG

Questo algoritmo ha una precondizione
Le cifre dei singoli elementi si devono trovare in un intervallo tra 0 e K

Questo algoritmo funziona come segue
- vengono presi i numeri che compongono l'array
- ognugno di essi viene ordinato dalla cifra meno significativa a quella piu' significativa
esempio: 142, 456, 228
- passo 1: ordino 1,4,2 -> 1,2,4 
- passo 2: ordino 4,5,2 -> 2,4,5
- passo 3: ordino 2,6,8 -> 2,6,8
array finale: 142, 228, 456

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
