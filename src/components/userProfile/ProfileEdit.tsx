import React from 'react';
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import APIURL from '../../helpers/environment';


let profile: any;

type IProps = {
    sessionToken: string, 
    fetchProfile: Function
    profile: any
    }

interface IState {
profile: [],
updateActive: boolean,
profileToUpdate: object,
name: string,
age: string,
kids: boolean,
pets: boolean,
location: string,
open: boolean,
}
class Edit extends React.Component<any, IState> {
    constructor(props: IProps){
    super(props)
    this.state = {
    profile: [],
    updateActive: false,
    profileToUpdate: {},
    name: '',
    age: '',
    kids: true,
    pets: true,
    location: '',
    open: false,
    }
    }

editProfile = (event: any) => {
    let profileObject = {
        name: this.state.name,
        age: this.state.age,
        kids: this.state.kids,
        pets: this.state.pets,
        location: this.state.location
      };
    event.preventDefault();
    fetch(`${APIURL}/profile/${profile.id}`, {
      method: "PUT",
      body: JSON.stringify(profileObject),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
        profile: data,
          name: '',
          age: '',
          kids: true,
          pets: true,
          location: '',
        }) 
        this.props.fetchProfile(); 
      })
      .catch((err) => console.log(err));
  };

  deleteProfile = () => {
   fetch(`${APIURL}/profile/${profile.id}`, {
      method: "DELETE",
       headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      this.props.fetchProfile();
  };

  handleOpen = () => {
    this.setState({
      open: true });
  };

  handleClose = () => {
    this.setState({
      open: false });
  };

render() {
return(
    <div>
      <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <FormGroup>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={this.state.name}
              onChange={(event) => this.setState({
                name: event.target.value,
              })} />
            <TextField
              id="name"
              label="Age"
              variant="outlined"
              value={this.state.age}
              onChange={(event) => this.setState({
                age: event.target.value,
              })} />
            <FormLabel>A Bit About Yourself</FormLabel>
            <FormControlLabel
              control={<Switch
                checked={this.state.kids}
                onChange={(event) => this.setState({kids: event.target.checked })}
                name="kids" />}
              label="Kids?" />
            <FormControlLabel
              control={<Switch
                checked={this.state.pets}
                onChange={(event) => this.setState({pets: event.target.checked })}
                name="cats" />}
              label="Other Pets?" />
            <TextField
              id="location"
              variant="outlined"
              label="Zipcode"
              onChange={(event) => this.setState({location: event.target.value })} />
           <Button type="submit" onClick={this.editProfile} variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" onClick={this.deleteProfile} color="secondary">
              Delete
            </Button>
          </FormGroup>
        </Modal>
    </div>
)
}
}
  export default Edit;
