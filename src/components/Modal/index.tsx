import React, { useEffect } from "react";
import { ICarResponse } from "../../api/car";
import { formatNumber } from "../../helpers/number.helper";
import "./index.css";
import { getDiscountCode } from "../../api/code";

interface ICartModalProps {
  onClose: () => void;
  cart: ICarResponse[];
}

interface IListProps {
  car: ICarResponse;
  amount: number;
}

interface ICarIListProps extends IListProps {
  onAdd: () => void;
  onRemove: () => void;
}

const CarList: React.FC<ICarIListProps> = ({ car, amount, onAdd, onRemove }) => {
  return (
    <div className="modalCarList">
      <div className="modalCarListHeader">
        <img src={car.fields.photo} height={54} width={87} />
        <div className="modalCarListDetail">
          <p className="modalCarListTitle">{car.fields.title}</p>
          <p className="modalCarListPrice">{`${formatNumber(car.fields.price)} THB/Day`}</p>
        </div>
      </div>
      <div className="modalCarListAmount">
        <div className="amountBtn" onClick={onAdd}>
          <img src="/assets/icons/add.png" alt="sort" width={24} height={24} />
        </div>
        {amount}
        <div className={`amountBtn ${amount > 1 ? "" : "disabled"}`} onClick={onRemove}>
          <img src="/assets/icons/remove.png" alt="sort" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

const Summary: React.FC<{ title: string; price: number }> = ({ title, price }) => {
  return (
    <div className="summary">
      <p className="summaryTitle">{title}</p>
      <p className="summaryPrice">{`${formatNumber(price)} THB`}</p>
    </div>
  );
};

const CartModal: React.FC<ICartModalProps> = ({ cart, onClose }) => {
  const [totalCart, setTotalCart] = React.useState<IListProps[]>([]);
  const [discount, setDiscount] = React.useState<number>(0);
  const code = React.useMemo(() => new Map<string, number>(), []);

  useEffect(() => {
    setTotalCart(cart.map((item) => ({ car: item, amount: 1 })));
  }, [cart]);

  useEffect(() => {
    const init = async () => {
      const response = await getDiscountCode();

      response.items.forEach(({ fields }) => {
        code.set(fields.code, fields.amount);
      });
    };

    init();
  }, []);

  const handleAdd = (target: number) => {
    setTotalCart((prevState) =>
      prevState.map((item, index) =>
        index === target ? { ...item, amount: item.amount + 1 } : item
      )
    );
  };

  const handleRemove = (target: number) => {
    setTotalCart((prevState) =>
      prevState.map((item, index) =>
        index === target ? { ...item, amount: Math.max(item.amount - 1, 0) } : item
      )
    );
  };

  const handleCode = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const val = event.target.value;
    if (val && code.has(val)) {
      setDiscount(code.get(val) ?? 0);
    }
  };

  const calculateTotal = () => {
    return totalCart.reduce((sum, item) => sum + item.amount * item.car.fields.price, 0);
  };

  const total = calculateTotal();

  return (
    <div id="cartModal" className="modal">
      <div className="modalContent">
        <div className="modalHeader">
          <p className="modalTitle">Cart</p>
          <span onClick={onClose} className="close">
            &times;
          </span>
        </div>
        <div className="modalCarListWrapper">
          {totalCart.map((item, index) => (
            <CarList
              car={item.car}
              amount={item.amount}
              onAdd={() => handleAdd(index)}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
        <div className="modalCartDiscount">
          <input type="text" placeholder="Discount code" onChange={handleCode} />
        </div>
        <div className="modalCartSummary">
          <Summary title="Total" price={total} />
          <Summary title="Discount" price={discount} />
          <Summary title="Grand Total" price={Math.max(total - discount, 0)} />
        </div>
      </div>
    </div>
  );
};

export default CartModal;
