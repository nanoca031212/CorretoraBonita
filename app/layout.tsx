import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRIME REALTY | Hotelaria com Julia Cristina",
  description:
    "Conheça oportunidades em hotelaria com a PRIME REALTY. Julia Cristina apresenta projetos, condições e detalhes para planejar seu próximo investimento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${playfair.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="flex min-h-full flex-col bg-[#e3e8e5] font-sans text-[#202725]">{children}</body>
    </html>
  );
}





