import React from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import HeaderCompact from '../components/HeaderCompact';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <HeaderCompact lang={langKey} pathname={pathname} />
      <div
        style={{
          paddingTop: '60px',
          marginRight: '20px',
          marginLeft: '20px',
          marginBottom: '40px',
        }}
      >
        <h2>Cancellation Policy</h2>
        <ul>
          <li>
            Refunds (minus a 40 % cancellation fee) will only be made for
            cancellations received in writing by October 1, 2019. There will be
            no refunds after October 1, 2019.
          </li>
          <li>
            The Research in Performing Arts World Congress (I Edition) and the
            Organising Institutions, are not responsible for airline tickets,
            hotel accommodation, or other travel arrangements purchased for
            attendance at this conference. We recommend that you purchase trip
            cancellation insurance, in the unlikely event that unforeseen
            circumstances affect the conference or your travel plans.
          </li>
          <p>
            If you have any questions, please contact congreso@alicialonso.org
          </p>
        </ul>{' '}
      </div>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
