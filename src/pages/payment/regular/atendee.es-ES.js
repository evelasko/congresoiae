import React from 'react';
import CryptoJS from 'crypto-js';
import { RedsysBuilder, PaymentBuilder } from 'redsys-polite';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import csc from 'country-state-city';
const orderid = require('order-id')(process.env.JWT_SECRET);
// import 'react-credit-cards/es/styles-compiled.css';
import AutosuggestInput from '../../../components/inputs/autosuggest';
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

const generateOrderId = () => {
  var chars = 'abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
  return orderid
    .generate()
    .replace('-', chars.substr(Math.floor(Math.random() * 53), 1))
    .slice(0, 10);
};

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    let allStates = [];
    csc.getAllCountries().forEach(({ id }) => {
      allStates = allStates.concat(csc.getStatesOfCountry(id));
    });
    this.state = {
      errorMessages: [],
      firstname: '',
      lastname: '',
      email: '',
      address1: '',
      address2: '',
      country: null,
      regionName: '',
      countryName: '',
      region: null,
      city: '',
      zip: '',
      total: 1, // change here !!!
      attendees: 0,
    };
  }

  updateFormData({ target }) {
    this.setState({ [target.id]: target.value });
  }
  setCountry(element) {
    if (element) {
      const country = csc
        .getAllCountries()
        .filter(({ name }) => name === element.value)[0];
      if (country != this.state.country) {
        this.setState({ country });
      }
    }
  }
  setRegion(element) {
    const { country } = this.state;
    if (element && country) {
      const region = csc
        .getStatesOfCountry(country.id)
        .filter(({ name }) => name === element.value)[0];
      if (region != this.state.region) {
        this.setState({ region });
      }
    }
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
    const {
      firstname,
      lastname,
      email,
      address1,
      address2,
      country,
      region,
      countryName,
      regionName,
      city,
      zip,
      attendees,
      total,
    } = this.state;

    const orderId = generateOrderId();

    const orderData = {
      firstname,
      lastname,
      email,
      address1,
      address2,
      country: countryName,
      region: regionName,
      city,
      zip,
      attendees,
      total,
      orderId,
    };
    const redsys = new RedsysBuilder()
      .setMerchantCode(process.env.GATSBY_COM_CODE)
      .setName('Fundacion Alicia Alonso')
      .setTitular('Fundacion Alicia Alonso')
      .setSecret(process.env.GATSBY_COM_CLVE)
      .setTerminal(process.env.GATSBY_COM_TERM)
      .enableDebug()
      .build();

    const payment = new PaymentBuilder()
      .setTotal(total)
      .setOrderId(orderId)
      .setData(orderData)
      .setUrlMerchant('https://api.alicialonso.org/confirmation')
      .setUrlCancel(`https://congreso.alicialonso.org/${langKey}/payment/error`)
      .setUrlOK(
        `https://congreso.alicialonso.org/${langKey}/payment/confirmation`,
      )
      .build();

    const pForm = redsys.getFormData(payment);
    console.log('re-rendered...');
    console.log('orderData:', orderData);
    console.log('orderDataLength: ', JSON.stringify(orderData).length);
    console.log('formData: ', pForm);
    return (
      <Layout lang={langKey}>
        <Header lang={langKey} pathname={pathname} />
        <Container>
          <h2>Payments</h2>
          <center>
            <div style={{ width: '80%', alignSelf: 'center' }}>
              <form
                action={process.env.GATSBY_COM_GATE}
                method="POST"
                ref="payform"
              >
                <input
                  type="hidden"
                  name="Ds_SignatureVersion"
                  value={pForm.Ds_SignatureVersion}
                />
                <input
                  type="hidden"
                  name="Ds_MerchantParameters"
                  value={pForm.Ds_MerchantParameters}
                />
                <input
                  type="hidden"
                  name="Ds_Signature"
                  value={pForm.Ds_Signature}
                />
                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="firstname"
                      label="First Name"
                      placeholder="firstName"
                      margin="normal"
                      fullWidth
                      onBlur={this.updateFormData.bind(this)}
                    />
                    <TextField
                      id="lastname"
                      label="Last Name"
                      placeholder="lastName"
                      margin="normal"
                      fullWidth
                      onBlur={this.updateFormData.bind(this)}
                    />
                    <TextField
                      required={true}
                      id="email"
                      label="Email"
                      placeholder="email"
                      margin="normal"
                      fullWidth
                      onBlur={this.updateFormData.bind(this)}
                    />

                    <TextField
                      id="address1"
                      label="Street Address"
                      placeholder="address"
                      margin="normal"
                      fullWidth
                      onBlur={this.updateFormData.bind(this)}
                    />
                    <TextField
                      id="address2"
                      label="Building/Apt"
                      placeholder="building/apt."
                      margin="normal"
                      fullWidth
                      onBlur={this.updateFormData.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AutosuggestInput
                      suggestions={csc.getAllCountries()}
                      inputProps={{
                        label: 'Country',
                        id: 'countryName',
                        placeholder: 'your country...',
                        margin: 'normal',
                        inputRef: this.setCountry.bind(this),
                        onBlur: this.updateFormData.bind(this),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AutosuggestInput
                      suggestions={
                        country ? csc.getStatesOfCountry(country.id) : []
                      }
                      inputProps={{
                        label: 'Region',
                        id: 'regionName',
                        placeholder: 'your region...',
                        margin: 'normal',
                        inputRef: this.setRegion.bind(this),
                        onBlur: this.updateFormData.bind(this),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AutosuggestInput
                      suggestions={
                        region ? csc.getCitiesOfState(region.id) : []
                      }
                      inputProps={{
                        label: 'City',
                        id: 'city',
                        placeholder: 'your city...',
                        margin: 'normal',
                        onBlur: this.updateFormData.bind(this),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="zip"
                      label="Postal Code"
                      placeholder="zip/postal code"
                      margin="normal"
                      fullWidth
                      onBlur={this.updateFormData.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <button type="submit" value="Submit">
                      Submit
                    </button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </center>
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
