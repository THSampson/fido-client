import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from "../webcomps/Sidebar";
import Paper from '@material-ui/core/Paper';

type IProps = {
sessionToken: string
}

const MyText = styled.div`
text-align: center;
`


class Home extends React.Component<IProps, {}> {

render() {
  return (
    <MyText>
        <h3>I hope you enjoy your stay. Please look around.</h3>
        <h3>I hope you can find your furrever friend here too!</h3>
         <Router>
        <Sidebar
          />
        </Router>
    </MyText>
  );
}
}
export default Home;
