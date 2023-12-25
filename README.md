# value-noise-js

<img  src="https://github.com/Jsoto22/value-noise-js/blob/main/example_art.png?raw=true"/>

<!-- ABOUT THE PROJECT -->
## About The Project

### A light and simple way to generate 1D, 2D, and 3D value noise in javascript.

Inspired by [Improved Noise reference implementation](https://mrl.cs.nyu.edu/~perlin/noise/) by Ken Perlin.

<img  src="https://github.com/Jsoto22/value-noise-js/blob/main/example.png?raw=true"/>

Example of 2D Noise image(128x128)

> Why create a noise library in Javascript? 

This was a small part of larger project where I was creating a flow field simulator for generative art.
To test my knowedge and skills, I decided not to use any libraries or frameworks, such as P5.js.

> What makes this library better than others?

Well, I can't say it's better, but it was built for my specific needs. This included a way to create multiple instances of (Psuedo)RNGs that were seedable, and could generate noise values in multiple dimensions.


<!-- GETTING STARTED -->
## Getting Started

To get started, install the NPM package into your project.

  ```sh
  npm install value-noise-js
  ```

Import the `ValueNoise` class where needed.

    import { ValueNoise } from 'value-noise-js'

Then create a new instance in your file.

    const noise = new ValueNoise()


## Usage

> Noise can be evaluated with any real number equal to 0 or greater. This includes all positive rational , fractional, or irrational numbers.
>
> Values between any two whole numbers will return an interpolated value between the corresponding evaluated values at the nearest whole numbers.
>

### 1D noise

```JavaScript
    let x = 1;

    // Evaluate at x
    let value = this.noise.evalX(x);
```

### 2D noise

```JavaScript
    let x = 1;
    let y = 2;

    // Evaluate at x and y
    let value = this.noise.evalXY(x,y);
```

### 3D noise

```JavaScript
    let x = 1;
    let y = 2;
    let z = 3;

    // Evaluate at x, y, and z
    let value = this.noise.evalXYZ(x,y,z);
```

### Passing a seed value

The `ValueNoise` constructor accepts an optional `seed` param as a `string` value.

> Passing a `seed` string uses this value to generate the pRNG values.
>
> You can access the `seed` value with the property `$seed` on the `ValueNoise` instance.

By default, a random seed is generated if left blank.

```JavaScript

    const seed = 'seed';
    const noise = new ValueNoise(seed)

    let x = 1;
    let y = 2;
    let z = 3;

    // Evaluate at x, y, and z
    let value = this.noise.evalXYZ(x,y,z);
```

### Passing a chunk-size value

The `ValueNoise` constructor accepts an optional `length` number as the second param value. Leave the `seed` param as `null` if not needed. 

> `length` dictates the size of the permutation table generated(`length ^ 2`). Values are eventually looped to save on memory allocation.
>
> The size of the perutaion table should be large enough to hide the repitition, but small enough to iterate and evaluate quicky. Results may vary based on hardware.

Default value is `32`.

```JavaScript

    //Chunk-size of 64 generates 64 ^ 2 purmutations and values
    const noise = new ValueNoise(null, 64)

    let x = 1;
    let y = 2;
    let z = 3;

    // Evaluate at x, y, and z
    let value = this.noise.evalXYZ(x,y,z);
```

### Easing function

The `ValueNoise` constructor accepts an optional `type` as the third param value. Leave the `seed` and `length` param as `null` if not needed. 

> `type` can be either `'perlin'` or `'cosine'`.  This smooths the interpolation values using the corresponding easing function.

Default value is `'cosine'`.

```JavaScript

    // Use Perlin fade easing function
    const noise = new ValueNoise(null, null, 'Perlin')

    let x = 1;
    let y = 2;
    let z = 3;

    // Evaluate at x, y, and z
    let value = this.noise.evalXYZ(x,y,z);
```


### Re-rolling the values

Use the `refresh` method to re-roll the values generated with a new random seed, or pass a `seed` value as a param.


```JavaScript

    const noise = new ValueNoise()

    let x = 1;
    let y = 2;
    let z = 3;

    // Evaluate at x, y, and z
    let value1 = this.noise.evalXYZ(x,y,z);

    // Re-roll random seed and generate new permutaion table and values
    noise.refresh()

    //Returns new value evaluate at x, y, and z
    let value2 = this.noise.evalXYZ(x,y,z);


```


## Roadmap

- Adding Fractional Brownian Motion

