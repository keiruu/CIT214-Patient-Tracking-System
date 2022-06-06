import '../styles/globals.css'
import '../styles/design_tokens.css'
import { AuthProvider } from '../src/context'

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
}

export default MyApp
