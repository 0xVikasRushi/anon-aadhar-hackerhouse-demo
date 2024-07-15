import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  metamaskWallet,
  rainbowWallet,
  ThirdwebProvider,
} from "@thirdweb-dev/react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={"sepolia"}
      supportedWallets={[rainbowWallet(), metamaskWallet()]}
    >
      <AnonAadhaarProvider>
        <App />
      </AnonAadhaarProvider>
    </ThirdwebProvider>
    ;
  </React.StrictMode>
);
