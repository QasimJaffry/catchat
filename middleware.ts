import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Remove this condition as we no longer need to redirect from "/" to "/dashboard"
  // The dashboard will be at the root now
}

export const config = {
  matcher: "/",
};
