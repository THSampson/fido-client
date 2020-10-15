import React from "react";
import Paper from "@material-ui/core/Paper";
import APIURL from "../../helpers/environment";
import Sidebar from "../webcomps/Sidebar";
import Header from '../webcomps/Header'
import ProfileCreate from "../userProfile/ProfileCreate";
import ProfileEdit from "../userProfile/ProfileEdit";
import './ProfileHome.css';
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
location: string
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
      profile: { name: "", age: "", kids: true, pets: true, location: "" },
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

  
  // setProfile = (event: any) => {
  //   this.setState({
  //   profile:{ ...this.state.profile,
  //   [event.target.name]: event.target.value
  //   }
  //   })
  // }

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
          <h1>Your Profile</h1>
          <h2>{this.state.profile.name}</h2>
          <h3>{this.state.profile.age}</h3>
          <h4>{this.state.profile.kids}</h4>
          <h5>{this.state.profile.pets}</h5>
          <h6>{this.state.profile.location}</h6>
        <ProfileEdit profile={this.state.profile} fetchProfile={this.fetchProfile} sessionToken={this.props.sessionToken}/>
        </Paper>
      </>
    );
  }
}

export default Main;
