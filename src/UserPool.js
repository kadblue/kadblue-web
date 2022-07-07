import { CognitoUserPool } from "amazon-cognito-identity-js";
import { ClientId, UserPoolId } from "./config";

const UserPoolData = {
    UserPoolId: UserPoolId,
    ClientId: ClientId,
    
}

export default new CognitoUserPool(UserPoolData)