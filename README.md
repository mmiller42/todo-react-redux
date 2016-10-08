# todo-react-redux

A todo list application written in React and Redux.

This was built to experiment with a few new technologies. Among them:

* [react-redux](https://github.com/reactjs/react-redux)
* [redux-actions](https://github.com/acdlite/redux-actions)
* [redux-promise-middleware](https://github.com/pburtchaell/redux-promise-middleware)
* [redux-ui](https://github.com/mmiller42/redux-ui)
* [superagent](http://visionmedia.github.io/superagent/)

## Installation

1. Clone the repository to your computer and enter it.

   ```sh
   git clone https://github.com/mmiller42/todo-react-redux.git
   cd todo-react-redux
   ```

1. Install the dependencies for the UI.

   ```sh
   cd ui
   npm install
   ```

1. Install the dependencies for the API.

   ```sh
   cd api
   npm install
   ```

## Running

The app requires both the API and UI processes running.

1. To start the API in development mode, use the start command. This will start a nodemon process which watches for
   changes in the source and automatically transpiles ES6 and restarts the server. The API runs on port 3000 by default.

   ```sh
   cd api
   npm start
   ```

1. To start the UI in development mode, use the run dev command. This will start a Webpack process which watches for
   changes in the source and hot-reloads the interface. The UI runs on port 8080 by default.

   ```sh
   cd ui
   npm run dev
   open http://localhost:8080/
   ```

