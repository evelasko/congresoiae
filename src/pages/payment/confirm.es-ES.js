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
        <h2>Muchas gracias</h2>
        <p>¡Su participación ha quedado registrada exitosamente!</p>
        <p>
          Hemos enviado un email a la dirección que especificó en la aplicación
          con su ticket e instrucciones para el registro.
        </p>
        <p>
          En caso de que no encuentre el email en su bandeja de entrada, por
          favor verifique su bandeja de correo spam. Si no lo puede encontrar
          por favor escríbanos a congreso@alicialonso.org y atenderemos la
          irregularidad a la mayor brevedad posible.
        </p>
        <p>Esperamos verle pronto.</p>
        <p></p>
      </Container>
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
