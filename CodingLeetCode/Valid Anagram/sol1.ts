function isAnagram(s: string, t: string): boolean {
    
    if(s.length != t.length){
        return false;
    }else{
        let sArray = s.split('');
        let tArray = t.split('');
        sArray.sort();
        tArray.sort();
        for(let i = 0; i < sArray.length; i++ ){
            if (sArray[i] != tArray[i]){
                return false;
            }
        }
        return true;
    }

};
