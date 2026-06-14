import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = process.env.ADMIN_SECRET_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { message: "Server configuration error: Password not set in environment." },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      // Agar password sahi hai, toh ek secure HTTP-Only Cookie browser par drop karenge
      const response = NextResponse.json({ success: true });
      
      response.cookies.set({
        name: "darksyon_admin_session",
        value: "authenticated_true_matrix_node",
        httpOnly: true, // Yeh cookie JavaScript (Inspect element) se chhip jati hai, isliye 100% safe hai
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 2, // 2 ghante tak session active rahega, phir automatically logout
      });

      return response;
    }

    return NextResponse.json({ message: "INVALID SECURITY ACCESS KEY" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server authentication fault" }, { status: 500 });
  }
}