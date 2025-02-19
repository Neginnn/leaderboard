import { Html, Head, Main, NextScript } from "next/document";

// note: https://nextjs.org/docs/advanced-features/custom-document
// note: https://devhints.io/html-meta (PWA)
export default function Document() {
  // todo: Preload fonts here.
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="application-name" content="Negin Test" />
        <meta name="og:type" content="website" />
        <link
          rel="icon"
          type="image/png"
          href="/web-assets/favicons/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="icon"
          type="image/png"
          href="/web-assets/favicons/favicon-32x32.png"
          sizes="32x32"
        />
      </Head>
      <body id="negin-test">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
