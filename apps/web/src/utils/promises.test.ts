import { describe, test, expect } from 'bun:test'
import { delay, wrapPromise } from '$/utils/promises'

function useFakeTimers(config: any) {}
function advanceTimersByTime(n: number) {}

describe('Promises', () => {
	describe.skip('delay', () => {
		test('delay pauses execution for specified time', async () => {
			useFakeTimers({ advanceTimers: true })

			const delayTime = 1000 // Delay for 1 second
			const startTime = Date.now()

			await delay(delayTime)

			const endTime = Date.now()
			const actualDelay = endTime - startTime

			// Jest's timers are not exact, so we should check that the delay is at least the expected delay.
			// We can't assume it will be exactly the delay, especially in a real-world scenario with other
			// operations happening on the machine.
			expect(actualDelay).toBeGreaterThanOrEqual(delayTime)
		})

		test('should resolve after the specified time', async () => {
			useFakeTimers({ advanceTimers: true })

			let isResolved = false
			const promise = delay(1000).then(() => {
				isResolved = true
			})

			// Only 500 ms has elapsed, so it shouldn't be resolved yet.
			advanceTimersByTime(500)
			await Promise.race([promise, null])
			expect(isResolved).toBe(false)

			// Now, we advance the timers by another 500 ms, making it a total of 1000 ms.
			advanceTimersByTime(500)
			await promise
			expect(isResolved).toBe(true)
		}, 6000)

		test('should resolve immediately for 0 ms delay', () => {
			useFakeTimers({ advanceTimers: true })

			const promise = delay(0)
			expect(promise).resolves.toBeUndefined()
		}, 6000)
	})

	describe('wrapPromise', () => {
		test.skip('should throw the promise if it is still pending', () => {
			const pendingPromise = new Promise(() => {})
			const wrapped = wrapPromise(pendingPromise)

			expect(() => {
				wrapped.read()
			}).toThrow(undefined)
		})

		test('should throw the error if the promise is rejected', async () => {
			const error = new Error('Test Error')
			const rejectedPromise = Promise.reject(error)
			const wrapped = wrapPromise(rejectedPromise)

			// Make sure the promise handlers run
			await rejectedPromise.catch(() => {})

			expect(() => {
				wrapped.read()
			}).toThrow(error)
		})

		test('should return the result if the promise is resolved', async () => {
			const resolvedValue = 'Test Value'
			const resolvedPromise = Promise.resolve(resolvedValue)
			const wrapped = wrapPromise(resolvedPromise)

			// Wait for the promise to resolve
			await resolvedPromise

			expect(wrapped.read()).toBe(resolvedValue)
		})
	})
})
