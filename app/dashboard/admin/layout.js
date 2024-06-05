import { Inter } from "next/font/google";
import Header from "../../../components/adminHeader";
import Footer from "../../../components/footer";
import "../../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Page",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <body className={inter.className}>{children}</body>
      {/* <Footer /> */}
    </>
  );
}
