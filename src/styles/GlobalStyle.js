import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import { colors } from './theme';

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before { 
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  }

${fonts}

@font-face {
  font-family: 'Hoefler Text';
  font-style: normal;
  font-weight: normal;
  src: local('Hoefler Text'), url('ufonts.com_hoefler-text.woff') format('woff');
}
@font-face {
    font-family: 'Hoefler Text Italic';
    font-style: normal;
    font-weight: normal;
    src: local('Hoefler Text Italic'), url('ufonts.com_hoefler-text-italic.woff') format('woff');
}
@font-face {
    font-family: 'Hoefler Text Black';
    font-style: normal;
    font-weight: normal;
    src: local('Hoefler Text Black'), url('ufonts.com_hoefler-text-black.woff') format('woff');
}

body {
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
  margin: 0;
  font-family: 'Hoefler Text';
  font-weight: normal;
  font-size: 18px;
  font-variant-numeric: oldstyle-nums;
  line-height: 27px;
  overflow-x: hidden;
  background-color: ${colors.backgroundDark};
  color: ${colors.secondary};
}
h1 {
    font-family: 'Tranx, sans-serif';
}
h2 {
  white-space: pre-wrap;
}
`;

export default GlobalStyle;