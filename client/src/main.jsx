import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// the provider and store are related to redux
// redux is used to retain the global state of a user, for instance.

// REDUX PERSIST:  is a library for persisting Redux state to storage, such as the browser's local storage
//  It enables you to save and rehydrate the Redux store across browser sessions or app restarts,
// ensuring that user data remains available even after the application is closed or refreshed.

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>
);
