import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import csc from 'country-state-city';
import AutosuggestInput from '../../../components/inputs/autosuggest';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Layout from '../../../components/Layout';
import { setTx } from '../../../util/payments';
import { colors } from '../../../styles/theme';
import RedSys from 'redsys-pos';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  align-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 20px;
`;

const ColorButton = withStyles(theme => ({
  root: {
    fontFamily: [
      '"Tranx"',
      '"Montserrat"',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    color: colors.secondaryLight,
    backgroundColor: colors.secondary,
    '&:hover': {
      backgroundColor: colors.secondaryDark,
    },
  },
}))(Button);

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    let allStates = [];
    csc.getAllCountries().forEach(({ id }) => {
      allStates = allStates.concat(csc.getStatesOfCountry(id));
    });
    this.state = {
      loading: false,
      errorMessages: '',
      country: null,
      region: null,
      txData: {
        firstname: '',
        lastname: '',
        email: '',
        address1: '',
        address2: '',
        country: '',
        region: '',
        city: '',
        zip: '',
        total: 1, // change here !!!
        attendees: 1,
      },
    };
  }

  updateFormData({ target: { id, value } }) {
    this.setState({
      txData: {
        ...this.state.txData,
        [id]: value,
      },
    });
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

  onSubmit(e) {
    e.preventDefault();
    const { langKey } = this.props;
    const { txData } = this.state;

    // Create form
    var form = document.createElement('form');
    form.setAttribute(
      'action',
      'https://sis-t.redsys.es:25443/sis/realizarPago',
    );
    form.setAttribute('method', 'POST');
    form.setAttribute('style', 'display: none');

    // Set parameters

    const redsys = new RedSys(process.env.GATSBY_COM_CLVE);

    var obj = {
      amount: '100', // cents (in euro)
      orderReference: '1508428360',
      merchantName: 'FUNDACION ALICIA ALONSO',
      merchantCode: process.env.GATSBY_COM_CODE,
      currency: '978',
      transactionType: '0', // '0'
      terminal: '002',
      merchantURL: 'http://www.my-shop.com/',
      successURL: 'http://localhost:8080/success',
      errorURL: 'http://localhost:8080/error',
    };

    const tx = redsys.makePaymentParameters(obj);

    // const tx = setTx({
    //     txData,
    //     description: "Congress Single Regular Entry",
    //     total: 1,
    //     url: "https://api.alicialonso.org/payment/confirmation",
    //     urlOk: `https://congreso.alicialonso.org/${langKey}/payment/error`,
    //     urlKo: `https://congreso.alicialonso.org/${langKey}/payment/confirm`
    // })

    // Create form fields
    for (var k in tx) {
      var field = document.createElement('input');
      field.setAttribute('type', 'hidden');
      field.setAttribute('name', k);
      field.setAttribute('value', tx[k]);
      form.appendChild(field);
    }

    console.log('ready form submission');

    // Append and submit form -  this will leave the page
    document.body.appendChild(form);
    form.submit();
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
    const { country, region } = this.state;

    return (
      <Layout lang={langKey}>
        <Header lang={langKey} pathname={pathname} />
        <Container>
          <h2>Payments</h2>
          <center>
            <div style={{ width: '80%', alignSelf: 'center' }}>
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
                      id: 'country',
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
                      id: 'region',
                      placeholder: 'your region...',
                      margin: 'normal',
                      inputRef: this.setRegion.bind(this),
                      onBlur: this.updateFormData.bind(this),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <AutosuggestInput
                    suggestions={region ? csc.getCitiesOfState(region.id) : []}
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
                  <ColorButton
                    variant="contained"
                    size="large"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Datos de Pago
                  </ColorButton>
                </Grid>
              </Grid>
            </div>
          </center>
          <div className="sq-error-message">
            {
              this.state.errorMessages
              //     this.state.errorMessages.map(errorMessage => (
              //   <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              // ))
            }
          </div>
        </Container>
        <Footer />
      </Layout>
    );
  }
}

export default IndexPage;
