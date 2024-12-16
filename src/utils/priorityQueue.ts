/* eslint-disable max-classes-per-file */
// a priority queue is a binary heap where we keep the nodes with the highest (or lowest) priority at the top

const swap = <T>(arr: Node<T>[], index1: number, index2: number) => {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
};

class Node<T> {
  value: T;
  priority: number;

  constructor(value: T, priority: number) {
    this.value = value;
    this.priority = priority;
  }
}

export class PriorityQueue<T> {
  values: Node<T>[];

  constructor() {
    this.values = [];
  }

  enqueue(newValue: T, priority: number) {
    const newNode = new Node(newValue, priority);
    this.values.push(newNode);
    let index = this.values.length - 1;
    let parentIndex = Math.floor((index - 1) / 2);
    // bubble up the new node until the parent node's has higher priority then the new node
    while (this.values[parentIndex] && this.values[parentIndex].priority > this.values[index].priority) {
      swap(this.values, index, parentIndex);
      index = parentIndex;
      parentIndex = Math.floor((index - 1) / 2);
    }
  }

  dequeue() {
    // swap the end of the array with the root then pop it off to return
    swap(this.values, 0, this.values.length - 1);
    const oldRoot = this.values.pop();

    if (!oldRoot) throw new Error();

    // bubble down the new root node
    let currentIndex = 0;
    let leftChildIndex = 1;
    let rightChildIndex = 2;
    let nextIndex = null;
    // loop while the left child exists - if it doesn't we're done
    while (leftChildIndex < this.values.length) {
      // if the right child exists and is smaller than the left child we'll go there otherwise to the left child
      if (
        this.values[rightChildIndex] &&
        this.values[rightChildIndex].priority < this.values[leftChildIndex].priority
      ) {
        nextIndex = rightChildIndex;
      } else {
        nextIndex = leftChildIndex;
      }

      // stop when the current priority is greater than the child's
      if (this.values[currentIndex].priority < this.values[nextIndex].priority) {
        break;
      }

      // otherwise swap with the higher priority child and continue
      swap(this.values, currentIndex, nextIndex);
      currentIndex = nextIndex;
      leftChildIndex = currentIndex * 2 + 1;
      rightChildIndex = currentIndex * 2 + 2;
    }

    return oldRoot;
  }

  isEmpty() {
    return this.values.length <= 0;
  }

  length() {
    return this.values.length;
  }

  print() {
    console.table(this.values);
  }
}

// const pq = new PriorityQueue();
// pq.enqueue("cold", 5);
// pq.enqueue("gunshot", 1);
// pq.enqueue("fever", 4);
// pq.enqueue("broken arm", 2);
// pq.enqueue("puncture", 3);
// pq.print();
// console.log(pq.dequeue());
// pq.print();

