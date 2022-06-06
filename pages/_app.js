import '../styles/globals.css'
import '../styles/design_tokens.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthContextProvider } from '../src/authContext'

function MyApp({ Component, pageProps }) {
  return <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
}

export default MyApp
