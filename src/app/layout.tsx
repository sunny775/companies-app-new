import Footer from "@/components/molecules/layout/Footer";
import Header from "@/components/molecules/layout/Header";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./styles/globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Companies App",
  description: "An app to save and view information about your favorite companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className}  antialiased`}>
        <Header />
        <main className={"min-h-[calc(100vh-4rem)]"}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
