import React from "react";
import Auth from "../Auth/Auth";
import Home from "../webcomps/Home";


type IProps = {
  sessionToken?: string;
};

interface IState {
  sessionToken: string;
  profile: [];
}

class Authorization extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      sessionToken: "",
      profile: [],
    };
  }

  updateToken = (newToken: string) => {
    // localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken,
    });
    console.log(this.state.sessionToken);
  };

  viewToggle = () => {
    return this.state.sessionToken ? (
     <Home sessionToken={this.state.sessionToken} />  
    ) : (
    <Auth updateToken={this.updateToken} /> 
    );
  };

  render() {
    return <div>{this.viewToggle()}</div>;
  }
}
export default Authorization;
