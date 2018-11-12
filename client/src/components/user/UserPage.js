import React from 'react';
import UserForm from './UserForm';
class UserPage extends React.Component{


    render(){

        return(
            <div className='row'>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <UserForm/>
                </div>
                <div className="col-md-3"></div>

            </div>
        );
    }

}

export default UserPage;