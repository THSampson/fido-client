import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Image from "../../assets/no-image.jpg";
import styled from "styled-components";
import APIURL from "../../helpers/environment";

const MyResults = styled.div`
  text-align: center;
  padding-bottom: 30px;
`;
const MyImg = styled.img`
  right-margin: auto;
  left-margin: auto;
`;

interface IState {
  name: string;
  age: string;
  gender: string;
  describe: string;
  photos: any;
  url: string;
  medium: string;
  favorite: boolean;
}

type IProps = {
  data: [];
  sessionToken: string;
};

class FetchResults extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }


handleSubmit = (event: any) => {
    event.preventDefault();
}
 addFav = (props: any) => {
    this.setState({
      favorite: true,
    });

    let favObject = {
      name: props.name,
      age: props.age,
      gender: props.gender,
      img: props.photos,
      url: props.url,
    };
    fetch(`${APIURL}/favorites/new`, {
      method: "POST",
      body: JSON.stringify(favObject),
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.props.data.map((result: IState) => {
          return (
            <MyResults onChange={this.handleSubmit}>
              <h2>{result.name}</h2>
              <h2>{result.gender}</h2>
              <h2> {result.age}</h2>
              {result.photos.length >= 1 ? (
                <MyImg src={result.photos[0].medium} alt="Animals" />
              ) : (
                <MyImg src={Image} height="100" alt="no image" />
              )}
              <br />
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                rel="noopener"
                href={result.url}
              >
                Adoption Site
              </Button>
              {/* <IconButton
                aria-label="add to favorites"
                onClick={this.addFav}
              >
                <FavoriteIcon color="secondary" />
              </IconButton> */}
            </MyResults>
          );
        })}
      </div>
    );
  }
}

export default FetchResults;
