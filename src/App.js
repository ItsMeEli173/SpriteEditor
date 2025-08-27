import React, { useState } from "react";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [spriteSize, setSpriteSize] = useState(null);

  const handleSizeSelected = (size) => {
    setSpriteSize(size);
  };

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {!spriteSize ? (
          <Home onSizeSelected={handleSizeSelected} />
        ) : (
          <Editor spriteSize={spriteSize} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
