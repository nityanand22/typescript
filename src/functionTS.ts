// ----------------------
// Function Parameters & Return Types
// ----------------------

function makeChai(type: string, cups: number) {
  console.log(`Making ${cups} cups of ${type} chai.`);
}
// ↑ Function parameters ke types explicitly defined hain
// type → string, cups → number
// Agar galat type pass kiya to compile-time error milega

makeChai("Masala", 2); // ✅ correct call

// ----------------------
// Function Return Type
// ----------------------

function getPrice(): number {
  return 100;
}
// ↑ : number → function hamesha number return karega
// Agar return statement missing ho ya non-number return kare
// to TypeScript error dega

// ----------------------
// Union Return Type
// ----------------------

function makeOrder(order: string): string | null {
  // ↑ Function ya to string return karega ya null
  // Union types real-world scenarios me common hote hain
  // (success / failure, data / no-data)

  if (!order) return null;
  return order;
}

// ----------------------
// void Return Type
// ----------------------

// void ka matlab:
// function sirf kaam karega (side-effects)
// koi meaningful value return nahi karega

// Example:
// function logChai(): void {
//   console.log("Chai is ready");
// }

// ----------------------
// Optional vs Default Parameters
// ----------------------

// Preferred way (commented example):
// function orderChai(type?: string) {
// }
// ↑ type? → parameter optional hai
// Function call ke time argument dena bhi allowed hai aur skip bhi

function orderChai(type: string = "something") {}
// ↑ Default parameter
// Agar argument nahi diya to "something" automatically assign ho jayega
// Default parameters internally optional hi hote hain
// Ye optional parameter se zyada safe hota hai

// ----------------------
// Object as Function Parameter
// ----------------------

function createChai(order: {
  name: string;
  quantity: number;
  price: number;
  isHot: boolean;
}): number {
  // ↑ order parameter ek OBJECT hai jiska structure fixed hai
  // Function call ke time exact ye properties deni hi padengi

  return 4;
}
// ↑ Return type number hai
// Ye usually status code / count / id jaise values ke liye hota hai

// Parameters → type define karo (string, number, object)
// Return type → function kya de raha hai clearly likho
// void → sirf kaam, no return
// string | null → union return types
// type? → optional parameter
// param = default → safer optional parameter
// object parameters → shape strictly enforced
