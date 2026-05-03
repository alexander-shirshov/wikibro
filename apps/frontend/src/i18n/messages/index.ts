import en from './en';
import ru from './ru';

import type { Language, Messages } from '@/i18n/types';
import type { NestedKeyOf } from './typed-keys';

export const messages = {
  en,
  ru,
} satisfies Record<Language, Messages>;

export type TranslationKey = NestedKeyOf<Messages>;
