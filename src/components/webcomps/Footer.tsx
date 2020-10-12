import React from 'react';
import Radium from 'radium';
import { CSSProperties } from '@material-ui/styles';


const Styles = {
footer: {
    bottom: 0,
    position: 'absolute',
 } as CSSProperties 
};

const Footer = () => {
    return (
        <footer style={Styles.footer}>
                <p>&copy; Finding Fido 2020</p>
        </footer>
    )
}

export default Radium(Footer);