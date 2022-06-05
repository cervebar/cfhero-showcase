declare module 'i18next-intervalplural-postprocessor' {
  type detectCbT = any;
  type op = {
    type: 'postProcessor';
    async?: boolean;
    detect?: detectCbT;
    init?: () => void;
    cacheUserLanguage?: () => void;

    options: {
      intervalSeparator: ';';
      intervalRegex: string;
      intervalSuffix: '_interval';
    };

    setOptions: (options: any) => void;
    process: (
      value: string[],
      key: string,
      options: object,
      translator: object,
    ) => Array<string> | undefined;
  };
  const op: op;
  export default op;
}
declare module 'redux-persist/es/stateReconciler/hardSet';

declare module 'react-native-confetti-cannon';
