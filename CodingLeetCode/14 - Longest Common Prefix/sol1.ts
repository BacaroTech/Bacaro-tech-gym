function longestCommonPrefix(strs: string[]): string {
    let common : string = "";
    let i : number = 0;

    let end: boolean = false;

    while(i < strs[0].length && !end){
        let remove: boolean = false;
        common += strs[0][i];
        for(let j = 0; j < strs.length; j++){
            if(i >= strs[j].length || strs[j][i] != common[i]){
                remove=true
            }
        }
        if(remove){
            common = common.slice(0, -1);
            end = true;
        }
        i++;
    }

    return common;
};