import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


interface IState {
name: string,
age: string,
gender: string,
describe: string,
photos: string,
url: string,
}

type IProps = {
data: any,

}


const FetchResults = (props: IProps) => {
return(
    <div>
        {props.data.map((result: IState) => {
          return (<div>
                 <h2>{result.name}</h2>
                <h2>{result.gender}</h2>
                <h2> {result.age}</h2>
                <img src={result.photos[1]}/>
                <p>{result.url}</p>
                <IconButton aria-label="add to favorites">
                <FavoriteIcon />
                </IconButton>
                </div>
            )
        })
        }
    </div>
)
}

export default FetchResults;