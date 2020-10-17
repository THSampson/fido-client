import React from 'react';
import {Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';

type ProfileProps = {
sessionToken: string,
profile: Profile,
editUpdateProfile: Function,

}

interface Profile {
    name: string;
    age: string;
    kids: boolean;
    pets: boolean;
    location: string,
    id: number
    }

interface ProfileState {
open: boolean
}

class ProfileTable extends React.Component<ProfileProps, ProfileState> {
constructor(props: ProfileProps) {
super(props)    
this.state = {
open: false
}
}

handleOpen = () => {
    this.setState({
      open: true });
  };
render() {
return(
<div>
    <h1>Your Profile</h1>
  
    <Paper variant="outlined" className="profile" elevation={3}>
          <h2>{this.props.profile.name}</h2>
          <h3>{this.props.profile.age}</h3>
          <h4>{this.props.profile.kids}</h4>
          <h5>{this.props.profile.pets}</h5>
          <h6>{this.props.profile.location}</h6>
 <Button onClick={this.handleOpen}>Edit Profile</Button>
        </Paper>
</div>
)
}

}

export default ProfileTable;