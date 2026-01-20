import Card from "./components/Card";
import Counter from "./components/Counter";
import Forms from "./components/Forms";
import ItemList from "./components/ItemList";
import Layout from "./components/Layout";
import type { List } from "./types/types";

const menu: List[] = [
  {
    id: 1,
    name: "something",
    price: 40,
  },
];

function App() {
  return (
    <>
      <div>
        <Card name={"Headphones"} price={1000} />
        <Counter />
        <ItemList items={menu} />
        <Forms
          onsubmit={(order) => {
            console.log("order placed", order.cups, order.name);
            // ((order.name = "soomething"), (order.cups = 10));
          }}
        />

        <Layout
          title="something"
          description="something"
          footer={<p>something</p>}
        />
      </div>
    </>
  );
}

export default App;
