function Background(configs) {

    const {
        width,
        height,
        centerX,
        centerY
    } = configs;
    const {PI, cos, sin, abs, round, random} = Math;
    const HALF_PI = 0.5 * PI;
    const TAU = 2 * PI;
    const TO_RAD = PI / 180;
    const rand = n => n * random();
    const fadeInOut = (t, m) => {
        let hm = 0.5 * m;
        return abs((t + hm) % m - hm) / (hm);
    };

    const pipeCount = 30;
    const pipePropCount = 8;
    const pipePropsLength = pipeCount * pipePropCount;
    const turnCount = 8;
    const turnAmount = (360 / turnCount) * TO_RAD;
    const turnChanceRange = 58;
    const baseSpeed = 0.5;
    const rangeSpeed = 1;
    const baseTTL = 100;
    const rangeTTL = 300;
    const baseWidth = 2;
    const rangeWidth = 4;
    const baseHue = 189;
    const rangeHue = 20;

    let ctx;
    let center = [centerX, centerY];
    let tick = 0;
    let pipeProps;

    const texture = document.createElement('canvas');
    const textureCtx = texture.getContext('2d');
    texture.width = width;
    texture.height = height;

    initPipes();

    return {
        update,
        render,
        reset,
        setContext
    };

    function reset() {
        tick = 0;
        texture.width = width;
        texture.height = height;
    }

    function render() {
        ctx.save();
        ctx.fillStyle = COLORS.c1;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        ctx.save();
        ctx.filter = 'blur(12px)';
        ctx.drawImage(texture, 0, 0);
        ctx.restore();
        ctx.save();
        ctx.drawImage(texture, 0, 0);
        ctx.restore();
    }

    function setContext(c) {
        ctx = c;
    }

    function initPipes() {
        pipeProps = new Float32Array(pipePropsLength);
        for (let i = 0; i < pipePropsLength; i += pipePropCount) {
            initPipe(i);
        }
    }

    function initPipe(i) {
        const x = rand(width);
        const direction = (round(rand(1)) ? HALF_PI : TAU - HALF_PI);
        const speed = baseSpeed + rand(rangeSpeed);
        const life = 0;
        const ttl = baseTTL + rand(rangeTTL);
        const width1 = baseWidth + rand(rangeWidth);
        const hue = baseHue + rand(rangeHue);
        pipeProps.set([x, centerY, direction, speed, life, ttl, width1, hue], i);
    }

    function update() {
        tick++;
        for (let i = 0; i < pipePropsLength; i += pipePropCount) {
            updatePipe(i);
        }
    }

    function updatePipe(i) {

        let x = pipeProps[i];
        let y = pipeProps[i + 1];
        let direction = pipeProps[i + 2];
        let speed = pipeProps[i + 3];
        let life = pipeProps[i + 4];
        let ttl = pipeProps[i + 5];
        let width1 = pipeProps[i + 6];
        let hue = pipeProps[i + 7];

        drawPipe(x, y, life, ttl, width1, hue);

        life++;
        x += cos(direction) * speed;
        y += sin(direction) * speed;
        const turnChance = !(tick % round(rand(turnChanceRange))) && (!(round(x) % 6) || !(round(y) % 6));
        const turnBias = round(rand(1)) ? -1 : 1;
        direction += turnChance ? turnAmount * turnBias : 0;

        pipeProps[i] = x;
        pipeProps[i + 1] = y;
        pipeProps[i + 2] = direction;
        pipeProps[i + 4] = life;

        if (life > ttl) {
            initPipe(i);
        }
    }

    function drawPipe(x, y, life, ttl, width, hue) {
        textureCtx.save();
        textureCtx.strokeStyle = `hsla(${hue},54%,32%,${fadeInOut(life, ttl) * 0.125})`;
        textureCtx.beginPath();
        textureCtx.arc(x, y, width, 0, TAU);
        textureCtx.stroke();
        textureCtx.closePath();
        textureCtx.restore();
    }
}