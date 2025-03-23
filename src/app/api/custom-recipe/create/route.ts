import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user_id, name, list } = body;

    if (!user_id || !name || !list) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Custom recipe is created" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating custom recipe:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
