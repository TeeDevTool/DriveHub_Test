import React from "react";
import { ICarResponse } from "../../api/car";
import CartModal from "../Modal";
import "./index.css";

interface IHeaderProps {
  cart: ICarResponse[];
}

const Header: React.FC<IHeaderProps> = ({ cart }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <img className="logo" src="/assets/dh-logo.svg" alt="logo" />
      <div role="button" className="headerCart" onClick={handleOpen}>
        <div className={`headerCartImg ${cart.length ? "active" : ""}`}>
          <img src="/assets/icons/cart.png" alt="sort" width={24} height={24} />
        </div>
        <p>Cart ({cart.length})</p>
      </div>
      {open && <CartModal onClose={handleClose} cart={cart} />}
    </div>
  );
};

export default Header;
