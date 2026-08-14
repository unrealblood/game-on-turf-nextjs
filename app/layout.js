import "./globals.css";

export const metadata = {
  title: "Game on Turf",
  description: "Turf booking website.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en">
      <body>{children}</body>
    </html>
  );
}
