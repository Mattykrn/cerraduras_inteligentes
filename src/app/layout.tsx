import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KEMA Cerraduras Inteligentes | Distribuidor Oficial & Instalaciones en Todo el País',
  description: 'Distribuidor oficial KEMA en toda Argentina. Soluciones de acceso inteligente y seguridad premium con envíos y servicio de instalación profesional.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark scroll-smooth">
      <body 
        suppressHydrationWarning 
        className="bg-zinc-950 text-zinc-100 antialiased min-h-screen selection:bg-cyan-500 selection:text-black"
      >
        {children}
      </body>
    </html>
  );
}
