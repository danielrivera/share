const input1 = '43243+3-56/56';
const input2 = '43243+3-56/56*7';
const input3 = '39-20*21/7';

function compute(items) {
  // Assume `items` is well formed (no trailing operators, no 2 operators or numbers next to each other)

  // First pass to handle the * and /
  const stack1 = [];
  for (let i = 0; i < items.length - 1; i++) {
    const item = items[i];
    const nextItem = items[i+1];

    if (typeof item === 'number') {
      stack1.push(item);
    } else if (item === '*') {
      stack1.push(stack1.pop() * nextItem);
      i++;
    } else if (item === '/') {
      stack1.push(stack1.pop() / nextItem);
      i++;
    } else {
      // This is the + or - operator, push it and handle during next pass
      stack1.push(item);
    }
  }

  // Second pass to handle + and -
  const stack2 = [];
  for (let i = 0; i < stack1.length - 1; i++) {
    const item = stack1[i];
    const nextItem = stack1[i+1];

    if (typeof item === 'number') {
      stack2.push(item);
    } else if (item === '+') {
      stack2.push(stack2.pop() + nextItem);
      i++;
    } else if (item === '-') {
      stack2.push(stack2.pop() - nextItem);
      i++;
    }
  }

  return stack2[0];
}

function tokenize(input) {
  // Find the numbers and operators in the string
  var transformation1 = input.match(/([0-9]+)|[\+\/\-\*]/g);
  // Transform the string numbers into actual numbers
  var transformation2 = transformation1.map(item => {
    var num = Number.parseInt(item, 10);
    if (!Number.isNaN(num)) {
      return num;
    }
    return item;
  });

  return transformation2;
}

// Compute the results and use eval() to see how we stack up to node
const res1 = compute(tokenize(input1));
const res2 = compute(tokenize(input2));
const res3 = compute(tokenize(input3));
console.log(input1, '=', res1, 'is', eval(input1) === res1);
console.log(input2, '=', res2, 'is', eval(input2) === res2);
console.log(input3, '=', res3, 'is', eval(input3) === res3);
