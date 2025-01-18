/*
    * Root layout of website
 */
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {DataProvider} from "./context/DataContext";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    description: "UTEK 2025 Project",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="icon" href="/icon.svg"/>
            <title>Alert360</title>
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <DataProvider>{children}</DataProvider>
        </body>
        </html>
    );
}