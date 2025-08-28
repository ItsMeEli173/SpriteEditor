import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
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
    <BrowserRouter basename="/SpriteEditor">
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
    </BrowserRouter>
  );
}

export default App;
