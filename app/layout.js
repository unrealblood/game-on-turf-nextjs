import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import "./globals.css";

export const metadata = {
  title: "Game on Turf",
  description: "Turf booking website.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
