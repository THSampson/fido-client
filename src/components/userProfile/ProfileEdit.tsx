import React from 'react';
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import APIURL from '../../helpers/environment';
import './ProfileEdit.css'


type IProps = {
  sessionToken: string, 
  fetchProfile: Function,
  // name: string;
  // age: string;
  // kids: boolean;
  // pets: boolean;
  // location: string,
  // id: number
  profileToUpdate: object,
  profile: Profile
    }

interface Profile {
name: string;
age: string;
kids: boolean;
pets: boolean;
location: string;
id: number
      }

interface IState {
updateActive: boolean,
name: string, 
age: string, 
kids: boolean, 
pets: boolean, 
location: string,
id: number
profile: {}


}
class Edit extends React.Component<any, IState> {
    constructor(props: IProps){
    super(props)
    this.state = {
     name: '', 
     age: '', 
     kids: false, 
     pets: false, 
     location: '',
     id: 0,
    updateActive: false,
    profile: {}
    
    }
    }


     editProfile = (event: any) => {
       event.preventDefault();
      fetch(`${APIURL}/profile/${this.state.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: this.state.name,
          age: this.state.age,
          kids: this.state.kids,
          pets: this.state.pets,
          location: this.state.location 
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          "Authorization": this.props.sessionToken
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
        })
        .catch((err) => console.log(err));
      };
      
deleteProfile = (event: any) => {
  event.preventDefault();
  fetch(`${APIURL}/profile/${this.state.id}`, {
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

updateToggle = () => {
    this.setState({
      updateActive: !this.state.updateActive
    });
}
render() {
return(
  <div className="edit">
      <FormGroup>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        onChange={() => this.setProfile}
      />
      <TextField
        id="name"
        label="Age"
        name="age"
        variant="outlined"
        onChange={() => this.setProfile}
      />
      <FormLabel>A Bit About Yourself</FormLabel>
      <FormControlLabel
        control={
          <Switch
           onChange={this.handleChange}
            name="kids"
          />
        }
        label="Kids?"
      />
      <FormControlLabel
        control={
          <Switch
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
</div>
)
}
}

  export default Edit;
