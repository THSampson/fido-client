import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import APIURL from '../../helpers/environment';

type IProps = {
    sessionToken?: string, 
    }

interface IState {
location: string,
type: string,
results: object
}

class test extends React.Component<IProps, any> {
constructor(props: IProps) {
super(props) 
this.state = {
location: '',
type: '',
results: {}
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
      'Content-Type': 'application/json'
  })
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
    this.setState({
    results: data.animals
  })
})
 .catch((err) => console.log(err));
}





// handleInputChange(event: any) {
//   const target = event.target;
//   const value = event.value;
//   const location = target.location;
//   let type = target.type
//   this.setState({
//     [location]: value,
//     [type]: value
//   });
// }

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
    </div>
    );
  }
}
export default test;
