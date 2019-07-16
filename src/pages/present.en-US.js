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
      <div>
        <form
          name="contact"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="bot-field" />
          <div className="field half first">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" id="name" />
          </div>
          <div className="field half">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" />
          </div>
          <div className="field">
            <label htmlFor="message">Mensaje</label>
            <textarea name="message" id="message" rows="4"></textarea>
          </div>
          <ul className="actions">
            <li>
              <input type="submit" value="Enviar" className="special" />
            </li>
            <li>
              <input type="reset" value="Borrar" />
            </li>
          </ul>
        </form>
      </div>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
