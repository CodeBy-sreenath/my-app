import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "ProjectGenie",
  description: "AI Powered Project Idea Generator",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-100">{children}</body>
      </html>
    </ClerkProvider>
  );
}
