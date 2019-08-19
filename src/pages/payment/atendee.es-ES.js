import React from 'react';
import SquarePaymentForm, {
  CreditCardCVVInput,
  CreditCardExpirationDateInput,
  CreditCardNumberInput,
  CreditCardPostalCodeInput,
  CreditCardSubmitButton,
} from 'react-square-payment-form';
import 'react-square-payment-form/lib/default.css';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

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

  cardNonceResponseReceived = (
    errors,
    nonce,
    cardData,
    buyerVerificationToken,
  ) => {
    if (errors) {
      this.setState({ errorMessages: errors.map(error => error.message) });
      return;
    }

    this.setState({ errorMessages: [] });
    alert(
      'nonce created: ' +
        nonce +
        ', buyerVerificationToken: ' +
        buyerVerificationToken,
    );
  };

  createVerificationDetails() {
    return {
      amount: '100.00',
      currencyCode: 'EUR',
      storeCard: 'charge', //Allowed values: "charge", "create-card", "create-and-charge"
      billingContact: {
        familyName: 'Smith',
        givenName: 'John',
        email: 'jsmith@example.com',
        country: 'GB',
        city: 'London',
        addressLines: ["1235 Emperor's Gate"],
        postalCode: 'SW7 4JA',
        phone: '020 7946 0532',
      },
    };
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
    return (
      <Layout lang={langKey}>
        <Header lang={langKey} pathname={pathname} />
        <Container>
          <h2>Payments</h2>

          <SquarePaymentForm
            applicationId={'sandbox-sq0idp-HzjxJePVf-f4MAe6oS4p_w'}
            locationId={'CBASEAIJv6StbK1_JJiFGJxUMO8gAQ'}
            cardNonceResponseReceived={this.cardNonceResponseReceived}
            createVerificationDetails={this.createVerificationDetails}
          >
            {
              // <form action="http://localhost:4000/payment" method="POST" ref="payform" >
            }
            <fieldset className="sq-fieldset">
              <CreditCardNumberInput />
              <div className="sq-form-third">
                <CreditCardExpirationDateInput />
              </div>

              <div className="sq-form-third">
                <CreditCardPostalCodeInput />
              </div>

              <div className="sq-form-third">
                <CreditCardCVVInput />
              </div>
            </fieldset>
            <button type="submit" value="Submit" className="sq-creditcard">
              Submit
            </button>

            <CreditCardSubmitButton>Pay $1.00</CreditCardSubmitButton>
          </SquarePaymentForm>

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
