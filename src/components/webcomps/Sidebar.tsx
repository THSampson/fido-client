import React from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import Fetch from '../main/Fetch';
import Profile from '../userProfile/ProfileHome'
import Favorites from '../favorites/Favorites';
import './Sidebar.css'


type IProps = {
    sessionToken: string, 
    }

interface IState {
    sessionToken: string,
    }

class Sidebar extends React.Component<any, IState> {
        constructor(props: IProps){
        super(props)
        this.state = {
        sessionToken: '',
        }
    }

render() {
 return (
           <div className="sidebar">
            <div className="sidebar-list-styling">
               <h2 className="navFont">Navigation</h2>
                <ul className="sidebar-list list-unstyled">
                    <li><Link to="/profile">Profile</Link></li>
                   <li><Link to="/animals">Find Furry Friends</Link></li>
                   <li><Link to="/favorites">View Favorites</Link></li>
                    
                </ul>
               </div>
        

        <div className="sidebar-route">
            <Switch>
            <Route path="/profile"><Profile sessionToken={this.props.sessionToken}/></Route>
            <Route path="/animals"><Fetch sessionToken={this.props.sessionToken}/></Route>
            <Route path="/favorites"><Favorites sessionToken={this.props.sessionToken}/></Route>
            </Switch>
           
        </div>
    </div>
    );
 } 
}
export default Sidebar;
