import React from "react";
import {
  Paper,
  Grid,
  Button,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormGroup,
  Switch,
  TextField,
  Modal,
} from "@material-ui/core";
import APIURL from "../../helpers/environment";
import ProfileHome from "../userProfile/ProfileHome";

type IProps = {
  sessionToken: string;
  fetchProfile: Function;
};

interface IState {
  name: string;
  age: string;
  kids: boolean;
  pets: boolean;
  location: string;
  id: number;
  profile: {};
  open: boolean;
}

class profileCreate extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      profile: {},
      name: "",
        age: "",
        kids: true,
        pets: true,
        location: "",
        id: 0,
        open: false,
    };
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    let url: string = `${APIURL}/profile/create`;
    let profileObject = {
      name: this.state.name,
      age: this.state.age,
      kids: this.state.kids,
      pets: this.state.pets,
      location: this.state.location,
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
        console.log(data.profile)
        this.setState({
          profile: data.profile,
        });
        this.props.fetchProfile();
      });
  };

  handleChange = (event: any) => {
    event.preventDefault();
    this.setState({
        ...this.state,
        [event.target.name]: event.target.checked,
    });
  };


  render() {
    return(
    <div>
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <TextField
              id="name"
              name="name"
              label="Name"
              variant="outlined"
              onChange={(event) => this.setState({name: event.target.value})}
            />
            <TextField
              id="age"
              name="age"
              label="Age"
              variant="outlined"
              onChange={(event) => this.setState({age: event.target.value})}
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
              onChange={(event) =>
                this.setState({location: event.target.value})}

            />
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }
}

export default profileCreate;
