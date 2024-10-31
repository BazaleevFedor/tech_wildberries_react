type Base = 2 | 10 | 16;
type Operation = (a: number, b: number) => number;

const convertToDecimal = (value: string, base: Base): number => {
    return parseInt(value, base);
}

const convertFromDecimal = (value: number, base: Base): string => {
    return value.toString(base);
}

const calculation = (number1: string, number2: string, base: Base, operation: Operation): string => {
    const decimalNum1 = convertToDecimal(number1, base);
    const decimalNum2 = convertToDecimal(number2, base);

    if (!decimalNum1 || !decimalNum2) return 'error: incorrect data';

    const result = operation(decimalNum1, decimalNum2);

    return convertFromDecimal(result, base);
}

const add = (number1: string, number2: string, base: Base): string => {
    return calculation(number1, number2, base, (a, b) => a + b);
};

const subtract = (number1: string, number2: string, base: Base): string => {
    return calculation(number1, number2, base, (a, b) => a - b);
};

const multiply = (number1: string, number2: string, base: Base): string => {
    return calculation(number1, number2, base, (a, b) => a * b);
};

const divide = (number1: string, number2: string, base: Base): string => {
    return calculation(number1, number2, base, (a, b) => a / b);
};


const num_10_1 = '789';
const num_10_2 = '89';
console.log(`${ num_10_1 } / ${ num_10_2 } = ${ divide(num_10_1, num_10_2, 10) }`);

const num_2_1 = '10101010';
const num_2_2 = '1010';
console.log(`${ num_2_1 } - ${ num_2_2 } = ${ subtract(num_2_1, num_2_2, 2) }`);

const num_16_1 = '1f';
const num_16_2 = '1f';
console.log(`${ num_16_1 } + ${ num_16_2 } = ${ add(num_16_1, num_16_2, 16) }`);

const num_16_3 = '1f';
const num_16_4 = '10';
console.log(`${ num_16_3 } * ${ num_16_4 } = ${ multiply(num_16_3, num_16_4, 16) }`);

const num_16_5 = '#333#%';
const num_16_6 = '10';
console.log(`${ num_16_5 } * ${ num_16_6 } = ${ multiply(num_16_5, num_16_6, 16) }`);
