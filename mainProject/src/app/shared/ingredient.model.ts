export class Ingredient {
  /**
   * PROPERTIES
   */
  name: string = null;
  amount: any = 0;

  /**
   * CONSTRUCTOR
   */
  constructor(name: string, amount: number) {
      this.name = name;
      this.amount = amount;
  }

  /**
   * GETTERS
   */
  getName() {
    return this.name;
  }

  getAmount() {
    return this.amount;
  }
}
