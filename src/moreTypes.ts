/* ------------------------------------------------------------------
   `any` TYPE — TypeScript ka "opt-out" button
------------------------------------------------------------------ */

/*
`any` ka matlab:
- TypeScript yaha se apni type-checking band kar deta hai
- Compiler bolta hai: "jo marzi karo, main trust karta hoon"

Important:
- `any` value runtime me JS hi hoti hai
- TypeScript sirf compile-time pe hota hai
*/

let response: any = "42";

/*
Yaha response ka actual runtime type = string
BUT TypeScript ko koi guarantee nahi

Isliye agar hum directly:
response.length

likhte, TypeScript allow kar deta (because any)
*/

/*
TYPE ASSERTION: `as string`

- Ye conversion nahi hai
- Ye compiler ko promise hai:
  "bhai, mujhe pata hai ye string hi hai"

⚠️ Agar galat promise kiya → runtime error
*/

let num: number = (response as string).length;

console.log(num);

/* ------------------------------------------------------------------
   TYPE ALIAS — Custom shape banana
------------------------------------------------------------------ */

/*
`type` keyword:
- ek NAME deta hai ek type structure ko
- runtime pe kuch exist nahi karta
- sirf compiler ke liye hai
*/

type Book = {
  name: string;
};

/*
Ye plain string hai
TypeScript isko JSON nahi samajhta
*/

let bookString = '{"name":"Nityanand"}';

/*
JSON.parse ka return type = `any`
Reason:
- TS compiler runtime JSON ka structure nahi jaan sakta

Isliye:
let book: Book = JSON.parse(bookString);
❌ unsafe (TS allow karega but blind trust)

`as Book`:
- hum bol rahe hain: "parsed object is Book"
*/

let book = JSON.parse(bookString) as Book;

console.log(book);

/* ------------------------------------------------------------------
   DOM + TYPE ASSERTION
------------------------------------------------------------------ */

/*
document.getElementById ka return type:
HTMLElement | null

TypeScript strict hota hai:
- element exist na bhi kare
*/

const inputElement = document.getElementById(
  "input"
) as HTMLInputElement | null;

/*
Yaha hum TypeScript ko bol rahe:
- ye element null nahi hai
- ye input element hi hai

⚠️ Agar actual DOM me input nahi mila
→ runtime error (TS nahi bachayega)
*/

if (inputElement !== null) {
  inputElement.value = "Hello";
}

/* ------------------------------------------------------------------
   `any` vs reassignment chaos
------------------------------------------------------------------ */

let value: any;

/*
`any`:
- type overwrite hoti rehti hai
- koi restriction nahi
*/

(value = "something"), (value = 10);
value = [1, 2, 3, 4];

/*
TypeScript yaha bilkul chup hai
No errors
No warnings
No safety
*/

/* ------------------------------------------------------------------
   `unknown` — SAFE version of `any`
------------------------------------------------------------------ */

/*
`unknown`:
- value kuch bhi ho sakti hai
- BUT use karne se pehle TYPE CHECK zaruri
*/

let value2: unknown;

value2 = "something";
value2 = 10;
value2 = [1, 2, 3, 4.5];

/*
Direct usage ❌
value2.find(...)
Reason:
- compiler ko nahi pata ye array hai ya nahi
*/

// value2.find((item) => item > 2); // ❌ error

/*
TYPE NARROWING:
- runtime check se compiler ko convince karna
*/

if (typeof value2 === "string") {
  /*
  Is block ke andar:
  TypeScript value2 ko `string` maan leta hai
  */
  console.log(value2.toUpperCase());
}

/* ------------------------------------------------------------------
   Error handling + `unknown`
------------------------------------------------------------------ */

/*
catch(error):
- TypeScript error ka type = `unknown`
Reason:
- JS me koi bhi cheez throw ho sakti hai
*/

try {
} catch (error) {
  /*
  INSTANCE CHECK:
  Error ek class hai JS me
  */
  if (error instanceof Error) {
    /*
    Ab compiler jaanta hai:
    error = Error object
    */
    console.log(error.message);
  }

  /*
  Yaha error ka type abhi bhi unknown ho sakta hai
  */
  console.log(error);
}

/* ------------------------------------------------------------------
   `unknown` + assertion
------------------------------------------------------------------ */

const data: unknown = "something";

/*
Yaha hum fir se promise kar rahe:
"data string hi hai"
*/

const str: string = data as string;

console.log(str);

/* ------------------------------------------------------------------
   UNION TYPES — Controlled possibilities
------------------------------------------------------------------ */

/*
Union type:
- value sirf in options me se ek hogi
- runtime validation + compile-time safety
*/

type Role = "admin" | "user" | "guest";

/*
Function signature:
- input bhi restricted
- output bhi restricted
*/

function getRole(role: Role): Role {
  /*
  TS yaha CONTROL FLOW ANALYSIS karta hai
  */

  if (role === "admin") {
    return "admin";
  } else if (role === "user") {
    return "user";
  } else {
    /*
    Yaha TS jaanta hai:
    role sirf "guest" hi ho sakta hai
    */
    return "guest";
  }
}

console.log(getRole("admin"));

/* ------------------------------------------------------------------
   `never` TYPE — Function jo kabhi end hi nahi hota
------------------------------------------------------------------ */

/*
`never` ka matlab:
- function kabhi successfully return nahi karega
- infinite loop
- ya hamesha error throw karega
*/

function neverReturn(): never {
  while (true) {
    /*
    infinite loop
    function execution yahin atka rahega
    */
  }
}

/*
Use cases of `never`:
- exhaustive switch checks
- fatal error functions
- infinite workers
*/
