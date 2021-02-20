const request = require('request');
const oauthConfig = {
    server: 'https://sso.zjutv.com',
    appKey: 'bdyy',
    appSecret: 'bdyy',
};
const exported = {
    oauthConfig
};

exported.getUserInformation = (accessToken) => {
    return new Promise((resolve, reject) => {
        let reqUrl = `${oauthConfig.server}/user_account/api/oauth/service/users/info?access_token=${accessToken}&app_key=${oauthConfig.appKey}&app_secret=${oauthConfig.appSecret}`;
        request(reqUrl, function (error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            if (response.statusCode != 200) {
                reject('获取用户信息失败');
                return;
            }
            let { errorCode, errorMessage, payload } = JSON.parse(body);
            if (errorCode != 0) {
                reject(errorMessage);
                return;
            }
            resolve(payload);
        });
    });
};


module.exports = exported;
