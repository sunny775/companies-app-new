import Footer from "@/components/molecules/layout/Footer";
import Header from "@/components/molecules/layout/Header";
import { ApolloWrapper } from "@/lib/ApolloWrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main className={"min-h-[calc(100vh-4rem)]"}>
          <ApolloWrapper>{children}</ApolloWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
