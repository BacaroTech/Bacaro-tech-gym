function linearSearch(array, num) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === num) {
            return i;
        }
    }
    return -1;
}

linearSearch(numbers, 8); // returns index 4
linearSearch(numbers, 28); // since 28 is not there, returns -1 