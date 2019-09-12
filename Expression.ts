class RuntimeError {}

enum Operators {
  DIE,
  ADD,
  SUBTRACT,
}

const TokenOperatorMap = new Map([
  ['d', Operators.DIE],
  ['+', Operators.ADD],
  ['-', Operators.SUBTRACT],
]);

interface Node {
  calculate(): number;
}

class LeafNode implements Node {
  protected value: number;

  constructor(value: number) {
    this.value = value;
  }

  calculate() {
    return this.value;
  }
}

abstract class BinaryNode implements Node {
  protected left: Node;
  protected right: Node;

  constructor(left: Node, right: Node) {
    this.left = left;
    this.right = right;
  }

  abstract calculate(): number;
}

class AdditionNode extends BinaryNode {
  calculate(): number {
    return this.left.calculate() + this.right.calculate();
  }
}

class SubtractionNode extends BinaryNode {
  calculate(): number {
    return this.left.calculate() - this.right.calculate();
  }
}

class RandomNode extends BinaryNode {
  calculate(): number {
    let result = 0;
    let dieRollCount = this.left.calculate();
    let dieSideCount = this.right.calculate();
    for (let i = 0; i < dieRollCount; i++) {
      let roll = Math.floor(Math.random() * dieSideCount + 1);
      result += roll;
    }
    return result;
  }
}

function createBinaryNode(
  operator: Operators,
  left: Node,
  right: Node,
): BinaryNode {
  if (operator === Operators.ADD) {
    return new AdditionNode(left, right);
  } else if (operator === Operators.DIE) {
    return new RandomNode(left, right);
  } else if (operator === Operators.SUBTRACT) {
    return new SubtractionNode(left, right);
  } else {
    throw new RuntimeError();
  }
}

export default class Expression {
  private currentNumber: number | null;
  private readonly operatorStack: Array<Operators>;
  private readonly operandStack: Array<Node>;

  constructor() {
    this.currentNumber = null;
    this.operatorStack = [];
    this.operandStack = [];
  }

  consumeToken(t: string | number) {
    if (typeof t === 'number') {
      if (this.currentNumber === null) {
        this.currentNumber = t;
      } else {
        this.currentNumber = this.currentNumber * 10 + t;
      }
    } else {
      if (this.currentNumber == null) {
        throw new RuntimeError();
      } else {
        let node = new LeafNode(this.currentNumber);
        this.operandStack.push(node);
        this.currentNumber = null;
        let operator = TokenOperatorMap.get(t);
        if (operator === undefined) {
          throw new RuntimeError();
        } else {
          this.operatorStack.push(operator);
        }
      }
    }
  }

  compute() {
    if (this.currentNumber != null) {
      let node = new LeafNode(this.currentNumber);
      this.operandStack.push(node);
    }
    while (this.operatorStack.length > 0) {
      if (this.operandStack.length < 2) {
        throw new RuntimeError();
      }
      let left = this.operandStack.shift() as Node;
      let right = this.operandStack.shift() as Node;
      let operator = this.operatorStack.shift() as Operators;
      let node = createBinaryNode(
        operator as Operators,
        left as Node,
        right as Node,
      );
      this.operandStack.unshift(node);
    }
    if (this.operandStack.length != 1) {
      throw new RuntimeError();
    } else {
      let root = this.operandStack[0];
      let result = root.calculate();
      return result;
    }
  }

  toString(): string {
    return
  }
}
