function majorityElement(nums: number[]): number {
    let mapRep: Map<number, number> = new Map<number, number>();
    
    nums.forEach(num => {
        if(mapRep.get(num)){
            mapRep.set(num, mapRep.get(num)+1);
        }else{
            mapRep.set(num,1)
        }
    });

    let arrayKeys: number[] = Array.from(mapRep.keys());
    let majorNum: number = -1;

    arrayKeys.forEach(key => {
        if(mapRep.get(key) > nums.length/2){
            majorNum = key;
        }
    });

    return majorNum;

};