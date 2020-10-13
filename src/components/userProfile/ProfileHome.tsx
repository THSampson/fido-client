import React from 'react';
import {Container, Paper, Grid, Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, Switch, TextField, Modal}  from '@material-ui/core';
import APIURL from '../../helpers/environment';
import Sidebar from '../webcomps/Sidebar';
// import Header from '../webcomps/Header'
import ProfileCreate from '../userProfile/ProfileCreate';
import ProfileEdit from '../userProfile/ProfileEdit';

type IProps = {
    sessionToken: string, 
    editProfile: Function,
    deleteProfile: Function,
    profile: []
     
    }

interface IState {
profile: any,
updateActive: boolean,
createActive: boolean,
profileToUpdate: object,
name: string,
age: string,
kids: boolean,
pets: boolean,
location: string,
open: boolean,
id: number

}

class Main extends React.Component<any, IState> {
constructor(props: IProps){
super(props)
this.state = {
profile: [],
updateActive: false,
createActive: false,
profileToUpdate: {},
name: '',
age: '',
kids: true,
pets: true,
location: '',
open: false,
id: 0
}
}

fetchProfile = () => {
fetch(`${APIURL}/profile`, {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json',
  })
})
.then(res => res.json())
.then(data => {
  this.setState({
    profile: data,
  })
})
}

profileToggle = () => 
{return (this.state.profile.id === null) 
? <ProfileCreate/>
: <div></div> }

handleChange = (event: any) => {
    event.preventDefault();
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };

  handleOpen = () => {
    this.setState({
      open: true });
  };

  handleClose = () => {
    this.setState({
      open: false });
  };

//   profileMapper = () => {
//   return this.state.profile.map((profile: IState) => {
//       return(
//           <Paper variant="outlined" elevation={3}> 
//           <h1>Your Profile</h1>
//           <h2>{profile.name}</h2>
//            <h3>{profile.age}</h3>
//           <h4>{profile.kids}</h4>
//           <h5>{profile.pets}</h5>
//           <h6>{profile.location}</h6>
//           <Button onClick={() => {this.props.editProfile(profile)}}>Edit Profile</Button>
//       </Paper>
//       )
//   })
// }

render(){
return(
    <div>
{this.profileToggle()}
<Container>
{/* <Header /> */}
<Sidebar profile={this.state.profile} sessionToken={this.props.sessionToken} />
<Paper variant="outlined" elevation={3} >
    Furry Friends
    </Paper>
 {/* {this.profileMapper} */}
<Button variant="contained" color="primary" onClick={this.handleOpen}>Profile</Button>
<ProfileEdit />
</Container>
</div>
)
}}
export default Main;