function checkDistances(s: string, distance: number[]): boolean {
    let checked = true;

    let map = new Map();
    for(let i = 0; i < s.length; i++){
        if(map.get(s[i]) == undefined){
            map.set(s[i], i);
        }else{
            let lastindex = map.get(s[i])
            map.set(s[i], i - lastindex - 1);
        }
    }

    for(let i = 0; i < distance.length; i++){
        //a->97
        let value = map.get(String.fromCharCode(97+i))
        if(value != undefined && value != distance[i]){
            checked = false;
        }
        
    }

    return checked;
};