import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html>
        <Head />
        <body>
            <noscript
                dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXX" height="0" width="0" style="display: none; visibility: hidden;" />`,
                }}
            />
            <Main />
            <NextScript />
      </body>
    </Html>
  )
}

export default Document;