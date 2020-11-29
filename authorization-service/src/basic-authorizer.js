export const basicAuthorizer = async (event, ctx, cb) => {
    console.log("Event", event);

    if (event["type"] !== 'TOKEN') {
        cb('Unauthorized');
    }

    try {
        const authorizationToken = event.authorizationToken;

        const encodedCreds = authorizationToken.split(' ')[1];
        const buffer = Buffer.from(encodedCreds, 'base64');
        const plainCredentials = buffer.toString('utf-8').split(':');
        const username = plainCredentials[0];
        const password = plainCredentials[1];

        console.log(`Username: ${username}, password: ${password}`);

        const storedUserPassword = process.env[username];
        const effect = !storedUserPassword || storedUserPassword !== password ? 'Deny' : 'Allow';
        
        const policy = generatePolicy(encodedCreds, event.methodArn, effect);

        cb(null, policy);
    } catch(e) {
        cb(`Unauthorized ${e.message}`);
    }
};


const generatePolicy = (principalId, resource, effectt = 'Deny') => {
    return {
        principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: {
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }
        }
    }
}