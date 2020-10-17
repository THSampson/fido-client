import React from "react";
import APIURL from "../../helpers/environment";
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import Sidebar from "../webcomps/Sidebar";
import { styled } from '@material-ui/core/styles';
import Header from '../webcomps/Header'
import ProfileEdit from "../userProfile/ProfileEdit";

import './ProfileHome.css';


type ProfileProps = {
  sessionToken: string
}


interface Profile {
name: string;
age: string;
kids: boolean;
pets: boolean;
location: string,
}

interface IState {
  profile: Profile;
  updateActive: boolean;
  createActive: boolean;
  profileToUpdate: object;
  hasProfile: boolean,
  profileId: number
}



class Main extends React.Component<ProfileProps, IState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      profile: { name: "", age: "", kids: true, pets: true, location: ""},
      updateActive: false,
      createActive: false,
      profileToUpdate: {},
      hasProfile: false,
      profileId: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }
componentWillMount = () => {
this.fetchProfile();
}
  fetchProfile = () => {
    fetch(`${APIURL}/profile`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.id)
        this.setState({
          profileId: data.id
        })
      });
    }
  

  handleSubmit = (event: any) => {
    console.log(this.props.sessionToken);
    event.preventDefault();
    fetch(`${APIURL}/profile/create`, {
      method: "POST",
      body: JSON.stringify({
      name: this.state.profile.name,
      age: this.state.profile.age,
      kids: this.state.profile.kids,
      pets: this.state.profile.pets,
      location: this.state.profile.location
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          profile: data,
          hasProfile: true,
           });
      });
  };

editUpdateProfile = () => {
  this.setState({
    profileToUpdate: this.state.profile 
  })
}

editProfile = (event: any) => {
  event.preventDefault();
 fetch(`${APIURL}/profile/${this.state.profileId}`, {
   method: "PUT",
   body: JSON.stringify({
     name: this.state.profile.name,
     age: this.state.profile.age,
     kids: this.state.profile.kids,
     pets: this.state.profile.pets,
     location: this.state.profile.location 
   }),
   headers: new Headers({
     "Content-Type": "application/json",
     "Authorization": this.props.sessionToken
   }),
 })
   .then((res) => res.json())
   .then((data) => {
     console.log(data.id)
     this.setState({
     profile: data,
      profileId: data.id 
     }) 
   })
   .catch((err) => console.log(err));
 };
 
deleteProfile = (event: any) => {
event.preventDefault();
fetch(`${APIURL}/profile/${this.state.profileId}`, {
method: 'DELETE',
headers: new Headers({
 'Content-Type': 'application/json',
 "Authorization": this.props.sessionToken
})
})
}

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


  render() {
    return (
      <>
      <div className="create">
        <form onSubmit={this.handleSubmit}>
<FormGroup>
  <TextField
    id="name"
    name="name"
    label="Name"
    variant="outlined"
    onChange={this.setProfile}
  />
  <TextField
    id="age"
    name="age"
    label="Age"
    variant="outlined"
    onChange={this.setProfile}
  />
  <FormLabel>A Bit About Yourself</FormLabel>
  <FormControlLabel
    control={
      <Switch
      color="primary"
      onChange={this.handleChange}
        name="kids"
      />
    }
    label="Kids?"
  />
  <FormControlLabel
    control={
      <Switch
      color="primary"
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
    label="Zipcode"
    onChange={this.setProfile}

  />
  <Button variant="contained" color="primary" type="submit">
    Create
  </Button>
  <Button
        type="submit"
        onClick={this.editProfile}
        variant="contained"
      >
      Edit
      </Button>
      <Button
        variant="contained"
        onClick={this.deleteProfile}
        color="secondary"
      >
        Delete
      </Button>
</FormGroup>
</form>
</div>
      </>
    );
  }
}

export default Main;
