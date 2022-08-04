import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="Tomoyuki Kashiro's blog RSS Feed"
            href="/rss.xml"
          />
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        </Head>
        <body className="antialiased bg-body text-body font-body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
