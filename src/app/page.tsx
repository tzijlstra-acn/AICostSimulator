import { redirect } from "next/navigation";

// The middleware handles locale detection; this page handles the edge case
// where a request reaches the root without being redirected by middleware.
export default function RootPage() {
  redirect("/en/intro");
}
