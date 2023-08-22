function lengthOfLastWord(s: string): number {
    let strings: string[] = s.split(" ");
    console.log(strings);
    for(let i = strings.length - 1; i >= 0; i--){
        if(!(strings[i].length == 0)){
            console.log(strings[i]);
            return strings[i].length;
        }
    }
    return -1;
};
