import React from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Clogo from '../components/Logo/Logo.svg';

const FormHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
  background-color: ${props => props.theme.colors.primary};
`;
const ResponsiveLogo = styled.img`
  width: 32px;
  height: 32px;

  @media (min-width: 400px) {
    width: 48px;
    height: 48px;
  }
`;
const HalvedField = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const HalvedLabel = styled.div`
  width: 30%;
  display: inline-block;
  margin-right: 10px;
  text-align: right;
`;
const HalvedInput = styled.div`
  width: 55%;
  padding-right: 5px;
`;

const Halved = props => {
  const { name, type, label, handleChange, values = [] } = props;
  let field = null;
  switch (type) {
    case 'text':
      field = (
        <input type="text" name={name} id={name} onChange={handleChange} />
      );
      break;
    case 'select':
      field = (
        <select name={name} id={name} onChange={handleChange}>
          {values.map(v => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      );
      break;
    case 'file':
      field = (
        <input type="file" name={name} id={name} onChange={handleChange} />
      );
      break;
  }
  return (
    <HalvedField>
      <HalvedLabel> {label} </HalvedLabel>
      <HalvedInput> {field} </HalvedInput>
    </HalvedField>
  );
};

const IndexPage = props => {
  const {
    pageContext: { langKey },
    location: { pathname },
  } = props;
  return (
    <Layout lang={langKey}>
      <FormHeader>
        <ResponsiveLogo
          src={Clogo}
          width="50px"
          alt="Congress Logo"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/');
          }}
        />
      </FormHeader>
      <div>
        <form
          name="tryout"
          method="post"
          netlify-honeypot="bot-field"
          data-netlify="true"
        >
          <input type="hidden" name="bot-field" />
          <Halved
            type="text"
            name="name"
            label="Nombre"
            handleChange={({ target: { value } }) => {
              console.log(value);
            }}
          />
          <Halved
            type="text"
            name="lastname"
            label="Apellidos"
            handleChange={({ target: { value } }) => {
              console.log(value);
            }}
          />
          <Halved
            type="text"
            name="email"
            label="eMail"
            handleChange={({ target: { value } }) => {
              console.log(value);
            }}
          />
          <Halved
            type="select"
            name="topic"
            label="Topic"
            handleChange={({ target: { value } }) => {
              console.log(value);
            }}
            values={[
              { value: '1', label: 'Topic 1' },
              { value: '2', label: 'Topic 2' },
              { value: '3', label: 'Topic 3' },
            ]}
          />
          <Halved
            type="file"
            name="cv"
            label="Resume"
            handleChange={({ target: { value } }) => {
              console.log(value);
            }}
          />
          <ul className="actions">
            <li>
              <input type="submit" value="Enviar" />
            </li>
            <li>
              <input type="reset" value="Borrar" />
            </li>
          </ul>
        </form>
      </div>
      <Footer />
    </Layout>
  );
};

export default IndexPage;
