import React from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import csc from 'country-state-city';
import Footer from '../../../components/Footer';
import Layout from '../../../components/Layout';
import { colors } from '../../../styles/theme';
import ProductCard from '../../../components/store/ProductCard';
import Loading from '../../../components/store/Loading';
import HeaderCompact from '../../../components/HeaderCompact';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  align-content: center;
  align-items: center;
  margin-top: 80px;
  padding: 20px;
`;

const DiscountInfo = styled.div`
  font-weight: 800;
  border: 1 red;
  padding: 10px;
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
      go: false,
      dataError: false,
      emailError: '',
      errorMessages: '',
      baseProduct: {
        name: 'Acceso Comunicador',
        description: 'Congreso IAE 2019',
        content:
          'La tasa de participación incluye la acreditación al Congreso que da acceso al evento, materiales del Congreso y la participación en otras actividades programadas, así como la entrega de un Certificado que acredita la asistencia al Congreso con el número de horas efectivas, que también acredita una certificación académica a efectos de reconocimiento de créditos ECTS por su participación. Será reconocido 1 ECTS.',
        unitPrice: 180,
        id: 'ck0myx7z109of0831uuf0rjtc',
      },
      discounts: {},
      userDiscount: {
        id: 'ck0myx7zu09ol0831hbyydmcp',
        name: 'Descuento Estudiante',
        unitPrice: 1,
      },
      txData: {
        firstname: '',
        lastname: '',
        email: '',
        institution: '',
      },
    };
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
      this.setState({
        emailError: 'la dirección de email introducida no es válida',
      });
      return null;
    }

    this.setState({
      emailError: '',
      txData: { ...this.state.txData, email },
    });
  }

  updateFormData({ target: { id, value } }) {
    const txData = {
      ...this.state.txData,
      [id]: value,
    };
    if (this.state.go === false) {
      this.setState({
        go: this.checkTxData(txData),
        txData,
      });
    }
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
        form.setAttribute('action', 'https://sis.redsys.es/sis/realizarPago');
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
      baseProduct: { name, description, content, unitPrice, id },
      userDiscount,
    } = this.state;
    description = `${description} / ${userDiscount.name}`;
    unitPrice = userDiscount.unitPrice;
    return (
      <Layout lang={langKey}>
        <HeaderCompact lang={langKey} pathname={pathname} />
        <Container>
          <h1 style={{ fontFamily: 'Tranx, sans-serif' }}>
            Formulario de Participación
          </h1>
          <h2>Comunicador / Presentador Ponencia</h2>
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
                      'Por favor, asegúrese de introducir correctamente su dirección de email. Se le enviará a la misma la confirmación de pago y notificaciones importantes sobre el evento.'
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
                    placeholder="intitución"
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
