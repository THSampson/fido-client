import React from 'react';
import {Card, Typography, Modal, Button, TextField, FormGroup, CardContent, CardHeader} from '@material-ui/core';
import APIURL from '../../helpers/environment';
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
id: number,
open: boolean,
updateActive: boolean,
    }



class FavCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      type: "",
      comment: "",
      results: "",
      id: 0,
        open: false,
        updateActive: false,

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
          comment: this.state.comment,
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
  deleteFav = () => {
    fetch(`${APIURL}/favorites/${this.state.id}`, {
       method: "DELETE",
        headers: new Headers({
         "Content-Type": "application/json",
       }),
     })
       this.getFavs();
   };

editFav = (event: any) => {
  let favObject = {
      name: this.state.name,
      age: this.state.type,
      comment: this.state.comment
    };
  event.preventDefault();
  fetch(`${APIURL}/favorites/${this.state.id}`, {
    method: "PUT",
    body: JSON.stringify(favObject),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      this.setState({
      results: data
      }) 
      this.getFavs(); 
    })
    .catch((err) => console.log(err));
};

 handleOpen = () => {
  this.setState({
    open: true });
};

handleClose = () => {
  this.setState({
    open: false });
};


updateToggle = () => {
  this.setState({
    updateActive: !this.state.updateActive
  });
}  
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
          <Button variant="contained" onClick={this.handleOpen} size="small" color="primary">Edit</Button>
    </Card>
    </Centered>
    
    <Modal
    className="modalType"
    open={this.state.open}
    onClose={this.handleClose}
    onClick={this.updateToggle}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <FormGroup>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        value={this.state.name}
        onChange={(event) => this.setState({name: event.target.value})}
      />
      <TextField
        id="name"
        label="Age"
        name="age"
        variant="outlined"
        value={this.state.type}
        onChange={(event) => this.setState({type: event.target.value})}
      />
        <TextField
        id="name"
        label="Age"
        name="age"
        variant="outlined"
        value={this.state.comment}
        onChange={(event) => this.setState({comment: event.target.value})}
      />
      <Button
        type="submit"
        onClick={this.editFav}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <Button
        variant="contained"
        onClick={this.deleteFav}
        color="secondary"
      >
        Delete
      </Button>
    </FormGroup>
  </Modal>
</>
  );
}
}


export default FavCard;