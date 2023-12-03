import { getUserAuth } from "@/lib/auth/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

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
      <div>
        <LoginLink className="hover:underline">Sign in</LoginLink>
        <br />
        <RegisterLink className="hover:underline">Sign up</RegisterLink>
      </div>
    );
  }
};

