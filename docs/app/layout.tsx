import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gabl — An interpreted programming language written in C",
  description:
    "Gabl is a fully interpreted programming language written in C from scratch, featuring a hand-written lexer, recursive descent parser, AST evaluator, and scoped environment.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
