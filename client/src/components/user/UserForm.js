import React from 'react';
import classnames from 'classnames';
import validateInput from '../../utils/validations/user';
import PropTypes from "prop-types";
import { editUserInfo } from '../../actions/userAction';

import {connect} from 'react-redux';

class UserForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:this.props.user.id,
            password:"",
            passwordConfirmation:'',
            errors:{},
            isLoading:false,
        }
    }

    static propTypes = {
        editUserInfo: PropTypes.func.isRequired
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
        if (this.isValid()) {
            this.setState({
                errors:{},
                isLoading:true
            });
            this.props.editUserInfo(this.state).then(
                (res) => {
                    this.context.router.history.push("/");
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
        const {password,passwordConfirmation,errors,isLoading} = this.state;
        return(

            <form onSubmit={this.handleSubmit}>
                <h2>Edit user info</h2>
                <div className='form-group'>
                    <label className='control-label'>New password</label>
                    <input
                        className={classnames('form-control',{'is-invalid':errors.password})}
                        onChange={this.handleChange}
                        name='password'
                        value={password}
                        type='password'
                    />
                    {errors.password && <span className="text-danger">{errors.password}</span>}

                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={ passwordConfirmation }
                        onChange={ this.handleChange }
                        type="password"
                        name="passwordConfirmation"
                        className={classnames('form-control',{'is-invalid':this.state.errors.passwordConfirmation})}
                    />
                    {this.state.errors.passwordConfirmation && <span className="text-danger">{this.state.errors.passwordConfirmation}</span>}
                </div>


                <div className='form-group'>
                    <button type='submit' className='btn btn-primary btn-lg' disabled={isLoading}>Login</button>
                </div>

                {this.state.errors.form && <span className="text-danger">{this.state.errors.form}</span>}
            </form>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        user : state.auth.user
    };
}

export default connect(mapStateToProps,{editUserInfo}) (UserForm);