import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/FindingFidoTrans.png';

const MyHeader = styled.div`
text-align: center;
`

const Header = () => {
return (
    <MyHeader className="header">
    <header>
<h2>Welcome to Finding Fido <img src={Logo} height="50" alt={"Logo"}/></h2>
    
    </header>
    </MyHeader>
);
};

export default Header;