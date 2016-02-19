var Class = require('Class');
var Phaser = require('phaser');
var Events = require('Events');

/**
 * Basic game object
 *
 * @parent {Phaser.Plugin}
 * @parent {Events}
 *
 * @class GameObject
 * @name GameObject
 */
module.exports = Class.extend([Events, Phaser.Plugin], {

    /**
     * Init plugin instance
     *
     * @constructor
     *
     * @param gameLink
     * @param parent
     */
    constructor: function(gameLink, parent){
        this.game = gameLink;
        this.parent = parent || null;
    }

});
