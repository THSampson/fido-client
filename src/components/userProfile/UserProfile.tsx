import React from "react";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Checkbox";
import Modal from '@material-ui/core/Modal';
import APIURL from '../../helpers/environment'

let url: string = `${APIURL}/profile`;

type IProps = {
sessionToken?: string, 
fetchProfiles: Function,
editUpdateProfile: Function,
updateToggle: Function,
profile?: any,
updateActive: boolean,

}

interface IState {
  name: string;
  age: string;
  hasKids: boolean;
  otherPets: boolean;
  comment: string;
  location: string;
  open: boolean
}

class userProfile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      name: "",
      age: "",
      hasKids: true,
      otherPets: true,
      comment: "",
      location: "",
      open: false
    };
  }

  makeProfile = (event: any) => {
    event.preventDefault();
    let profileObject = {
      name: this.state.name,
      age: this.state.age,
      kids: this.state.hasKids,
      pets: this.state.otherPets,
      location: this.state.location
    };
    fetch(url, {
      method: "POST",
      body: JSON.stringify(profileObject),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          name: '',
          age: '',
          hasKids: true,
          otherPets: true,
          location: '',
          comment: '',
        }) 
        this.props.fetchProfiles(); 
      })
      .catch((err) => console.log(err));
  };

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

  render() {
    return(
    <div>
    <Button onClick={this.handleOpen}>X</Button>
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
                checked={this.state.hasKids}
                onChange={(event) => this.setState({hasKids: event.target.checked })}
                name="kids" />}
              label="Kids?" />
            <FormControlLabel
              control={<Switch
                checked={this.state.otherPets}
                onChange={(event) => this.setState({otherPets: event.target.checked })}
                name="cats" />}
              label="Other Pets?" />
            <TextField
              id="location"
              variant="outlined"
              label="Zipcode"
              onChange={(event) => this.setState({location: event.target.value })} />
            <TextField
              id="comment"
              variant="outlined"
              label="Anything else about yourself you would like to add?"
              onChange={(event) => this.setState({comment: event.target.value })} />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="contained" color="secondary" href="#contained-buttons">
              Delete
            </Button>
          </FormGroup>
        </Modal>
        </div>
    );
  }
}

export default userProfile;
