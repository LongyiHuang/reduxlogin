import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../actions/authAction'
class NavigationBar extends React.Component{


    static propTypes = {
        auth:PropTypes.object.isRequired

    }

    logout = (e) => {
        e.preventDefault();
        this.props.logout();
    }


    render(){
        const {isAuthenticated,user} = this.props.auth;
        const userLinks = (
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={'/user'}>{user.username}</Link>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href='####' onClick={this.logout}>Logout</a>
                    </li>



                </ul>
            </div>
        );

        const guestLinks = (
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to={"/signup"}>Sign Up</Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>

                </ul>
            </div>
        );

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand"  to={"/"}>Always expand</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample02"
                            aria-controls="navbarsExample02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {isAuthenticated ? userLinks : guestLinks}
                </div>
            </nav>

        );


    }
}

const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}


export default connect(mapStateToProps,{logout})(NavigationBar);