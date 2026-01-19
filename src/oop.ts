class Chai {
  // these are instance properties
  flavour: string;
  price: number;

  // Original commented out constructor:
  // // constructor(flavour?: string, price?: number) {
  // //   this.flavour = flavour
  // //   this.price = price
  // // }
  // Problem with that version: if flavour and price are optional (?), then
  // assigning undefined to a property typed as string/number will cause
  // type/strict-initialization issues. Either make properties optional
  // or provide default values or use `?` on the properties.

  // Current constructor:
  constructor(flavour?: string) {
    // You're assigning flavour (which could be undefined) to this.flavour.
    // If strict checks are on, TypeScript may complain that `this.price`
    // is not initialized and that `this.flavour` might be undefined.
    this.flavour = flavour;
    // price remains uninitialized here -> potential issue in strict mode.
  }
}

const masalaChai = new Chai("Masala");
masalaChai.flavour = "Masala"; // okay: flavour is public by default

// --------------------------
// Access modifiers: public, private, protected
// --------------------------

class Chaii {
  // public => accessible anywhere (default)
  public flavour: string = "Something";

  // private => accessible only INSIDE this class (not visible to subclasses).
  // In TypeScript `private` is a compile-time modifier (it prevents access
  // statically). In modern JS you can also use `#privateField` (runtime private).
  private secretIngridients = "Cardamom"; // note: 'Ingredients' spelling typo in your original comment

  reveal() {
    // Because `secretIngridients` is private, only methods inside Chaii
    // can directly access it. This `reveal()` method provides a controlled
    // way to expose it (if you want to).
    return this.secretIngridients;
  } // comment fixed: private is accessible only inside the declaring class

  // protected => accessible inside the class AND inside subclasses (child classes),
  // but NOT accessible from outside (i.e., not from instances).
  protected shopName = "Chai Corner";

  // protected is useful when you want derived classes to use or override
  // internal state, but you don't want external code to access it.
}

class Branch extends Chaii {
  getSecret() {
    // This can access protected shopName because Branch extends Chaii.
    // Branch CANNOT directly access Chaii's private fields like secretIngridients.
    return this.shopName;
  }
}

const c = new Chaii();
console.log(c); // console will show public properties; private/protected are not directly visible

const b = new Branch();
b.getSecret(); // works because protected members are accessible in subclass methods

// --------------------------
// ECMAScript private fields (#) vs TypeScript private
// --------------------------

class Wallet {
  // `#balance` is an ECMAScript private field (JS-level private). It's enforced at runtime.
  // TypeScript understands this syntax too. You cannot access `w.#balance` from outside.
  #balance = 100;

  getBalance() {
    return this.#balance;
  }
}

const w = new Wallet();
w.getBalance(); // OK
// w.#balance -> SyntaxError / not allowed from outside (runtime enforces it)

// Difference summary:
// - `private foo: number` (TypeScript) is a compile-time/private at type level.
//   After compiling to JS it becomes a normal property (unless using transforms).
// - `#foo` is a JS private field and is enforced at runtime (stronger privacy).

// --------------------------
// readonly
// --------------------------

class Cup {
  // readonly means the property can be assigned only at declaration or in constructor.
  readonly capacity: number = 250;

  constructor(capacity: number) {
    // here we assign readonly in constructor — allowed.
    // After constructor finishes, capacity cannot be changed.
    this.capacity = capacity;
  }
}

// --------------------------
// Getters and setters + underscore convention
// --------------------------

class ModernThing {
  private _sugar = 2;

  // Why `_` is used?
  // - It's a naming convention (not enforced by TS) to indicate a "private backing field".
  // - The getter `sugar` exposes a public property name while the actual storage is `_sugar`.
  // - This avoids name collision between the property and the field.
  // - You could name it anything; `_` is common in many codebases.

  get sugar() {
    // getter called when you do `m.sugar`
    return this._sugar;
  }

  set sugar(sugar: number) {
    // setter called when you do `m.sugar = value`
    if (sugar < 0) {
      throw new Error("Sugar cannot be negative");
    }
    this._sugar = sugar;
  }
}

