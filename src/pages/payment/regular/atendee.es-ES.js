import React from 'react';
import Cards from 'react-credit-cards';
import CryptoJS from 'crypto-js';
// import {RedsysBuilder, PaymentBuilder} from 'redsys-polite';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import csc from 'country-state-city';
import 'react-credit-cards/es/styles-compiled.css';
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

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    let allStates = [];
    csc.getAllCountries().forEach(({ id }) => {
      allStates = allStates.concat(csc.getStatesOfCountry(id));
    });
    this.state = {
      errorMessages: [],
      name: '',
      number: '',
      expiry: '',
      ccv: '',
      focused: '',
      codenumber: '',
      country: null,
      region: null,
      numberValid: null,
      cardValid: true,
    };
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
  changeCardValue({ target }) {
    console.log('name', target.id);
    if (target.id === 'card') {
      const cr = CryptoJS.AES.encrypt(target.value, 'abc123');
      this.setState({ codenumber: cr.toString() });
    }
    this.setState({ [target.name]: target.value });
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
    const {
      name,
      number,
      codenumber,
      expiry,
      ccv,
      focused,
      country,
      region,
      numberValid,
      cardValid,
    } = this.state;
    console.log('envy:', process.env.GATSBY_POPYTO);
    return (
      <Layout lang={langKey}>
        <Header lang={langKey} pathname={pathname} />
        <Container>
          <h2>Payments</h2>
          <Cards
            number={number}
            name={name}
            expiry={expiry}
            cvc={ccv}
            focused={focused}
            callback={(type, isValid) => {
              if (numberValid != isValid) {
                this.setState({ numberValid: isValid });
              }
            }}
          />
          <center>
            <div style={{ width: '80%', alignSelf: 'center' }}>
              <form
                action="http://localhost:4000/payment"
                method="POST"
                ref="payform"
              >
                <input type="hidden" name="codenumber" value={codenumber} />

                <Grid container alignItems="center" spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      name="firstname"
                      label="First Name"
                      placeholder="firstName"
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      name="lastname"
                      label="Last Name"
                      placeholder="lastName"
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      required={true}
                      name="email"
                      label="Email"
                      placeholder="email"
                      margin="normal"
                      fullWidth
                    />

                    <TextField
                      name="address1"
                      label="Street Address"
                      placeholder="address"
                      margin="normal"
                      fullWidth
                    />
                    <TextField
                      name="address2"
                      label="Building/Apt"
                      placeholder="building/apt."
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <AutosuggestInput
                      suggestions={csc.getAllCountries()}
                      inputProps={{
                        label: 'Country',
                        name: 'country',
                        placeholder: 'your country...',
                        margin: 'normal',
                        inputRef: this.setCountry.bind(this),
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
                        name: 'region',
                        placeholder: 'your region...',
                        margin: 'normal',
                        inputRef: this.setRegion.bind(this),
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
                        name: 'city',
                        placeholder: 'your city...',
                        margin: 'normal',
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="zip"
                      label="Postal Code"
                      placeholder="zip/postal code"
                      margin="normal"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} direction="column">
                    <TextField
                      id="name"
                      label="Name on Card"
                      placeholder="name on card"
                      margin="normal"
                      fullWidth
                      onChange={this.changeCardValue.bind(this)}
                    />
                    <TextField
                      label="Card Number"
                      placeholder="···· ···· ···· ····"
                      margin="normal"
                      fullWidth
                      id="card"
                      onChange={this.changeCardValue.bind(this)}
                      error={!cardValid}
                      FormHelperTextProps={{ error: !cardValid }}
                      helperText={cardValid ? '' : 'invalid card number'}
                      onFocus={e => {
                        this.setState({ cardValid: true });
                      }}
                      onBlur={e => {
                        this.setState({ cardValid: numberValid });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="expiry"
                      label="Valid Thru"
                      placeholder="MM/YY"
                      margin="normal"
                      fullWidth
                      onChange={this.changeCardValue.bind(this)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      name="ccv"
                      label="ccv"
                      placeholder="###"
                      margin="normal"
                      fullWidth
                      onChange={this.changeCardValue.bind(this)}
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
