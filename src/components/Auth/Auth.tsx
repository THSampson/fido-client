import React from 'react';
import APIURL from '../../helpers/environment';

interface IProps {
updateToken: Function,
sessionToken?: string
}

interface IState {
    signIn: boolean,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}


class Auth extends React.Component<IProps,IState> {
 constructor(props: IProps) {
    super(props)
    this.state = {
    signIn: true,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    }
 }

signInToggler = (event: any) => {
    event.preventDefault();
    this.setState({
        signIn: !this.state.signIn,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
}

userFunction = (event: any) => {
    event.preventDefault();
    let url = this.state.signIn ? `${APIURL}/user/login` : `${APIURL}/user/register`
    let userObject = {
        fName: this.state.firstName,
        lName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
};

fetch(url, {
    method: 'POST',
    body: JSON.stringify(userObject),
    headers: new Headers({
     'Content-Type': 'application/json',   
    })
})
.then(res => res.json())
.then((json) => {
    this.props.updateToken(json.sessionToken)
})
.catch(err => console.log(err))
}

signupField = () => !this.state.signIn ? (
    <div>
   <form className="signupField">
       <label htmlFor="firstName">First Name</label>
       <input type="text" id="firstName" placeholder="First Name" value={this.state.firstName} 
       onChange={event => this.setState({
           firstName: event.target.value})}/>
       <br />
       <label htmlFor="lastName">Last Name</label>
       <input type="text" id="lastName" placeholder="Last Name" value={this.state.lastName} 
       onChange={event => this.setState({
           lastName: event.target.value})} />
       <br />
       </form>
    </div>
    ) : null

render(){
    return(
    <div className ="signinForm">
    <form onSubmit={this.userFunction}>
    {this.signupField()}
    <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="Email" value={this.state.email} 
        onChange={event => this.setState({
            email: event.target.value})}/>
        <br />
        <label htmlFor="password">Password</label>
        <input type="text" id="password" placeholder="Password" value={this.state.password} 
        onChange={event => this.setState({
            password: event.target.value})} />
    <div id="passwordValid">
    </div>
    {this.state.signIn ?
    <button onClick={this.signInToggler}>Don't have an account yet? Click here to sign up!</button> : <button onClick={this.signInToggler}>Oops! Go Back!</button>}
    <button>{this.state.signIn ? 'Sign In' : 'Create Account'}</button>
    </form>
    </div>
    )
} 
 }
export default Auth;