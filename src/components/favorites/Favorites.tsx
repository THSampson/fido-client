import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import APIURL from '../../helpers/environment';
import { AnySrvRecord } from 'dns';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);
const classes = useStyles();
type IProps = {
    sessionToken?: string, 
    results: AnySrvRecord,
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

class FavCard extends React.Component<IProps, IState> {
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
    



  render() {
  return (
    <Card className={classes.root}>
      <CardHeader
       title={this.state.results.name}
         />
      <CardMedia
        className={classes.media}
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
          className={clsx(classes.expand, {
            [classes.expandOpen]: this.state.expanded,
          })}
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