
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStroe from './store/configureStore';
import {BrowserRouter as Router} from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Routes from './routes';
import FlashMessageList from './components/flash/FlashMessageList'
import setAuthorizationToken from "./utils/setAuthorizationToken";
import {setCurrentUser} from "./actions/authAction";
import jwtDecode from 'jwt-decode';


const store = configureStroe();


//为已有登录权限的用户回复权限
const token = localStorage.getItem("token");
if(token){
    setAuthorizationToken(token);
    store.dispatch(setCurrentUser(jwtDecode(token)));
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <NavigationBar/>
                <FlashMessageList/>
                {Routes}
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
