import React from "react";
import {Radio, TextField, FormGroup, FormControl, FormLabel, FormControlLabel, RadioGroup, Button, Paper} from '@material-ui/core';
import APIURL from '../../helpers/environment';
import FetchResults from '../main/FetchResults';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

interface Data {
  name: string;
  age: string;
 gender: string;
  photos: string;
  url: string
  }

type IProps = {
    sessionToken: string, 
    }

interface IState {
data: Data,
location: string,
type: string,
expanded: boolean,


}

class Fetch extends React.Component<IProps, IState> {
constructor(props: IProps) {
super(props) 
this.state = {
location: '',
type: '',
expanded: false,
data: { name: "", age: "", gender: '', photos: '', url: "" },
}
}


fetchResults = () => {
let url: string = `${APIURL}/animals`;
let animalObject = {
  location: this.state.location,
  type: this.state.type,
};

fetch(url, {
  method: "POST",
  body: JSON.stringify(animalObject),
  headers: new Headers({
      'Content-Type': 'application/json',
      "Authorization": this.props.sessionToken
  })
})
  .then((res) => res.json())
  .then((data) => {
   console.log(data.animals[0].name) 
    this.setState({
    data: data.animals
  })
  
})
 .catch((err) => console.log(err));
}


handleSubmit= (event:any) => {
  this.fetchResults();
  event.preventDefault();
}


  render() {
    return (
      <div className="App">
    <FormControl onSubmit={(event) => this.handleSubmit(event)}>
      <FormLabel>Type</FormLabel>
      <RadioGroup aria-label="type" value={this.state.type} onChange={(event) => this.setState({type: event.target.value})} name="type1" row>
      <FormControlLabel value="dog" control={<Radio />} label="Dog" />
       <FormControlLabel value="cat" control={<Radio />} label="Cat" />
       </RadioGroup>
       <br />
       <TextField id="zipcode" variant="outlined" label="zipcode" value={this.state.location} onChange={(event) => this.setState({location: event.target.value})} />
    <Button variant="outlined" type="submit" onClick={this.handleSubmit} >Fetch!</Button>
    </FormControl>

{
  // <FetchResults data={this.state.data}/>
}

   </div>
    )
  }
}
export default Fetch;