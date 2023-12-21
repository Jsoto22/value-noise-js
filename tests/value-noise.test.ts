import { ValueNoise } from "../src/value-noise"

test('initialized', () => {
    const init = new ValueNoise();
    expect(init instanceof ValueNoise).toBe(true)
})