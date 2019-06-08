import styled from 'styled-components';

const Hero = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -3;
  background-image: url(${props => props.img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
`

export default Hero