import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Image from '../../assets/no-image.jpg';
import styled from 'styled-components';

const MyResults = styled.div`
text-align: center;
padding-bottom: 30px;
`
const MyImg = styled.img`
right-margin: auto;
left-margin: auto
`

interface IState {
name: string,
age: string,
gender: string,
describe: string,
photos: any,
url: string,
medium: string,
}

type IProps = {
data: [],

}


const FetchResults = (props: IProps) => {
return(
    <div>
        {props.data.map((result: IState) => {
          return (<MyResults>
                 <h2>{result.name}</h2>
                <h2>{result.gender}</h2>
                <h2> {result.age}</h2>
                {result.photos.length >= 1 ? <MyImg src={result.photos[0].medium} alt="Animals" /> : <MyImg src={Image} height="100" alt="no image"/>}
                <br />
                <Button variant="contained" color="primary" target="_blank" rel="noopener" href={result.url}>Adoption Site</Button>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                </MyResults>
            )
        })
        }
    </div>
)
}

export default FetchResults;