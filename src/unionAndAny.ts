let subs: number | string = "10M";

let apiResponse: "pending" | "success" | "error" = "pending";

let airline: "aisle" | "window" | "middle" = "window";

let orders: string[] = ["12", "26", "38", "11"];

let currentOrder: string | undefined;

for (let order in orders) {
  if (order === "26") {
    currentOrder = order;
    break;
  }
  currentOrder = "11";
}
console.log(currentOrder);
