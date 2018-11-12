import React from 'react';
import classnames from 'classnames';
class FlashMessage extends React.Component{

    handleClick = (e) =>{
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render(){
        const {text,type} = this.props.message;

        return(
            <div className={classnames('alert',{'alert-success':type==='success','alert-danger':type === 'danger'})}>
                <button className='close' onClick={this.handleClick}>&times;</button>
                {text}
            </div>
        );
    }

}

export default FlashMessage;