"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardManagementSystem = void 0;
const constants_1 = require("./constants");
const creditCard_1 = require("./creditCard");
const security_1 = require("./service/security");
/**
 * CreditCardManagementSystem: A class representing a credit card management system.
 */
class CreditCardManagementSystem {
    /**
     * Constructor of the CreditCardManagementSystem class.
     */
    constructor() {
        this.database = new Map();
    }
    /**
     * Adds a credit card to the database.
     *
     * @param cardNumber - The card number of the credit card.
     * @param amount - The amount associated with the credit card.
     *
     * @returns {boolean} - True if the credit card is added successfully, false otherwise.
     */
    addCreditCard(name, amount) {
        const random = Math.floor(Math.random() * constants_1.cardNumbers.length);
        console.log('random: ', random);
        const cardNumber = constants_1.cardNumbers[random];
        console.log('adding: ', cardNumber);
        const encryptedCardNumber = (0, security_1.encrypt)(cardNumber);
        if (this.database.has(encryptedCardNumber)) {
            return false; // Credit card with the same card number already exists
        }
        const creditCard = new creditCard_1.CreditCard(name, encryptedCardNumber, amount);
        this.database.set(encryptedCardNumber, creditCard);
        return true;
    }
    /**
     * Retrieves a credit card from the database.
     *
     * @param cardNumber - The card number of the credit card.
     *
     * @returns {CreditCard | undefined} - The credit card if found, undefined otherwise.
     */
    getCreditCard(requestedCardNumber) {
        let details;
        this.database.forEach((card) => {
            console.log(card.getCardNumber());
            const cardNumber = (0, security_1.decrypt)(card.getCardNumber());
            console.log(cardNumber, requestedCardNumber);
            if (cardNumber === requestedCardNumber) {
                details = {
                    accountHolder: card.getAccountHolder(),
                    card: cardNumber,
                    amount: card.getAmount()
                };
            }
        });
        return details;
    }
    getAllCreditCardHolderList() {
        let cards = [];
        this.database.forEach((card) => {
            cards.push({
                name: card.getAccountHolder(),
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
    updateAmount(cardNumber, amount) {
        const creditCard = this.database.get(cardNumber);
        if (!creditCard) {
            return false; // Credit card not found
        }
        creditCard.setAmount(amount);
        return true;
    }
    /**
     * Deletes a credit card from the database.
     *
     * @param cardNumber - The card number of the credit card.
     *
     * @returns {boolean} - True if the credit card is deleted successfully, false otherwise.
     */
    deleteCreditCard(cardNumber) {
        return this.database.delete(cardNumber);
    }
}
exports.CreditCardManagementSystem = CreditCardManagementSystem;
