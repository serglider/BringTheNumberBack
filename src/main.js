const world = new World();
const help = document.querySelector('.help-outer');
const keyboard = new Keyboard();
const configs = getConfigs(world.getBounds());
const game = new Game(world, keyboard, configs);
let isFirstRun = true;
let isHelpShown = true;

keyboard.subscribe(onKey);


function init() {
    world.reset();
    configs.staticItems.forEach(createStaticItem);
    game.start();
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
        toggleHelp();
    } else if (e.isSpace) {
        init();
    }
}

function toggleHelp() {
    isHelpShown = !isHelpShown;
    help.style.display = isHelpShown ? 'table' : 'none';
}

