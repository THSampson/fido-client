import React from 'react';
import {Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, TextField, Modal}  from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import APIURL from '../../helpers/environment';

const MyModal = styled(Modal)({
  position: 'absolute',
  width: '500px',
  backgroundColor: 'white',
  border: '2px solid black',
  padding: '10px',
});

type IProps = {
    sessionToken: string;
    getFavs: Function
    results: any
  
  };
  
  interface IState {
    type: string;
    name: string;
    comment: string;
    id: number,
    results: any,
    open: boolean,
    updateActive: boolean,
  }
  
  class EditFav extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        name: "",
        type: "",
        comment: "",
        id: 0,
        open: false,
        updateActive: false,
        results: ''
      };
    }

    deleteFav = () => {
      fetch(`${APIURL}/favorite/${this.props.results.id}`, {
         method: "DELETE",
          headers: new Headers({
           "Content-Type": "application/json",
         }),
       })
         this.props.getFavs();
     };

editFav = (event: any) => {
    let favObject = {
        name: this.state.name,
        age: this.state.type,
        comment: this.state.comment,
      };
    event.preventDefault();
    fetch(`${APIURL}/profile/${this.props.results.id}`, {
      method: "PUT",
      body: JSON.stringify(favObject),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': this.props.sessionToken
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
        results: data
        }) 
        this.props.getFavs(); 
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

setFav = (event: any) => {
  this.setState({
    ...this.state.results,
    [event.target.name]: event.target.value
  })
}
 updateToggle = () => {
    this.setState({
      updateActive: !this.state.updateActive
    });
  }  
render(){
return(
<div> 
<Button variant="contained" color="primary" onClick={this.handleOpen}>Edit Fav</Button>
<MyModal
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
        onChange={this.setFav}
      />
      <TextField
        id="type"
        label="Type"
        name="type"
        variant="outlined"
        onChange={this.setFav}
      />
        <TextField
        id="comments"
        label="comments"
        name="comment"
        variant="outlined"
        onChange={this.setFav}
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
  </MyModal>
  </div>
)

  }
}
export default EditFav;