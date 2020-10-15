import React from "react";
import APIURL from "../../helpers/environment";
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import Sidebar from "../webcomps/Sidebar";
import { styled } from '@material-ui/core/styles';
import Header from '../webcomps/Header'
import ProfileCreate from "../userProfile/ProfileCreate";

import './ProfileHome.css';

const MyModal = styled(Modal)({
  position: 'absolute',
  width: '500px',
  backgroundColor: 'white',
  border: '2px solid black',
  padding: '10px',
});


type IProps = {
  sessionToken: string;
  editProfile: Function;
  // deleteProfile: Function;
  // profileToggle: Function;
  // updateToggle: Function;
  
};
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
  updateActive: boolean;
  createActive: boolean;
  profileToUpdate: object;
  open: boolean;
  id: number;
  hasProfile: boolean
}



class Main extends React.Component<any, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      profile: { name: "", age: "", kids: true, pets: true, location: "", id: 0 },
      updateActive: false,
      createActive: false,
      profileToUpdate: {},
      open: false,
      id: 0,
      hasProfile: false
    };
  }

  componentWillMount = () => {
    this.fetchProfile();
  };
  fetchProfile = () => {
    fetch(`${APIURL}/profile`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.profile)
        //write conditional statement that checks what getting back from api. then set state according to that
        //setState update profile to data[1] AND change hasProfile to true otherwise null 
        { return data.length > 0 ? 
         this.setState({
         profile: data.profile,
         hasProfile: true 
         })
        :  null  }
      });
    };

    deleteProfile = () => {
      fetch(`${APIURL}/profile/${this.state.profile.id}`, {
         method: "DELETE",
          headers: new Headers({
           "Content-Type": "application/json",
         }),
       })
         this.fetchProfile();
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
    fetch(`${APIURL}/profile/${this.state.profile.id}`, {
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
        this.fetchProfile(); 
      })
      .catch((err) => console.log(err));
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

profileCreateToggle = () => {
return this.state.hasProfile == true ? null
: <ProfileCreate sessionToken={this.props.sessionToken}  fetchProfile={this.fetchProfile}/>
}

  handleOpen = () => {
    this.setState({
      open: true,
      updateActive: !this.state.updateActive,
    });
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <>
       {this.profileCreateToggle()}  
        <Paper variant="outlined" className="profile" elevation={3}>
          {/* <h2>{this.state.profile.name}</h2>
          <h3>{this.state.profile.age}</h3>
          <h4>{this.state.profile.kids}</h4>
          <h5>{this.state.profile.pets}</h5>
          <h6>{this.state.profile.location}</h6> */}
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
        </Paper>
      </>
    );
  }
}

export default Main;
