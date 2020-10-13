import React from "react";
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import APIURL from '../../helpers/environment'
import ProfileHome from '../userProfile/ProfileHome';

type IProps = {
sessionToken: string, 
profile: any,
editProfile: Function,
fetchProfile: Function,
viewProfileToggle: Function,
handleChange: Function
}

interface IState {
  name: string;
  age: string;
  kids: boolean;
  pets: boolean;
  location: string;
  open: boolean
  profile: any,
}

class profileCreate extends React.Component<any, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      profile: {},
      name: "",
      age: "",
      kids: true,
      pets: true,
     location: "",
     open: false,
    };
  }

handleSubmit = (event: any) => { 
  event.preventDefault();
    let url: string = `${APIURL}/profile/create`   
    let profileObject = {
      name: this.state.name,
      age: this.state.age,
      kids: this.state.kids,
      pets: this.state.pets,
      location: this.state.location
    };
      fetch(url, {
          method: 'POST',
          body: JSON.stringify(profileObject),
          headers: new Headers({
              'Content-Type': 'application/json'
                  })
      })
      .then(res => res.json())
      .then(data => {
          this.setState({
            profile: data,
            name: '',
            age: '',
            kids: false,
            pets: false,
            location: ''
          })
        this.props.fetchProfile();
        this.props.viewProfileToggle();
        })    
  }

  render() {
    return(
    <div>
      <form>
         <FormGroup onSubmit={this.props.handleChange()}>
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
          <Button variant="contained" color="primary" href="#ProfileHome" type="submit">Create</Button>
          </FormGroup>
          </form>
     </div>
    );
  }
}

export default profileCreate;
