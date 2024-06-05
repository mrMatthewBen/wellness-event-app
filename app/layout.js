"use client";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { verifyToken } from "@/utils/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = verifyToken(token);

      if (decodedToken) {
        const role = decodedToken.role;

        if (role === "HR") {
          router.push("/dashboard/admin/createEvent");
        } else if (role === "Vendor") {
          router.push("/dashboard/vendor/events");
        }
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
