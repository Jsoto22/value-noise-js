
export class ValueNoise {

    constructor(public length:number = 32, public type: 'perlin'|'cosine' = 'cosine') {
        this.len = length;
        this.fade = (type == 'perlin')? this.perlinFade: this.cosFade;
        this.genPermutation();
        console.log('initialized')
    }


    public readonly root: string = this.generateString(32);
    public readonly seed: number[] = this.cyrb128(this.root);
    private len: number = 32;
    private lenMax: number = this.len ** 2;

    private p: number[] = new Array<number>(this.lenMax * 2);
    private n: number[] = [];

    private fade: Function;

    private genPermutation() {
        let rand = this.mulberry32(this.seed[0]);
        for (let i = 0; i < this.lenMax; i++) {
            let r = this.lerp(0, 1, this.cosFade(rand()))

            this.n.push(r);
            this.p[i] = i;
        }

        for (let i = 0; i < this.lenMax; i++) {
            let r = Math.floor(Math.random() * this.lenMax),
                iV = this.p[i],
                rV = this.p[r];

            this.p[i] = rV;
            this.p[r] = iV;
            this.p[i + this.lenMax] = this.p[i];
        }

    }

    public evalX(x: number): number {
        let min = Math.floor(x % this.lenMax),
            t = this.fade(x - min),
            max = min == this.lenMax - 1 ? 0 : min++;

        return this.lerp(this.n[min], this.n[max], t);
    }

    public evalXY(x: number, y: number): number {
        let iX = Math.floor(x),
            iY = Math.floor(y),
            tX = this.fade(x - iX),
            tY = this.fade(y - iY),
            iX0 = iX & (this.lenMax - 1),
            iY0 = iY & (this.lenMax - 1),
            iX1 = (iX0 + 1) & (this.lenMax - 1),
            iY1 = (iY0 + 1) & (this.lenMax - 1),
            c00 = this.n[this.p[this.p[iX0] + iY0]],
            c10 = this.n[this.p[this.p[iX1] + iY0]],
            c01 = this.n[this.p[this.p[iX0] + iY1]],
            c11 = this.n[this.p[this.p[iX1] + iY1]],
            evalX0 = this.lerp(c00, c10, tX),
            evalX1 = this.lerp(c01, c11, tX),
            evalXY = this.lerp(evalX0, evalX1, tY)

        return evalXY;
    }

    public evalXYZ(x: number, y: number, z: number): number {
        let iX = Math.floor(x) & (this.lenMax - 1),
            iY = Math.floor(y) & (this.lenMax - 1),
            iZ = Math.floor(z) & (this.lenMax - 1),
            tX = this.fade(x - Math.floor(x)),
            tY = this.fade(y - Math.floor(y)),
            tZ = this.fade(z - Math.floor(z)),
            iXY0 = this.p[iX] + iY,
            iXY0Z0 = this.p[iXY0] + iZ,
            iXY0Z1 = this.p[iXY0 + 1] + iZ,
            iXY1 = this.p[iX + 1] + iY,
            iXY1Z0 = this.p[iXY1] + iZ,
            iXY1Z1 = this.p[iXY1 + 1] + iZ,
            c000 = this.n[this.p[iXY0Z0]],
            c010 = this.n[this.p[iXY1Z0]],
            c001 = this.n[this.p[iXY0Z1]],
            c011 = this.n[this.p[iXY1Z1]],
            c100 = this.n[this.p[iXY0Z0 + 1]],
            c110 = this.n[this.p[iXY1Z0 + 1]],
            c101 = this.n[this.p[iXY0Z1 + 1]],
            c111 = this.n[this.p[iXY1Z1 + 1]],
            evalX00 = this.lerp(c000, c010, tX),
            evalX01 = this.lerp(c001, c011, tX),
            evalXY0 = this.lerp(evalX00, evalX01, tY),
            evalX10 = this.lerp(c100, c110, tX),
            evalX11 = this.lerp(c101, c111, tX),
            evalXY1 = this.lerp(evalX10, evalX11, tY),
            evalXYZ = this.lerp(evalXY0, evalXY1, tZ)

        return evalXYZ;
    }

    private cyrb128(str: string) {
        let h1 = 1779033703,
            h2 = 3144134277,
            h3 = 1013904242,
            h4 = 2773480762;
        for (let i = 0, k; i < str.length; i++) {
            k = str.charCodeAt(i);
            h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
            h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
            h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
            h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
        }
        h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
        h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
        h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
        h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
        (h1 ^= h2 ^ h3 ^ h4), (h2 ^= h1), (h3 ^= h1), (h4 ^= h1);
        return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0];
    }

    private generateString(length: number) {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    private mulberry32(a: any) {
        return () => {
            var t = (a += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    private lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    private cosFade = (t: number, amplitude: number = 2, offset: number = 0.5): number =>
        offset - Math.cos(t * Math.PI) / amplitude;

    private perlinFade = (t: number): number => ((6 * t - 15) * t + 10) * t * t * t;

}

new ValueNoise();
