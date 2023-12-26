import { ValueNoise } from "../src/value-noise"

test('initialized', () => {

    const noise = new ValueNoise();
    expect(noise instanceof ValueNoise).toBeTruthy()

})

test('generate random seed', () => {

    const noiseA = new ValueNoise();
    const noiseB = new ValueNoise('');
    const noiseC = new ValueNoise(undefined);
    expect(noiseA.$seed.length > 0).toBeTruthy();
    expect(noiseB.$seed.length > 0).toBeTruthy();
    expect(noiseC.$seed.length > 0).toBeTruthy();

})

test('use provided seed', () => {

    const noiseA = new ValueNoise('seed');
    expect(noiseA.$seed).toBe('seed');

})

test('use provided lenth', () => {

    //To run test, set len and lenMax properties to public

    const noiseA = new ValueNoise(undefined, 8);
    const noiseB = new ValueNoise(undefined, 56);
    const noiseC = new ValueNoise(undefined, 21);
    const noiseD = new ValueNoise(undefined, 32 + Math.random());
    const noiseE = new ValueNoise(undefined, 0);
    const noiseF = new ValueNoise(undefined, 679);

    expect(noiseA.len).toBe(8);
    expect(noiseA.lenMax).toBe(8 ** 2);

    expect(noiseB.len).toBe(64);
    expect(noiseB.lenMax).toBe(64 ** 2);

    expect(noiseC.len).toBe(16);
    expect(noiseC.lenMax).toBe(16 ** 2);

    expect(noiseD.len).toBe(32);
    expect(noiseD.lenMax).toBe(32 ** 2);

    expect(noiseE.len).toBe(32);
    expect(noiseE.lenMax).toBe(32 ** 2);

    expect(noiseF.len).toBe(512);
    expect(noiseF.lenMax).toBe(512 ** 2);

})

test('use provided type', () => {

    //To run test, set fade property to public
    // Then set cosFade and perlinFade methods to public

    const noiseA = new ValueNoise(undefined, undefined, 'cosine');
    const noiseB = new ValueNoise(undefined, undefined, 'perlin');
    const noiseC = new ValueNoise(undefined, undefined, undefined);

    expect(noiseA.fade).toBe(noiseA.cosFade);
    expect(noiseB.fade).toBe(noiseB.perlinFade);
    expect(noiseC.fade).toBe(noiseC.cosFade);

})

test('refresh', () => {

    const noiseA = new ValueNoise();
    const evalA1 = noiseA.evalXY(0, 0);
    const seedA1 = noiseA.$seed

    noiseA.refresh()
    const seedA2 = noiseA.$seed
    const evalA2 = noiseA.evalXY(0, 0);

    expect(evalA1 !== evalA2).toBeTruthy();
    expect(seedA1 !== seedA2).toBeTruthy();

})

test('refresh with provided seed', () => {

    const noiseA = new ValueNoise();
    const evalA1 = noiseA.evalXY(0, 0);
    const seedA1 = noiseA.$seed

    noiseA.refresh('seed')
    const seedA2 = noiseA.$seed
    const evalA2 = noiseA.evalXY(0, 0);

    expect(evalA1 !== evalA2).toBeTruthy();
    expect(seedA1 !== seedA2).toBeTruthy();
    expect(seedA2).toBe('seed')

})