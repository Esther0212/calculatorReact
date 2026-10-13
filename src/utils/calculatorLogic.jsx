
const operators = {
  '+': { precedence: 1, apply: (a, b) => a + b },
  '-': { precedence: 1, apply: (a, b) => a - b },
  '*': { precedence: 2, apply: (a, b) => a * b },
  '/': { precedence: 2, apply: (a, b) => a / b },
};

export function evaluateExpression(expression) {
  const tokens = expression.match(
    /(?:\d+\.?\d*|\.\d+)|[()+*/-]/g
  );

  if (!tokens || tokens.join('') !== expression) {
    throw new Error('Invalid expression');
  }

  let position = 0;

  function parsePrimary() {
    const token = tokens[position++];

    if (token === '+') return parsePrimary();
    if (token === '-') return -parsePrimary();

    if (token === '(') {
      const value = parseExpression(0);

      if (tokens[position++] !== ')') {
        throw new Error('Unmatched parentheses');
      }

      return value;
    }

    if (token === undefined || Number.isNaN(Number(token))) {
      throw new Error('Invalid number');
    }

    return Number(token);
  }

  function parseExpression(minPrecedence) {
    let left = parsePrimary();

    while (position < tokens.length) {
      const operator = operators[tokens[position]];

      if (!operator || operator.precedence < minPrecedence) {
        break;
      }

      position++;

      const right = parseExpression(operator.precedence + 1);
      left = operator.apply(left, right);
    }

    return left;
  }

  const result = parseExpression(0);

  if (position !== tokens.length || !Number.isFinite(result)) {
    throw new Error('Invalid calculation');
  }

  return Number(result.toPrecision(12)).toString();
}

export function updateExpression(output, value) {
  if (value === 'AC') return '';

  if (value === 'DEL') {
    return output === 'Error' ? '' : output.slice(0, -1);
  }

  if (value === '=') {
    if (!output || output === 'Error') return '';

    try {
      return evaluateExpression(output);
    } catch {
      return 'Error';
    }
  }

  if (output === 'Error') output = '';

  if (value === '+/-') {
    if (!output) return '-';

    const match = output.match(/(-?\d+\.?\d*|-?\.\d+)$/);

    if (!match) return output;

    const number = match[0];
    const start = output.slice(0, -number.length);

    if (number.startsWith('-')) {
      return start + number.slice(1);
    }

    return start + '-' + number;
  }

  if (value === '()') {
    const opens = (output.match(/\(/g) || []).length;
    const closes = (output.match(/\)/g) || []).length;
    const last = output.slice(-1);

    if (!output || /[+\-*/(]$/.test(output)) {
      return output + '(';
    }

    if (opens > closes && /[\d)]/.test(last)) {
      return output + ')';
    }

    return output + '*(';
  }

  if (value === '.') {
    const lastNumber = output.split(/[+\-*/()]/).pop();

    if (lastNumber.includes('.')) return output;

    if (!output || /[+\-*/(]$/.test(output)) {
      return output + '0.';
    }
  }

  if (['+', '-', '*', '/'].includes(value)) {
    if (!output) return value === '-' ? '-' : '';

    if (/[+\-*/.]$/.test(output)) {
      return output.slice(0, -1) + value;
    }

    if (output.endsWith('(') && value !== '-') {
      return output;
    }
  }

  if (/^\d$/.test(value) && output.endsWith(')')) {
    return output + '*' + value;
  }

  return output + value;
}
