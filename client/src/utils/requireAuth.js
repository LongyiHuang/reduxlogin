import React from 'react';
import {connect} from 'react-redux';
import {addFlashMessage} from "../actions/flashMessagesAction";
import PropTypes from 'prop-types';

export default function(ComposedComponent) {

    class Authenticate extends React.Component{
        componentWillMount(){
            if(!this.props.isAuthenticated){
                this.props.addFlashMessage({
                    type:"danger",
                    text:'You need to login to access this page'
                });
                this.context.router.history.push('/');
            }
        }

        componentWillUpdate(){
            this.context.router.history.push('/');
        }

        render() {
            return (
                <ComposedComponent { ...this.props } />
            );
        }
    }

    Authenticate.prototypes = {
        isAuthenticated: PropTypes.bool.isRequired,
        addFlashMessage: PropTypes.func.isRequired
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => {
        return {
            isAuthenticated : state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps,{addFlashMessage})(Authenticate);
}

