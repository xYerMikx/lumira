import type {
  DistrictView,
  MasterProfileView,
  MasterScheduleView,
  ServiceCategoryView,
} from '@lumira/contracts'

export type OnboardingDataState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | {
      status: 'ready'
      profile: MasterProfileView
      districts: DistrictView[]
      categories: ServiceCategoryView[]
      schedule: MasterScheduleView | null
    }

export type OnboardingDataAction =
  | { type: 'load_failed'; message: string }
  | {
      type: 'load_succeeded'
      profile: MasterProfileView
      districts: DistrictView[]
      categories: ServiceCategoryView[]
      schedule: MasterScheduleView | null
    }
  | { type: 'profile_updated'; profile: MasterProfileView }
  | { type: 'schedule_updated'; schedule: MasterScheduleView }

export const EMPTY_ONBOARDING_CATALOG_MESSAGE =
  'Справочник районов и услуг ещё не загружен. Обновите страницу чуть позже.'

export function isOnboardingCatalogReady(
  districts: DistrictView[],
  categories: ServiceCategoryView[],
): boolean {
  return districts.length > 0 && categories.length > 0
}

export function onboardingDataReducer(
  state: OnboardingDataState,
  action: OnboardingDataAction,
): OnboardingDataState {
  switch (action.type) {
    case 'load_failed':
      return { status: 'error', message: action.message }

    case 'load_succeeded':
      if (!isOnboardingCatalogReady(action.districts, action.categories)) {
        return {
          status: 'error',
          message: EMPTY_ONBOARDING_CATALOG_MESSAGE,
        }
      }

      return {
        status: 'ready',
        profile: action.profile,
        districts: action.districts,
        categories: action.categories,
        schedule: action.schedule,
      }

    case 'profile_updated': {
      if (state.status !== 'ready') {
        return state
      }

      return { ...state, profile: action.profile }
    }

    case 'schedule_updated': {
      if (state.status !== 'ready') {
        return state
      }

      return { ...state, schedule: action.schedule }
    }

    default:
      return state
  }
}
