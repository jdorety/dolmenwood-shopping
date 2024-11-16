type CP = number;
type SP = number;
type GP = number;
type EP = number;
type CostMatrix = [CP, SP, GP, EP]
type CartValue = [number, CostMatrix]

export class ShoppingCart {
  #cart: Record<string, CartValue>;
  amount: number
  constructor() {
    this.#cart = {};
    this.amount = 0;
  }
  addItem(key: string, qty: number, cost: CostMatrix) {
    let newQuantity = qty;
    if (this.#cart?.[key]) {
      const oldItem = this.#cart[key];
      const oldQuantity = oldItem[0];
      newQuantity = qty + oldQuantity;
    } const newItem = [newQuantity, cost] as CartValue;
    this.#cart[key] = newItem;
  }
  // addItem(item: GameItem, qty: number) {
  //   const cartCopy = [...this.#cart];
  //   const findByItem = (i: [GameItem, number]) => {
  //     const iObject = i[0];
  //     const itemName = iObject.name;
  //     return item.name === itemName;
  //   };
  //   let cartItem = cartCopy.find(findByItem);
  //   if (!cartItem) cartItem = [{ ...item }, qty];
  //   else cartItem[1] = cartItem[1] + qty;
  //   const cartIndex = cartCopy.findIndex(findByItem);
  //   if (cartIndex > -1) cartCopy[cartIndex] = cartItem;
  //   else cartCopy.push(cartItem);
  //   this.#cart = cartCopy;
  // }

  getCart() {
    return this.#cart
  }
}
