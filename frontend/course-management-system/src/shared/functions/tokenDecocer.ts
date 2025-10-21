export type TokenType = {
    userID : string,
    name : string,
    email : string,
    role : string
};

export const tokenDecoder = (token : string) : TokenType =>{
    var tokenPaylod = token.split('.')[1];
    var payloadValue = atob(tokenPaylod);
    var tokenClaims = JSON.parse(payloadValue);
    var tokenValues = Object.values(tokenClaims);
    const tokenObject : TokenType = {
        name : tokenValues[0] as string,
        userID : tokenValues[1] as string,
        email : tokenValues[2] as string,
        role : tokenValues[3] as string
    }
    return tokenObject;
};