import { track } from '@vercel/analytics'

export const trackEvent = (name: string, properties?: Record<string, string | number | boolean>) => {
  try {
    track(name, properties)
    console.log(`[Analytics] Tracked: ${name}`, properties)
  } catch (error) {
    console.error(`[Analytics] Failed to track: ${name}`, error)
  }
}

export const ANALYTICS_EVENTS = {
  CLICK_HERO_PRIMARY: 'click_hero_primary',
  CLICK_HERO_SECONDARY: 'click_hero_secondary',
  CLICK_HERO_RESUME: 'click_hero_resume',
  CLICK_STICKY_CONTACT: 'click_sticky_contact',
  CLICK_STICKY_RESUME: 'click_sticky_resume',
  CLICK_PROJECT_CARD: 'click_project_card',
  CLICK_NAV_LINK: 'click_nav_link',
  CONTACT_FORM_SUBMIT: 'contact_form_submit',
}
