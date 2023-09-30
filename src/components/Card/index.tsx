import React from "react";
import { formatNumber } from "../../helpers/number.helper";
import Button from "../Button";
import "./index.css";

interface ICardProps {
  title: string;
  price: number;
  image?: string;
  selected?: boolean;
  onSelect: () => void;
}

const FallbackImage: React.FC = () => {
  return <img className="cardImage" src="/assets/images/default.png" />;
};

const Card: React.FC<ICardProps> = ({ title, price, selected, image, onSelect }) => {
  const [isImageError, setIsImageError] = React.useState<boolean>(false);

  return (
    <div className="cardContainer">
      <div className="cardImageWrapper">
        {image && !isImageError ? (
          <img className="cardImage existed" src={image} onError={() => setIsImageError(true)} />
        ) : (
          <FallbackImage />
        )}
      </div>
      <div className="cardDetailWrapper">
        <p className="cardTitle">{title}</p>
        <p className="cardPrice">{formatNumber(price)} THB/Day</p>
        <Button
          classes="cardActionBtn"
          title={selected ? "Added" : "Add to cart"}
          onClick={onSelect}
          disabled={selected}
        />
      </div>
    </div>
  );
};

export default Card;
