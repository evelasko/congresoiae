import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout from '../components/Layout';

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <Header lang={langKey} pathname={pathname} />
      <div
        style={{
          paddingTop: '60px',
          marginRight: '20px',
          marginLeft: '20px',
          marginBottom: '40px',
        }}
      >
        <h2>Política de Cancelación</h2>
        <ul>
          <li>
            Se harán devoluciones (menos el 40 % del importe pagado por tasa de
            cancelación) solo para cancelaciones recibidas por escrito antes del
            1 de octubre de 2019. No se harán devoluciones después del 1 de
            octubre de 2019.
          </li>
          <li>
            El Congreso Mundial en Artes del Espectáculo y las Instituciones
            Organizadoras, no se hace responsable de billetes de avión, gastos
            de alojamiento u otros arreglos de viaje comprados para la
            asistencia a este congreso. Recomendamos que compre un seguro de
            cancelación de viajes, por si desafortunadamente circunstancias
            afecten el congreso o sus planes de viaje y asistencia.
          </li>
          <p>
            Si tiene alguna pregunta, por favor contáctenos en
            congreso@alicialonso.org
          </p>
        </ul>{' '}
      </div>
      <Footer lang={langKey} />
    </Layout>
  );
};

export default IndexPage;
