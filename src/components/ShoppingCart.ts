export class ShoppingCart {
  #cart: Array<[Pick<GameItem, "name" | "cost" | "weight">, number]>;
  constructor() {
    this.#cart = new Array();
  }
  addItem(item: GameItem, qty: number) {
    const cartCopy = [...this.#cart];
    const findByItem = (i: [GameItem, number]) => {
      const iObject = i[0];
      const itemName = iObject.name;
      return item.name === itemName;
    };
    let cartItem = cartCopy.find(findByItem);
    if (!cartItem) cartItem = [{ ...item }, qty];
    else cartItem[1] = cartItem[1] + qty;
    const cartIndex = cartCopy.findIndex(findByItem);
    if (cartIndex > -1) cartCopy[cartIndex] = cartItem;
    else cartCopy.push(cartItem);
    this.#cart = cartCopy;
  }

  getCart() {
    return this.#cart
  }
}
