import { ApolloWrapper } from "@/components/ApolloWrapper";
import { ToastProvider } from "@/components/ui/atoms/Toast";
import Footer from "@/components/ui/molecules/layout/Footer";
import Header from "@/components/ui/molecules/layout/Header";
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
          <ApolloWrapper>
            <ToastProvider>{children}</ToastProvider>
          </ApolloWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
