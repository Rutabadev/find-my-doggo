import { removeEmptyAttributes } from '~/utils'

describe('utils', () => {
  describe('removeEmptyAttributes', () => {
    test('should work', () => {
      const obj = {
        name: 'bum',
        email: '',
        password: 'pass',
      }

      expect(removeEmptyAttributes(obj)).toStrictEqual({
        name: 'bum',
        password: 'pass',
      })
    })

    test('should return empty object', () => {
      const obj = {
        name: '',
        email: '',
      }

      expect(removeEmptyAttributes(obj)).toStrictEqual({})
    })

    test('should not change the object', () => {
      const obj = {
        name: 'bum',
        email: 'email',
        password: 'pass',
      }

      expect(removeEmptyAttributes(obj)).toStrictEqual({
        name: 'bum',
        email: 'email',
        password: 'pass',
      })
    })
  })
})
