import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Budget Hive",
  description: "Your one stop finance platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      > {/*header*/}
        <ClerkProvider>
          {/* Now wraps the React tree, not the <html> */}
          {/* Header */}
          <Header />
          {/* Children */}
          <main className="min-h-screen">{children}</main>
          {/* Footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Let's go!</p>
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}
