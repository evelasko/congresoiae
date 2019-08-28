import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import csc from 'country-state-city';
import AutosuggestInput from '../../components/inputs/autosuggest';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import { colors } from '../../styles/theme';
import ProductCard from '../../components/store/ProductCard';
import Loading from '../../components/store/Loading';
import StoreDialog from '../../components/store/Dialogs';
import translations from '../../../data/translations';
import HeaderCompact from '../../components/HeaderCompact';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  align-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 20px;
`;

const StoreContainer = styled.div`
  padding: 1em;
  margin-top: 50px;
  width: 100%;

  color: ${colors.secondaryDark};
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-column-gap: 10px;
`;
const StoreColumn = styled.div`
  display: inline-flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  margin: 10px;
  align-content: center;
  white-space: pre-wrap;
  font-family: 'Tranx', sans-serif;
  font-weight: 100;
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
      loading: true,
      dialog: {
        open: false,
        title: '',
        body: '',
      },
      go: false,
      dataError: false,
      emailError: '',
      errorMessages: '',
      country: null,
      region: null,
      products: [],
      baseProduct: {},
      selectedProduct: {},
      discounts: [],
      userDiscount: {},
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
        total: 0, // change here !!!
      },
    };
  }

  async componentDidMount() {
    // populate store data
    try {
      const {
        data: { products, discounts, baseProduct },
      } = await axios({
        method: 'GET',
        url: `${process.env.GATSBY_API_SERVER}payment/attendee/data`,
        headers: { 'Content-Type': 'application/json' },
      });
      this.setState({
        products,
        discounts,
        baseProduct,
        selectedProduct: baseProduct,
        loading: false,
        txData: {
          ...this.state.txData,
          total: baseProduct.unitprice,
        },
      });
    } catch (e) {
      console.log('Error: ', e);
      this.setState({ dataError: true, loading: false });
      return null;
    }
  }

  toggleDialog() {
    this.setState({
      dialog: {
        ...this.state.dialog,
        open: !this.state.dialog.open,
      },
    });
  }

  checkTxData(obj) {
    for (var key in obj) {
      if (key === 'address2') {
        continue;
      }
      if (obj[key] === 0 || obj[key] === '') return false;
    }
    return true;
  }

  updateEmail(e) {
    let emailError = '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value)) {
      emailError = 'please enter a valid email address';
    }

    const foundDiscount = this.state.discounts.filter(
      ({ email }) => email === e.target.value,
    );
    // if found, set the product accordingly
    if (foundDiscount[0]) {
      const { unitprice, name, description } = foundDiscount[0].product;
      this.setState({
        selectedProduct: foundDiscount[0].product,
        dialog: {
          open: !this.state.dialog.open,
          title: 'Descuento',
          body: `La dirección de email introducida tiene asignado el siguiente descuento:\n${name}\n${description}\nPrecio: ${unitprice}€`,
        },
        emailError,
        txData: {
          ...this.state.txData,
          email: e.target.value,
          total: unitprice,
        },
      });
    } else {
      this.setState({
        selectedProduct: this.state.baseProduct,
        emailError,
        txData: {
          ...this.state.txData,
          email: e.target.value,
          total: this.state.baseProduct.unitprice,
        },
      });
    }
  }

  updateFormData({ target: { id, value } }) {
    const txData = {
      ...this.state.txData,
      [id]: value,
    };
    this.setState({
      go: this.checkTxData(txData),
      txData,
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
    const {
      pageContext: { langKey },
    } = this.props;
    const {
      selectedProduct: { name, description, unitprice },
    } = this.state;
    axios({
      method: 'POST',
      url: `${process.env.GATSBY_API_SERVER}payment/getsignature/`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        description: `${name} - ${description}`,
        total: unitprice,
        urlOk: `https://congreso.alicialonso.org/${langKey}/payment/confirm/`,
        urlKo: `https://congreso.alicialonso.org/${langKey}/payment/error/`,
        txData: this.state.txData,
      },
    })
      .then(function(response) {
        console.log('RESPONSE:', response.data);
        const { data } = response;

        // Create form
        var form = document.createElement('form');
        form.setAttribute('action', process.env.GATSBY_PAY_SERVER);
        form.setAttribute('method', 'POST');
        form.setAttribute('style', 'display: none');

        // Create form fields
        for (var k in data) {
          var field = document.createElement('input');
          field.setAttribute('type', 'hidden');
          field.setAttribute('name', k);
          field.setAttribute('value', data[k]);
          form.appendChild(field);
        }
        console.log('ready form submission');
        // Append and submit form -  this will leave the page
        document.body.appendChild(form);
        form.submit();
      })
      .catch(function(error) {
        console.log('ERROR', error);
      });
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
    const {
      loading,
      dialog: { open, title, body },
      country,
      region,
      selectedProduct: { name, description, content, unitprice, iconurl, id },
    } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <Layout lang={langKey}>
        <HeaderCompact lang={langKey} pathname={pathname} />
        <Container>
          <h1 style={{ fontFamily: 'Tranx, sans-serif' }}>Participación</h1>
          <h2>{translations.name[[langKey.slice(0, 2)]]}</h2>
          <StoreDialog
            open={open}
            close={this.toggleDialog.bind(this)}
            closeDialog="Cerrar"
            title={title}
            body={body}
          />
          <StoreContainer>
            <StoreColumn>
              <ProductCard
                name={name || 'no product selected'}
                description={description || ''}
                content={content || ''}
                unitprice={unitprice || '00.0'}
                iconurl={iconurl || ''}
                id={id || 'productcard'}
              />
            </StoreColumn>
            <StoreColumn>
              <Grid container alignItems="center" spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    id="email"
                    label="Email"
                    placeholder="email"
                    margin="normal"
                    fullWidth
                    onBlur={this.updateEmail.bind(this)}
                    error={!!this.state.emailError}
                    helperText={this.state.emailError}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    id="firstname"
                    label="Nombre"
                    placeholder="firstName"
                    margin="normal"
                    fullWidth
                    onBlur={this.updateFormData.bind(this)}
                  />
                  <TextField
                    required={true}
                    id="lastname"
                    label="Apellidos"
                    placeholder="lastName"
                    margin="normal"
                    fullWidth
                    onBlur={this.updateFormData.bind(this)}
                  />

                  <TextField
                    required={true}
                    id="address1"
                    label="Dirección"
                    placeholder="address"
                    margin="normal"
                    fullWidth
                    onBlur={this.updateFormData.bind(this)}
                  />
                  <TextField
                    id="address2"
                    label="Edificio / Bloque / Puerta"
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
                      required: true,
                      label: 'País',
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
                      required: true,
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
                      required: true,
                      label: 'Ciudad',
                      id: 'city',
                      placeholder: 'your city...',
                      margin: 'normal',
                      onBlur: this.updateFormData.bind(this),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required={true}
                    id="zip"
                    label="Código Postal"
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
                    disabled={!this.state.go}
                    onClick={this.onSubmit.bind(this)}
                  >
                    {`Proceder al Pago (${unitprice}€)`}
                  </ColorButton>
                </Grid>
              </Grid>
            </StoreColumn>
          </StoreContainer>
          <div className="sq-error-message">{this.state.errorMessages}</div>
        </Container>
        <Footer />
      </Layout>
    );
  }
}

export default IndexPage;
