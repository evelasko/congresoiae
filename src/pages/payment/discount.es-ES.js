import React from 'react';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';
import HeaderCompact from '../../components/HeaderCompact';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone';
import { colors } from '../../styles/theme';
import SimpleSelect from '../../components/inputs/Select';
import Loading from '../../components/store/Loading';
import TextField from '@material-ui/core/TextField';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip';
import StoreDialog from '../../components/store/Dialogs';
import { navigate } from 'gatsby';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const DropzoneLabel = withStyles(theme => ({
  root: {
    marginTop: 40,
    marginBottom: 0,
  },
}))(FormLabel);

const DropZoneHelperText = withStyles(theme => ({
  root: {
    marginBottom: 8,
  },
}))(FormHelperText);

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
      firstname: '',
      lastname: '',
      institution: '',
      foreignUser: true,
      title: '',
      body: '',
      open: false,
      email: '',
      loading: true,
      dataError: false,
      emailError: '',
      files: [],
      discount: '',
      discounts: [],
      go: false,
    };
  }

  async componentDidMount() {
    // populate component
    try {
      const {
        data: { discounts },
      } = await axios({
        method: 'GET',
        url: `${process.env.GATSBY_API_SERVER}payment/attendee/discounts`,
        headers: { 'Content-Type': 'application/json' },
      });
      if (!discounts) {
        console.log('NO DISCOUNTS RECEIVED...');
        this.setState({ dataError: true, loading: false });
        return;
      }
      this.setState({ discounts, loading: false });
    } catch (e) {
      console.log('Error: ', e);
      this.setState({ dataError: true, loading: false });
    }
  }

  updateFormData({ target: { id, value } }) {
    this.setState({
      [id]: value,
      go:
        this.state.email &&
        this.state.discount &&
        this.state.files.length &&
        !this.state.emailError
          ? true
          : false,
    });
  }

  handleChange(files) {
    this.setState({
      files,
      go:
        this.state.email &&
        this.state.discount &&
        files.length &&
        !this.state.emailError
          ? true
          : false,
    });
  }

  toggleDialog() {
    if (this.state.open && this.state.title === 'Confirmación de Solicitud') {
      navigate('/');
    }
    this.setState({ open: !this.state.open });
  }

  handleSelect(e) {
    // const { discounts } = this.state
    // const discount = discounts.filter(({id}) => id === e.target.value)[0]
    this.setState({ discount: e.target.value });
  }

  async updateEmail(e) {
    const email = e.target.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.setState({
        emailError: 'Por favor introduzca una dirección de email válida',
        go: false,
      });
      return;
    }

    const {
      data: { foundUser, error },
    } = await axios({
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
      params: { email },
      url: `${process.env.GATSBY_API_SERVER}payment/attendee/find/discount/`,
    });

    if (foundUser) {
      const { firstname, lastname } = foundUser;
      this.setState({ foreignUser: false, firstname, lastname });
    } else {
      this.setState({ foreignUser: true });
    }

    if (error) {
      this.setState({ emailError: error, go: false });
      return;
    } else {
      this.setState({ emailError: '' });
    }

    // if none of the above then just set email field
    this.setState({
      email,
      emailError: '',
      go:
        this.state.email &&
        this.state.discount &&
        this.state.files.length &&
        !this.state.emailError
          ? true
          : false,
    });
  }

  async onSubmit() {
    const { files, email, discount, firstname, lastname } = this.state;

    const data = new FormData();

    files.forEach(file => {
      data.append('files', file, file.name);
    });
    data.set('email', email);
    data.set('discount', discount);
    data.set('firstname', firstname);
    data.set('lastname', lastname);
    axios({
      method: 'POST',
      url: `${process.env.GATSBY_API_SERVER}payment/attendee/requestdiscount`,
      data,
      config: { headers: { 'Content-Type': 'multipart/form-data' } },
    }).then(({ data }) => {
      console.log('X RESPONSE DATA: ', data);
      if (data.newRequest) {
        this.setState({
          open: true,
          title: 'Confirmación de Solicitud',
          body:
            'Tu solicitud de descuento se ha enviado satisfactoriamente. La organización le notificará su aprobación a la dirección de email indicada en el formulario.',
        });
      } else {
        this.setState({
          open: true,
          title: 'Error',
          body:
            'Ha ocurrido un error al procesar su solicitud, por favor inténtelo de nuevo. Si el problema persiste póngase en contacto con nostros en congreso@alicialonso.org',
        });
      }
    });
  }

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
    const {
      emailError,
      institution,
      foreignUser,
      firstname,
      lastname,
      discount,
      discounts,
      loading,
      open,
      title,
      body,
    } = this.state;
    const discountObj = discounts.filter(({ id }) => id === discount)[0];
    let requirements = discountObj ? discountObj.requirements : undefined;

    console.log('DISCOUNT: ', discount);
    if (loading) return <Loading />;

    return (
      <Layout lang={langKey}>
        <HeaderCompact lang={langKey} pathname={pathname} />
        <Container>
          <h1 style={{ fontFamily: 'Tranx, sans-serif', marginTop: 50 }}>
            Solicitud de Descuento
          </h1>
          <h2>
            Categoría: <strong>Oyente</strong>
          </h2>
          <p>
            Por favor completa el siguiente formulario para solicitar tu
            descuento, incluyendo los archivos que se indican en la sección
            Requisitos y Documentación correspondiente al descuento que va a
            solicitar.
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
              <h4>{'Formulario de Solicitud'.toUpperCase()}</h4>
              <SimpleSelect
                name="selectedDiscount"
                value={discount}
                label="Seleccione Descuento"
                items={discounts}
                handleChange={this.handleSelect.bind(this)}
              />
              <TextField
                required={true}
                id="email"
                label="Email"
                placeholder="email"
                margin="normal"
                fullWidth
                onBlur={this.updateEmail.bind(this)}
                error={!!emailError}
                helperText={
                  emailError ||
                  'Se le notificará a la dirección de email que indique aquí. Por favor asegúrese de introducirla correctamente.'
                }
              />
              <TextField
                required={true}
                id="firstname"
                disabled={!foreignUser}
                value={firstname}
                label="Nombre"
                margin="normal"
                fullWidth
                onBlur={this.updateFormData.bind(this)}
              />
              <TextField
                required={true}
                id="lastname"
                disabled={!foreignUser}
                value={lastname}
                label="Apellidos"
                margin="normal"
                fullWidth
                onBlur={this.updateFormData.bind(this)}
              />
              <TextField
                required={true}
                id="institution"
                disabled={!foreignUser}
                value={institution}
                label="Institución"
                margin="normal"
                fullWidth
                onBlur={this.updateFormData.bind(this)}
              />
              <DropzoneLabel required={true}>Documentación</DropzoneLabel>
              <DropZoneHelperText>
                Agrege hasta tres archivos (imágenes o documentos pdf) de no más
                de 3mb
              </DropZoneHelperText>
              <DropzoneArea
                acceptedFiles={['application/pdf', 'image/*']}
                dropzoneText="arrastre o haga click para agregar archivos"
                onChange={this.handleChange.bind(this)}
              />
              <div
                style={{
                  display: 'inline-flex',
                  width: '100%',
                  height: '80px',
                }}
              />
              <Tooltip
                title="Debe introducir todos los campos y agregar al menos un archivo de documentación"
                placement="top"
                open={!this.state.go}
              >
                <div
                  id="overButton"
                  style={{ width: '100%', display: 'inline-flex' }}
                >
                  <ColorButton
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={!this.state.go}
                    onClick={this.onSubmit.bind(this)}
                  >
                    {`Enviar solicitud`}
                  </ColorButton>
                </div>
              </Tooltip>
            </StoreColumn>
            <StoreColumn>
              <h4>{'Requisitos y Documentación'.toUpperCase()}</h4>
              {!requirements ? (
                <p>
                  Por favor seleccione el descuento que desea solicitar para
                  mostrar los requisitos y la documentación necesaria para el
                  mismo.
                </p>
              ) : (
                <ReactMarkdown source={requirements} />
              )}
            </StoreColumn>
          </StoreContainer>
        </Container>
        <Footer lang={langKey} />
      </Layout>
    );
  }
}

export default IndexPage;