const m = new ModernThing();

// m.sugar = 10; // This invokes the setter
// Clarification on your comment: "in js we can set the value like this but in ts we have to use setter"
// - That's not correct: both JS and TS let you set public properties directly.
// - The setter is OPTIONAL: you only need to use getter/setter if you want custom logic (validation, side effects).
// - If you had `public sugar: number` you could directly assign `m.sugar = 10` without a setter.
// - Using getter/setter creates a property-like API that can run validation on assignment.

// --------------------------
// static & constructor parameter properties
// --------------------------

class EkChai {
  static shopName = "Chai Corner";

  // `constructor(public flavour: string) {}` is a shorthand:
  // - It creates a public instance property `flavour` and assigns the constructor argument to it.
  // - Equivalent to:
  //    public flavour: string;
  //    constructor(flavour: string) { this.flavour = flavour; }
  constructor(public flavour: string) {}
}
console.log(EkChai.shopName); // static property accessed on the class itself

// --------------------------
// Abstract classes
// --------------------------

abstract class Drink {
  // An abstract method declares the method signature but no implementation.
  // Non-abstract subclasses MUST implement this method.
  abstract prepare(): void;
}

// Your comment/question:
// // yha pr Drink class abstract hai aur iske andar ek aur abstract method hai ab is class ko inherit karte hai tb same name se  ek method define krna pdega jo Drinks ke andar hai nhi to error aayega
// // => Non-abstract class 'Tea' does not implement inherited abstract member prepare from class 'Drink'.
// // ye error mujhe thik se samajh nhi aaya

// Answer (clear, step-by-step):
// - abstract class cannot be instantiated directly (`new Drink()` is illegal).
// - It defines a contract: subclasses must provide concrete implementations for abstract methods.
// - If a subclass does NOT implement all abstract members, TypeScript throws:
//    "Non-abstract class 'X' does not implement inherited abstract member Y."
// - In your code, Tea implements prepare(), so the error won't appear.
// - Use-case: when you want several classes to share some interface/behavior but let each class implement specifics.
// Example: Animal defines abstract speak(); Dog implements speak(); Cat implements speak().

// Example concrete subclass (your code):
class Tea extends Drink {
  prepare(): void {
    console.log("Prepare tea");
  }
}

// When to use abstract classes?
// - Use them when you want to provide a common base that includes both:
//     - Some shared implementation (concrete methods/properties), and
//     - Some required methods that subclasses must implement (abstract).
// - If you only need a contract without shared implementation, prefer `interface`.
// - Abstract class example: A library that defines base shapes with area() abstract but provides common utilities.

// --------------------------
// Composition example and deep explanation
// --------------------------

/*
  You wrote:
  class Heater {
    heat() {}
  }
  class chaiMaker {
    constructor(private heater: Heater) {}
    make() {
      this.heater.heat();
    } // this is called composition of objects
  }

  I'm going to expand this deeply:
  - Composition (has-a) means an object uses/contains another object to accomplish a task.
  - chaiMaker *has a* Heater. Instead of chaiMaker inheriting from Heater,
    it receives a Heater and calls its methods.
  - Benefits of composition:
      1. Loose coupling: chaiMaker depends on an abstraction, not a concrete implementation.
      2. Reusability: you can pass different Heater implementations (fast heater, slow heater).
      3. Testability: you can pass a mock/fake Heater in tests.
      4. Clearer responsibilities: Heater is responsible for heating; chaiMaker uses heating.
  - Composition is often preferable to inheritance, because inheritance tightly couples classes and
    creates fragile hierarchies. Prefer inheritance when there is an IS-A relationship.

  IS-A vs HAS-A:
    - Inheritance (extends) => IS-A (e.g., Dog IS-A Animal).
    - Composition => HAS-A (e.g., Car HAS-A Engine).

  Let's show a better typed example using an interface to allow DI and testing:
*/

interface IHeater {
  heat(): void;
}

