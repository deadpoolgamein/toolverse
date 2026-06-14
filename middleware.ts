import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Agar user admin-panel kholne ki koshish kar raha hai
  if (pathname.startsWith("/admin-panel")) {
    const sessionCookie = request.cookies.get("darksyon_admin_session");

    // Agar token/cookie nahi mili, toh bina data load kiye turant login page par bhej do
    if (!sessionCookie || sessionCookie.value !== "authenticated_true_matrix_node") {
      const loginUrl = new URL("/admin-login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Config blocks: Yeh middleware sirf admin-panel ke paths par guard lagayega
export const config = {
  matcher: ["/admin-panel/:path*"],
};