import "~/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { Press_Start_2P } from 'next/font/google';
import { ViewTransitions } from 'next-view-transitions'

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pokemon',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokedex test by Antonio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransitions>
      <html lang="en" className={`${pressStart.variable}`}>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
