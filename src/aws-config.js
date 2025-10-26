import { Amplify } from "aws-amplify";

const awsConfig = {
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_3QkOGOd1X",
    userPoolWebClientId: "7s5d3aj8inkhdupu1q36644ka3",
    mandatorySignIn: true,
  },
};

Amplify.configure(awsConfig);

export default awsConfig;
