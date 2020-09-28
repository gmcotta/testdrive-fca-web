import React from 'react';

import logoRedux from '../../assets/logo-redux.svg';

import { Container, LogoWrapper, Description } from './styles';

type HeaderProps = {
  description: string;
};

const Header: React.FC<HeaderProps> = ({ description }) => {
  return (
    <Container>
      <LogoWrapper to="/">
        <img src={logoRedux} alt="FCA Logo" />
        <h1>Test Drive</h1>
      </LogoWrapper>
      <Description>{description}</Description>
    </Container>
  );
};

export default Header;