// Concrete implementation
class Heater implements IHeater {
  heat() {
    console.log("Heater: heating up...");
  }
}

// Another heater (different implementation)
class FastHeater implements IHeater {
  heat() {
    console.log("FastHeater: heating quickly!");
  }
}

// chaiMaker uses composition: it depends on IHeater (abstraction), not a concrete class.
class ChaiMaker {
  // we use dependency injection: pass the heater in the constructor
  constructor(private heater: IHeater) {}

  make() {
    // delegation: ChaiMaker delegates heating to the heater instance
    this.heater.heat();
    console.log("Chai made!");
  }
}

// Usage:
const realHeater = new Heater();
const chaiMaker1 = new ChaiMaker(realHeater);
chaiMaker1.make();

// Using a different heater:
const fast = new FastHeater();
const chaiMaker2 = new ChaiMaker(fast);
chaiMaker2.make();

// For tests: a fake heater
class FakeHeater implements IHeater {
  didHeat = false;
  heat() {
    this.didHeat = true;
  }
}

// In unit test you can:
const fake = new FakeHeater();
const cm = new ChaiMaker(fake);
cm.make();
// assert(fake.didHeat === true)  // test that ChaiMaker called heat()

/*
  Key takeaways about object composition:
  - Prefer composition when you want flexible behavior and testable code.
  - Use interfaces (or abstract classes) to describe dependencies.
  - Inject dependencies (constructor injection) so you can swap implementations.
  - Composition keeps each class focused on one responsibility (Single Responsibility Principle).
*/

// --------------------------
// Quick note: composition vs function composition
// --------------------------

/*
  You said "compositions" — many people mean object composition.
  There's another concept called function composition (compose f ◦ g).
  Quick function composition example in TypeScript:
*/

function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B) {
  // returns a function that applies g then f: f(g(x))
  return (x: A) => f(g(x));
}

const double = (n: number) => n * 2;
const addOne = (n: number) => n + 1;

const doubleAfterAddOne = compose(double, addOne);
const result = doubleAfterAddOne(3); // double(addOne(3)) = double(4) = 8
// function composition is a different concept: composing behavior of functions

// --------------------------
// Extra practical tips & patterns
// --------------------------

/*
  1) Constructor parameter properties:
     - You can shorten code with `constructor(public flavour: string, private price: number) {}`

  2) Optional properties vs definite assignment:
     - If you want properties optional: flavour?: string
     - If you want to promise initialization later: flavour!: string // use sparingly

  3) Getters/Setters:
     - Getters and setters make property access appear as normal field access:
         obj.prop = 10 // invokes setter
         console.log(obj.prop) // invokes getter
     - Use them for validation, computed properties, lazy initialisation.

  4) Private vs #private:
     - `private` is a TS concept (compile-time).
     - `#private` is JS runtime private field (strong privacy).

  5) Abstract class vs Interface:
     - If you need shared implementation + required methods => abstract class.
     - If you only need a contract (type shape) => interface.

  6) Composition over inheritance:
     - Prefer composition when you want flexible, testable code.
     - Use inheritance when objects truly have an IS-A relationship and you want to share implementation.

  7) Naming conventions:
     - `_field` is common for private backing fields.
     - Use `get`/`set` when you want to validate or transform values on access.

  8) Testing:
     - Composition + DI makes unit testing easy: inject fakes/mocks.

  9) Keep types explicit for public APIs:
     - constructor(public flavour: string) is concise, but make sure the intended visibility and mutability is clear.

*/

// --------------------------
// Short summary (for revision)
// --------------------------
/*
  - Access modifiers: public (anywhere), private (only declaring class), protected (class + subclasses).
  - `#private` is JS runtime private.
  - readonly can be set in declaration or constructor.
  - constructor parameter properties shorten property declarations.
  - Abstract classes force subclasses to implement abstract members.
  - Composition (has-a) is preferred for modular, testable code; injection + interfaces help a lot.
  - Function composition is different — composing functions f(g(x)).
*/
