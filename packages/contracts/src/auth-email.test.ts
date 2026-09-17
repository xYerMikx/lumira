import { describe, expect, it } from 'vitest'

import { LoginInputSchema } from './auth'

describe('auth email', () => {
  it('accepts plus-aliases as distinct mailboxes after lowercasing', () => {
    const tagged = LoginInputSchema.safeParse({
      email: 'Login+X@Mail.RU',
      password: 'secret12',
    })
    const base = LoginInputSchema.safeParse({
      email: 'login@mail.ru',
      password: 'secret12',
    })

    expect(tagged.success).toBe(true)
    expect(base.success).toBe(true)

    if (!tagged.success || !base.success) {
      return
    }

    expect(tagged.data.email).toBe('login+x@mail.ru')
    expect(base.data.email).toBe('login@mail.ru')
    expect(tagged.data.email).not.toBe(base.data.email)
  })
})
