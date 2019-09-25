export class User {
  /**
   * CONSTRUCTOR
   */
  constructor(
    public email: string,
    public id: string,
    private token: string,
    private tokenExpirationDate: Date
  ) {}

  /**
   * GETTERS
   */
  getToken() {
    return !this.tokenExpirationDate || new Date() > this.tokenExpirationDate ? null : this.token;
  }
}
