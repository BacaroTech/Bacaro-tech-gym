function isPalindrome(s: string): boolean {
    let strCompact = "";
    for(let i = 0; i < s.length; i++){
        if((s[i] >= 'A' && s[i] <= 'Z') || (s[i] >= 'a' && s[i] <= 'z') || (s[i] >= '0' && s[i] <= '9')){
            strCompact += s[i];
        }
    }

    strCompact = strCompact.toLowerCase();
    console.log(strCompact);

    let result = true;

    for(let i = 0; i < strCompact.length/2; i++){
        if(strCompact[i] != strCompact[strCompact.length - 1 - i]){
            result = false;
        }
    }

    console.log(strCompact);
    if(strCompact.length == 1 || strCompact.length == 0){
        result = true;
    }

    return result;
};