import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: "FitLog",
    description: "Workout Library — Train hard, log honest.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen flex flex-col">
                <PlanProvider>
                    <Navbar />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <Toaster
                        position="bottom-center"
                        toastOptions={{
                            style: {
                                background: '#171A21',
                                color: '#fff',
                                border: '1px solid rgba(255,255,255,0.1)',
                            },
                        }}
                    />
                </PlanProvider>
            </body>
        </html>
    );
}