import React from "react";
import Home from "./page/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ICarResponse } from "./api/car";
import "./App.css";

function App() {
  // Normally should use Redux or useReducer instead
  const [cart, setCart] = React.useState<ICarResponse[]>([]);

  const handleAdd = (newItem: ICarResponse) => {
    setCart((prevState) => [...prevState, newItem]);
  };

  return (
    // Considor this is layout
    <div className="app-container">
      <Header cart={cart} />
      <Home cart={cart} handleAdd={handleAdd} />
      <Footer />
    </div>
  );
}

export default App;
