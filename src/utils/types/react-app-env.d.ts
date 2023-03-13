/* eslint-disable @typescript-eslint/no-unused-vars */
declare module '*.module.scss';

declare module '*.gif';
declare module '*.jpg';

namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_DATABASE_URL: string;
    REACT_APP_DATABASE_ID: string;
  }
}
