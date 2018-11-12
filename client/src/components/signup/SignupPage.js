import React, { Component } from 'react';
import SignupForm from './SignupForm';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {signupRequest,checkUserExists} from '../../actions/signupAction';
import {addFlashMessage} from '../../actions/flashMessagesAction'

class SignupPage extends Component {

    static propTypes = {
        signupRequest: PropTypes.func.isRequired,
        addFlashMessage:PropTypes.func.isRequired,
        checkUserExists:PropTypes.func.isRequired
    }

    render() {
        const {signupRequest,addFlashMessage,checkUserExists} = this.props;
        return (
            <div className="row">
                <div className="col-md-3"></div>

                <div className="col-md-6">
                    <SignupForm
                        history={this.props.history}
                        signupRequest={signupRequest}
                        addFlashMessage={addFlashMessage}
                        checkUserExists={checkUserExists}
                    />
                </div>
                <div className="col-md-3"></div>
            </div>
        );
    }
}



export default connect(null,{signupRequest,addFlashMessage,checkUserExists}) (SignupPage);