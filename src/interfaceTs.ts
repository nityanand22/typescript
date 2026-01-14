/* ============================================================
   SIMPLE OBJECT TYPE — works with class
============================================================ */

/*
type TeaRecipe:
- ek OBJECT TYPE hai
- fixed properties
- koi conditional logic nahi
*/

type TeaRecipe = {
  water: number;
  milk: number;
};

/*
Class implements ka matlab:
- class ka har instance
- TeaRecipe ka contract follow karega
*/

class MasalaChai implements TeaRecipe {
  /*
  Class properties:
  - runtime pe real JS properties
  - TypeScript sirf check karta hai
  */

  water = 100;
  milk = 20;
}

/* ============================================================
   WHY LITERAL UNION TYPES FAIL WITH CLASS
============================================================ */

/*
Literal union type:
- ye VALUE-level constraint hai
- structure nahi, choice hai
*/

// type cupSize = "small" | "medium" | "large";

/*
❌ Class implements cupSize ❌

Reason:
- class sirf OBJECT SHAPE implement kar sakti hai
- union literal type object hi nahi hai
*/

// class Chai implements cupSize {
//   size = "small";
// }

/*
ERROR ka deep reason:
- "small" | "medium" | "large"
  ❌ object nahi
  ❌ members nahi
  ❌ structure nahi

implements keyword ko:
- statically known members chahiye
*/

/* ============================================================
   INTERFACE + LITERAL UNION — WORKS
============================================================ */

/*
Interface ka role:
- object ka CONTRACT define karna
- runtime pe kuch exist nahi karta
*/

interface NewTeaRecipe {
  water: number;
  milk: number;
}

/*
Interface ke andar literal union allowed hai
kyunki:
- yaha property ka TYPE constrained hai
- object shape fixed hai
*/

interface NewCupSize {
  newSize: "small" | "medium" | "large";
}

/*
Class yaha fail nahi hoti because:
- interface ek OBJECT TYPE hai
- property explicitly typed hai
*/

class newChai implements NewCupSize {
  /*
  IMPORTANT:
  Class fields default widen ho jaate hain,
  isliye explicit annotation required
  */

  newSize: "small" | "medium" | "large" = "small";
}

/* ============================================================
   WHERE TYPES FAIL — UNION + CLASS
============================================================ */

/*
Union type:
- ya to pehla
- ya to doosra
- dono kabhi nahi
*/

type Response = { ok: true } | { ok: false };

/*
❌ Class cannot implement union ❌

Reason (deep):
- implements ka matlab:
  "har instance Response ke compatible ho"

- union ka matlab:
  "instance sirf ek branch ka ho"

Logical contradiction
*/

class MyRes implements Response {
  /*
  ok: boolean ❌

  Union expects:
  - ok: true OR
  - ok: false

  boolean = true | false (too wide)
  */
  ok: boolean = true;
}

/*
KEY RULE:
- class = ONE concrete shape
- union = MULTIPLE alternative shapes
*/

/* ============================================================
   INTERSECTION TYPES — WHERE TYPES SHINE
============================================================ */

/*
Intersection type (&):
- sab kuch hona chahiye
- merge of multiple object types
*/

type BaseChai = { teaLeaves: number };
type Extra = { masala: number };

type Chai = BaseChai & Extra;

/*
Intersection works beautifully with types
because:
- final structure ek hi hota hai
*/

const cup: Chai = {
  teaLeaves: 10,
  masala: 10,
};
