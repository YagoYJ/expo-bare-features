const { CURRENT_ENV } = process.env;
const { DEV_ENV_TEST } = process.env;
const { PROD_ENV_TEST } = process.env;

type EnvsProps = {
  CURRENT_ENV: string;
  ENV_TEST: string;
};

const envs: EnvsProps =
  CURRENT_ENV === "dev"
    ? {
        CURRENT_ENV,
        ENV_TEST: DEV_ENV_TEST,
      }
    : {
        CURRENT_ENV,
        ENV_TEST: PROD_ENV_TEST,
      };

export { envs };
