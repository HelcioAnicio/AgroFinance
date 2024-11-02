"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const Login = () => {
  const { status, data } = useSession();

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <div>
      {status === "unauthenticated" && (
        <button onClick={async () => await handleLoginClick()}>Login</button>
      )}
      {status === "authenticated" && data?.user && (
        <>
          <button onClick={async () => await handleLogoutClick()}>
            Logout
          </button>
          <br />
          {data?.user?.name}
        </>
      )}
    </div>
  );
};

export default Login;
