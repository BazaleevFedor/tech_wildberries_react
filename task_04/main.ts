import { v4 as uuidv4 } from 'uuid';

enum OrderStatus {
    CREATED = 'принят',
    DELIVERY = 'в доставке',
    RECEIVED = 'доставлен',
}

class Order {
    private readonly _id: string;
    private readonly _products: Map<Product[], number>;

    private _status: OrderStatus;

    constructor(newStatus?: OrderStatus, products?: Map<Product[], number>) {
        this._id = uuidv4();
        this._status = newStatus ?? OrderStatus.CREATED;
        this._products = new Map(products);
    }

    getInfo() {
        return {
            id: this._id,
            status: this._status,
            products: this._products,
        }
    }

    changeStatus(newStatus: OrderStatus) {
        this._status = newStatus;
    }
}

class Product {
    private readonly _id: string;

    private _name: string;

    constructor(name: string) {
        this._id = uuidv4();
        this._name = name;
    }

    getInfo() {
        return {
            id: this._id,
            name: this._name,
        }
    }

    changeInfo(newName: string) {
        this._name = newName;
    }
}

class Cart {
    private _products: Map<Product, number> = new Map();

    addProduct(newProduct: Product) {
        const productCount = this._products.get(newProduct);
        if (productCount) {
            this._products.set(newProduct, productCount + 1);

            return;
        }

        this._products.set(newProduct, 1);
    }

    removeProduct(removeProduct: Product) {
        if (this._products.has(removeProduct)) {
            this._products.delete(removeProduct);
        }
    }

    get getProductsList() {
        return this._products;
    }
}

class OrderManager {

}

class ProductManager {
    private _products: Product[];

    addProductToCart(productID: string) {

    }

    getProductInfo(productID: string) {

    }
}
