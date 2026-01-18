// ----------------------
// Arrays in TypeScript
// ----------------------

const chaiFlavours: string[] = ["Masala", "Ginger", "Elaichi"];
// ↑ string[] → array jisme sirf strings allowed hain

const chaiPrice: number[] = [100, 120, 150];
// ↑ number[] → array jisme sirf numbers allowed hain

const rating: Array<number> = [4.5, 4.6, 4.7];
// ↑ Array<number> aur number[] dono SAME hain
// Ye bas do syntax hain, internally behavior same hota hai

// ----------------------
// Array of Objects
// ----------------------

type Chai = {
  name: string;
  price: number;
};

const menu: Chai[] = [
  {
    name: "Masala",
    price: 100,
  },
  {
    name: "Ginger",
    price: 120,
  },
];
// ↑ Chai[] → array jisme har element Chai type ka object hoga
// Agar kisi object me name ya price missing hua to error aayega

// ----------------------
// Readonly Arrays
// ----------------------

// readonly array → define once, baad me modify nahi kar sakte

// both are same (preferred practices)
// const cities: ReadonlyArray<string> = ["Delhi", "Pune"]
const cities: readonly string[] = ["Delhi", "Pune"];
// ↑ readonly ka matlab:
// - push / pop / splice ❌
// - element reassignment ❌
// - sirf read allowed ✔

cities.push("Mumbai"); // ❌ error: readonly array can't be mutated

// ----------------------
// Multidimensional Arrays
// ----------------------

const table: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
// ↑ number[][] → array of arrays of numbers
// Mostly matrix / grid type data ke liye use hota hai

// ----------------------
// Tuples
// ----------------------

// tuple → fixed length + fixed order + fixed types

let chaiTuple: [string, number, boolean];

chaiTuple = ["Masala", 100, true]; // ✅ correct order
chaiTuple = [100, "Masala", true]; // ❌ error, order matters
// ↑ tuple me POSITION important hoti hai, sirf type nahi

let userInfo: [string, number, boolean?];
// ↑ boolean? → optional element
// Matlab tuple me third value ho bhi sakti hai ya nahi bhi

userInfo = ["Nityanand", 10]; // ✅ allowed
userInfo = ["Nityanand", 10, true]; // ✅ allowed

// ----------------------
// Readonly Tuples
// ----------------------

const user: readonly [string, number] = ["Nityanand", 10];
// ↑ readonly tuple → values change nahi kar sakte

user.push(20);
// ❌ error: readonly tuple
// Note: readonly tuple me even push/pop bhi allowed nahi hote

// ----------------------
// Named Tuples
// ----------------------

const chaiItems: [name: string, price: number] = ["Masala", 100];
// ↑ Named tuple sirf readability ke liye hota hai
// Runtime pe koi farak nahi padta, bas developer ko context milta hai

// ----------------------
// Enums (Numeric Enum)
// ----------------------

enum CupSize {
  SMALL,
  MEDIUM,
  LARGE,
}
// ↑ Default numeric enum
// SMALL = 0, MEDIUM = 1, LARGE = 2

const size = CupSize.SMALL;

enum status {
  PENDING = 100,
  SUCCESS = 200,
  ERROR = 300,
}
// ↑ Yahan explicitly values di hain

// Important rule:
// Agar sirf FIRST member ko number do,
// baaki automatically increment hote hain
// Example:
// PENDING = 100
// SUCCESS = 101
// ERROR = 102

// ❓ Question 1:
// what if i assign the first one string then what happens?

// ✅ Answer:
// Agar enum me ek member string ho gaya,
// to BAAKI sabko bhi explicitly string dena padega
// Auto increment STRING enums me allowed nahi hai ❌

// ❓ Question 2:
// what if i assign second a value not first then what first will get?

// ❌ Ye allowed nahi hai
// Numeric enum me agar first value missing ho
// aur second ko value di,
// to TypeScript error dega
// Because auto increment ko starting point nahi milta

// ----------------------
// String Enums
// ----------------------

enum ChaiType {
  MASALA = "Masala",
  GINGER = "Ginger",
  ELAICHI = "Elaichi",
}
// ↑ String enums me:
// - auto increment ❌
// - values readable hoti hain ✔
// - debugging & API values ke liye best ✔

function makeChai(type: ChaiType) {
  console.log(`Making ${type} chai.`);
}

makeChai(ChaiType.MASALA); // ✅ valid
makeChai("Ginger"); // ❌ error
// ↑ Direct string allowed nahi hai
// Sirf enum ke predefined values allowed hain

// Rule of thumb:
// enum ya to PURE number enum ho
// ya PURE string enum
// Mix karna bad practice hai

// ----------------------
// const enum
// ----------------------

// enum ke pehle const lagane se
// runtime pe enum object generate nahi hota
// Values compile-time pe inline ho jaati hain
// Performance + smaller JS bundle

const enum Sugers {
  NORMAL = 2,
  LESS = 1,
  NONE = 0,
}

const s = Sugers.NORMAL;
// ↑ JS output me sirf number "2" hoga

// ----------------------
// Important Tuple Reality Check
// ----------------------

const t: [string, number] = ["Nityanand", 10];

t.push("hello"); // ⚠ allowed by TypeScript
// "hello" string hai
// tuple ke existing element types = string | number
// string ∈ (string | number) → isliye allowed

t.push(true);
// ❌ ERROR
// Argument of type 'boolean' is not assignable to parameter of type 'string | number'

// IMPORTANT CORRECT CONCEPT 👇
// Tuple runtime pe ARRAY hi hota hai (JavaScript level pe)
// Lekin TypeScript type-safety enforce karta hai

// Rule:
// Tuple me push kiya gaya value
// tuple ke EXISTING element types me se ek hona chahiye

// [string, number] → push() sirf string | number accept karega
// boolean allowed nahi hoga

// Isliye:
// t.push("text") ✅
// t.push(123)    ✅
// t.push(true)   ❌

// Best practice:
// - tuple ko fixed data ke liye use karo
// - push/pop avoid karo
// - ya readonly tuple use karo for full safety
