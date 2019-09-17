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
import { Link } from 'gatsby';

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
      emailLoading: false,
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
      discounts: [],
      userDiscount: undefined,
      txData: {
        firstname: '',
        lastname: '',
        email: '',
        institution: '',
      },
    };
  }

  async componentDidMount() {
    // populate store data
    try {
      const {
        data: { baseProduct },
      } = await axios({
        method: 'GET',
        url: `${process.env.GATSBY_API_SERVER}payment/attendee/base`,
        headers: { 'Content-Type': 'application/json' },
      });
      if (!baseProduct) {
        console.log('NO BASE PRODUCT RECEIVED...');
        this.setState({ dataError: true, loading: false });
        return null;
      }
      this.setState({
        baseProduct,
        loading: false,
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
      if (key === 'institution') {
        continue;
      }
      if (obj[key] === 0 || obj[key] === '') return false;
    }
    return true;
  }

  async updateEmail(e) {
    const email = e.target.value;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({ emailError: 'please enter a valid email address' });
      return null;
    }

    this.setState({ emailLoading: true });

    const {
      data: { foundDiscount, error },
    } = await axios({
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      params: { email },
      url: `${process.env.GATSBY_API_SERVER}payment/attendee/find/discount/`,
    });
    console.log('ERROR: ', error);
    if (!foundDiscount) {
      this.setState({
        userDiscount: null,
        emailLoading: false,
        txData: {
          ...this.state.txData,
          email,
        },
      });
      return;
    }

    if (foundDiscount) {
      if (foundDiscount.discountRequests.length) {
        console.log('IN A');
        const {
          unitPrice,
          name,
          description,
        } = foundDiscount.discountRequests[0].discount;
        this.setState({
          userDiscount: foundDiscount.discountRequests[0].discount,
          dialog: {
            open: !this.state.dialog.open,
            title: 'Descuento',
            body: `La dirección de email introducida tiene asignado el siguiente descuento:\n${name}\n${description}\nPrecio: ${unitPrice}€`,
          },
          emailLoading: false,
          emailError: '',
          txData: {
            ...this.state.txData,
            email,
          },
        });
        return;
      } else {
        console.log('IN B');
        this.setState({
          userDiscount: null,
          emailError: '',
          emailLoading: false,
        });
      }
    }

    // if none of the above then just reset product and email field
    this.setState({
      userDiscount: {},
      emailError: '',
      emailLoading: false,
    });
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

  onSubmit(e) {
    e.preventDefault();
    const {
      pageContext: { langKey },
    } = this.props;
    let {
      baseProduct: { name, description, unitPrice, id },
    } = this.state;
    let discountId = null;
    if (this.state.userDiscount) {
      unitPrice = this.state.userDiscount.unitPrice;
      description = `${description}\n${this.state.userDiscount.name}`;
      discountId = this.state.userDiscount.id;
    }
    axios({
      method: 'POST',
      url: `${process.env.GATSBY_API_SERVER}payment/getsignature/`,
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        description: `${name} - ${description}`,
        total: unitPrice,
        urlOk: `https://congreso.alicialonso.org/${langKey}/payment/confirm/`,
        urlKo: `https://congreso.alicialonso.org/${langKey}/payment/error/`,
        txData: {
          ...this.state.txData,
          productId: id,
          discountId,
          total: unitPrice,
        },
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

    let {
      loading,
      dialog: { open, title, body },
      baseProduct: { name, description, content, unitPrice, id },
    } = this.state;

    if (
      this.state.userDiscount != null ||
      this.state.userDiscount != undefined
    ) {
      unitPrice = this.state.userDiscount.unitPrice;
      description = `${description}\n${this.state.userDiscount.name}`;
    }

    if (loading) {
      return <Loading />;
    }
    return (
      <Layout lang={langKey}>
        <HeaderCompact lang={langKey} pathname={pathname} />
        <Container>
          <h1 style={{ fontFamily: 'Tranx, sans-serif' }}>
            Formulario de Participación
          </h1>
          <h2>{translations.name[[langKey.slice(0, 2)]]}</h2>
          <p>
            La organización ofrece descuentos a alumnos del Instituto
            Universitario Alicia Alonso, a alumnos de Tercer Ciclo de la URJC, a
            miembros del ITI y de la Red UNITWIN. Si cumples con alguno de estos
            requisitos puedes solicitar tu descuento siguiendo este{' '}
            <Link to={`/${langKey}/payment/discount/`}>enlace</Link>.
          </p>
          <StoreDialog
            open={open}
            close={this.toggleDialog.bind(this)}
            closeDialog="Cerrar"
            title={title}
            body={body}
          />
          <StoreContainer>
            <StoreColumn>
              {this.state.emailLoading ? (
                <Loading />
              ) : (
                <ProductCard
                  name={name || 'ningún producto seleccionado'}
                  description={description || ''}
                  content={content || ''}
                  unitprice={unitPrice || '00.0'}
                  iconurl={''}
                  id={id || 'productcard'}
                />
              )}
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
                    helperText={
                      this.state.emailError ||
                      'Si tiene un descuento confirmado por favor introduzca la dirección de email que indicó en la solicitud para actualizar la petición.'
                    }
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
                    id="institution"
                    label="Institución"
                    placeholder="lastName"
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
                    {`Proceder al Pago (${unitPrice}€)`}
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
