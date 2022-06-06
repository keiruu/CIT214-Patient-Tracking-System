import '../styles/globals.css'
import '../styles/design_tokens.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContextProvider } from '../src/authContext'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return <AuthContextProvider>
    <Component key={router.asPath} {...pageProps} />
  </AuthContextProvider>
}

export default MyApp
