import { useState } from "react";

interface OrderFormTypes {
  onsubmit(order: { name: string; cups: number }): void;
}

const Forms = ({ onsubmit }: OrderFormTypes) => {
  const [name, setName] = useState<string>("");
  const [cups, setCups] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onsubmit({ name, cups: Number(cups) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />

      <br />
      <br />

      <label htmlFor="cups">Cups</label>
      <input
        type="number"
        value={cups}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCups(e.target.value)
        }
      />

      <button type="submit">Submit</button>
    </form>
  );
};

export default Forms;
