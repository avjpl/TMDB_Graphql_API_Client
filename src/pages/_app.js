import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../apollo/client';
import Layout from '../components/layouts/layout';

import '../../static/css/index.css';

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default App;
