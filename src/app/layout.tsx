import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weelz — Premium Chauffeured Cars in Egypt",
  description:
    "Book private chauffeured cars between Egyptian cities. Luxury limousine service with professional drivers.",
  keywords: [
    "limousine Egypt",
    "chauffeur service",
    "private car booking",
    "intercity transport Egypt",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
