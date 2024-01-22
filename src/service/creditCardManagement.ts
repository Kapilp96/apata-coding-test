import { cardNumbers, transactionTypes } from "../constants";
import {
  CardHolderList,
  CreditCard,
  CreditCardDetails,
} from "../model/creditCard";
import { PaymentGateway } from "./gateway";
import { encrypt, decrypt } from "./security";
import { v4 as uuidv4 } from "uuid";

/**
 * CreditCardManagementSystem: A class representing a credit card management system.
 */
export class CreditCardManagementSystem {
  private readonly database: Map<string, CreditCard>;

  /**
   * Constructor of the CreditCardManagementSystem class.
   */
  constructor() {
    this.database = new Map<string, CreditCard>();
  }

  /**
   * Adds a credit card to the database.
   *
   * @param cardNumber - The card number of the credit card.
   * @param amount - The amount associated with the credit card.
   *
   * @returns {boolean} - True if the credit card is added successfully, false otherwise.
   */
  addCreditCard(
    name: string,
    amount: number
  ): { statusCode: number; id: string } {
    const random = Math.floor(Math.random() * cardNumbers.length);

    const cardNumber = cardNumbers[random];

    console.log("adding: ", cardNumber);

    const encryptedCardNumber = encrypt(cardNumber);

    const id = uuidv4();
    if (this.database.has(encryptedCardNumber)) {
      const card = this.database.get(encryptedCardNumber);

      return {
        statusCode: 409,
        id: card ? card.getID() : "", // Credit card with the same card number already exists
      };
    }

    const creditCard = new CreditCard(id, name, encryptedCardNumber, amount);
    this.database.set(encryptedCardNumber, creditCard);

    return {
      statusCode: 200,
      id: id,
    };
  }

  /**
   * Retrieves a credit card from the database.
   *
   * @param cardNumber - The card number of the credit card.
   *
   * @returns {CreditCard | undefined} - The credit card if found, undefined otherwise.
   */
  getCreditCard(requestedID: string): CreditCardDetails | undefined {
    let details: CreditCardDetails | undefined;
    this.database.forEach((card) => {
      const associatedId = card.getID();

      if (associatedId === requestedID) {
        details = {
          accountHolder: card.getAccountHolder(),
          cardNumber: decrypt(card.getCardNumber()),
          amount: card.getAmount(),
          id: card.getID(),
        };
      }
    });

    return details;
  }

  getAllCreditCardHolderList(): CardHolderList[] {
    let cards: CardHolderList[] = [];

    this.database.forEach((card) => {
      cards.push({
        accountHolder: card.getAccountHolder(),
        id: card.getID(),
        amount: card.getAmount(),
      });
    });

    console.log(cards);

    return cards;
  }

  /**
   * Updates the amount associated with a credit card in the database.
   *
   * @param cardNumber - The card number of the credit card.
   * @param amount - The new amount to be updated.
   *
   * @returns {boolean} - True if the amount is updated successfully, false otherwise.
   */
  updateAmount(requestedID: string, amount: number): boolean {
    let isAmountUpdated = false;

    this.database.forEach((card) => {
      const associatedId = card.getID();

      if (associatedId === requestedID) {
        card.setAmount(amount);
        isAmountUpdated = true;
      }
    });

    return isAmountUpdated;
  }

  /**
   * Deletes a credit card from the database.
   *
   * @param cardNumber - The card number of the credit card.
   *
   * @returns {boolean} - True if the credit card is deleted successfully, false otherwise.
   */
  deleteCreditCard(requestedID: string): boolean {
    let isCardDeleted = false;

    this.database.forEach((card) => {
      const associatedId = card.getID();

      if (associatedId === requestedID) {
        this.database.delete(card.getCardNumber());
        isCardDeleted = true;
      }
    });

    return isCardDeleted;
  }

  chargeAmount(cardNumber: string, amount: number): boolean | Error {
    return PaymentGateway.processTransaction(
      this.database,
      transactionTypes.CHARGE,
      cardNumber,
      amount
    );
  }

  creditAmount(cardNumber: string, amount: number): boolean | Error {
    return PaymentGateway.processTransaction(
      this.database,
      transactionTypes.CREDIT,
      cardNumber,
      amount
    );
  }
}
