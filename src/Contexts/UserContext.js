import { createContext, useEffect, useState } from "react";
import UserPool from "../UserPool";
import { AuthenticationDetails, CognitoRefreshToken, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js"



var UserContext = createContext()

function Signup(username, password){
    UserPool.signUp(username,password,null,null,function(err,data){
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
        }
    }) 
}

function UpdateAttributes(attributes){
    var user = UserPool.getCurrentUser()


    console.log(user)
    user.getSession((err,session)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("inside update",session)
        }
    })
    user.updateAttributes(attributes, (err,data)=>{
        if(err){
            console.error(err)
        }
        else{
            console.log(data)
        }
    })
}

function Login(username, password){
    const user = new CognitoUser({
        Username:username,
        Pool: UserPool
    })

    const authDetails = new AuthenticationDetails({
        Username:username,
        Password:password
    })


    

    user.authenticateUser(authDetails, {
        onSuccess: function(result) {
            console.log('login success',result)
        },
        onFailure: function(err) {
            console.error('login error',err)
        },
        newPasswordRequired: function(data) {
            console.log('new password required',data)
        },
    })
}

function ConfirmCode(code){
    var user = UserPool.getCurrentUser()
    user.confirmRegistration(code,true,(err,data)=>{
        if(err){
            console.error(err)
        }
        else{
            console.log(data)
        }
    })
}

function RefreshSession(){

    var user = UserPool.getCurrentUser()
    console.log(user)

    user.getSession((err,session)=>{
        if(err){
            console.log(err)
        }
        else{
            user.refreshSession(session.refreshToken, (err,session)=>{
                if(err){
                    console.log(err)
                }
                else{
                    console.log("inside refresh",session)  
                }
            })
        }
    })
}

function ChangePassword(oldPassword, newPassword){
    var user = UserPool.getCurrentUser()
    user.changePassword(oldPassword, newPassword, (err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
        }
    })
}

function ResendConfirmationCode(){
    var user = UserPool.getCurrentUser()
    user.resendConfirmationCode((err,data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
        }
    })
}





export function UserProvider(props) {

    

    useEffect(() => {
        RefreshSession()
    }, [])
    
    

    return (
        <UserContext.Provider value={{
            Signup,
            Login,
            RefreshSession,
            UpdateAttributes,
            ConfirmCode,
            ResendConfirmationCode,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;