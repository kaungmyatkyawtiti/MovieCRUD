"use client";

import { selectAuthToken } from "@/lib/features/auth/authSlice";
import { useAppSelector } from "@/lib/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function IsAuth<T>(
  Component: React.ComponentType<T>
) {
  return (props: T) => {
    const router = useRouter();
    const authtoken = useAppSelector(selectAuthToken);
    const pathname = usePathname();
    const [isChecking, setIsChecking] = useState(true);

    console.log('Path name ', pathname);

    useEffect(() => {
      if (!authtoken) {
        router.push('/login?redirectUrl=' + pathname);
      } else {
        setIsChecking(false);
      }
    }, [authtoken, pathname, router]);

    if (isChecking) {
      return <div>Checking authentication...</div>; // or a spinner
    }

    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}
