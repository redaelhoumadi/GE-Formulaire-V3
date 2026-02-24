import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Suspense } from "react";
import Script from 'next/script';
import NavigationEvents from "@/components/molecules/NavigationEvents";

const gilroy = localFont({
  src: [
    {
      path: './fonts/Gilroy-Bold.woff2',
      weight: '700'
    },
    {
      path: './fonts/Gilroy-Extrabold.woff2',
      weight: '900'
    },
    {
      path: './fonts/Gilroy-Semibold.woff2',
      weight: '400'
    },
    {
      path: './fonts/Gilroy-Medium.ttf',
      weight: '300'
    }
  ],
  variable: '--font-gilroy'
})

export const metadata: Metadata = {
  title: 'Prendre rendez-vous - Glass Express',
  description: 'Remplacez votre pare-brise en agence où à domicile sans franchise*, Un impact, une fissure, vous pouvez prendre rendez-vous 24h/24 7j/7',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-7YYKPREMF3" />
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-HFZLVL9TJM" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-7YYKPREMF3');
              gtag('config', 'G-HFZLVL9TJM');
            `}
          </Script>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N8F9JCH');
          `}
          </Script>
          <Script id="uet-script" strategy="afterInteractive">
      {`
      // Ajoutez ce script juste après votre code de balise UET de base
      window.uetq = window.uetq || [];
      window.uetq.push('set', {
        'pid': {
          'em': 'contoso@example.com', // Remplacez par la variable qui contient l'adresse e-mail de l'utilisateur.
          'ph': '+336000000000', // Remplacez par la variable qui contient le numéro de téléphone de l'utilisateur.
        }
      });
      `}
    </Script> 
      <body className={gilroy.className}>
        {children}
        <Suspense fallback={null}>
          <NavigationEvents />
        </Suspense>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N8F9JCH" height="0" width="0" style="display: none; visibility: hidden;" />`,
          }}
        />
      </body>
    </html>
  )
}
