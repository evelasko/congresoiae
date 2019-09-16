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
        <h2>Discount Application</h2>
        <p>Please complete the following form to request a discount</p>
      </Container>
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
