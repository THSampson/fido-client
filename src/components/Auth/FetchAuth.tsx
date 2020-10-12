import React from 'react'


const key = "hAfvRltAWWVsv1pPrOe5pWIr0RQkhEE4Zv5itgDES82WjWNAAO";
const secret = 'ub15uklTB78jt76EhFOqV4g37BO8jzsQ28eVkhs6';
const url = 'https://api.petfinder.com/v2/animals?type=dog';

let Data: any;

class fetchAuth extends React.Component {
fetchAuth() {
fetch('https://api.petfinder.com/v2/oauth2/token', {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + key 
        + '&client_secret=' + secret,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded'
        }
   }) 
    .then(res => res.json())
    .then((data) => {
        Data = data;
        console.log(Data);   
})
    .catch(err => console.log(err))

        
    
fetch(url, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Data.access_token}`
   }
})
.then(res => res.json())
.then((data) => {
    console.log('animals', data)
})

}

render(){
    return(
        <div>
        {this.fetchAuth}    
        </div>
    )
}
}

export default fetchAuth;