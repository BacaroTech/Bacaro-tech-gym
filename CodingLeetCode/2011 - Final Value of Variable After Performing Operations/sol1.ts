function finalValueAfterOperations(operations: string[]): number {
    let value = 0;
    operations.forEach((operation: string ) => {
        if(operation == "X++" || operation == "++X"){
            value++;
        }else{
            value--;
        }
    })
    return value;

};