import React from 'react';
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
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
  sessionToken: string, 
  fetchProfile: Function,
  name: string;
  age: string;
  kids: boolean;
  pets: boolean;
  location: string,
  id: number
    }

interface Profile {
name: string;
age: string;
kids: boolean;
pets: boolean;
location: string,
id: number
      }

interface IState {
profile: Profile;
updateActive: boolean,
profileToUpdate: object,
open: boolean,

}
class Edit extends React.Component<any, IState> {
    constructor(props: IProps){
    super(props)
    this.state = {
    profile: { name: this.props.name, age: this.props.age, kids: this.props.kids, pets: this.props.pets, location: this.props.location, id: this.props.id},
    updateActive: false,
    profileToUpdate: {},
    open: false,
    }
    }

     deleteProfile = () => {
      fetch(`${APIURL}/profile/${this.props.profile.id}`, {
         method: "DELETE",
          headers: new Headers({
           "Content-Type": "application/json",
         }),
       })
         this.props.fetchProfile();
     };

editProfile = (event: any) => {
    let profileObject = {
        name: this.props.name,
        age: this.props.age,
        kids: this.props.kids,
        pets: this.props.pets,
        location: this.props.location
      };
    event.preventDefault();
    fetch(`${APIURL}/profile/${this.props.profile.id}`, {
      method: "PUT",
      body: JSON.stringify(profileObject),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
        profile: data,
          // name: '',
          // age: '',
          // kids: true,
          // pets: true,
          // location: '',
        }) 
        this.props.fetchProfile(); 
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

  handleChange = (event: any) => {
    event.preventDefault();
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  setProfile = (event: any) => {
    this.setState({
    profile:{ ...this.state.profile,
    [event.target.name]: event.target.value
    }
    })
  }

updateToggle = () => {
    this.setState({
      updateActive: !this.state.updateActive
    });
}
render() {
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
        value={this.props.name}
        onChange={() => this.setProfile}
      />
      <TextField
        id="name"
        label="Age"
        name="age"
        variant="outlined"
        value={this.props.age}
        onChange={() => this.setProfile}
      />
      <FormLabel>A Bit About Yourself</FormLabel>
      <FormControlLabel
        control={
          <Switch
          value={this.props.kids}
            checked={this.props.kids}
           onChange={this.handleChange}
            name="kids"
          />
        }
        label="Kids?"
      />
      <FormControlLabel
        control={
          <Switch
          value={this.props.pets}
            checked={this.props.pets}
            onChange={this.handleChange}
            name="pets"
          />
        }
        label="Other Pets?"
      />
      <TextField
        id="location"
        name="location"
        variant="outlined"
        value={this.props.location}
        label="Zipcode"
        onChange={() =>
          this.setProfile
        }
      />
      <Button
        type="submit"
        onClick={this.editProfile}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <Button
        variant="contained"
        onClick={this.deleteProfile}
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
  export default Edit;
