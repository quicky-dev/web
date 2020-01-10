import React, { PureComponent } from 'react';
import styled from 'styled-components';

const NavLogo = styled.a`
  font-family: 'Karla', sans-serif;
  font-size: 2.25em;
  text-decoration: none;
  color: #333;
  &:hover { color: #333; }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center; 
  top: 0;
  left: 0;
  padding: 1.25em 1.75em;
`;

const NavItem = styled.a`
  font-size: 1.125em;
  text-decoration: none;
  color: #333;
  &:hover { color: #333; }
`;

const LeftNav = styled.div`
  flex-grow: 1;
`;

const RightNav = styled.div`
`;

class Navbar extends PureComponent {
  render() {
    return (
      <Nav>
        {/* Navbar Logo */}
        <LeftNav>
          <NavLogo href="/">Quicky</NavLogo>
        </LeftNav>

        {/* Navbar Items */}
        <RightNav>
          <NavItem href="/">about</NavItem>
        </RightNav>

      </Nav>
    );
  }
}


export default Navbar;
