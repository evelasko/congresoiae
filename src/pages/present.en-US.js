import React, { Fragment } from 'react';
import styled from 'styled-components';
import translations from '../../data/translations';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Clogo from '../components/Logo/Logo.svg';

const FormHeader = styled.div`
  padding-left: 10px;
  width: 100%;
  margin-bottom: 20px;
  vertical-align: top;
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
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;
const HalvedLabel = styled.div`
  width: 20%;
  display: inline-block;
  margin-right: 10px;
  text-align: right;
  font-family: 'Tranx', sans-serif;
  font-weight: 400;
  font-size: 0.5em;
  color: ${props => props.theme.colors.secondary};
`;
const HalvedInput = styled.div`
  width: 55%;
  padding-right: 5px;
  display: inline-block;
`;
const TextInput = styled.input`
  background: none;
  width: 100%;
  border: none;
  border-bottom: solid 1px;
  border-bottom-color: ${props => props.theme.colors.secondaryLight};
  font-family: 'Cormorant Garamond', serif;
  color: ${props => props.theme.colors.secondary};
  font-size: 1em;
`;
const SelectInput = styled.select`
  border-color: ${props => props.theme.colors.secondaryLight};
  background: none;
  width: 100%;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1em;
  color: ${props => props.theme.colors.secondaryDark};
`;
const FileInput = styled.input`
  /* width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1; */
`;
const FileInputLabel = styled.label`
  font-size: 1em;
  color: ${props => props.theme.colors.secondaryDark};
  background-color: none;
  border: solid 1px ${props => props.theme.colors.secondaryLight};
  border-radius: 5px;
  line-height: normal;
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  cursor: pointer;
`;
const FileInputFile = styled.div`
  font-family: 'Tranx', sans-serif;
  font-size: 0.5em;
  display: inline-block;
  margin-left: 10px;
  color: ${props => props.theme.colors.secondaryLight};
`;
const Actions = styled.ul`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
`;
const Action = styled.li`
  display: inline-block;
  padding: 10px;
  background-color: ${props => props.theme.colors.secondary};
  margin: 10px;
`;
const ActionButton = styled.input`
  color: ${props => props.theme.colors.secondaryLight};
  font-family: 'Tranx', sans-serif;
  letter-spacing: 2px;
  font-size: 1em;
`;

const Halved = props => {
  const {
    lang = 'es-ES',
    name,
    type,
    label,
    handleChange,
    values = [],
    value,
    style,
  } = props;
  console.log(props.theme);
  let field = null;
  switch (type) {
    case 'text':
      field = (
        <TextInput type="text" name={name} id={name} onChange={handleChange} />
      );
      break;
    case 'select':
      field = (
        <SelectInput name={name} id={name} onChange={handleChange}>
          {values.map(v => (
            <option key={v.value} value={v.value}>
              {v[lang.slice(0, 2)]}
            </option>
          ))}
        </SelectInput>
      );
      break;
    case 'file':
      field = (
        <Fragment>
          <FileInput
            type="file"
            name={name}
            id={name}
            onChange={handleChange}
          />
          <FileInputFile>{value}</FileInputFile>
        </Fragment>
      );
      break;
  }
  return (
    <HalvedField style={style}>
      <HalvedLabel> {label} </HalvedLabel>
      <HalvedInput> {field} </HalvedInput>
    </HalvedField>
  );
};

class IndexPage extends React.Component {
  state = { abstractFile: null, resumeFile: null };

  setAbstractFile = abstractFile => {
    this.setState({ abstractFile });
  };
  setResumeFile = resumeFile => {
    this.setState({ resumeFile });
  };

  render() {
    const {
      pageContext: { langKey },
      location: { pathname },
    } = this.props;
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
          <div
            style={{
              verticalAlign: 'top',
              marginLeft: '15px',
              marginTop: '20px',
              display: 'inline-block',
              marginTop: '5px',
              lineHeight: 'normal',
            }}
          >
            <h2 style={{ margin: 0, marginTop: '2px' }}>
              Proposal Application
            </h2>
          </div>
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
              label={translations.form.labels.name[
                langKey.slice(0, 2)
              ].toUpperCase()}
              handleChange={({ target: { value } }) => {
                console.log(value);
              }}
            />
            <Halved
              type="text"
              name="lastname"
              label={translations.form.labels.lastname[
                langKey.slice(0, 2)
              ].toUpperCase()}
              handleChange={({ target: { value } }) => {
                console.log(value);
              }}
            />
            <Halved
              type="text"
              name="email"
              label="EMAIL"
              handleChange={({ target: { value } }) => {
                console.log(value);
              }}
            />
            <Halved
              style={{ paddingTop: '15px', paddingBottom: '10px' }}
              type="select"
              name="topic"
              label={translations.form.labels.topic[
                langKey.slice(0, 2)
              ].toUpperCase()}
              handleChange={({ target: { value } }) => {
                console.log(value);
              }}
              values={translations.form.topics}
            />
            <Halved
              type="file"
              lang={langKey}
              name="cv"
              label={translations.form.labels.resume[
                langKey.slice(0, 2)
              ].toUpperCase()}
              handleChange={({ target: { value } }) => {
                console.log(value);
                // this.setResumeFile(value.substring(value.lastIndexOf('\\')+1).toUpperCase());
              }}
              value={this.state.resumeFile}
            />
            <Halved
              type="file"
              lang={langKey}
              name="abstract"
              label={translations.form.labels.abstract[
                langKey.slice(0, 2)
              ].toUpperCase()}
              handleChange={({ target: { value } }) => {
                console.log(value);
                // this.setAbstractFile(value.substring(value.lastIndexOf('\\')+1).toUpperCase());
              }}
              value={this.state.abstractFile}
            />
            <Actions className="actions">
              <Action>
                <ActionButton
                  type="reset"
                  value={translations.form.actions.reset[
                    langKey.slice(0, 2)
                  ].toUpperCase()}
                />
              </Action>
              <Action>
                <ActionButton
                  type="submit"
                  value={translations.form.actions.submit[
                    langKey.slice(0, 2)
                  ].toUpperCase()}
                />
              </Action>
            </Actions>
          </form>
        </div>
        <Footer lang={langKey} />
      </Layout>
    );
  }
}

export default IndexPage;
