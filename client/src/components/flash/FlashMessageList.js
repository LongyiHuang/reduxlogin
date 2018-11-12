import React from 'react';
import {connect} from 'react-redux';
import {deleteFlashMessage} from "../../actions/flashMessagesAction";
import FlashMessage from './FlashMessage';

class FlashMessageList extends React.Component{
    render(){
        const messages = this.props.messages.map(
          message => <FlashMessage message={message} deleteFlashMessage={this.props.deleteFlashMessage} key={message.id}/>
        );
        return (
            <div className="container">
               {messages}
            </div>
        );
    }

    componentWillUpdate(nextProps){

        const oldMessages = this.props.messages;
        const newMessages = nextProps.messages;
        for (var i = oldMessages.length - 1; i >= 0; i--) {
            const a = oldMessages[i];
            for (var j = newMessages.length - 1; j >= 0; j--) {
                const b = newMessages[j];
                if (a.id === b.id) {
                    oldMessages.splice(i, 1);
                    newMessages.splice(j, 1);
                    break;
                }
            }
        }
        console.log("new:",newMessages);
        if(newMessages.length > 0){
            setTimeout(()=>{
                this.props.deleteFlashMessage(newMessages[0].id);
            },5000);
        }

    }
}

const mapStateToProps = (state) => {
    return {
        messages:state.flashMessages
    };
};


export default connect (mapStateToProps,{deleteFlashMessage}) (FlashMessageList);