import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { Image, Text } from 'rebass';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: ${props => props.height || '400px'};
  /* display: flex;
    flex-flow: row wrap; */
  align-items: center;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 600px) {
    height: ${props =>
      props.height ? 'calc(' + props.height + 'px/2)' : 'calc(400px / 2)'};
  }
  @media (max-width: 400px) {
    height: ${props =>
      props.height ? 'calc(' + props.height + 'px/2)' : 'calc(400px / 2)'};
  }
`;
const ParallaxContainer = styled.div`
  position: relative;
`;
const BannerContainer = styled.div`
  position: absolute;
  top: 40%;
  width: 100%;
  white-space: pre-wrap;
`;
const BannerText = styled(Text)`
  color: white;
  font-family: 'Tranx', sans-serif;
  font-weight: 100;
`;

const ParallaxBanner = ({ src, height, text }) => (
  <Wrapper>
    <Parallax y={[-10, 10]}>
      <ParallaxContainer height={height}>
        <Image width="100%" src={src} />
        <BannerContainer height={height}>
          <center>
            <BannerText
              lineHeight={[2, 2, 2]}
              fontSize={[3, 3, 5]}
              color="white"
            >
              {text}
            </BannerText>
          </center>
        </BannerContainer>
      </ParallaxContainer>
    </Parallax>
  </Wrapper>
);

export default ParallaxBanner;
