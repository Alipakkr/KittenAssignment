## 😸 Exploding Kitten

## Introduction
👋 Welcome! The objective of this exercise is to build a web-based game. 

This will be an online single-player card game that consists of 4 different types of cards

- Cat card 😼
- Defuse card 🙅‍♂️
- Shuffle card 🔀
- Exploding kitten card 💣

There will be a button to start the game. When the game is started there will be a deck of 5 cards ordered randomly. Each time user clicks on the deck a card is revealed and that card is removed from the deck. A player wins the game once he draws all 5 cards from the deck and there is no card left to draw. 

Rules –
- If the card drawn from the deck is a cat card, then the card is removed from the deck.
- If the card is exploding kitten (bomb) then the player loses the game.
- If the card is a defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.
- If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.

Now create a **react** app using redux which allows a player to draw a random card from the deck once the game is started.

Allow users to create a username to enter the game and create a leaderboard to record how many games they won

You need to use **Redis** as a database to store the points of all the users and **Golang** for the backend. One game won is equal to one point. 

**Bonus -**

1. Automatically save the game for a user at every stage so the user can continue from where he left off last time.
2. Real-time update of points on the leaderboard for all the users if they are playing simultaneously.

## Project Type
Fullstack

## Deplolyed App
- Frontend: https://kittenalipa.vercel.app/
- Backend: https://kittenassignment.onrender.com

## Directory Structure
my-app/
- ├─ backend/
- ├─ frontend/


## Video Walkthrough of the project
Attach a very short video walkthough of all of the features [ 1 - 3 minutes ]

## Video Walkthrough of the codebase
Attach a very short video walkthough of codebase [ 1 - 5 minutes ]

## Features
- Gameplay: Implement the core gameplay mechanics of Exploding Kittens, including drawing cards from the deck, defusing exploding kittens, shuffling the deck, and handling game over scenarios.

- User Profile: Provide users with a profile page where they can view their game statistics, such as the number of matches won and their current deck configuration.

- Real-time Updates: Utilize WebSockets or other real-time communication technologies to provide a seamless multiplayer experience, allowing multiple players to interact with the game board simultaneously.

- Leaderboards: Implement leaderboards to showcase the top players based on various metrics, such as the number of matches won or the highest score achieved.

## design decisions or assumptions
List your design desissions & assumptions

### Prerequisites
- Node.js and npm should be installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository or download the project files from the provided source.
   ```bash
   git clone <(https://github.com/Alipakkr/KittenAssignment.git)>


## Credentials
Provide user credentials for autheticated pages

## APIs Used

If your application relies on external APIs, document them and include any necessary links or references.

## API Endpoints

In case of Backend Applications provide a list of your API endpoints, methods, brief descriptions, and examples of request/response.

- **GET /api/items**
  - Description: Retrieve all items.
  - Request Method: GET
  - Example:
    ```http
    GET /api/items HTTP/1.1
    Host: example.com
    ```

- **POST /api/items**
  - Description: Create a new item.
  - Request Method: POST
  - Example:
    ```http
    POST /api/items HTTP/1.1
    Host: example.com
    Content-Type: application/json

    {
      "name": "New Item",
      "description": "Description of the new item"
    }
    ```

- **PUT /api/items/:id**
  - Description: Update an existing item.
  - Request Method: PUT
  - Example:
    ```http
    PUT /api/items/123 HTTP/1.1
    Host: example.com
    Content-Type: application/json

    {
      "name": "Updated Item",
      "description": "Updated description of the item"
    }
    ```

- **DELETE /api/items/:id**
  - Description: Delete an item by ID.
  - Request Method: DELETE
  - Example:
    ```http
    DELETE /api/items/123 HTTP/1.1
    Host: example.com
    ```

## Technology Stack
List and provide a brief overview of the technologies used in the project.
- React.js
- Node.js
- Redis
- Express.js
- MongoDB
- Socket.io
- Auth.io
- Chakra-ui
