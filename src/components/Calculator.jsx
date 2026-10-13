
import { useState } from 'react';
import { updateExpression } from '../utils/calculatorLogic';
import './Calculator.css';

const buttons = [
  { label: 'AC', value: 'AC', type: 'orange' },
  { label: 'DEL', value: 'DEL', type: 'orange' },
  { label: '+/-', value: '+/-' },
  { label: '/', value: '/', type: 'operation' },

  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '*', value: '*', type: 'operation' },

  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '-', value: '-', type: 'operation' },

  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '+', value: '+', type: 'operation' },

  { label: '0', value: '0' },
  { label: '.', value: '.' },
  { label: '( )', value: '()' },
  { label: '=', value: '=', type: 'operation' },
];

function Calculator() {
  const [output, setOutput] = useState('');

  const handleButtonClick = (value) => {
    setOutput((previous) => updateExpression(previous, value));
  };

  return (
    <section className="calculator" aria-label="Calculator">
      <input
        type="text"
        className="calculator__display"
        value={output}
        aria-label="Calculator display"
        readOnly
      />

      <div className="calculator__buttons">
        {buttons.map(({ label, value, type }) => (
          <button
            key={label}
            type="button"
            className={[
              'calculator__button',
              type && `calculator__button--${type}`,
            ].filter(Boolean).join(' ')}
            onClick={() => handleButtonClick(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Calculator;
