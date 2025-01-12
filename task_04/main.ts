import { v4 as uuidv4 } from 'uuid';

enum OrderStatus {
    CREATED = 'принят',
    DELIVERY = 'в доставке',
    RECEIVED = 'доставлен',
}

class Order {
    readonly id: string;

    private readonly products: Map<Product, number>;

    private status: string;

    constructor(products: Map<Product, number>, status?: OrderStatus) {
        this.id = uuidv4();
        this.status = status ?? OrderStatus.CREATED;
        this.products = new Map(products);
    }

    getInfo() {
        return {
            id: this.id,
            status: this.status,
            products: this.products,
        };
    }

    changeStatus(newStatus: OrderStatus) {
        this.status = newStatus;
    }
}

class Product {
    readonly id: string;

    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
    }

    getInfo() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
        };
    }

    changeInfo(newName?: string, newPrice?: number) {
        if (newName) this.name = newName;
        if (newPrice) this.price = newPrice;
    }
}

class Cart {
    private products: Map<Product, number> = new Map();

    addProduct(newProduct: Product) {
        const productCount = this.products.get(newProduct);
        if (productCount) {
            this.products.set(newProduct, productCount + 1);

            return;
        }

        this.products.set(newProduct, 1);
    }

    addProducts(newProducts: Product[]) {
        newProducts.forEach(this.addProduct.bind(this));
    }

    removeProduct(removeProduct: Product) {
        if (this.products.has(removeProduct)) {
            this.products.delete(removeProduct);
        }
    }

    get getProductsList() {
        return this.products;
    }
}

class OrderManager {
    private orders: Order[] = [];

    createOrder(products: Map<Product, number>) {
        const newOrder = new Order(products);
        this.orders.push(newOrder);

        return newOrder;
    }

    get getOrdersList() {
        return this.orders;
    }
}

class ProductManager {
    private products: Product[] = [];

    createProduct(name: string, price: number) {
        const newProduct = new Product(name, price);
        this.products.push(newProduct);

        return newProduct;
    }

    removeProduct(productId: string) {
        this.products = this.products.filter(product => product.id !== productId);
    }

    get getProductsList() {
        return this.products;
    }
}

// демонстрация

const productManager = new ProductManager();
const orderManager = new OrderManager();
const cart = new Cart();

const product1 = productManager.createProduct('часы за сотку', 100);
const product2 = productManager.createProduct('часы за двести', 200);
const product3 = productManager.createProduct('лицензия пилота', 1000000);

cart.addProducts([product1, product2, product3, product2]);
const newOrder = orderManager.createOrder(cart.getProductsList);

console.log(orderManager.getOrdersList);

newOrder.changeStatus(OrderStatus.DELIVERY);

console.log(orderManager.getOrdersList);

