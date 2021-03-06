import React from 'react';
import {Card, Typography, Modal, Button, TextField, FormGroup, CardContent, CardHeader} from '@material-ui/core';
import APIURL from '../../helpers/environment';
import styled from 'styled-components';
import './Favorites.css';
import EditFavorites from './EditFavorites';



const Centered = styled.div`
margin-right: auto,
margin-left: auto
`

type FavProps = {
    sessionToken: string, 
    getFavs: Function
}  

interface IState {
type: string,
name: string,
comment: string,
results: any,
id: number,
open: boolean,
updateActive: boolean,
favorites: [],
    }



class Fav extends React.Component<FavProps, IState> {
  constructor(props: FavProps) {
    super(props);
    this.state = {
      name: "",
      type: "",
      comment: "",
      results: "",
      id: 0,
        open: false,
        updateActive: false,
        favorites: [],

    };
  }
  componentWillMount = () => {
    this.getFavs();
  }

    getFavs = () => {
      fetch(`${APIURL}/favorites`, {
          method: 'GET',
          headers: new Headers({
              "Content-Type": "application/json",
              "Authorization": this.props.sessionToken
            }),
      })
      .then(res => res.json())
      .then((data) => {
        this.setState({
        favorites: data,
        })
        console.log(this.state.favorites)
      })
      .catch((err) => console.log(err));
  }
    
 
handleChange = (event: any)  => {
  event.preventDefault(); 
     fetch(`${APIURL}/favorites/new`, {
      method: 'POST',
      body: JSON.stringify({
          name: this.state.name,
          type: this.state.type,
          comment: this.state.comment,
      }),
      headers: new Headers ({
        'Content-Type': 'application/json',
        "Authorization": this.props.sessionToken
        })
    })
    .then(res => res.json())
    .then(data => {
     this.setState({
       results: data.fav,
     })
     console.log(data.fav.id)
    })
  .catch((err) => console.log(err))
  }

  handleOpen = () => {
    this.setState({
      open: true });
  };

  
render() {
  return (
    <>
    <Centered>
      <div>
    <form onSubmit={this.handleChange}>
<TextField id="name" label="Name" variant="outlined" onChange={(event) => this.setState({name: event.target.value})}>Name</TextField>
<TextField id="type" label="Type" variant="outlined"  onChange={(event) => this.setState({type: event.target.value})}>Type</TextField>
<TextField id="comments" label="Comments" variant="outlined" onChange={(event) => this.setState({comment: event.target.value})}>Comments?</TextField>
<Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
    </div>
<EditFavorites favorites={this.state.favorites} results={this.state.results} getFavs={this.props.getFavs} sessionToken={this.props.sessionToken}/>
  </Centered>
 </>
  );
}
}


export default Fav;