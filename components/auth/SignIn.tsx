import { getUserAuth } from "@/lib/auth/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { BadgePercent } from "lucide-react";
import { Button } from "../ui/button";

export default async function SignIn() {
  const { session } = await getUserAuth();
  if (session) {
    return (
      <div>
        <LogoutLink className="hover:underline">Log out</LogoutLink>
      </div>
    );
  } else {
    return (
      <div className="container text-center mt-24 ">
        <h2 className=" font-extrabold text-4xl">
          Track prices of your favourite groceries
        </h2>
        <div className="flex flex-row justify-between my-8">
          <div></div>
          <BadgePercent size={96} />
          <div></div>
        </div>
        <div className="flex flex-row justify-around items-center">
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button variant={"outline"}> Sign up</Button>
          </RegisterLink>
        </div>
      </div>
    );
  }
}
