# apata-coding-test
## Overview
A RESTful API for a secure credit card management system integrated with a mocked payment gateway API. This API should allow users to:
● Create a new credit card account with the cardholder's name and credit limit. Credit card numbers should be stored securely to prevent exposure to bad actors.

● Retrieve a list of all credit card accounts.

● Retrieve a specific credit card account by its original card number.

● Update the credit limit of an existing credit card account.

● Delete a credit card account.

● Implement basic credit card transaction functionality, including:

  ●  Charging a credit card account for a specified amount.
  
  ● Crediting a credit card account for a specified amount.
 
## How to run and test:
1. Clone the respository.

2. Make sure node and typescript is installed. Then run `npm install`.

3. Run `npm run build` to build the project.

4. To run the unit tests, run `npm run test`.

5. To start the application, run `npm run dev`. The application will run on port 8000.

6. Once the app starts running, you can test the different endpoints using curl or Postman.

7. The api needs valid JWT token to be able to execute any request.

8. Validation has been added at some places which can be tested.

9. Make a _GET_ request to **http://localhost:8000/generate-token** to generate a valid JWT token.

10. Copy the token generated and paste it in the header section of any further requests you make. As:
    ![image](https://github.com/Kapilp96/apata-coding-test/assets/28197182/c38c2e0b-2e2d-41dc-93ac-32c45dd27240)
   
11. To add a new credit Card, make a _POST_ request to ** http://localhost:8000/credit-cards**. There's validation in place that can be tested too. Amount and name are required. _Please store the id that's returned in the response as that can be used to update or delete the card in future._
    ![image](https://github.com/Kapilp96/apata-coding-test/assets/28197182/7e1b2eb2-41b4-4ed0-8142-f67746327b18)

12. To get all credit card holder details, make a _GET_ request to** http://localhost:8000/credit-cards **
.
13. To get credit card details for specific card, make a _GET_ request to **http://localhost:8000/credit-cards/:creditCardNumber**.

14. To update the credit amount on a particular card, make a _PUT_ request to **http://localhost:8000/credit-cards/:id** where **id** is the unique id generated while adding new card.
    ![image](https://github.com/Kapilp96/apata-coding-test/assets/28197182/eca5be3d-0afc-4378-957e-e467c4155ed6)

15. To delete a credit card, make a _DELETE_ request to **http://localhost:8000/credit-cards/:id** where **id** is the unique id generated while adding new card.

16. To CHARGE a credit card with some amount, make a POST request to **http://localhost:8000/credit-cards/:creditCardNumber/charge**. Please add _amount_ in the body which needs to be charged. You can get the credit card number by making a GET request first.
    ![image](https://github.com/Kapilp96/apata-coding-test/assets/28197182/bf6ea141-fb0d-4a82-ab58-9f846b86fe0a)


17. Same can be done for CREDIT. Use **http://localhost:8000/credit-cards/:creditCardNumber/credit**.


