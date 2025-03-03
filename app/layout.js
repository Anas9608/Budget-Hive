import Header from "@/components/header";
import "./globals.css";
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Budget Hive",
  description: "Your one stop finance platform",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className}`}
        > {/*header*/}

          {/* Now wraps the React tree, not the <html> */}
          {/* Header */}
          <Header />
          {/* Children */}
          <main className="min-h-screen">{children}</main>
          <Toaster richColors/>
          {/* Footer */}
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Let's go!</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
