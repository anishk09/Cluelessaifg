// AWS Amplify configuration as a TypeScript module.
// Keep secrets out of source control in real projects.
const awsConfig = {
  Auth: {
    region: "us-east-2",
    userPoolId: "us-east-2_3QkOGOd1X",
    userPoolWebClientId: "7s5d3aj8inkhdupu1q36644ka3",
  },
} as const;

export default awsConfig;
