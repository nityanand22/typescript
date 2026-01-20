// ===============================
// INTERFACES IN TYPESCRIPT
// ===============================

interface Chai {
  flavour: string; // required property
  price: number; // required property
  milk?: boolean; // optional property (may or may not exist)
  // `?` means: object can exist WITHOUT this key
}

const masala: Chai = {
  flavour: "Masala",
  price: 100,
  // milk is optional, so no error if omitted
};

// -------------------------------
// readonly in interfaces
// -------------------------------

interface Shop {
  readonly id: number; // once assigned, cannot be changed
  name: string;
}

const s: Shop = {
  id: 1,
  name: "Chai Corner",
};

// s.id = 2 ❌ Error: Cannot assign to 'id' because it is a read-only property
// readonly protects data from accidental mutation

// -------------------------------
// Function-type interface
// -------------------------------

interface DiscountCalculator {
  (price: number): number;
  // This means: any function that
  // - takes a number
  // - returns a number
}

const apply50: DiscountCalculator = (price) => {
  return price * 0.5;
};

// Why use function interfaces?
// - Enforces function signature
// - Very useful in callbacks, utilities, APIs
// - Improves readability and contracts

// -------------------------------
// Interface for object with methods
// -------------------------------

interface TeaMachine {
  start(prize: number): void;
  stop(): void;
}

// agar koi object TeaMachine type ka hai
// to start aur stop function hona hi chahiye
// (both methods are mandatory)

const teaMachine: TeaMachine = {
  start: (price) => {
    console.log(price);
  },
  stop: () => {
    console.log("stop");
  },
};

// If even one method is missing → TypeScript error

// -------------------------------
// Index Signatures
// -------------------------------

interface ChaiRatings {
  [flavour: string]: number;
  // key can be ANY string
  // value must always be number
}

const ratings: ChaiRatings = {
  masala: 4,
  cardamom: 5,
};

// Useful when:
// - keys are dynamic
// - object behaves like a dictionary / map

// -------------------------------
// Interface Declaration Merging
// -------------------------------

// assume coming from any library
interface User {
  name: string;
}

// defined by us
interface User {
  age: number;
}

// TypeScript merges them automatically
// Final User = { name: string; age: number }

const u: User = {
  name: "Nityanand",
  age: 25,
};

// ⚠️ Important:
// - Interfaces support declaration merging
// - Types (`type User = {}`) DO NOT merge

// -------------------------------
// Interface extension (inheritance-like)
// -------------------------------

interface Teacher extends User {
  subject: string;
}

// Teacher now has:
// name (from User)
// age (from User)
// subject (own)

const t: Teacher = {
  name: "Nityanand",
  age: 25,
  subject: "Maths",
};

// Interfaces are best for:
// - object shapes
// - public APIs
// - library definitions

// ===============================
// GENERICS
// ===============================

// Generic function
function wrapInAray<T>(item: T): T[] {
  // T is a placeholder type
  // Whatever type comes in → same type goes out
  return [item];
}

// Explicit generic
const result = wrapInAray<string>("Nityanand");
// You explicitly told TS: T = string

// Inferred generics
wrapInAray("hello"); // T inferred as string
wrapInAray(123); // T inferred as number
wrapInAray({ name: "Nityanand" }); // T inferred as object

// These are NOT different generics
// It's the SAME function
// Difference is:
// - Explicit → you tell TS the type
// - Inferred → TS figures it out

// -------------------------------
// Multiple Generics
// -------------------------------

function pair<K, V>(key: K, value: V): [K, V] {
  // returns a tuple
  return [key, value];
}

pair("name", "Nityanand"); // K = string, V = string
pair(1, { name: "Nityanand" }); // K = number, V = object

// "order matters" explanation:
// pair<K, V>(key, value)
// so first argument decides K, second decides V
// pair("Nityanand", 1) is valid TYPE-wise,
// but semantically depends on your use-case

// -------------------------------
// Generic Interface
// -------------------------------

interface Box<T> {
  content: T;
  // Box does not care what T is
  // User decides at usage time
}

const numberBox: Box<number> = {
  content: 123,
};

const stringBox: Box<string> = {
  content: "Nityanand",
};

// Same interface, different types → reuse without duplication

// -------------------------------
// Utility Types (mention)
// -------------------------------

// Partial<T> → makes all properties optional
// Pick<T, K> → picks specific keys
// Omit<T, K> → removes specific keys
// (You’ll use these heavily in APIs & forms)

// -------------------------------
// Generics in APIs & Promises
// -------------------------------

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Here T = { name: string }
const apiResponse: ApiResponse<{ name: string }> = {
  data: { name: "Nityanand" },
  // Because T is object, data must match same shape
  status: 200,
  message: "Success",
};

// Why this is powerful:
// - API response structure stays same
// - data type changes based on endpoint
// - full type safety + autocompletion

// Example real-world:
// ApiResponse<User>
// ApiResponse<Product[]>
// ApiResponse<Order>

// ===============================
// FINAL SUMMARY (REVISION NOTES)
// ===============================

/*
INTERFACES:
- Describe object shape
- Can be merged
- Can be extended
- Best for public contracts

readonly:
- Prevents reassignment after creation

Index signature:
- For dynamic keys

GENERICS:
- Write reusable, type-safe code
- Explicit generics = control
- Inferred generics = convenience
- Same function, different types

Generic interfaces:
- Used heavily in APIs, state, components

APIs:
- Generics make response reusable + safe
*/
