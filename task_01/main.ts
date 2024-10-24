type NumberSystem = 2 | 10 | 16;
type Operation = (a: number, b: number) => number;

const convertToDecimal = (value: string, base: NumberSystem): number => {
    return parseInt(value, base);
}

const convertFromDecimal = (value: number, base: NumberSystem): string => {
    return value.toString(base);
}

const calculation = (number1: number, number2: number, numberSystem: NumberSystem, operation: Operation): string => {
    const decimalNum1 = convertToDecimal(number1.toString(), numberSystem);
    const decimalNum2 = convertToDecimal(number2.toString(), numberSystem);

    const result = operation(decimalNum1, decimalNum2);

    return convertFromDecimal(result, numberSystem);
}

const add = (number1: number, number2: number, numberSystem: NumberSystem): string => {
    return calculation(number1, number2, numberSystem, (a, b) => a + b);
};

const subtract = (number1: number, number2: number, numberSystem: NumberSystem): string => {
    return calculation(number1, number2, numberSystem, (a, b) => a - b);
};

const multiply = (number1: number, number2: number, numberSystem: NumberSystem): string => {
    return calculation(number1, number2, numberSystem, (a, b) => a * b);
};

const divide = (number1: number, number2: number, numberSystem: NumberSystem): string => {
    return calculation(number1, number2, numberSystem, (a, b) => a / b);
};

console.log(`1 + 1111 = ${add(1, 1111, 2)}`);
console.log(`1 + 1111 = ${add(1, 1111, 2)}`);
console.log(add(1, 1111, 10));
console.log(divide(15, 3, 10));
