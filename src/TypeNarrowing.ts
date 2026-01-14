// Type narrowing using typeof operator: Checks if 'kind' is a string and narrows the type accordingly.
function getRes(kind: string | number) {
  if (typeof kind === "string") {
    return kind.toUpperCase();
  }
  return kind;
}

// Type narrowing using truthiness: Checks if 'log' is truthy (not null, undefined, or empty string) to narrow from optional string.
function serverLog(log?: string) {
  if (log) {
    return `Server log: ${log}`;
  } else {
    return "Server log: Nothing to log";
  }
}

// Type narrowing with literal union types: Checks against string literals in a union to narrow the type.
function orderChai(size: "small" | "medium" | "large" | number) {
  if (size === "small") {
    return 1;
  }
  if (size === "medium") {
    return 2;
  }
  if (size === "large") {
    return 3;
  }
  return `Ordered chai ${size}`;
}

// Classes for instanceof narrowing demonstration.
class KulhadChai {
  serve() {
    return "Serving Kulhad chai";
  }
}
class CuttingChai {
  serve() {
    return "Serving Cutting chai";
  }
}

// Type narrowing using instanceof operator: Checks the constructor of the object to narrow the union type.
function servechai(chai: KulhadChai | CuttingChai) {
  if (chai instanceof KulhadChai) {
    return chai.serve();
  }
  return chai.serve();
}

// Type definition for ChaiOrder.
type ChaiOrder = {
  type: string;
  sugar: number;
};

// Custom type guard: A function that returns a type predicate to narrow types based on runtime checks.
// This is called a type guard and returns true or false for the parameter passed.
// If we pass a ChaiOrder object, it returns true; if we pass a string, it returns false.
function isChaiOrder(obj: any): obj is ChaiOrder {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.type === "string" &&
    typeof obj.sugar === "number"
  );
}

// Using the custom type guard for narrowing: The if condition narrows 'item' to ChaiOrder if the guard returns true.
function serveOrder(item: ChaiOrder | string) {
  if (isChaiOrder(item)) {
    return `Serving ${item.type} chai with ${item.sugar} sugar`;
  }
  return `Serving chai with ${item} sugar`;
}

// Discriminated union types: Each type has a common 'type' property with literal values to distinguish them.
type MasalaChai = {
  type: "MasalaChai";
  spiceLevel: number;
};
type GingerChai = {
  type: "GingerChai";
  amount: number;
};
type ElaichiChai = {
  type: "ElaichiChai";
  aroma: number;
};

// Union type combining the discriminated types.
type Chai = MasalaChai | GingerChai | ElaichiChai;

// Type narrowing with discriminated unions: Uses switch on the discriminant property to narrow the type in each case.
function serveChai(chai: Chai) {
  switch (chai.type) {
    case "MasalaChai":
      return `Serving Masala chai with ${chai.spiceLevel} spice`;
      break;

    case "GingerChai":
      return `Serving Ginger chai with ${chai.amount} amount`;
      break;

    case "ElaichiChai":
      return `Serving Elaichi chai with ${chai.aroma} aroma`;
      break;
  }
}

// Type narrowing using 'in' operator: Checks if a property exists in the object to narrow the union type.
function brew(order: MasalaChai | GingerChai) {
  if ("spiceLevel" in order) {
    return `Brewing Masala chai with ${order.spiceLevel} spice`;
  }
  return `Brewing Ginger chai with ${order.amount} amount`;
}

// Custom type guard for arrays: Narrows 'unknown' to 'string[]' by checking if it's an array and all elements are strings.
function isStringArray(arr: unknown): arr is string[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}
