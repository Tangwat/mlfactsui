import React, { Component } from 'react';
import axios from 'axios';

import '../css/SignForm.css';

// the base url
const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

class ResetPasswordForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            Messages: [],
            emialErrorMessages: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    async resetPassword(){
        const updateErrors = (obj) => {
            let key;
            for(key in obj){
                switch (key) {
                    case "email":
                        this.setState({
                            Messages: obj[key]
                        })
                        break;
                    default:
                        break;
                }
                    
            }
        }

        // submit the data to backend
        try {
            const response = await axios({
                method: 'post',
                url: `${BACKEND_HOST}/auth/password/reset/`,
                //  timeout: 4000,    // 4 seconds timeout
                data: {
                    email: this.state.email,
                }
            })

            // the response data
            const responseData = await response.data;
            console.log(responseData);
            this.setState({
                Messages: (responseData["detail"] == null) ? [] : [responseData["detail"]]
            })


        }catch(e){
            console.log(e);
            updateErrors(e.response.data)
            this.setState({
                Messages: (e.response.data["non_field_errors"] == null) ? [] : e.response.data["non_field_errors"]
            })
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.setState({
            Messages: []
        })

        console.log(this.state);
        this.resetPassword();
        
    }    

    render() {
        return (
        <div className="FormCenter" >
            <form onSubmit={this.handleSubmit} className="FormFields">
                <div className="FormField" >
                    <label className="FormField__Label" htmlFor="email" > E - Mail Address </label>
                    <input type="email"
                        id="email"
                        className="FormField__Input"
                        placeholder="Enter your email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange} required/>
                        {this.state.Messages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                </div >


                <div className="FormField" >
                    <button className="FormField__Button mr-20" > Reset Password </button> 
                 {/* <Link to="/" className="FormField__Link ">Create an account</Link>  */}
                </div >
            </form >
        </div >
        );
    }
}
export default ResetPasswordForm;