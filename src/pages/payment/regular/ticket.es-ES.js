import React from 'react';
import Helmet from 'react-helmet';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import csc from 'country-state-city';
const orderid = require('order-id')(process.env.GATSBY_POPYTO);
const shortid = require('shortid');
import AutosuggestInput from '../../../components/inputs/autosuggest';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Layout from '../../../components/Layout';
// import {rqConfirm} from '../../../util/requests'

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
  shortid.characters(
    '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_',
  );
  return (
    orderid
      .generate()
      .slice(12, 16)
      .split('')
      .reverse()
      .join('') +
    shortid
      .generate()
      .replace('-', chars.substr(Math.floor(Math.random() * 53), 1))
      .replace('_', chars.substr(Math.floor(Math.random() * 53), 1))
  ).slice(0, 11);
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

  componentDidMount() {
    console.log('WINDOW:', window);
    window.addEventListener(
      'load',
      () => {
        console.log('onload: ', window.loadRedsysForm);
      },
      false,
    );
    //window.loadRedsysForm();
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
    // window.onload(e => { console.log('EVENT: ', window.loadRedsysForm)})
    return (
      <Layout lang={langKey}>
        <Helmet>
          <script src="https://sis-i.redsys.es:25443/sis/NC/inte/redsys2.js" />
        </Helmet>
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
            <div id="card-form" />
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
