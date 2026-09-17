import { describe, expect, it } from 'vitest'
import type {
  DistrictView,
  MasterProfileView,
  ServiceCategoryView,
} from '@lumira/contracts'

import {
  EMPTY_ONBOARDING_CATALOG_MESSAGE,
  onboardingDataReducer,
  type OnboardingDataState,
} from '@/features/master-onboarding/model/onboarding-data-reducer'

const profile = { id: 'profile-1' } as unknown as MasterProfileView

const district: DistrictView = {
  id: '11111111-1111-1111-1111-111111111111',
  name: 'Центральный',
  slug: 'tsentralnyi',
  city: 'Minsk',
}

const category: ServiceCategoryView = {
  id: '22222222-2222-2222-2222-222222222222',
  name: 'Ногти',
  slug: 'nogti',
  icon: null,
  sort: 0,
  parentId: null,
}

const loading: OnboardingDataState = { status: 'loading' }

describe('onboardingDataReducer', () => {
  it('keeps the wizard blocked when districts or categories are missing', () => {
    expect(
      onboardingDataReducer(loading, {
        type: 'load_succeeded',
        profile,
        districts: [],
        categories: [category],
        schedule: null,
      }),
    ).toEqual({
      status: 'error',
      message: EMPTY_ONBOARDING_CATALOG_MESSAGE,
    })

    expect(
      onboardingDataReducer(loading, {
        type: 'load_succeeded',
        profile,
        districts: [district],
        categories: [],
        schedule: null,
      }),
    ).toEqual({
      status: 'error',
      message: EMPTY_ONBOARDING_CATALOG_MESSAGE,
    })
  })

  it('opens the wizard when catalog reference data is present', () => {
    expect(
      onboardingDataReducer(loading, {
        type: 'load_succeeded',
        profile,
        districts: [district],
        categories: [category],
        schedule: null,
      }),
    ).toEqual({
      status: 'ready',
      profile,
      districts: [district],
      categories: [category],
      schedule: null,
    })
  })
})
