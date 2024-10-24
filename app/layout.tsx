import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Montserrat, Nunito, Poppins, Mulish, K2D } from "next/font/google";
import { AuthProvider } from "@/context/authProvider";


const inter = Inter({ subsets: ["latin"] });
const k2d = K2D({ subsets: ["latin"], weight: ["400", "500", "600", "800"], variable: '--font-k2d' });
const montserrat = Montserrat({ subsets: ["latin"], variable: '--font-montserrat' });
const nunito = Nunito({ subsets: ["latin"], variable: '--font-nunito' });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "800", "900"], variable: '--font-poppins' });
const mulish = Mulish({ subsets: ["latin"], variable: '--font-mulish' });


export const metadata: Metadata = {
  title: "BKPetCare",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={[inter.className, montserrat.variable, nunito.variable, poppins.variable, mulish.variable, k2d.variable].join(' ')}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
