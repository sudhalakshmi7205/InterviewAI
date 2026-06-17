import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { dark } from '@clerk/themes';

export const metadata: Metadata = {
  title: 'InterviewAI — Practice interviews with AI',
  description: 'Real follow-up questions, honest feedback, and a score after every session.',
  openGraph: {
    title: 'InterviewAI',
    description: 'Practice interviews with AI that pushes back',
    images: ['/og-image.png'],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3b82f6',
          colorBackground: '#0f172a',
          colorInputBackground: '#1e293b',
          colorInputText: '#f8fafc',
        },
        elements: {
          card: 'bg-slate-900 border border-slate-800 shadow-2xl',
          headerTitle: 'text-white font-black',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton: 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-white',
          socialButtonsBlockButtonText: 'text-white font-bold',
          dividerLine: 'bg-slate-800',
          dividerText: 'text-slate-500',
          formFieldLabel: 'text-slate-300 font-bold',
          formFieldInput: 'bg-slate-900 border-slate-700 focus:border-blue-500 text-white',
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-500 font-bold shadow-[0_0_15px_-3px_rgba(59,130,246,0.4)]',
          footerActionText: 'text-slate-400',
          footerActionLink: 'text-blue-400 hover:text-blue-300',
        }
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
