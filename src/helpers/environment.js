let APIURL = '';

switch(window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
        case 'ts-finding-fido.herokuapp.com':
            APIURL = 'https://finding-fido-server.herokuapp.com'
            break;
        default:
        alert("url error");
        break;
}

export default APIURL;