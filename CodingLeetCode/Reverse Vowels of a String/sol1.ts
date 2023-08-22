function reverseVowels(s: string): string {
    let vocalsReverse: string[] = [];
    for(let i = s.length-1; i >= 0; i--){
        if(isVocal(s[i]))
            vocalsReverse.push(s[i])
    }
    let j: number = 0;
    for(let i = 0; i < s.length; i++){
        if(isVocal(s[i])){
            s = replaceCharacter(s,i, vocalsReverse[j]);
            j++
        }
    }
    return s;
};

function isVocal(c: string): boolean{
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
    || c == 'A' || c == 'E'|| c == 'I'|| c == 'O'|| c == 'U';
}

function replaceCharacter(string, index, replacement) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}