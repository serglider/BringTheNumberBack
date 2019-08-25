const world = new World();
const configs = getConfigs(world.getBounds());
const game = new Game(world, configs);

init();

function init() {
    world.reset();
    configs.staticItems.forEach(createStaticItem);
    game.start();
}

function createStaticItem({Class, config}) {
    const el = new Class(config);
    world.add(el);
}
