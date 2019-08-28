import React from 'react';
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
        <h2>Thank you</h2>
        <p>Your participation has been registered succesfully!</p>
        <p>
          An email has been sent to the specified address with the event's
          ticket and further instructions for registration.
        </p>
        <p>
          In case you don't see the email in your inbox please check your spam
          inbox, if you can't find it even there please write us to
          congreso@alicialonso.org to review the issue.
        </p>
        <p>See you soon</p>
        <p></p>
      </Container>
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
