import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/src/widgets/navbar";

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Diet planner",
  description: "App is for planning diets.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
