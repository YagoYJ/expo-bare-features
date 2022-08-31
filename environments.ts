const { CURRENT_ENV } = process.env;
const { DEV_ENV_TEST } = process.env;
const { PROD_ENV_TEST } = process.env;

type EnvsProps = {
  CURRENT_ENV: string;
  ENV_TEST: string;
};

const envs: EnvsProps = {
  CURRENT_ENV,
  ENV_TEST: CURRENT_ENV === "dev" ? DEV_ENV_TEST : PROD_ENV_TEST,
};

export { envs };
