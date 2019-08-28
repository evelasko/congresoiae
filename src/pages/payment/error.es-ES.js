import React from 'react';
import { Link } from 'gatsby';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import HeaderCompact from '../../components/HeaderCompact';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  align-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 20px;
`;

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <HeaderCompact lang={langKey} pathname={pathname} />
      <Container>
        <h2>Error</h2>
        <p>No se a podido procesar su petición...</p>
        <p>
          Puede intentarlo de nuevo a través del siguiente{' '}
          <Link to={`/${langKey}/payment/attendee/`}>enlace</Link>.
        </p>
      </Container>
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
