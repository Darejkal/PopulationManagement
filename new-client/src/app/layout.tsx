"use client"
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppHeader } from "./component";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Popmanage",
//   description: "",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-100 w-100 m-0 p-0">
      <head>
      <link href="/static/css/bootstrap.min.css" rel="stylesheet"></link>
      </head>
      <body className={inter.className + " h-100 w-100"}>
        <AppHeader/>
        {children}
        <script src="/static/js/jquery-2.1.1.min.js"></script>
				<script src="/static/js/bootstrap.min.js"></script>
      </body>
      
    </html>
  );
}
