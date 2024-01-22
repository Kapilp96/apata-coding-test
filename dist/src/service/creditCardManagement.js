"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardManagementSystem = void 0;
const constants_1 = require("../constants");
const creditCard_1 = require("../model/creditCard");
const gateway_1 = require("./gateway");
const security_1 = require("./security");
const uuid_1 = require("uuid");
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
        const cardNumber = constants_1.cardNumbers[random];
        console.log("adding: ", cardNumber);
        const encryptedCardNumber = (0, security_1.encrypt)(cardNumber);
        const id = (0, uuid_1.v4)();
        if (this.database.has(encryptedCardNumber)) {
            const card = this.database.get(encryptedCardNumber);
            return {
                statusCode: 409,
                id: card ? card.getID() : "", // Credit card with the same card number already exists
            };
        }
        const creditCard = new creditCard_1.CreditCard(id, name, encryptedCardNumber, amount);
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
    getCreditCard(requestedID) {
        let details;
        this.database.forEach((card) => {
            const associatedId = card.getID();
            if (associatedId === requestedID) {
                details = {
                    accountHolder: card.getAccountHolder(),
                    cardNumber: (0, security_1.decrypt)(card.getCardNumber()),
                    amount: card.getAmount(),
                    id: card.getID(),
                };
            }
        });
        return details;
    }
    getAllCreditCardHolderList() {
        let cards = [];
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
    updateAmount(requestedID, amount) {
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
    deleteCreditCard(requestedID) {
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
    chargeAmount(cardNumber, amount) {
        return gateway_1.PaymentGateway.processTransaction(this.database, constants_1.transactionTypes.CHARGE, cardNumber, amount);
    }
    creditAmount(cardNumber, amount) {
        return gateway_1.PaymentGateway.processTransaction(this.database, constants_1.transactionTypes.CREDIT, cardNumber, amount);
    }
}
exports.CreditCardManagementSystem = CreditCardManagementSystem;
