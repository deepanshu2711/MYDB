// proxy.ts
import { withAuthMiddleware } from "@myauth/next";

export default withAuthMiddleware(process.env.NEXT_PUBLIC_CLIENT_ID!);

// Protect selected routes
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
