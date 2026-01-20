import axios from "axios";
// yha pr jo error ts show kr rha hai wo actually error nhi hai hme bs axios ke types bhi install krne honge. thats it.
import type { AxiosResponse } from "axios";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// axios.get("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
//   console.log(res.data);
// });

const fetchRequest = async () => {
  try {
    const response: AxiosResponse<Todo> = await axios.get("url");
    console.log(response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

//----- Using Fetch ------------//

const fetchrequest = async () => {
  try {
    const response = await fetch("url");
    if (!response.ok) {
      throw new Error("HTTP Error");
    }
    const data: Todo = await response.json();
  } catch (error: unknown) {}
};
