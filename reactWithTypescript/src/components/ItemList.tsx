import type { List } from "../types/types";
import Card from "./Card";

// i can make the different interface using the existing interface

interface ListType {
  items: List[];
}

const ItemList = ({ items }: ListType) => {
  return (
    <div>
      {items.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          price={item.price}
          isSpecial={item.price > 30}
        />
      ))}
    </div>
  );
};
export default ItemList;
