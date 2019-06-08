import { navigate } from 'gatsby';
import React, { Fragment } from 'react';
import Headroom from 'react-headroom';
import Fade from 'react-reveal/Fade';
import { SectionLinks } from 'react-scroll-section';
import { Flex } from 'rebass';
import styled from 'styled-components';
import { langs } from '../../data/languages';
import translations from '../../data/translations';
import Logo from './Logo/Logo.svg';
import RouteLang from './RouteLang';
import RouteLink from './RouteLink';

const capitalize = s => s && s[0].toUpperCase() + s.slice(1);

const HeaderContainer = styled(Headroom)`
  .headroom--pinned {
    background: ${props => props.theme.colors.primary};
  }
  font-family: 'Tranx', sans-serif;
  letter-spacing:1px;
  position: absolute;
  width: 100%;
`;
const ResponsiveLogo = styled.img`
  width: 24px;
  height: 24px;

  @media (min-width: 400px) {
    width: 48px;
    height: 48px;
  }
`;

const formatLinks = allLinks =>
  Object.entries(allLinks).reduce(
    (acc, [key, value]) => {
      const isHome = key === 'home';
      return isHome
        ? {
            ...acc,
            home: value,
          }
        : {
            ...acc,
            links: [...acc.links, { name: capitalize(key), value }],
          };
    },
    { links: [], home: null },
  );

const Header = ({lang, pathname}) => (
  <HeaderContainer>
    <Fade top>
      <Flex
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
        p={3}
      >
        <SectionLinks>
          {({ allLinks }) => {
            const { home, links } = formatLinks(allLinks);

            const homeLink = home && (
              <ResponsiveLogo
                src={Logo}
                width="50px"
                alt="Portfolio Logo"
                onClick={home.onClick}
                style={{ cursor: 'pointer' }}
              />
            );
            const navLinks = links.map(({ name, value }) => (
              <RouteLink
                key={name}
                onClick={value.onClick}
                selected={value.selected}
              >
                {translations.menu[name.toLowerCase()][lang.slice(0,2)].toUpperCase()}
              </RouteLink>
            ));

            const nextLang = langs.filter(l => l !== lang)[0]
            navLinks.push( 
              (<RouteLang key={lang} onClick={() => {navigate(pathname.replace(lang, nextLang))}}>
                { nextLang.slice(0,2).toUpperCase() }
              </RouteLang> )
            )

            return (
              <Fragment>
                {
                  homeLink
                }
                <Flex mr={[0, 3, 5]}>{navLinks}</Flex>
              </Fragment>
            );
          }}
        </SectionLinks>
      </Flex>
    </Fade>
  </HeaderContainer>
);

export default Header;
