import React from 'react';
import LoginForm from './LoginForm';
import {login} from '../../actions/authAction'
class LoginPage extends React.Component{


    render(){

        return(
            <div className='row'>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <LoginForm login={login}/>
                </div>
                <div className="col-md-3"></div>

            </div>
        );
    }

}

export default LoginPage;