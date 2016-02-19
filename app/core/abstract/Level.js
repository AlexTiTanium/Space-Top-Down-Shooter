var Events = require('Events');
var Engine = require('Engine');
var Class = require('Class');

/**
 * Load base level object
 *
 * @class Level
 * @name Level
 */
module.exports = Class.extend([Events], {

    /**
     * Init plugin instance
     *
     * @constructor
     *
     * @param {HTMLElement|String} el
     */
    constructor: function(el){

        // Here we will store loaded game objects
        this.gameObjects = [];

        this.engine = new Engine(el);
        this.game = this.engine.createGame();

        // Listen preload event
        this.listenTo(this.game, 'preload', this.preload);
    },

    /**
     * Load game object to level
     *
     * @param {GameObject} GameObject
     */
    add: function(GameObject){

        var gameObject = new GameObject(this.game);

        if (gameObject.preload) gameObject.preload();
        if (gameObject.create) gameObject.listenTo(this.game, 'create', gameObject.create);

        this.game.plugins.add(gameObject);
        this.gameObjects.push(gameObject);
    },

    /**
     * Stub for preload method
     */
    preload: function(){
        console.warn('Preload not defined');
    }

});
