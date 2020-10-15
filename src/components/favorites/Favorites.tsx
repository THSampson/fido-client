import React from 'react';
import {Card, Typography, IconButton, Collapse, CardActions, CardContent, CardMedia, CardHeader} from '@material-ui/core';
import APIURL from '../../helpers/environment';
import {Button, TextField} from '@material-ui/core';
import styled from 'styled-components';
import './Favorites.css';



const Centered = styled.div`
margin-right: auto,
margin-left: auto
`

type IProps = {
    sessionToken: string, 
}  

interface IState {
type: string,
name: string,
comment: string,
results: any,
    }



class FavCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      type: "",
      comment: "",
      results: ""
    };
  }
  getFavs = () => {
    fetch(`${APIURL}/favorites`, {
        method: 'GET',
        headers: new Headers({
            "Content-Type": "application/json",
          }),
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data); 
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
          comment: this.state.comment
      }),
      headers: new Headers ({
        'Content-Type': 'application/json',
        })
    })
    .then(res => res.json())
    .then(data => {
     this.setState({
       results: data.fav
     })
     console.log(data.fav)
    })
  .catch((err) => console.log(err))
  }
render() {
  return (
    
    <Centered>
      <div>
    <form onSubmit={this.handleChange}>
<TextField id="name" label="Name" variant="outlined" onChange={(event) => this.setState({name: event.target.value})}>Name</TextField>
<TextField id="type" label="Type" variant="outlined"  onChange={(event) => this.setState({type: event.target.value})}>Type</TextField>
<TextField id="comments" label="Comments" variant="outlined" onChange={(event) => this.setState({comment: event.target.value})}>Comments?</TextField>
<Button type="submit" variant="contained" color="primary">Submit</Button>
    </form>
    </div>
  
    <Card className="cardType" variant="outlined">
      <CardHeader
       title={this.state.results.name}
         />
       <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {this.state.results.type}
        </Typography>
      </CardContent>
        <CardContent>
            <Typography>
            {this.state.results.comment}
          </Typography>
          </CardContent>
          <Button>Edit</Button>
          <Button>Delete</Button>
    </Card>
    </Centered>
  );
}
}


export default FavCard;