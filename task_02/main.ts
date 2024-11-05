interface Car {
    carModel: string;
    carAge: number;
    parts: CarPart[];

    getStatus(): string;
}

interface CarPart {
    name: string;

    getStatus(): string;
    setStatus(newStatus: string): void;
}

class BaseCar implements Car {
    carModel: string;
    carAge: number;
    parts: CarPart[];

    constructor(carModel: string, carAge: number, ...parts: CarPart[]) {
        this.carModel = carModel;
        this.carAge = carAge;
        this.parts = parts;
    }

    getStatus(): string {
        let partsStatus: string = '';
        this.parts.forEach(part => {
            partsStatus += part.getStatus() + '\n';
        });

        return `Состояние автомобиля ${this.carModel}:\n${partsStatus}`;
    }
}

class BaseCarPart implements CarPart {
    name: string;

    private _status: string;

    constructor(name: string, status: string) {
        this.name = name;
        this._status = status;
    }

    getStatus(): string {
        return `${this.name}: ${this._status}`;
    }

    setStatus(newStatus: string) {
        this._status = newStatus;
    }
}

const myCarEngine = new BaseCarPart('Двигатель', 'пока жив');
const myCarWheels = new BaseCarPart('Колеса', 'перелбулся');
const myCarHeadlights = new BaseCarPart('Фара', 'разбита');
const myCar = new BaseCar('Getz', 21, myCarEngine, myCarWheels, myCarHeadlights);

console.log(myCar.getStatus());

myCarHeadlights.setStatus('целая');

console.log(myCar.getStatus());
