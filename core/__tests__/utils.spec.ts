import { Operation, sum } from 'src'
import { createStateNode, StateNode } from 'src/model/state/state-node'
import { childrenToInterpolatedText, isDevelopmentMode, isDynamicExpression, setupHotReloading } from 'src/utils'

describe('Utils', () => {
  describe('isDevelopmentMode', () => {
    it('should be in development mode if the env variable is not set', () => {
      const currentMode = process.env.NODE_ENV
      delete process.env.NODE_ENV
      expect(isDevelopmentMode()).toBe(true)
      process.env.NODE_ENV = currentMode
    })

    it('should be in development mode if the env variable is "development"', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      expect(isDevelopmentMode()).toBe(true)
      process.env.NODE_ENV = currentMode
    })

    it('should not be in development mode', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      expect(isDevelopmentMode()).toBe(false)
      process.env.NODE_ENV = currentMode
    })
  })

  describe('isDynamicExpression', () => {
    it('should return true if parameter is a StateNode', () => {
      const stt = new StateNode('stt')
      expect(isDynamicExpression(stt)).toBe(true)
    })

    it('should return true if parameter is an Operation', () => {
      const op = new Operation('op', [1, 2])
      expect(isDynamicExpression(op)).toBe(true)
    })

    it('should return false for any other type', () => {
      expect(isDynamicExpression('hi')).toBe(false)
      expect(isDynamicExpression(10)).toBe(false)
      expect(isDynamicExpression(true)).toBe(false)
      expect(isDynamicExpression([1, 2])).toBe(false)
      expect(isDynamicExpression({ id: 'stt' })).toBe(false)
      expect(isDynamicExpression({ _: null, name: 'op', args: [1, 2] })).toBe(false)
    })
  })

  describe('setupHotReloading', () => {
    const originalWrite = process.stdout.write
    process.stdout.write = jest.fn()

    beforeEach(() => (process.stdout.write as jest.Mock).mockClear())

    afterAll(() => process.stdout.write = originalWrite)

    it('should not setup hot reloading if environment is not "development"', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      process.env.HOT_RELOADING = 'true'
      setupHotReloading()
      expect(process.stdout.write).not.toHaveBeenCalled()
      process.env.NODE_ENV = currentMode
    })

    it('should not setup hot reloading if the env variable "HOT_RELOADING" is not true', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      delete process.env.HOT_RELOADING
      setupHotReloading()
      expect(process.stdout.write).not.toHaveBeenCalled()
      process.env.NODE_ENV = currentMode
    })

    it('should setup hot reloading', () => {
      const currentMode = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      process.env.HOT_RELOADING = 'true'
      setupHotReloading()
      expect(process.stdout.write).toHaveBeenCalledWith(expect.stringMatching(/^__\[HOT RELOADING: SERVER_STARTED\]__/))
      process.env.NODE_ENV = currentMode
    })
  })

  describe('childrenToInterpolatedText', () => {
    it('should deal with strings', () => {
      expect(childrenToInterpolatedText('hello')).toBe('hello')
      expect(childrenToInterpolatedText(['hello ', 'world'])).toBe('hello world')
    })

    it('should deal with numbers', () => {
      expect(childrenToInterpolatedText(10)).toBe('10')
      expect(childrenToInterpolatedText([10, 20.52])).toBe('1020.52')
    })

    it('should deal with booleans', () => {
      expect(childrenToInterpolatedText(true)).toBe('true')
      expect(childrenToInterpolatedText([true, false])).toBe('truefalse')
    })

    it('should deal with objects', () => {
      const value1 = { a: 1, b: '2', c: true, d: { e: '3' } }
      const value2 = { hello: 'world' }
      expect(childrenToInterpolatedText(value1)).toBe(JSON.stringify(value1))
      expect(childrenToInterpolatedText([value1, value2])).toBe(`${JSON.stringify(value1)}${JSON.stringify(value2)}`)
    })

    it('should deal with expressions', () => {
      const ctx = createStateNode<number>('ctx')
      const op = sum(ctx, 2)
      expect(childrenToInterpolatedText(op)).toBe(op.toString())
      expect(childrenToInterpolatedText([op, ctx])).toBe(`${op.toString()}${ctx.toString()}`)
    })

    it('should deal with mixed types', () => {
      const ctx = createStateNode<number>('ctx')
      const values = ['1', 2, 3.58, true, false, 'test', ctx, { a: 1, b: '2' }]
      expect(childrenToInterpolatedText(values)).toBe(
        `123.58truefalsetest${ctx.toString()}${JSON.stringify(values[7])}`,
      )
    })
  })
})
