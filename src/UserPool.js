import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserPoolData = {
    UserPoolId: "ap-south-1_rPxEatoaG",
    ClientId: "2k6et3vaobh5p26nt1l82u5qde",
    
}

export default new CognitoUserPool(UserPoolData)