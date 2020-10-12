import React from 'react';
import { styled } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Header from '../webcomps/Header'

const MyGrid = styled(Grid)({
    width: '500px',
    height: '100px',
    padding: '50px',
    marginTop: '50px',
})

type IProps = {
    sessionToken?: string, 
    profile?: object,
    
    }

interface IState {
profile: any,
updateActive: boolean,
profileToUpdate: object,
name: string,
age: string,
hasKids: boolean,
otherPets: boolean,
comment: string,
location: string,

}

class Main extends React.Component<IProps, IState> {
constructor(props: IProps){
super(props)
this.state = {
profile: [],
updateActive: false,
profileToUpdate: {},
name: '',
age: '',
hasKids: true,
otherPets: true,
comment: '',
location: '',
}
}

fetchProfile = () => {
  let url: string = 'http://localhost:3000/user'
    fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json'
                })
    })
    .then(res => res.json())
    .then(data =>{
        this.setState({
           profile: data 
        })
    })
}

editUpdateProfile = (props: IProps) => {
    this.setState({
        profileToUpdate: this.state.profile
    })
  };


profileMapper = () => {
    return this.state.profile.map((profile: IState) => {
        return(
            <Paper variant="outlined" elevation={3}> 
            <h1>Your Profile</h1>
            <h2>{profile.name}</h2>
             <h3>{profile.age}</h3>
            <h4>{profile.hasKids}</h4>
            <h5>{profile.otherPets}</h5>
            <h6>{profile.location}</h6>
            <h6>{profile.comment}</h6>
            <Button onClick={() => {this.editUpdateProfile(profile)}}>Edit Profile</Button>
        </Paper>
        
        )
    })
}


render(){
return(
    <div>
<Header />
<Grid
  container
  direction="row"
  justify="flex-start"
  alignItems="center"
>  
<MyGrid item>
<Paper variant="outlined" elevation={3} >
    Furry Friends
    </Paper>
</MyGrid>
<MyGrid item>
    {this.profileMapper()}
</MyGrid>
</Grid>
</div>
)

}
}




export default Main;