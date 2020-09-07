import React, { Component } from 'react';


import '../css/SignForm.css';

class ConfirmPasswordForm extends Component {
    constructor(props){
        super(props)
        this.state={
            newPassword:"",
            confirmPassword:"",
        }  
    }
    

    handleChange=(e)=>{
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    } 

    handleSubmit=(e)=> {
        e.preventDefault();
        if(this.state.newPassword !== this.state.confirmPassword){
             console.log("Passwords don't match");
        }

        console.log('The form was submitted with the following data:');
        console.log(this.state);
        
        // submit the registration form to api
        // const userDetails = {
        //     newPassword: this.state.newPassword,
        //     confirmPassword: this.state.confirmPassword,
        //     hasAgreed: this.state.hasAgreed
        // }
    };

    render(){
        return(
        <div className="FormCenter" >
            <form onSubmit={this.handleSubmit} className="FormFields">
                <div className="FormField" >
                    <label className="FormField__Label" htmlFor="newPassword" > New - Password </label>
                    <input type="newPassword"
                        id="newPassword"
                        className="FormField__Input"
                        placeholder="Enter your new - password"
                        name="newPassword"
                        value={this.state.newPassword}
                        onChange={this.handleChange} required/>
                        {this.state.newPasswordErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                </div >

                <div className="FormField" >
                    <label className="FormField__Label" htmlFor="confirmPassword" > Confirm - Password </label>
                    <input type="confirmPassword"
                        id="confirmPassword"
                        className="FormField__Input"
                        placeholder="Confirm your new - password"
                        name="confirmPassword"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange} required/>
                        {this.state.confirmPasswordErrorMessages.map(
                            (error, index) => (
                                <p className="field-alert-box" id="field-err" key={index}><small>{error}</small></p>
                            )
                        )}
                </div >
                <div className="FormField" >
                    <button className="FormField__Button mr-20" > Submit </button> 
               </div >
            </form >
        </div >
        );
   }
}
export default ConfirmPasswordForm;

