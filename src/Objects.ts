const chai = {
  name: "Masala chai",
  price: 100,
  isHot: true,
};
// ↑ Normal JavaScript object
// TypeScript yahan automatically (implicitly) types infer karta hai,
// lekin ye object reusable type/contract nahi banata.
// Agar baad me galat value assign hui to pehle hi warn milna mushkil hota hai.

// declaring object types (Type Alias)
type Chai = {
  name: string;
  price: number;
  isHot: boolean;
};
// ↑ Ye ek blueprint / contract hai
// Jo bhi object "Chai" type ka hoga usme
// name, price aur isHot EXACT types ke sath hone hi chahiye

const chai2: Chai = {
  name: "Masala chai",
  price: 100,
  isHot: true,
};
// ↑ chai2 ko explicitly Chai type assign kiya gaya hai
// Agar koi property missing ho ya wrong type ho,
// TypeScript compile-time error de dega

// alias object types with array properties
type Tea = {
  name: string;
  price: number;
  ingredients: string[];
};
// ↑ ingredients: string[] ka matlab hai
// sirf string values ka array allowed hai (numbers/objects nahi)

const tea: Tea = {
  name: "Masala chai",
  price: 100,
  ingredients: ["Masala", "Water"],
};
// ↑ Ye object Tea type ke structure ko perfectly follow karta hai

// ----------------------
// Structural Typing Concept
// ----------------------

type Cup = { size: string };

let smallCup: Cup = { size: "200ml" };
// ↑ Cup type sirf "size" property demand karta hai

let bigCup = { size: "500ml", material: "steel" };

smallCup = bigCup;
// ↑ Yahan TypeScript STRUCTURE check karta hai, name nahi
// Cup ko sirf size chahiye
// bigCup ke paas size hai + extra material bhi hai (allowed)
// Extra properties chal jaati hain, missing properties nahi
// Is concept ko Structural Typing kehte hain

// ----------------------
// Splitting complex data types
// ----------------------

type Item = { name: string; quantity: number };
type Address = { street: string; pin: number };

type Order = {
  id: string;
  items: Item[];
  address: Address;
};
// ↑ Bade object ko chhote reusable types me tod diya
// Code readable, maintainable aur scalable ho jata hai

// ----------------------
// Utility Type: Partial
// ----------------------

type Chaii = {
  name: string;
  price: number;
  isHot: boolean;
};

const updateChai = (update: Partial<Chaii>) => {
  console.log(update);
};
// ↑ Partial<T> sare fields ko OPTIONAL bana deta hai
// Iska use UPDATE APIs me hota hai
// Jahan hume pura object nahi, sirf changed fields bhejne hote hain
// Downside: empty object {} bhi allowed ho jata hai

updateChai({ isHot: true });
updateChai({ name: "Ginger chai" });
updateChai({});
// ↑ Last case logically risky hai, kyunki empty update ka koi meaning nahi

// ----------------------
// Utility Type: Required
// ----------------------

type ChaiOrder = {
  name?: string;
  quantity?: number;
};
// ↑ Yahan properties optional hain

const placeaorder = (order: Required<ChaiOrder>) => {
  console.log(order);
};
// ↑ Required<T> optional fields ko mandatory bana deta hai
// Ab name aur quantity dono dena hi padega

placeaorder({
  name: "Masala chai",
  quantity: 10,
});
// ↑ Agar koi field miss hui to TypeScript error aayega

// ----------------------
// Pick and Omit in objects (next topic)
// Pick → kuch selected fields uthata hai
// Omit → kuch selected fields hata deta hai
// ----------------------

// ----------------------
// Pick and Omit in objects
// ----------------------

// Base type jise hum reuse karenge
type FullChaiOrder = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  isHot: boolean;
};

// ----------------------
// Pick Utility Type
// ----------------------

type ChaiSummary = Pick<FullChaiOrder, "name" | "price">;
// ↑ Pick<T, Keys> sirf selected properties ko uthata hai
// Yahan hum FullChaiOrder me se sirf name aur price le rahe hain
// Baaki fields (id, quantity, isHot) automatically remove ho jati hain

const chaiSummary: ChaiSummary = {
  name: "Masala chai",
  price: 100,
};
// ↑ Ye object sirf name aur price allow karega
// Agar yahan extra field add ki to error aayega

// Example use-case:
// Listing page / UI card / dropdown
// Jahan hume sirf limited data dikhana hota hai

// ----------------------
// Omit Utility Type
// ----------------------

type ChaiWithoutId = Omit<FullChaiOrder, "id">;
// ↑ Omit<T, Keys> selected properties ko hata deta hai
// Yahan hum id remove kar rahe hain
// Baaki sab properties automatically reh jaati hain

const chaiOrderWithoutId: ChaiWithoutId = {
  name: "Ginger chai",
  quantity: 2,
  price: 120,
  isHot: true,
};
// ↑ id dene ki zarurat nahi
// Ye mostly CREATE APIs me use hota hai
// Kyunki id backend / database generate karta hai

// ----------------------
// Real-world API Style Example
// ----------------------

// Frontend se create-order request bhejna
type CreateChaiOrderPayload = Omit<FullChaiOrder, "id">;

const createOrder = (payload: CreateChaiOrderPayload) => {
  console.log("Creating order:", payload);
};
// ↑ Frontend id nahi bhejta
// Backend id generate karta hai

createOrder({
  name: "Masala chai",
  quantity: 3,
  price: 100,
  isHot: true,
});

// ----------------------
// Pick + Partial together (advanced but very common)
// ----------------------

type UpdateChaiPayload = Partial<Pick<FullChaiOrder, "price" | "isHot">>;
// ↑ Pehle Pick se sirf price aur isHot nikala
// Phir Partial lagake dono ko optional bana diya
// Perfect for PATCH / UPDATE APIs

const updateChaiOrder = (payload: UpdateChaiPayload) => {
  console.log("Updating chai:", payload);
};

updateChaiOrder({ price: 110 });
updateChaiOrder({ isHot: false });
updateChaiOrder({});
// ↑ Empty object technically allowed hai (Partial ki wajah se)
// Real apps me usually validation lagayi jaati hai

// ----------------------
// Summary (comment form for future reference)
// ----------------------

// Partial<T>  → sare fields optional bana deta hai
// Required<T> → sare fields mandatory bana deta hai
// Pick<T, K>  → sirf selected fields uthata hai
// Omit<T, K>  → selected fields hata deta hai
// Structural Typing → sirf structure match hona chahiye, name nahi
