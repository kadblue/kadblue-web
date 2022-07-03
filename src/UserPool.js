import { CognitoUserPool } from "amazon-cognito-identity-js";

const UserPoolData = {
    UserPoolId: "ap-south-1_DTkRR7wmN",
    ClientId: "5rplipmsb4a6l4a04ffh2g75d0",
    
}

export default new CognitoUserPool(UserPoolData)