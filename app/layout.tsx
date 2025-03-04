import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import { AuthNavbar, Navbar } from "@/src/widgets/navbar";
import { createClient } from "@/src/app/db/supabase";

const montserrat = Montserrat({
  weight: '500',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Diet planner",
  description: "App is for planning diets.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const supabase = await createClient()
  const {data} = await supabase.auth.getUser()

  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <div className="border-b flex justify-center ">
          {data.user ? (
            <AuthNavbar />
          ) : (
            <Navbar />
          )}
        </div>
        <main className="min-h-[calc(100vh-108px)] my-6">
          {children}
        </main>
      </body>
    </html>
  );
}
