import { createContext, useEffect, useState } from "react";
import UserPool from "../UserPool";
import { AuthenticationDetails, CognitoRefreshToken, CognitoUser, CognitoUserAttribute } from "amazon-cognito-identity-js"



var UserContext = createContext()



function UpdateAttributes(attributes){
    var user = UserPool.getCurrentUser()

    return new Promise((resolve,reject)=>{
        if (user===null){
            reject("User is not logged in")
        }


        console.log(user)
        user.getSession((err,session)=>{
            if(err){
                reject(err)
            }
            else{
                if(!session.isValid()){
                    reject("Session is not valid")
                }
            }
        })
        user.updateAttributes(attributes, (err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
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

    return new Promise((resolve,reject)=>{
        user.authenticateUser(authDetails, {
            onSuccess: function(result) {
               resolve('login success',result)
            },
            onFailure: function(err) {
                reject(err)
            },
            newPasswordRequired: function(data) {
                reject(data)
            },
        })
    })
}

function ConfirmCode(code){
    var user = UserPool.getCurrentUser()
    return new Promise((resolve,reject)=>{
        if (user===null){
            reject("User is not logged in")
        }
        user.confirmRegistration(code,true,(err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}



function ChangePassword(oldPassword, newPassword){
    var user = UserPool.getCurrentUser()
    return new Promise((resolve,reject)=>{
        if (user===null){
            reject("User is not logged in")
        }
        user.changePassword(oldPassword, newPassword, (err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}

function ResendConfirmationCode(){
    var user = UserPool.getCurrentUser()
    return new Promise((resolve,reject)=>{
        if (user===null){
            reject("User is not logged in")
        }
        user.resendConfirmationCode((err,data)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(data)
            }
        })
    })
}





export function UserProvider(props) {
    const [signedIn, setSignedIn] = useState(false)
    useEffect(() => {
        if(signedIn){
            RefreshSession()
        }
    }, [])

    function Signup(username, password){
        return new Promise((resolve,reject)=>{
            UserPool.signUp(username,password,null,null,function(err,data){
                if(err){
                    reject(err)
                }
                else{
                    setSignedIn(true)
                    resolve(data)
                }
            })
        }) 
    }

    function RefreshSession(){
        var user = UserPool.getCurrentUser()
    
        return new Promise((resolve,reject)=>{
            if (user===null){
                reject("User is not logged in")
            }
            user.getSession((err,session)=>{
                if(err){
                    reject(err)
                }
                else{
                    if(session===null){
                        reject("User is not logged in")
                    }
                    user.refreshSession(session.refreshToken, (err,session)=>{
                        if(err){
                            reject(err)
                        }
                        else{
                            setSignedIn(true)
                            resolve(session)
                        }
                    })
                }
            })
        })
    }
    
    

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