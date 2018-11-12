import React from 'react';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class SignupForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            passwordConfirmation:'',
            errors:{},
            isLoading:false,
            invalid:false
        }
    }

    static propTypes = {
        signupRequest: PropTypes.func.isRequired
    }

    // static contextTypes = {
    //     router:PropTypes.object
    // }

    handleSubmit = (e) => {
        this.setState({
            isLoading : true,
            errors:{}
        });
        e.preventDefault();
        this.props.signupRequest(this.state).then(
            () => {
                this.props.addFlashMessage({
                    type:"success",
                    text:"You signed up successfully. Welcome."
                })
                this.props.history.push("/");
                // this.context.router.history.push("/");
            },
            (err) => {
                this.setState({
                    errors:err.response.data,
                    isLoading: false
                });
            }
        );
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleComplate = (e) => {
        const field = e.target.name;
        const val = e.target.value;

        if (val !== "") {
            this.props.checkUserExists(val).then(
                (res) =>{
                    let errors = this.state.errors;
                    let invalid;
                    if(res.data.user){
                        errors[field] = "There is user with such " + field;
                        invalid = true;
                    }else{
                        errors[field] = "";
                        invalid = false;
                    }
                    this.setState({
                        errors,
                        invalid
                    });
                }
            );
        }


    }


    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Join out community!</h2>
                <div className="form-group">
                    <label className="control-label" htmlFor="username">Username</label>
                    <input
                        className={classnames('form-control',{'is-invalid':this.state.errors.username})}
                        value={this.state.userName}
                        name="username"
                        onChange={this.handleChange}
                        type="text"
                        onBlur={this.handleComplate}
                    />
                    {this.state.errors.username && <span className="text-danger">{this.state.errors.username}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input
                        value={ this.state.email }
                        onChange={ this.handleChange }
                        type="email"
                        name="email"
                        className={classnames('form-control',{'is-invalid':this.state.errors.email})}
                        onBlur={this.handleComplate}
                    />
                    {this.state.errors.email && <span className="text-danger">{this.state.errors.email}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                        value={ this.state.password }
                        onChange={ this.handleChange }
                        type="password"
                        name="password"
                        className={classnames('form-control',{'is-invalid':this.state.errors.password})}
                    />
                    {this.state.errors.password && <span className="text-danger">{this.state.errors.password}</span>}
                </div>

                <div className="form-group">
                    <label className="control-label">Password Confirmation</label>
                    <input
                        value={ this.state.passwordConfirmation }
                        onChange={ this.handleChange }
                        type="password"
                        name="passwordConfirmation"
                        className={classnames('form-control',{'is-invalid':this.state.errors.passwordConfirmation})}
                    />
                    {this.state.errors.passwordConfirmation && <span className="text-danger">{this.state.errors.passwordConfirmation}</span>}
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={this.state.isLoading || this.state.invalid}>
                        Sign up
                    </button>
                </div>

            </form>



        );

    }


}

export default withRouter(SignupForm);