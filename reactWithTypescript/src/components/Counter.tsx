import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <p>Cups Orderd: {count}</p>
      <button onClick={() => setCount((p) => p + 1)}>Click me</button>
    </div>
  );
};

export default Counter;
