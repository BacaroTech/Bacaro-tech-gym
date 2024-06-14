/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function partition(head: ListNode | null, x: number): ListNode | null {
    let auxHead: ListNode | null = head;
    

    let minusValues: number[] = [];
    let greatValues: number[] = [];

    auxHead = head;
    while(auxHead != null){
        if(auxHead.val < x){
            minusValues.push(auxHead.val);
        }else{
            greatValues.push(auxHead.val);
        }
        auxHead = auxHead.next;
    }
    console.log(minusValues, [x], greatValues);
    minusValues = minusValues.concat(greatValues)
    console.log(minusValues);

    return buildList(minusValues, 0);
};

function buildList(list: number[], position: number) : ListNode | null {
    if(position < list.length)
        return new ListNode(list[position], buildList(list, position+1))
    return null;
}