function reverseString(s: string[]): void {
    let aux: string;
    for(let i = 0; i < s.length/2; i++){
        aux = s[i];
        s[i] = s[s.length - 1 - i];
        s[s.length - 1 - i] = aux;
    }
};