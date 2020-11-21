const config = {
    s3: {
        REGION: "ap-northeast-2",
        BUCKET: "dev-points-infra-s3-uploads4f6eb0fd-ksixeb07egsl"
    },
    apiGateway: {
        REGION: "ap-northeast-2",
        URL: "https://cw20ol2mni.execute-api.ap-northeast-2.amazonaws.com/dev"
    },
    cognito: {
        REGION: "ap-northeast-2",
        USER_POOL_ID: "ap-northeast-2_171xwY8bC",
        APP_CLIENT_ID: "5q1ee5ihmq1iafehu0i1gmg3cp",
        IDENTITY_POOL_ID: "ap-northeast-2:26cdde80-e198-4fb8-a5ea-5cab99673f3a"
    },
    oauth: {
        DOMAIN: 'https://simpleblog-app.auth.ap-northeast-2.amazoncognito.com/oauth2/idpresponse',

        SCOPE: ['public_profile', 'email'],

        REDIRECTSIGNIN: 'expoamplifytest://',
        REDIRECTSIGNOUT: 'expoamplifytest://',

        RESPONSETYPE: 'code',

        OPTIONS: {
            // indicates if the data collection is enabled to support Cognito advanced security features. By default, this flag is set to true.
            AdvancedSecurityDataCollectionFlag: true
        },
    }
};


export default {
  ...config
};
