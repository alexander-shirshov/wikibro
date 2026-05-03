function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const env = {
  API_BASE_URL: required(import.meta.env.VITE_API_BASE_URL, 'VITE_API_BASE_URL'),
};
