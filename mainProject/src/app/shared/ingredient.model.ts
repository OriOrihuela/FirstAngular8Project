export class Ingredient {
  /**
   * PROPERTIES
   */
  name: string = null;
  amount: number = 0;

  /**
   * CONSTRUCTOR
   */
  constructor(name: string, amount: number) {
      this.name = name;
      this.amount = amount;
  }
}
