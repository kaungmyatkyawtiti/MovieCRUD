import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export async function GET(request: NextRequest) {
  console.log("Todo API route");

  let todos: Todo[] = [
    {
      "userId": 1,
      "id": 1,
      "title": "delectus aut autem",
      "completed": false
    },
    {
      "userId": 1,
      "id": 2,
      "title": "quis ut nam facilis et officia qui",
      "completed": false
    },
    {
      "userId": 1,
      "id": 3,
      "title": "fugiat veniam minus",
      "completed": false
    },
  ];

  return NextResponse.json({ data: todos }, { status: 200 });
}
