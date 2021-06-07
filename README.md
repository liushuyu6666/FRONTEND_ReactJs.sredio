### Run the app

use `npm start` to run the application
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

proxy: http://localhost:5000

### architecture

- `Services` interact with backend
  - `restClient.js` get and post method
  - `session.js` interact with backend to start and close a session, return a `Promise`.
  - `symbols.js` interact with backend to play the role once, return a `Promise`.
- `component` react component
  - `Home.js` home page component.

### dependencies

- "bootstrap": "^5.0.1",
- "react": "^17.0.2",
- "react-dom": "^17.0.2",
- "react-router-dom": "^5.2.0",
