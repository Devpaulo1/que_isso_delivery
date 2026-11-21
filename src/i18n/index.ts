import i18n, { type TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { STORAGE_KEYS } from '@/config/constants'
import { readStorage, writeStorage } from '@/utils/storage'
import { en } from './locales/en'
import { es } from './locales/es'
import { pt } from './locales/pt'

export const LANGUAGES = [
  { code: 'pt', label: 'Português', htmlLang: 'pt-BR' },
  { code: 'en', label: 'English', htmlLang: 'en' },
  { code: 'es', label: 'Español', htmlLang: 'es' },
] as const

export type Language = (typeof LANGUAGES)[number]['code']

export const DEFAULT_LANGUAGE: Language = 'pt'

export function isLanguage(value: unknown): value is Language {
  return LANGUAGES.some((language) => language.code === value)
}

const parseLanguage = (value: unknown): Language | null => (isLanguage(value) ? value : null)

function syncHtmlLang(code: string) {
  const language = LANGUAGES.find((item) => item.code === code)
  if (language) document.documentElement.lang = language.htmlLang
}

void i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt }, en: { translation: en }, es: { translation: es } },
  lng: readStorage(STORAGE_KEYS.language, parseLanguage) ?? DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  // React já escapa o conteúdo renderizado.
  interpolation: { escapeValue: false },
  initAsync: false,
})

syncHtmlLang(i18n.language)

i18n.on('languageChanged', (code) => {
  syncHtmlLang(code)
  writeStorage(STORAGE_KEYS.language, code)
})

/**
 * Em português o texto do próprio dado é a fonte (catálogo ou snapshot do pedido);
 * nos outros idiomas traduz pelo id, mantendo o original para cafés desconhecidos.
 */
function coffeeText(t: TFunction, id: string, field: 'name' | 'description', original: string): string {
  if (i18n.language === DEFAULT_LANGUAGE) return original
  return t(`coffees.${id}.${field}`, { defaultValue: original })
}

export function coffeeName(t: TFunction, coffee: { id: string; name: string }): string {
  return coffeeText(t, coffee.id, 'name', coffee.name)
}

export function coffeeDescription(t: TFunction, coffee: { id: string; description: string }): string {
  return coffeeText(t, coffee.id, 'description', coffee.description)
}

/** As tags do catálogo são os rótulos em português das categorias; traduz pela categoria correspondente. */
export function tagLabel(t: TFunction, tag: string): string {
  const category = Object.entries(pt.categories).find(([, label]) => label === tag)?.[0]
  return category ? t(`categories.${category}`) : tag
}

export default i18n
