import { transactionTypes } from "../constants";
import { CreditCard } from "../model/creditCard";
import { encrypt } from "./security";

/**
 * PaymentGateway: A class representing a payment gateway.
 */
export class PaymentGateway {
  /**
   * Simulated method to process credit card transactions.
   *
   * @param cardNumber - The card number of the credit card.
   * @param amount - The amount associated with the credit card.
   *
   * @returns {boolean} - True if the transaction is successful, false otherwise.
   */
  static processTransaction(
    database: Map<string, CreditCard>,
    type: string,
    cardNumber: string,
    amount: number
  ): boolean | Error {
    if (type === transactionTypes.CHARGE) {
      console.log("process transaction", type, cardNumber, amount);
      const encryptedCardNumber = encrypt(cardNumber);

      const creditCard = database.get(encryptedCardNumber);

      if (!creditCard) {
        return false;
      }

      creditCard.setAmount(creditCard.getAmount() - amount);

      return true;
    } else if (type === transactionTypes.CREDIT) {
      const encryptedCardNumber = encrypt(cardNumber);

      const creditCard = database.get(encryptedCardNumber);

      if (!creditCard) {
        return false;
      }

      creditCard.setAmount(creditCard.getAmount() + amount);

      return true;
    }

    return new Error("Invalid transactionType");
  }
}
