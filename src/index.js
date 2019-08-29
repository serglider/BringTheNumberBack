const world = new World();
const help = new Help();
const keyboard = new Keyboard();
const configs = getConfigs(world.getBounds());
const game = new Game(world, keyboard, configs);
let isFirstRun = true;

keyboard.subscribe(onKey);

function init() {
    reset();
    go();
}

function go() {
    keyboard.subscribe(onKey);
    game.start();
    configs.staticItems.forEach(createStaticItem);
}

function reset() {
    keyboard.reset();
    world.reset();
}

function createStaticItem({Class, config}) {
    const el = new Class(config);
    world.add(el);
}

function onKey(e) {
    if (e.isEscape) {
        if (isFirstRun) {
            isFirstRun = false;
            init();
        }
        help.toggle();
    } else if (e.isSpace) {
        init();
    } else if (e.isb) {
        game.toggleAnimation();
    }
}
