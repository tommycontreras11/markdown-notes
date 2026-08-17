const required = (name: string) => {
  const value = process.env[name];

  if (!value) throw new Error(`This env variable ${name} is not defined.`);

  return value;
};

export const config = {
  API_URL: required("NEXT_PUBLIC_API_URL")
};
