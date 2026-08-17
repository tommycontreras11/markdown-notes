import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

const required = (name: string) => {
  const env = process.env[name];

  if (!env) throw new Error(`This env variable ${name} is not defined.`);

  return env;
};

export const config = {
  API_URL: required("API_URL")
};
