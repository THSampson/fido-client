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
      fetch(`${APIURL}/favorite/${this.state.id}`, {
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
        id: this.state.id
      };
    event.preventDefault();
    fetch(`${APIURL}/profile/${this.state.id}`, {
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


 updateToggle = () => {
    this.setState({
      updateActive: !this.state.updateActive
    });
  }  
render(){
return(
<div> 
<Button onClick={this.handleOpen}>Edit Profile</Button>
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
  </MyModal>
  </div>
)

  }
}
export default EditFav;