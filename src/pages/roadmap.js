/** @jsx jsx */
import { jsx } from 'theme-ui'
import Iframe from 'react-iframe';
import Layout from '@theme/Layout';

const Roadmap = () => {
  return (
    <Layout title="Roadmap">
      
      <Iframe
        url="https://portal.productboard.com/tabetalt/1-tabetalt-product-portal/tabs/1-under-consideration?hide_header=1"
        width="100%"
        height="100%"
        sx={{
          height: '95vh',
          border: '0'
        }}
      />
    </Layout>
  );
}

export default Roadmap
