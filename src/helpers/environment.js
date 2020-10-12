let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'httpL//localhost:5432'
        break;
        case 'ts-finding-fido.herokuapp.com':
            APIURL = 'https://finding-fido-server.herokuapp.com'
}

export default APIURL;