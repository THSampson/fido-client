import React from 'react';
import {Route, Link, Switch, BrowserRouter as Router} from 'react-router-dom';
import Fetch from '../main/TBD';
import Profile from '../userProfile/ProfileHome'


type IProps = {
    sessionToken: string, 
    profile: any
    }

interface IState {
    sessionToken: string,
    profile: []
    }

class Sidebar extends React.Component<IProps, IState> {
        constructor(props: IProps){
        super(props)
        this.state = {
        sessionToken: '',
        profile: []
        }
    }

render() {
 return (
        <Router>
        <div className="sidebar">
            <div className="sidebar-list-styling">
                <nav>
                    <h2 className="navFont">Navigation</h2>
                <ul className="sidebar-list list-unstyled">
                    <li><Link to="/">Home</Link></li>
                   <li><Link to="/animals">Find Furry Friends</Link></li>
                    
                </ul>
                </nav>
            </div>
        

        <div className="sidebar-route">
            <Switch>
            <Route exact path="/"><Profile profile={this.state.profile} sessionToken={this.props.sessionToken}/></Route>
            <Route path="/animals"><Fetch /></Route>
            </Switch>
           
        </div>
    </div>
  </Router>
    );
 } 
}
export default Sidebar;
