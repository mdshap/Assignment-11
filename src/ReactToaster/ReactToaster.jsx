import React from 'react';
import { Toaster } from "react-hot-toast";

const ReactToaster = () => {
    return (
        

<Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    
    style: {
      fontSize: "16px",        
      padding: "12px 18px",    
      borderRadius: "10px",      
      background: "#333",        
      color: "#fff",             
    },


    success: {
      style: {
        background: "#22c55e",   
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
      },
      iconTheme: {
        primary: "white",
        secondary: "#22c55e",
      },
    },

    error: {
      style: {
        background: "#ef4444",   
        color: "white",
        fontWeight: "600",
        fontSize: "16px",
      },
      iconTheme: {
        primary: "white",
        secondary: "#ef4444",
      },
    },
  }}
/>

    );
};

export default ReactToaster;