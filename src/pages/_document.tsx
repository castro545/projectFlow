import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <base href="/"></base>
      </Head>
      <body style={{ minHeight: '100%', height: '100vh' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
