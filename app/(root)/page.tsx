import { currentUser, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function page() {
  // const user = await currentUser();
  // if (!user) redirect("/sign-in");

  return (
    <>
      <h1>Protected & Landing Page</h1>
      <UserButton afterSignOutUrl="/" />
    </>
  );
}
