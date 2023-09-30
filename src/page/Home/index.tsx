import React from "react";
import { ICarResponse, getCarList } from "../../api/car";
import "./index.css";
import Card from "../../components/Card";

interface IHomeProps {
  cart: ICarResponse[];
  handleAdd: (newItem: ICarResponse) => void;
}

interface ISort {
  sort: "asc" | "desc";
  target: "title" | "price";
}

const SORT_LIST = ["Price: Low - High", "Price: High - Low", "Title: A - Z", "Title: Z - A"];

const extractSort = (sortName: string): ISort => {
  switch (sortName) {
    case "Title: A - Z":
      return { sort: "asc", target: "title" };
    case "Title: Z - A":
      return { sort: "desc", target: "title" };
    case "Price: High - Low":
      return { sort: "desc", target: "price" };
    case "Price: Low - High":
    default:
      return { sort: "asc", target: "price" };
  }
};

const Home: React.FC<IHomeProps> = ({ cart, handleAdd }) => {
  const [carList, setCarList] = React.useState<ICarResponse[]>([]);
  const [search, setSearch] = React.useState<string>("");
  const [sort, setSort] = React.useState<ISort>({ sort: "asc", target: "price" });

  React.useEffect(() => {
    const initialPage = async (): Promise<void> => {
      const cars = await getCarList();

      setCarList(cars.items);
    };

    initialPage();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(extractSort(event.target.value));
  };

  const renderCars = React.useCallback(
    () =>
      carList
        .sort((a, b) => {
          if (sort.target === "price") {
            if (sort.sort === "asc") return a.fields[sort.target] - b.fields[sort.target];
            else return b.fields[sort.target] - a.fields[sort.target];
          } else {
            return (
              (sort.sort === "asc" ? 1 : -1) *
              a.fields[sort.target].localeCompare(b.fields[sort.target])
            );
          }
        })
        .filter(({ fields }) => fields.title.includes(search))
        .map(({ fields, sys }) => (
          <Card
            key={sys.id}
            title={fields.title}
            price={fields.price}
            image={fields.photo}
            selected={!!cart.find((item) => item.sys.id === sys.id)}
            onSelect={() => handleAdd({ fields, sys })}
          />
        )),
    [carList, search, sort, cart]
  );

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <h1 className="homeTitle">Car Available</h1>
        <div className="homeListControl">
          <div className="search">
            <input className="input" type="text" placeholder="Search Car" onChange={handleSearch} />
          </div>
          <div className="sort">
            <img src="/assets/icons/updown.png" alt="sort" width={24} height={24} />
            <select className="input" onChange={handleSort}>
              {SORT_LIST.map((name) => (
                <option key={`sort-${name}`} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="homeCarList">{renderCars()}</div>
    </div>
  );
};

export default Home;
