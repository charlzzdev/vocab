[![Vocabulary app image](https://charleseller.dev/src/assets/vocab.png)](https://vocab.charleseller.dev)
# Vocabulary App
This is a Vue app for practicing vocabulary. Users can try the game out without being logged in, but only logged in users will have their scores saved.

## Tech used
- Vue with Vuex
- Firebase

## Features
- Words that the user made a **mistake** on will have a **higher chance** of appearing again until the user guesses right
- The game is **controllable by keyboard**
  - Space key *for Start & Continue buttons*
  - Number keys *for choosing answers*
- Definitions are fetched from the **WordsAPI**
- Authentication with **Firebase**
- Store authenticated user's data in **Firestore**

## Logic
- Used a **recursive function** to ensure that a word would not be in the choices array twice
- **Cached** definitions so that in the future if a previously fetched word would be generated, it **would not be fetched again**
