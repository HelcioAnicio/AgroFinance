"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ClientAuthProps {
  children: React.ReactNode;
}

const ClientAuth: React.FC<ClientAuthProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ClientAuth;
