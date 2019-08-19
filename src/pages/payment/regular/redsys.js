import React from 'react';
import { RedsysBuilder, PaymentBuilder } from 'redsys-polite';
import styled from 'styled-components';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Layout from '../../../components/Layout';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  align-content: center;
  align-items: center;
  margin-top: 80px;

  padding: 20px;
`;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessages: [],
    };
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;

    const commerce_code = '000000000';
    const secret_code = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

    const redsys = new RedsysBuilder()
      .setMerchantCode(commerce_code)
      .setName('Faable.com')
      .setTitular('Marc Pomar')
      .setSecret(secret_code)
      .enableDebug()
      .build();

    const payment = new PaymentBuilder()
      .setTotal(3.2)
      .setOrderId('1')
      .setUrlMerchant('http://faable.com/notify')
      .setUrlCancel('http://faable.com/cancel')
      .setUrlOK('http://faable.com/accept')
      .build();

    const form_encoded_params = redsys.getFormData(payment);

    return (
      <Layout lang={langKey}>
        <Header lang={langKey} pathname={pathname} />
        <Container>
          <h2>Payments</h2>
          <form
            action="http://localhost:4000/payment"
            method="POST"
            ref="payform"
          >
            <input
              type="hidden"
              name="Ds_SignatureVersion"
              value={form_encoded_params.Ds_SignatureVersion}
            />
            <input
              type="hidden"
              name="Ds_MerchantParameters"
              value={form_encoded_params.Ds_MerchantParameters}
            />
            <input
              type="hidden"
              name="Ds_Signature"
              value={form_encoded_params.Ds_Signature}
            />
            <input type="text" name="Nombre" />
            <button type="submit" value="Submit">
              Submit
            </button>
          </form>
          <div className="sq-error-message">
            {this.state.errorMessages.map(errorMessage => (
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            ))}
          </div>
        </Container>
        <Footer />
      </Layout>
    );
  }
}

export default IndexPage;
