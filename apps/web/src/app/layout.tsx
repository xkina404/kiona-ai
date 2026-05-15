import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kiona AI - Virtual Assistant',
  description: 'AI Virtual Assistant with local & cloud models, Live2D avatar, voice, and tools integration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  );
}