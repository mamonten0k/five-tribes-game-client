declare module '*.module.scss';

declare module '*.gif';
declare module '*.jpg';

namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
  }
}
