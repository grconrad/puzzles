class Stack {
  constructor() {
    this.data = [];
  }
  push(val) {
    this.data.push(val);
  }
  peek() {
    const data = this.data;
    return data.length > 0 ? data[data.length - 1] : null;
  }
  isEmpty() {
    return this.data.length === 0;
  }
  pop() {
    const val = this.data.pop();
    return val;
  }
  toString() {
    return this.data.toString();
  }
}

module.exports = Stack;
