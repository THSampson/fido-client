import React from 'react';
import {Card, Typography, IconButton, Collapse, CardActions, CardContent, CardMedia, CardHeader} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import APIURL from '../../helpers/environment';


type IProps = {
    sessionToken: string, 
    results: [],
    fetchResults: Function
    }

interface IState {
results: any,
location: string,
type: string,
updateActive: boolean,
favToUpdate: object,
name: string,
age: string,
gender: string,
describe: string,
img: string,
url: string,
expanded: boolean

}

class FavCard extends React.Component<any, IState> {
    constructor(props: IProps){
    super(props)
    this.state = {
    location: '',
    type: '',
    results: '',
    updateActive: false,
    favToUpdate: {},
    name: '',
    age: '',
    gender: '',
    describe: '',
    img: '',
    url: '',
    expanded: false
    }

}

handleExpandClick = () => {
    this.setState({
        expanded: false
    })
  };

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
        console.log(data)
        this.setState({
        results: data.animals
      })
    })
     .catch((err) => console.log(err));
    }
    



  render() {
  return (
    <Card>
      <CardHeader
       title={this.state.results.name}
         />
      <CardMedia
        image={this.state.results.img}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {this.state.results.age}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {this.state.results.gender}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {this.state.results.url}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          onClick={this.handleExpandClick}
          aria-expanded={this.state.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {this.state.results.describe}
          </Typography>
          </CardContent>
      </Collapse>
    </Card>
  );
}
}
export default FavCard;