import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FetchResults from './FetchResults';
import APIURL from '../../helpers/environment';

 let url: string = `${APIURL}/animals/`; 

type IProps = {
sessionToken?: string, 
animalList?: any,
results?: any,
pageNumber?: any,
    }

interface IState {
pageNumber: number,
animalList: any,
results: any,
type: string,
age: string,
gender: string,
value: string,
kid: boolean,
cat: boolean,
dog: boolean,
location: string
}


class dogFetch extends React.Component<IProps,IState> {
constructor(props: IProps) {
    super(props)  
    this.state = {
       pageNumber: 0,
       animalList: [],
       results: [],
       type: '',
       age: '',
       gender: '',
       value: "female",
       kid: true,
       cat: false,
       dog: false,
       location: ''
        }
}


handleSubmit = (event: any) => {
    event.preventDefault();
let animalFetch = {
   location: this.state.location,
     type: this.state.type,
      }; 
fetch(url, {
    method: "POST",
    body: JSON.stringify(animalFetch),
    headers: new Headers({
        'Content-Type': 'application/json'
    })
})
.then(res => res.json())
.then(data => {
    console.log(data);
    this.setState({
        animalList: data
        })
}) 
.catch(err => console.log(err))
}

handleChange = (event: any) => {
    event.preventDefault();
    this.setState({...this.state, [event.target.name]: event.target.checked});
    this.setState({value: event.target.value});
}

// changePageNumber = (event: any, direction: any) => {
//     event.preventDefault()
//     if(direction === 'down') {
//       if (this.state.pageNumber > 0) {
//         this.setState({
//           pageNumber: this.state.pageNumber - 1
//         })
//         this.handleSubmit();
//       }
//     }
//     if (direction === 'up') {
//       this.setState({
//         pageNumber: this.state.pageNumber + 1
//       })
//       }
// }

render() {
    return(
<div className="App">
<FormControl onSubmit={this.handleSubmit}>
<FormLabel>Type</FormLabel>
<RadioGroup aria-label="type" onChange={(event) => this.setState({type: event.target.value})} name="type1" row>
<FormControlLabel value="dog" control={<Radio />} label="Dog" />
 <FormControlLabel value="cat" control={<Radio />} label="Cat" />
 </RadioGroup>
 <br />
{/* <FormLabel>Gender</FormLabel>
<RadioGroup aria-label="gender" onChange={(event) => this.setState({gender: event.target.value})} name="gender1" row>
<FormControlLabel value="female" control={<Radio />} label="Female" />
 <FormControlLabel value="male" control={<Radio />} label="Male" />
 </RadioGroup>
 <br />
<FormLabel>Age</FormLabel>
<RadioGroup aria-label="age" onChange={(event) => this.setState({age: event.target.value})} name="age1" row>
<FormControlLabel value="baby" control={<Radio />} label="Baby" />
 <FormControlLabel value="young" control={<Radio />} label="Young" />
 <FormControlLabel value="adult" control={<Radio />} label="Adult" />
 <FormControlLabel value="senior" control={<Radio />} label="Senior" />
 </RadioGroup>
 <br /> */}
 {/* <FormLabel>Yes or No</FormLabel> */}
<FormGroup>
{/* <FormControlLabel
    control={<Checkbox checked={this.state.kid} onChange={(event) => this.setState({kid: event.target.checked})} name="kids" />}
    label="Good With Kids"
          /> */}
{/* <FormControlLabel
    control={<Checkbox checked={this.state.cat} onChange={(event) => this.setState({cat: event.target.checked})} name="cats" />}
    label="Good With Cats"
          /> */}
{/* <FormControlLabel
    control={<Checkbox checked={this.state.dog} onChange={(event) => this.setState({dog: event.target.checked})} name="dogs" />}
    label="Good With Dogs"
    /> */}
<TextField id="zipcode" variant="outlined" label="Zipcode" onChange={(event) => this.setState({location: event.target.value})} />
 </FormGroup>
<Button variant="outlined" type="submit">Fetch!</Button>
</FormControl>

< FetchResults animalList={this.state.animalList} />

</div>
    )
    }

}
export default dogFetch;



