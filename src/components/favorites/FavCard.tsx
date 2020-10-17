import React from 'react';
import {Card, Typography, Modal, Button, TextField, FormGroup, CardContent, CardHeader} from '@material-ui/core';

type FavProps = {
    results: any, 
}  

interface IState {
    type: string,
    name: string,
    comment: string,
    results: any,
    id: number,
    open: boolean,
    updateActive: boolean,
        }
    
    
    
class FavCard extends React.Component<FavProps, IState> {
      constructor(props: FavProps) {
        super(props);
        this.state = {
          name: "",
          type: "",
          comment: "",
          results: "",
          id: 0,
            open: false,
            updateActive: false,
    
        };
      }
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
<Card className="cardType" variant="outlined">
<CardHeader
 title={this.props.results.name}
   />
 <CardContent>
  <Typography variant="body2" color="textSecondary" component="p">
      Type: {this.props.results.type}
  </Typography>
</CardContent>
  <CardContent>
      <Typography>
          Comments: {this.props.results.comment}
    </Typography>
    </CardContent>  
</Card>
</div>
)
}      
}
export default FavCard;
