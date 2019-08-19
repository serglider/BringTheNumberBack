function Drawing() {

    let dots = [];
    let ctx;

    this.render = () => {
        dots.forEach(dot => dot.render());
    };

    this.add = dot => {
        dot.setContext(ctx);
        dots.push(dot);
    };

    this.setContext = c => {
        ctx = c;
    };

    this.getNormTimeline = () => {
        const list = dots.map(dot => dot.t * 1000);
        const fa = new Float32Array(list);
        const head = fa[0];
        const diffs = fa.map(item => item - head);
        const tail = diffs[diffs.length - 1];
        return diffs.map(item => item / tail);
    };

    this.setNormTimeline = () => {
        const list = dots.map(dot => dot.t * 1000);
        const fa = new Float32Array(list);
        const head = fa[0];
        const diffs = fa.map(item => item - head);
        const tail = diffs[diffs.length - 1];
        const normalized = diffs.map(item => item / tail);
        dots.forEach((dot, i) => dot.normTime = normalized[i]);
    };

    this.getDots = () => {
        return dots;
    };

    this.reset = () => {
        dots = [];
    };
}
