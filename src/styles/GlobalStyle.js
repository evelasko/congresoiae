import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

const GlobalStyle = createGlobalStyle`
*,
*::after,
*::before { 
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
  }

body {
  -webkit-box-sizing: border-box;
  box-sizing: border-box; 
  margin: 0;
  font-family: 'Hogler, serif';
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
