import { Card as CardRebass } from 'rebass';
import styled from 'styled-components';

export const CardContainer = styled.div`
  display: grid;
  grid-gap: 30px;

  grid-template-columns: repeat(
    auto-fill,
    minmax(${props => props.minWidth}, 1fr)
  );
  justify-items: center;

  @media only screen and (max-width: 400px) {
    grid-template-columns: repeat(
      auto-fill, 
      minmax(270px, 1fr));
  }
`;

export const Card = styled(CardRebass).attrs(props => { bg: 'transparent' })`
  position: relative;
  transition: all 0.25s;
  top: 0;
  height: 100%;
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};

  &:hover {
    /* top: -10px; */
    /* box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2); */
  }
`;

export default Card;
