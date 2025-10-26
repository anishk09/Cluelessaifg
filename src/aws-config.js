import { Amplify } from "aws-amplify";

const awsConfig = {
  Auth: {
    region: "us-east-2", // your AWS region
    userPoolId: "us-east-2_3QkOGOd1X", // your User Pool ID
    userPoolWebClientId: "7s5d3aj8inkhdupu1q36644ka3", // your App Client ID
  },
};

Amplify.configure(awsConfig);

export default awsConfig;
