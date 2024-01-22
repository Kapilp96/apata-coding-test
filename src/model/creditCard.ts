export type CreditCardDetails = {
  id: string;
  accountHolder: string;
  cardNumber: string;
  amount: number;
};

export type CardHolderList = {
  accountHolder: string;
  amount: number;
  id: string;
};

/**
 * CreditCard: A class representing a credit card.
 */
export class CreditCard {
  private id: string;
  private accountHolder: string;
  private cardNumber: string;
  private amount: number;

  /**
   * Constructor of the CreditCard class.
   *
   * @param cardNumber - The card number of the credit card.
   * @param amount - The amount associated with the credit card.
   */
  constructor(
    id: string,
    accountHolder: string,
    cardNumber: string,
    amount: number
  ) {
    this.id = id;
    this.cardNumber = cardNumber;
    this.amount = amount;
    this.accountHolder = accountHolder;
  }

  /**
   * Getter for the card number of the credit card.
   *
   * @returns {string} - The card number.
   */
  getCardNumber(): string {
    return this.cardNumber;
  }

  /**
   * Getter for the amount associated with the credit card.
   *
   * @returns {number} - The amount.
   */
  getAmount(): number {
    return this.amount;
  }

  /**
   * Setter for the amount associated with the credit card.
   *
   * @returns {number} - The amount.
   */
  setAmount(amount: number): void {
    this.amount = amount;
  }

  /**
   * Getter for the holder associated with the credit card.
   *
   * @returns {string} - The amount.
   */
  getAccountHolder(): string {
    return this.accountHolder;
  }

  getID(): string {
    return this.id;
  }
}
