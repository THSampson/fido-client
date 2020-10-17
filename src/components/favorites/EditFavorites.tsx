import React from 'react';
import {Button, Typography, FormControlLabel, FormControl, FormLabel, FormGroup, TextField}  from '@material-ui/core';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { styled } from '@material-ui/core/styles';
import APIURL from '../../helpers/environment';

const MyDialog = styled(Dialog)({
  position: 'absolute',
  width: '500px',
  backgroundColor: 'white',
  border: '2px solid black',
  padding: '10px',
});

type IProps = {
    sessionToken: string;
    getFavs: Function
    results: any,
    favorites: any

  
  };
  
  interface IState {
    type: string;
    name: string;
    comment: string;
    id: number,
    results: any,
    open: boolean,
    updateActive: boolean,
    favId: number
  }
  
  class EditFav extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        name: "",
        type: "",
        comment: "",
        id: 0,
        open: false,
        updateActive: false,
        results: '',
        favId: 0
      };
    }


    deleteFav = () => {
      fetch(`${APIURL}/favorite/${this.props.results.id}`, {
         method: "DELETE",
          headers: new Headers({
           "Content-Type": "application/json",
         }),
       })
     };

editFav = (event: any) => {
    let favObject = {
        name: this.state.name,
        age: this.state.type,
        comment: this.state.comment,
      };
    event.preventDefault();
    fetch(`${APIURL}/profile/${this.props.results.id}`, {
      method: "PUT",
      body: JSON.stringify(favObject),
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': this.props.sessionToken
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
        results: data,
        favId: data.id
        }) 
        console.log(data.id)
        this.props.getFavs(); 
      })
      .catch((err) => console.log(err));
  };

   handleClickOpen = () => {
    this.setState({
      open: true });
  };

  handleClose = () => {
    this.setState({
      open: false });
  };

setFav = (event: any) => {
  this.setState({
    ...this.state.results,
    [event.target.name]: event.target.value
  })
}
 updateToggle = () => {
    this.setState({
      updateActive: !this.state.updateActive
    });
  }  

  
   
favMapper = () => {
    return this.props.favorites.map((results: IState) => {
      return(
        <div key={results.id}>
        <Card className="cardType" variant="outlined">
<CardHeader
 title={results.name}
   />
 <CardContent>
  <Typography variant="body2" color="textSecondary" component="p">
      Type: {results.type}
  </Typography>
</CardContent>
  <CardContent>
      <Typography>
          Comments: {results.comment}
    </Typography>
    </CardContent> 
    <Button variant="contained" color="primary" onClick={this.handleClickOpen}>Edit Fav</Button> 
    <Button variant="contained" color="secondary" onClick={this.deleteFav}>Delete Fav</Button>
</Card>

</div>
      )
    }
    )
  }
render(){
return(
<div> 
  
{this.favMapper()}
<MyDialog
    open={this.state.open}
    onClose={this.handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <DialogTitle>Edit</DialogTitle>
    <DialogContent>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        onChange={this.setFav}
      />
      <TextField
        id="type"
        label="Type"
        name="type"
        variant="outlined"
        onChange={this.setFav}
      />
        <TextField
        id="comments"
        label="comments"
        name="comment"
        variant="outlined"
        onChange={this.setFav}
      />
      <br />
      <Button
        type="submit"
        onClick={this.handleClose}
        onSubmit={this.editFav}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
    </DialogContent>
  </MyDialog>
  </div>
)

  }
}
export default EditFav;