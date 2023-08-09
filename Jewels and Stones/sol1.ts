function numJewelsInStones(jewels: string, stones: string): number {
    let mapJewels : Map<string, number> = new Map<string, number>();
    let sum: number = 0;
    for(let i = 0; i < jewels.length; i++){
        mapJewels.set(jewels[i], 0)
    }
    
    for(let i = 0; i < stones.length; i++){

        if(mapJewels.get(stones[i]) != undefined){
            mapJewels.set(stones[i], mapJewels.get(stones[i]) + 1)
        }
    }

    Array.from(mapJewels, ([name, value]) => ( value )).forEach(data => {
        sum += data;
    }); 

    return sum;
};