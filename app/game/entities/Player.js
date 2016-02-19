var GameObject = require('GameObject');
var KeyCodes = require('KeyCodes');

// Shortcuts
var game;

/**
 * Player represent player objects
 *
 * @name Player
 * @class Player
 */
module.exports = GameObject.extend({

    /**
     * Ship sprite
     *
     * @type {Phaser.Sprite}
     */
    ship: null,

    /**
     * Preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
     * You shouldn't create any objects in this method that require assets that you're also loading in this method, as
     * they won't yet be available.
     */
    preload: function(){

        game = this.game;

        game.load.image('ship', 'assets/general/ship.png');
    },

    /**
     * Create is called once preload has completed, this includes the loading of any assets from the Loader.
     * If you don't have a preload method then create is the first method called in your State.
     */
    create: function(){

        // Add ship to stage
        var ship = this.ship = game.add.sprite(300, 300 ,'ship');

        // Add physics
        game.physics.enable(ship, Phaser.Physics.ARCADE);

        // Setup physics
        ship.body.drag.set(100);
        ship.body.maxVelocity.set(400);
    },

    /**
     * It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.
     * If is called BEFORE Stage, Tweens, Sounds, Input, Physics, Particles and Plugins have had their postUpdate methods called.
     */
    update: function(){

        if(game.input.keyboard.isDown(KeyCodes.SPACEBAR)){
            game.physics.arcade.accelerationFromRotation(this.ship.rotation, 200, this.ship.body.acceleration);
        }

    }

});
