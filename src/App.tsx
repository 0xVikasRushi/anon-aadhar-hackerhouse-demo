import { useSDK, useAddress } from "@thirdweb-dev/react";
import { useState } from "react";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "@anon-aadhaar/react";

function App() {
  const sdk = useSDK();
  const address = useAddress();
  const [anonAadhaar] = useAnonAadhaar();
  const [signature, setSignature] = useState("");
  const [message, setMessage] = useState(
    "AnonAadhaar verification successful!"
  );

  const signMessage = async () => {
    if (!sdk || !address) {
      console.log("SDK not initialized or wallet not connected");
      return;
    }

    try {
      const signer = await sdk.getSigner()!;
      const sig = await signer.signMessage(message);
      setSignature(sig);
      console.log("Signature:", sig);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>AnonAadhaar Verification and Message Signing</h1>

      <div style={styles.card}>
        <h2 style={styles.subtitle}>Step 1: Verify with AnonAadhaar</h2>
        <LogInWithAnonAadhaar nullifierSeed={0} />
        <p style={styles.status}>
          Status: <span style={styles.statusText}>{anonAadhaar?.status}</span>
        </p>
      </div>

      {anonAadhaar?.status === "logged-in" && (
        <div style={styles.card}>
          <h2 style={styles.subtitle}>Step 2: Sign Verified Message</h2>
          <input
            style={styles.input}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message to sign"
          />
          <button
            style={styles.button}
            onClick={signMessage}
            disabled={!address}
          >
            Sign Message
          </button>
          {signature && (
            <div style={styles.signatureBox}>
              <h3 style={styles.subtitle}>Signature:</h3>
              <h2 style={{ color: "black" }}>{signature}</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  card: {
    background: "#f9f9f9",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  subtitle: {
    color: "#444",
    marginBottom: "15px",
  },
  status: {
    marginTop: "15px",
  },
  statusText: {
    fontWeight: "bold",
    color: "#007bff",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  signatureBox: {
    marginTop: "20px",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    resize: "vertical",
  },
};

export default App;
