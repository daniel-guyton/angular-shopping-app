/* eslint-disable no-var */
declare var process: {
  env: {
    NG_APP_ENV: string;
    NG_APP_API_GW: string | undefined;
    // Replace the line below with your environment variable for better type checking
    [key: string]: any;
  };
};
