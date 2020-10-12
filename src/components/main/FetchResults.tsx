import React from 'react';

type IProps = {
    animalList: any,
    pageNumber?: any
    }

    interface IState {
    age: string,
    gender: string,
    name: string,
    good_with_children: boolean,
    good_with_cats: boolean,
    good_with_dogs: boolean,
    results: string
    url: string
    }

class FetchResults extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }
render() {
return(
    <div>
        {
            this.props.animalList.map((result: IState) => {
                return(
                    <div>
                        {result.name}
                    </div>
                )
            })
        }
    </div>
)
}
}

export default FetchResults;