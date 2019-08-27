function tween(obj, props, duration, easingType, onProgress, onComplete) {
    const starts = {};
    const changes = {};
    const startTime = new Date();
    const propKeys = Object.keys(props);
    const easing = {
        inCubic: function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        outCubic: function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        outElastic: function (t, b, c, d) {
            let s = 1.70158;
            let p = 0;
            let a = c;
            if (t === 0) return b;
            if ((t /= d) === 1) return b + c;
            if (!p) p = d * 0.3;
            if (a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },

    };
    const easeFunc = easing[easingType];

    propKeys.forEach(prop => {
        starts[prop] = obj[prop];
        changes[prop] = props[prop] - starts[prop];
    });

    update();

    function update() {
        let time = new Date() - startTime;
        if (time < duration) {
            setProps(time);
            onProgress();
            requestAnimationFrame(update);
        } else {
            time = duration;
            setProps(time);
            onComplete();
        }
    }

    function setProps(t) {
        propKeys.forEach(prop => {
            obj[prop] = easeFunc(t, starts[prop], changes[prop], duration);
        });
    }


}
