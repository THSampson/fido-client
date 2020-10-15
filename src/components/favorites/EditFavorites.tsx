import React from 'react';
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import APIURL from '../../helpers/environment';

type IProps = {
    sessionToken: string;
    getFavs: Function
  
  };
  
  interface IState {
    type: string;
    name: string;
    comments: string;
  }
  
  class EditFav extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        name: "",
        type: "",
        comments: "",
      };
    }
  render(){
return(
<div></div>
)

  }
}