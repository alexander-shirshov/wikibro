export const SUPPORTED_LANGUAGES = ['en', 'ru'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export function isLanguage(value: string): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

export interface Messages {
  app: {
    name: string;
    nav: {
      home: string;
    };
    language: {
      switchLabel: string;
    };
  };
  pages: {
    home: {
      title: string;
      description: string;
    };
  };
}
