"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
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
        <button onClick={handleLoginClick}>Login</button>
      )}
      {status === "authenticated" && data?.user && (
        <>
          <button onClick={handleLogoutClick}>Logout</button>
          <br />
          {data?.user?.name}
        </>
      )}
    </div>
  );
};

export default LoginPage;
