import React from 'react';
// import Login from './components/Auth/Login'
// import Register from './components/Auth/Register'
import Auth from '../Auth/Auth'
import Home from '../../components/userProfile/UserHome';
 

type IProps = {
sessionToken?: string, 
profile?: any,

}

interface IState {
sessionToken: string,
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
    super(props)
    this.state = {
    sessionToken: '',
    }
}


// getToken() {
//   (localStorage.getItem('token')) 
//         this.setState({
//             sessionToken: localStorage.getItem('token')
//         })
    
// };

updateToken = (newToken: string) => {
    // localStorage.setItem('token', newToken);
    this.setState({
        sessionToken: newToken});
    console.log(this.state.sessionToken);
    
};

viewToggle = () => {
    return (this.state.sessionToken === '' ? <Auth updateToken={this.updateToken}/>
    : <Home sessionToken={this.state.sessionToken} />)
}


render() {
    return(
        
    <div>
        {this.viewToggle()}
        </div>

    )
}
}
export default App;