class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}

const find_cycle_start = function(head){
  let ptr1 = head;
  let ptr2 = head;
  let cycleLen = 0;

  while (ptr2 !== null && ptr2.next !== null) {
    ptr1 = ptr1.next;
    ptr2 = ptr2.next.next;
    if (ptr1 === ptr2) {
      let tmp = ptr1;
      while (true) {
        ptr1 = ptr1.next;
        cycleLen++;
        if (ptr1 === tmp) {
          break;
        }
      }
      break;
    }
  }
  ptr1 = head;
  ptr2 = head;
  while (cycleLen !== 0) {
    ptr2 = ptr2.next;
    cycleLen--;
  }

  while (ptr1 !== ptr2) {
    ptr1 = ptr1.next;
    ptr2 = ptr2.next;
  }
  return ptr2;
};


head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)

head.next.next.next.next.next.next = head.next.next
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`)

head.next.next.next.next.next.next = head.next.next.next
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`)

head.next.next.next.next.next.next = head
console.log(`LinkedList cycle start: ${find_cycle_start(head).value}`)
