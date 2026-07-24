import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AuthProvider } from '@/providers/auth';
import { Toaster } from '@/components/ui/sonner';
import { AppProvider } from '@/context/appContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AgroFinance',
  description: 'Gestão financeira e de rebanho para produtores rurais.',
  // Sem manifest, o Safari/iOS não deixa instalar a página na tela inicial
  // como PWA — e sem isso, o Web Push simplesmente não funciona no iOS,
  // mesmo com a permissão concedida no navegador.
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AgroFinance',
  },
};

export const viewport = {
  themeColor: '#556b2f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        cz-shortcut-listen="true"
        className={`${geistSans.variable} ${geistMono.variable} w-full text-sm antialiased`}
      >
        <div className="min-h-full w-full">
          <AuthProvider>
            <AppProvider>{children}</AppProvider>
          </AuthProvider>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
