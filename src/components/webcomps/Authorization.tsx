import React from "react";
import Auth from "../Auth/Auth";
import Home from "../webcomps/Home";
import Admin from "../Admin/Admin";

type AppState = {
sessionToken: string;
admin: boolean,
}

class Authorization extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
    sessionToken: '',
    admin: false
    };
    
this.updateToken = this.updateToken.bind(this);
this.updateAdmin = this.updateAdmin.bind(this);
  }


  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: '',
      admin: false
    })
  }

updateAdmin = (admin: boolean) => {
  this.setState({
    admin: admin
  })
}

adminViewer = () => {
  if(this.state.admin === true) {
    return (
      <Admin sessionToken={this.state.sessionToken} admin={this.state.admin} />
    )
  } else {
    return (
    <Home sessionToken={this.state.sessionToken} />
    )
  }
}

updateToken(newToken: string): void {
  localStorage.setItem('token', newToken)
  this.setState({ 
    sessionToken: newToken 
  })
}


  viewToggle = () => {
    return this.state.sessionToken === localStorage.getItem("token") ? (
     <Home sessionToken={this.state.sessionToken} />  
    ) : (
    <Auth sessionToken={this.state.sessionToken} updateToken={this.updateToken} updateAdmin={this.updateAdmin}/> 
    );
  };

  render() {
    return <div>{this.viewToggle()}</div>;
  }
}
export default Authorization;
