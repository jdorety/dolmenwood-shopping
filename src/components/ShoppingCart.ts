type CP = number;
type SP = number;
type GP = number;
type EP = number;
type CostMatrix = [CP, SP, GP, EP]

export class ShoppingCart {
  #cart: Record<string, number[]>;
  #coinConversion: CostMatrix;
  #total: GP;
  constructor() {
    this.#cart = {};
    this.#total = 0;
    this.#coinConversion = [0, 0, 0, 0]
  }

  getTotal() {
    console.log({ total: this.#total });
    return this.#total;
  }
  addItem(key: string, qty: number, cost: number) {
    let newQuantity = qty;
    if (this.#cart?.[key]) {
      const oldItem = this.#cart[key];
      const oldQuantity = oldItem[0];
      newQuantity = qty + oldQuantity;
    } const newItem = [newQuantity, cost];
    this.#cart[key] = newItem;
    this.#updateTotal();
  }
  #updateTotal() {
    const cartValues = Object.values({ ...this.#cart })
    const multipliedValues = cartValues.map(([qty, cost]) => {
      return qty * cost
    })
    const valuesTotalled = multipliedValues.reduce((pv, cv) => pv + cv);
    this.#total = valuesTotalled
  }
  getCart() {
    return this.#cart
  }
}
