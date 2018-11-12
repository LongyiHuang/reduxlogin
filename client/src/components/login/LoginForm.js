import React from 'react';
import classnames from 'classnames';
import validateInput from '../../utils/validations/login';
import PropTypes from "prop-types";
import { login } from '../../actions/authAction';

import {connect} from 'react-redux';

import {addFlashMessage} from '../../actions/flashMessagesAction'

class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            account:"",
            password:"",
            errors:{},
            isLoading:false,
        }
    }

    static propTypes = {
        login: PropTypes.func.isRequired
    }

    static contextTypes = {
        router:PropTypes.object
    }

    isValid = () => {
        const {errors,isValid} = validateInput(this.state);
        if(!isValid){
            this.setState({
                errors
            })
        }
        return isValid;
    }

    handleChange = (e) => {
        this.setState({
           [e.target.name]:e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (true) {
            this.setState({
                errors:{},
                isLoading:true
            });
            this.props.login(this.state).then(
                (res) => {
                    // this.props.history.push("/");
                    this.context.router.history.push("/");
                    this.props.addFlashMessage({
                        type:"success",
                        text:"Login successfully"
                    });
                },
                (err) => {
                    this.setState({
                        errors:err.response.data,
                        isLoading: false
                    });
                }
            );
        }
    }

    render(){
        const {account,password,errors,isLoading} = this.state;
        return(

            <form onSubmit={this.handleSubmit}>
                <h2>Login</h2>
                <div className='form-group'>
                    <label className='control-label'>Account</label>
                    <input
                        className={classnames('form-control',{'is-invalid':errors.account})}
                        onChange={this.handleChange}
                        name='account'
                        value={account}
                        type='text'
                    />
                    {errors.account && <span className="text-danger">{errors.account}</span>}

                </div>

                <div className='form-group'>
                    <label className='control-label'>Password</label>
                    <input
                        className={classnames('form-control',{'is-invalid':errors.password})}
                        onChange={this.handleChange}
                        name='password'
                        value={password}
                        type='password'
                    />
                    {errors.password && <span className="text-danger">{errors.password}</span>}
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-lg' disabled={isLoading}>Login</button>
                </div>

                {errors.global && <span className="text-danger">{errors.global}</span>}
            </form>
        );
    }

}

export default connect(null,{login,addFlashMessage}) (LoginForm);