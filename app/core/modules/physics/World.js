var Phaser = require('phaser');

Phaser.Physics.Arcade = {};

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* The Arcade Physics world. Contains Arcade Physics related collision, overlap and motion methods.
*
* @class Phaser.Physics.Arcade
* @constructor
* @param {Phaser.Game} game - reference to the current game instance.
*/
Phaser.Physics.Arcade = function (game) {

    /**
    * @property {Phaser.Game} game - Local reference to game.
    */
    this.game = game;

    /**
    * @property {Phaser.Point} gravity - The World gravity setting. Defaults to x: 0, y: 0, or no gravity.
    */
    this.gravity = new Phaser.Point();

    /**
    * @property {Phaser.Rectangle} bounds - The bounds inside of which the physics world exists. Defaults to match the world bounds.
    */
    this.bounds = new Phaser.Rectangle(0, 0, game.world.width, game.world.height);

    /**
    * Set the checkCollision properties to control for which bounds collision is processed.
    * For example checkCollision.down = false means Bodies cannot collide with the World.bounds.bottom.
    * @property {object} checkCollision - An object containing allowed collision flags.
    */
    this.checkCollision = { up: true, down: true, left: true, right: true };

    /**
    * @property {number} maxObjects - Used by the QuadTree to set the maximum number of objects per quad.
    */
    this.maxObjects = 10;

    /**
    * @property {number} maxLevels - Used by the QuadTree to set the maximum number of iteration levels.
    */
    this.maxLevels = 4;

    /**
    * @property {number} OVERLAP_BIAS - A value added to the delta values during collision checks.
    */
    this.OVERLAP_BIAS = 4;

    /**
    * @property {boolean} forceX - If true World.separate will always separate on the X axis before Y. Otherwise it will check gravity totals first.
    */
    this.forceX = false;

    /**
    * @property {number} sortDirection - Used when colliding a Sprite vs. a Group, or a Group vs. a Group, this defines the direction the sort is based on. Default is Phaser.Physics.Arcade.LEFT_RIGHT.
    * @default
    */
    this.sortDirection = Phaser.Physics.Arcade.LEFT_RIGHT;

    /**
    * @property {boolean} skipQuadTree - If true the QuadTree will not be used for any collision. QuadTrees are great if objects are well spread out in your game, otherwise they are a performance hit. If you enable this you can disable on a per body basis via `Body.skipQuadTree`.
    */
    this.skipQuadTree = true;

    /**
    * @property {boolean} isPaused - If `true` the `Body.preUpdate` method will be skipped, halting all motion for all bodies. Note that other methods such as `collide` will still work, so be careful not to call them on paused bodies.
    */
    this.isPaused = false;

    /**
    * @property {Phaser.QuadTree} quadTree - The world QuadTree.
    */
    this.quadTree = new Phaser.QuadTree(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

    /**
    * @property {number} _total - Internal cache var.
    * @private
    */
    this._total = 0;

    // By default we want the bounds the same size as the world bounds
    this.setBoundsToWorld();

};


Phaser.Physics.Arcade.prototype.constructor = Phaser.Physics.Arcade;

Phaser.Physics.Arcade.Body = require('./Body');
Phaser.Physics.Arcade.TilemapCollision = require('./TilemapCollision');

/**
* A constant used for the sortDirection value.
* Use this if you don't wish to perform any pre-collision sorting at all, or will manually sort your Groups.
* @constant
* @type {number}
*/
Phaser.Physics.Arcade.SORT_NONE = 0;

/**
* A constant used for the sortDirection value.
* Use this if your game world is wide but short and scrolls from the left to the right (i.e. Mario)
* @constant
* @type {number}
*/
Phaser.Physics.Arcade.LEFT_RIGHT = 1;

/**
* A constant used for the sortDirection value.
* Use this if your game world is wide but short and scrolls from the right to the left (i.e. Mario backwards)
* @constant
* @type {number}
*/
Phaser.Physics.Arcade.RIGHT_LEFT = 2;

/**
* A constant used for the sortDirection value.
* Use this if your game world is narrow but tall and scrolls from the top to the bottom (i.e. Dig Dug)
* @constant
* @type {number}
*/
Phaser.Physics.Arcade.TOP_BOTTOM = 3;

/**
* A constant used for the sortDirection value.
* Use this if your game world is narrow but tall and scrolls from the bottom to the top (i.e. Commando or a vertically scrolling shoot-em-up)
* @constant
* @type {number}
*/
Phaser.Physics.Arcade.BOTTOM_TOP = 4;

Phaser.Physics.Arcade.prototype = {

    /**
    * Updates the size of this physics world.
    *
    * @method Phaser.Physics.Arcade#setBounds
    * @param {number} x - Top left most corner of the world.
    * @param {number} y - Top left most corner of the world.
    * @param {number} width - New width of the world. Can never be smaller than the Game.width.
    * @param {number} height - New height of the world. Can never be smaller than the Game.height.
    */
    setBounds: function (x, y, width, height) {

        this.bounds.setTo(x, y, width, height);

    },

    /**
    * Updates the size of this physics world to match the size of the game world.
    *
    * @method Phaser.Physics.Arcade#setBoundsToWorld
    */
    setBoundsToWorld: function () {

        this.bounds.copyFrom(this.game.world.bounds);

    },

    /**
    * This will create an Arcade Physics body on the given game object or array of game objects.
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
    *
    * @method Phaser.Physics.Arcade#enable
    * @param {object|array|Phaser.Group} object - The game object to create the physics body on. Can also be an array or Group of objects, a body will be created on every child that has a `body` property.
    * @param {boolean} [children=true] - Should a body be created on all children of this object? If true it will recurse down the display list as far as it can go.
    */
    enable: function (object, children) {

        if (children === undefined) { children = true; }

        var i = 1;

        if (Array.isArray(object))
        {
            i = object.length;

            while (i--)
            {
                if (object[i] instanceof Phaser.Group)
                {
                    //  If it's a Group then we do it on the children regardless
                    this.enable(object[i].children, children);
                }
                else
                {
                    this.enableBody(object[i]);

                    if (children && object[i].hasOwnProperty('children') && object[i].children.length > 0)
                    {
                        this.enable(object[i], true);
                    }
                }
            }
        }
        else
        {
            if (object instanceof Phaser.Group)
            {
                //  If it's a Group then we do it on the children regardless
                this.enable(object.children, children);
            }
            else
            {
                this.enableBody(object);

                if (children && object.hasOwnProperty('children') && object.children.length > 0)
                {
                    this.enable(object.children, true);
                }
            }
        }

    },

    /**
    * Creates an Arcade Physics body on the given game object.
    * 
    * A game object can only have 1 physics body active at any one time, and it can't be changed until the body is nulled.
    *
    * When you add an Arcade Physics body to an object it will automatically add the object into its parent Groups hash array.
    *
    * @method Phaser.Physics.Arcade#enableBody
    * @param {object} object - The game object to create the physics body on. A body will only be created if this object has a null `body` property.
    */
    enableBody: function (object) {

        if (object.hasOwnProperty('body') && object.body === null)
        {
            object.body = new Phaser.Physics.Arcade.Body(object);

            if (object.parent && object.parent instanceof Phaser.Group)
            {
                object.parent.addToHash(object);
            }
        }

    },

    /**
    * Called automatically by a Physics body, it updates all motion related values on the Body unless `World.isPaused` is `true`.
    *
    * @method Phaser.Physics.Arcade#updateMotion
    * @param {Phaser.Physics.Arcade.Body} The Body object to be updated.
    */
    updateMotion: function (body) {

        var velocityDelta = this.computeVelocity(0, body, body.angularVelocity, body.angularAcceleration, body.angularDrag, body.maxAngular) - body.angularVelocity;
        body.angularVelocity += velocityDelta;
        body.rotation += (body.angularVelocity * this.game.time.physicsElapsed);

        body.velocity.x = this.computeVelocity(1, body, body.velocity.x, body.acceleration.x, body.drag.x, body.maxVelocity.x);
        body.velocity.y = this.computeVelocity(2, body, body.velocity.y, body.acceleration.y, body.drag.y, body.maxVelocity.y);

    },

    /**
    * A tween-like function that takes a starting velocity and some other factors and returns an altered velocity.
    * Based on a function in Flixel by @ADAMATOMIC
    *
    * @method Phaser.Physics.Arcade#computeVelocity
    * @param {number} axis - 0 for nothing, 1 for horizontal, 2 for vertical.
    * @param {Phaser.Physics.Arcade.Body} body - The Body object to be updated.
    * @param {number} velocity - Any component of velocity (e.g. 20).
    * @param {number} acceleration - Rate at which the velocity is changing.
    * @param {number} drag - Really kind of a deceleration, this is how much the velocity changes if Acceleration is not set.
    * @param {number} [max=10000] - An absolute value cap for the velocity.
    * @return {number} The altered Velocity value.
    */
    computeVelocity: function (axis, body, velocity, acceleration, drag, max) {

        if (max === undefined) { max = 10000; }

        if (axis === 1 && body.allowGravity)
        {
            velocity += (this.gravity.x + body.gravity.x) * this.game.time.physicsElapsed;
        }
        else if (axis === 2 && body.allowGravity)
        {
            velocity += (this.gravity.y + body.gravity.y) * this.game.time.physicsElapsed;
        }

        if (acceleration)
        {
            velocity += acceleration * this.game.time.physicsElapsed;
        }
        else if (drag)
        {
            drag *= this.game.time.physicsElapsed;

            if (velocity - drag > 0)
            {
                velocity -= drag;
            }
            else if (velocity + drag < 0)
            {
                velocity += drag;
            }
            else
            {
                velocity = 0;
            }
        }

        if (velocity > max)
        {
            velocity = max;
        }
        else if (velocity < -max)
        {
            velocity = -max;
        }

        return velocity;

    },

    /**
    * Checks for overlaps between two game objects. The objects can be Sprites, Groups or Emitters.
    * You can perform Sprite vs. Sprite, Sprite vs. Group and Group vs. Group overlap checks.
    * Unlike collide the objects are NOT automatically separated or have any physics applied, they merely test for overlap results.
    * Both the first and second parameter can be arrays of objects, of differing types.
    * If two arrays are passed, the contents of the first parameter will be tested against all contents of the 2nd parameter.
    * NOTE: This function is not recursive, and will not test against children of objects passed (i.e. Groups within Groups).
    *
    * @method Phaser.Physics.Arcade#overlap
    * @param {Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|array} object1 - The first object or array of objects to check. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
    * @param {Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|array} object2 - The second object or array of objects to check. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
    * @param {function} [overlapCallback=null] - An optional callback function that is called if the objects overlap. The two objects will be passed to this function in the same order in which you specified them, unless you are checking Group vs. Sprite, in which case Sprite will always be the first parameter.
    * @param {function} [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then `overlapCallback` will only be called if this callback returns `true`.
    * @param {object} [callbackContext] - The context in which to run the callbacks.
    * @return {boolean} True if an overlap occurred otherwise false.
    */
    overlap: function (object1, object2, overlapCallback, processCallback, callbackContext) {

        overlapCallback = overlapCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || overlapCallback;

        this._total = 0;

        if (!Array.isArray(object1) && Array.isArray(object2))
        {
            for (var i = 0; i < object2.length; i++)
            {
                this.collideHandler(object1, object2[i], overlapCallback, processCallback, callbackContext, true);
            }
        }
        else if (Array.isArray(object1) && !Array.isArray(object2))
        {
            for (var i = 0; i < object1.length; i++)
            {
                this.collideHandler(object1[i], object2, overlapCallback, processCallback, callbackContext, true);
            }
        }
        else if (Array.isArray(object1) && Array.isArray(object2))
        {
            for (var i = 0; i < object1.length; i++)
            {
                for (var j = 0; j < object2.length; j++)
                {
                    this.collideHandler(object1[i], object2[j], overlapCallback, processCallback, callbackContext, true);
                }
            }
        }
        else
        {
            this.collideHandler(object1, object2, overlapCallback, processCallback, callbackContext, true);
        }

        return (this._total > 0);

    },

    /**
    * Checks for collision between two game objects. You can perform Sprite vs. Sprite, Sprite vs. Group, Group vs. Group, Sprite vs. Tilemap Layer or Group vs. Tilemap Layer collisions.
    * Both the first and second parameter can be arrays of objects, of differing types.
    * If two arrays are passed, the contents of the first parameter will be tested against all contents of the 2nd parameter.
    * The objects are also automatically separated. If you don't require separation then use ArcadePhysics.overlap instead.
    * An optional processCallback can be provided. If given this function will be called when two sprites are found to be colliding. It is called before any separation takes place,
    * giving you the chance to perform additional checks. If the function returns true then the collision and separation is carried out. If it returns false it is skipped.
    * The collideCallback is an optional function that is only called if two sprites collide. If a processCallback has been set then it needs to return true for collideCallback to be called.
    * NOTE: This function is not recursive, and will not test against children of objects passed (i.e. Groups or Tilemaps within other Groups).
    *
    * @method Phaser.Physics.Arcade#collide
    * @param {Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer|array} object1 - The first object or array of objects to check. Can be Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter, or Phaser.TilemapLayer.
    * @param {Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer|array} object2 - The second object or array of objects to check. Can be Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter or Phaser.TilemapLayer.
    * @param {function} [collideCallback=null] - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them, unless you are colliding Group vs. Sprite, in which case Sprite will always be the first parameter.
    * @param {function} [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param {object} [callbackContext] - The context in which to run the callbacks.
    * @return {boolean} True if a collision occurred otherwise false.
    */
    collide: function (object1, object2, collideCallback, processCallback, callbackContext) {

        collideCallback = collideCallback || null;
        processCallback = processCallback || null;
        callbackContext = callbackContext || collideCallback;

        this._total = 0;

        if (!Array.isArray(object1) && Array.isArray(object2))
        {
            for (var i = 0; i < object2.length; i++)
            {
                this.collideHandler(object1, object2[i], collideCallback, processCallback, callbackContext, false);
            }
        }
        else if (Array.isArray(object1) && !Array.isArray(object2))
        {
            for (var i = 0; i < object1.length; i++)
            {
                this.collideHandler(object1[i], object2, collideCallback, processCallback, callbackContext, false);
            }
        }
        else if (Array.isArray(object1) && Array.isArray(object2))
        {
            for (var i = 0; i < object1.length; i++)
            {
                for (var j = 0; j < object2.length; j++)
                {
                    this.collideHandler(object1[i], object2[j], collideCallback, processCallback, callbackContext, false);
                }
            }
        }
        else
        {
            this.collideHandler(object1, object2, collideCallback, processCallback, callbackContext, false);
        }

        return (this._total > 0);

    },

    /**
     * A Sort function for sorting two bodies based on a LEFT to RIGHT sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortLeftRight
     * @param {Phaser.Sprite} a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param {Phaser.Sprite} b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return {integer} A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortLeftRight: function (a, b) {

        if (!a.body || !b.body)
        {
            return 0;
        }

        return a.body.x - b.body.x;

    },

    /**
     * A Sort function for sorting two bodies based on a RIGHT to LEFT sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortRightLeft
     * @param {Phaser.Sprite} a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param {Phaser.Sprite} b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return {integer} A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortRightLeft: function (a, b) {

        if (!a.body || !b.body)
        {
            return 0;
        }

        return b.body.x - a.body.x;

    },

    /**
     * A Sort function for sorting two bodies based on a TOP to BOTTOM sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortTopBottom
     * @param {Phaser.Sprite} a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param {Phaser.Sprite} b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return {integer} A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortTopBottom: function (a, b) {

        if (!a.body || !b.body)
        {
            return 0;
        }

        return a.body.y - b.body.y;

    },

    /**
     * A Sort function for sorting two bodies based on a BOTTOM to TOP sort direction.
     *
     * This is called automatically by World.sort
     *
     * @method Phaser.Physics.Arcade#sortBottomTop
     * @param {Phaser.Sprite} a - The first Sprite to test. The Sprite must have an Arcade Physics Body.
     * @param {Phaser.Sprite} b - The second Sprite to test. The Sprite must have an Arcade Physics Body.
     * @return {integer} A negative value if `a > b`, a positive value if `a < b` or 0 if `a === b` or the bodies are invalid.
     */
    sortBottomTop: function (a, b) {

        if (!a.body || !b.body)
        {
            return 0;
        }

        return b.body.y - a.body.y;

    },

    /**
     * This method will sort a Groups hash array.
     *
     * If the Group has `physicsSortDirection` set it will use the sort direction defined.
     *
     * Otherwise if the sortDirection parameter is undefined, or Group.physicsSortDirection is null, it will use Phaser.Physics.Arcade.sortDirection.
     *
     * By changing Group.physicsSortDirection you can customise each Group to sort in a different order.
     *
     * @method Phaser.Physics.Arcade#sort
     * @param {Phaser.Group} group - The Group to sort.
     * @param {integer} [sortDirection] - The sort direction used to sort this Group.
     */
    sort: function (group, sortDirection) {

        if (group.physicsSortDirection !== null)
        {
            sortDirection = group.physicsSortDirection;
        }
        else
        {
            if (sortDirection === undefined) { sortDirection = this.sortDirection; }
        }

        if (sortDirection === Phaser.Physics.Arcade.LEFT_RIGHT)
        {
            //  Game world is say 2000x600 and you start at 0
            group.hash.sort(this.sortLeftRight);
        }
        else if (sortDirection === Phaser.Physics.Arcade.RIGHT_LEFT)
        {
            //  Game world is say 2000x600 and you start at 2000
            group.hash.sort(this.sortRightLeft);
        }
        else if (sortDirection === Phaser.Physics.Arcade.TOP_BOTTOM)
        {
            //  Game world is say 800x2000 and you start at 0
            group.hash.sort(this.sortTopBottom);
        }
        else if (sortDirection === Phaser.Physics.Arcade.BOTTOM_TOP)
        {
            //  Game world is say 800x2000 and you start at 2000
            group.hash.sort(this.sortBottomTop);
        }

    },

    /**
    * Internal collision handler.
    *
    * @method Phaser.Physics.Arcade#collideHandler
    * @private
    * @param {Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer} object1 - The first object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter, or Phaser.TilemapLayer.
    * @param {Phaser.Sprite|Phaser.Group|Phaser.Particles.Emitter|Phaser.TilemapLayer} object2 - The second object to check. Can be an instance of Phaser.Sprite, Phaser.Group, Phaser.Particles.Emitter or Phaser.TilemapLayer. Can also be an array of objects to check.
    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param {object} callbackContext - The context in which to run the callbacks.
    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
    */
    collideHandler: function (object1, object2, collideCallback, processCallback, callbackContext, overlapOnly) {

        //  Only collide valid objects
        if (object2 === undefined && object1.physicsType === Phaser.GROUP)
        {
            this.sort(object1);
            this.collideGroupVsSelf(object1, collideCallback, processCallback, callbackContext, overlapOnly);
            return;
        }

        //  If neither of the objects are set or exist then bail out
        if (!object1 || !object2 || !object1.exists || !object2.exists)
        {
            return;
        }

        //  Groups? Sort them
        if (this.sortDirection !== Phaser.Physics.Arcade.SORT_NONE)
        {
            if (object1.physicsType === Phaser.GROUP)
            {
                this.sort(object1);
            }

            if (object2.physicsType === Phaser.GROUP)
            {
                this.sort(object2);
            }
        }

        //  SPRITES
        if (object1.physicsType === Phaser.SPRITE)
        {
            if (object2.physicsType === Phaser.SPRITE)
            {
                this.collideSpriteVsSprite(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            }
            else if (object2.physicsType === Phaser.GROUP)
            {
                this.collideSpriteVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            }
            else if (object2.physicsType === Phaser.TILEMAPLAYER)
            {
                this.collideSpriteVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            }
        }
        //  GROUPS
        else if (object1.physicsType === Phaser.GROUP)
        {
            if (object2.physicsType === Phaser.SPRITE)
            {
                this.collideSpriteVsGroup(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            }
            else if (object2.physicsType === Phaser.GROUP)
            {
                this.collideGroupVsGroup(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            }
            else if (object2.physicsType === Phaser.TILEMAPLAYER)
            {
                this.collideGroupVsTilemapLayer(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            }
        }
        //  TILEMAP LAYERS
        else if (object1.physicsType === Phaser.TILEMAPLAYER)
        {
            if (object2.physicsType === Phaser.SPRITE)
            {
                this.collideSpriteVsTilemapLayer(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            }
            else if (object2.physicsType === Phaser.GROUP)
            {
                this.collideGroupVsTilemapLayer(object2, object1, collideCallback, processCallback, callbackContext, overlapOnly);
            }
        }

    },

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideSpriteVsSprite
    * @private
    * @param {Phaser.Sprite} sprite1 - The first sprite to check.
    * @param {Phaser.Sprite} sprite2 - The second sprite to check.
    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param {object} callbackContext - The context in which to run the callbacks.
    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
    * @return {boolean} True if there was a collision, otherwise false.
    */
    collideSpriteVsSprite: function (sprite1, sprite2, collideCallback, processCallback, callbackContext, overlapOnly) {

        if (!sprite1.body || !sprite2.body)
        {
            return false;
        }

        if (this.separate(sprite1.body, sprite2.body, processCallback, callbackContext, overlapOnly))
        {
            if (collideCallback)
            {
                collideCallback.call(callbackContext, sprite1, sprite2);
            }

            this._total++;
        }

        return true;

    },

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideSpriteVsGroup
    * @private
    * @param {Phaser.Sprite} sprite - The sprite to check.
    * @param {Phaser.Group} group - The Group to check.
    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param {object} callbackContext - The context in which to run the callbacks.
    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
    */
    collideSpriteVsGroup: function (sprite, group, collideCallback, processCallback, callbackContext, overlapOnly) {

        if (group.length === 0 || !sprite.body)
        {
            return;
        }

        var body;

        if (this.skipQuadTree || sprite.body.skipQuadTree)
        {
            for (var i = 0; i < group.hash.length; i++)
            {
                //  Skip duff entries - we can't check a non-existent sprite or one with no body
                if (!group.hash[i] || !group.hash[i].exists || !group.hash[i].body)
                {
                    continue;
                }

                body = group.hash[i].body;

                //  Skip items either side of the sprite
                if (this.sortDirection === Phaser.Physics.Arcade.LEFT_RIGHT)
                {
                    if (sprite.body.right < body.x)
                    {
                        break;
                    }
                    else if (body.right < sprite.body.x)
                    {
                        continue;
                    }
                }
                else if (this.sortDirection === Phaser.Physics.Arcade.RIGHT_LEFT)
                {
                    if (sprite.body.x > body.right)
                    {
                        break;
                    }
                    else if (body.x > sprite.body.right)
                    {
                        continue;
                    }
                }
                else if (this.sortDirection === Phaser.Physics.Arcade.TOP_BOTTOM)
                {
                    if (sprite.body.bottom < body.y)
                    {
                        break;
                    }
                    else if (body.bottom < sprite.body.y)
                    {
                        continue;
                    }
                }
                else if (this.sortDirection === Phaser.Physics.Arcade.BOTTOM_TOP)
                {
                    if (sprite.body.y > body.bottom)
                    {
                        break;
                    }
                    else if (body.y > sprite.body.bottom)
                    {
                        continue;
                    }
                }
                
                this.collideSpriteVsSprite(sprite, group.hash[i], collideCallback, processCallback, callbackContext, overlapOnly);
            }
        }
        else
        {
            //  What is the sprite colliding with in the quadtree?
            this.quadTree.clear();

            this.quadTree.reset(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

            this.quadTree.populate(group);

            var items = this.quadTree.retrieve(sprite);

            for (var i = 0; i < items.length; i++)
            {
                //  We have our potential suspects, are they in this group?
                if (this.separate(sprite.body, items[i], processCallback, callbackContext, overlapOnly))
                {
                    if (collideCallback)
                    {
                        collideCallback.call(callbackContext, sprite, items[i].sprite);
                    }

                    this._total++;
                }
            }
        }

    },

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideGroupVsSelf
    * @private
    * @param {Phaser.Group} group - The Group to check.
    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param {object} callbackContext - The context in which to run the callbacks.
    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
    * @return {boolean} True if there was a collision, otherwise false.
    */
    collideGroupVsSelf: function (group, collideCallback, processCallback, callbackContext, overlapOnly) {

        if (group.length === 0)
        {
            return;
        }

        for (var i = 0; i < group.hash.length; i++)
        {
            //  Skip duff entries - we can't check a non-existent sprite or one with no body
            if (!group.hash[i] || !group.hash[i].exists || !group.hash[i].body)
            {
                continue;
            }

            var object1 = group.hash[i];

            for (var j = i + 1; j < group.hash.length; j++)
            {
                //  Skip duff entries - we can't check a non-existent sprite or one with no body
                if (!group.hash[j] || !group.hash[j].exists || !group.hash[j].body)
                {
                    continue;
                }

                var object2 = group.hash[j];

                //  Skip items either side of the sprite
                if (this.sortDirection === Phaser.Physics.Arcade.LEFT_RIGHT)
                {
                    if (object1.body.right < object2.body.x)
                    {
                        break;
                    }
                    else if (object2.body.right < object1.body.x)
                    {
                        continue;
                    }
                }
                else if (this.sortDirection === Phaser.Physics.Arcade.RIGHT_LEFT)
                {
                    if (object1.body.x > object2.body.right)
                    {
                        continue;
                    }
                    else if (object2.body.x > object1.body.right)
                    {
                        break;
                    }
                }
                else if (this.sortDirection === Phaser.Physics.Arcade.TOP_BOTTOM)
                {
                    if (object1.body.bottom < object2.body.y)
                    {
                        continue;
                    }
                    else if (object2.body.bottom < object1.body.y)
                    {
                        break;
                    }
                }
                else if (this.sortDirection === Phaser.Physics.Arcade.BOTTOM_TOP)
                {
                    if (object1.body.y > object2.body.bottom)
                    {
                        continue;
                    }
                    else if (object2.body.y > object1.body.bottom)
                    {
                        break;
                    }
                }
                
                this.collideSpriteVsSprite(object1, object2, collideCallback, processCallback, callbackContext, overlapOnly);
            }
        }

    },

    /**
    * An internal function. Use Phaser.Physics.Arcade.collide instead.
    *
    * @method Phaser.Physics.Arcade#collideGroupVsGroup
    * @private
    * @param {Phaser.Group} group1 - The first Group to check.
    * @param {Phaser.Group} group2 - The second Group to check.
    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
    * @param {object} callbackContext - The context in which to run the callbacks.
    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
    */
    collideGroupVsGroup: function (group1, group2, collideCallback, processCallback, callbackContext, overlapOnly) {

        if (group1.length === 0 || group2.length === 0)
        {
            return;
        }

        for (var i = 0; i < group1.children.length; i++)
        {
            if (group1.children[i].exists)
            {
                if (group1.children[i].physicsType === Phaser.GROUP)
                {
                    this.collideGroupVsGroup(group1.children[i], group2, collideCallback, processCallback, callbackContext, overlapOnly);
                }
                else
                {
                    this.collideSpriteVsGroup(group1.children[i], group2, collideCallback, processCallback, callbackContext, overlapOnly);
                }
            }
        }

    },

    /**
    * The core separation function to separate two physics bodies.
    *
    * @private
    * @method Phaser.Physics.Arcade#separate
    * @param {Phaser.Physics.Arcade.Body} body1 - The first Body object to separate.
    * @param {Phaser.Physics.Arcade.Body} body2 - The second Body object to separate.
    * @param {function} [processCallback=null] - A callback function that lets you perform additional checks against the two objects if they overlap. If this function is set then the sprites will only be collided if it returns true.
    * @param {object} [callbackContext] - The context in which to run the process callback.
    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
    * @return {boolean} Returns true if the bodies collided, otherwise false.
    */
    separate: function (body1, body2, processCallback, callbackContext, overlapOnly) {

        if (!body1.enable || !body2.enable || !this.intersects(body1, body2))
        {
            return false;
        }

        //  They overlap. Is there a custom process callback? If it returns true then we can carry on, otherwise we should abort.
        if (processCallback && processCallback.call(callbackContext, body1.sprite, body2.sprite) === false)
        {
            return false;
        }

        //  Do we separate on x or y first?

        var result = false;

        //  If we weren't having to carry around so much legacy baggage with us, we could do this properly. But alas ...
        if (this.forceX || Math.abs(this.gravity.y + body1.gravity.y) < Math.abs(this.gravity.x + body1.gravity.x))
        {
            result = (this.separateX(body1, body2, overlapOnly) || this.separateY(body1, body2, overlapOnly));
        }
        else
        {
            result = (this.separateY(body1, body2, overlapOnly) || this.separateX(body1, body2, overlapOnly));
        }

        if (overlapOnly)
        {
            //  We already know they intersect from the check above, but by this point we know they've now had their overlapX/Y values populated
            return true;
        }
        else
        {
            return result;
        }

    },

    /**
    * Check for intersection against two bodies.
    *
    * @method Phaser.Physics.Arcade#intersects
    * @param {Phaser.Physics.Arcade.Body} body1 - The Body object to check.
    * @param {Phaser.Physics.Arcade.Body} body2 - The Body object to check.
    * @return {boolean} True if they intersect, otherwise false.
    */
    intersects: function (body1, body2) {

        if (body1.right <= body2.position.x)
        {
            return false;
        }

        if (body1.bottom <= body2.position.y)
        {
            return false;
        }

        if (body1.position.x >= body2.right)
        {
            return false;
        }

        if (body1.position.y >= body2.bottom)
        {
            return false;
        }

        return true;

    },

    /**
    * The core separation function to separate two physics bodies on the x axis.
    *
    * @private
    * @method Phaser.Physics.Arcade#separateX
    * @param {Phaser.Physics.Arcade.Body} body1 - The Body object to separate.
    * @param {Phaser.Physics.Arcade.Body} body2 - The Body object to separate.
    * @param {boolean} overlapOnly - If true the bodies will only have their overlap data set, no separation or exchange of velocity will take place.
    * @return {boolean} Returns true if the bodies were separated, otherwise false.
    */
    separateX: function (body1, body2, overlapOnly) {

        //  Can't separate two immovable bodies
        if (body1.immovable && body2.immovable)
        {
            return false;
        }

        var overlap = 0;

        //  Check if the hulls actually overlap
        if (this.intersects(body1, body2))
        {
            var maxOverlap = body1.deltaAbsX() + body2.deltaAbsX() + this.OVERLAP_BIAS;

            if (body1.deltaX() === 0 && body2.deltaX() === 0)
            {
                //  They overlap but neither of them are moving
                body1.embedded = true;
                body2.embedded = true;
            }
            else if (body1.deltaX() > body2.deltaX())
            {
                //  Body1 is moving right and/or Body2 is moving left
                overlap = body1.right - body2.x;

                if ((overlap > maxOverlap) || body1.checkCollision.right === false || body2.checkCollision.left === false)
                {
                    overlap = 0;
                }
                else
                {
                    body1.touching.none = false;
                    body1.touching.right = true;
                    body2.touching.none = false;
                    body2.touching.left = true;
                }
            }
            else if (body1.deltaX() < body2.deltaX())
            {
                //  Body1 is moving left and/or Body2 is moving right
                overlap = body1.x - body2.width - body2.x;

                if ((-overlap > maxOverlap) || body1.checkCollision.left === false || body2.checkCollision.right === false)
                {
                    overlap = 0;
                }
                else
                {
                    body1.touching.none = false;
                    body1.touching.left = true;
                    body2.touching.none = false;
                    body2.touching.right = true;
                }
            }

            //  Resets the overlapX to zero if there is no overlap, or to the actual pixel value if there is
            body1.overlapX = overlap;
            body2.overlapX = overlap;

            //  Then adjust their positions and velocities accordingly (if there was any overlap)
            if (overlap !== 0)
            {
                if (overlapOnly || body1.customSeparateX || body2.customSeparateX)
                {
                    return true;
                }

                var v1 = body1.velocity.x;
                var v2 = body2.velocity.x;

                if (!body1.immovable && !body2.immovable)
                {
                    overlap *= 0.5;

                    body1.x = body1.x - overlap;
                    body2.x += overlap;

                    var nv1 = Math.sqrt((v2 * v2 * body2.mass) / body1.mass) * ((v2 > 0) ? 1 : -1);
                    var nv2 = Math.sqrt((v1 * v1 * body1.mass) / body2.mass) * ((v1 > 0) ? 1 : -1);
                    var avg = (nv1 + nv2) * 0.5;

                    nv1 -= avg;
                    nv2 -= avg;

                    body1.velocity.x = avg + nv1 * body1.bounce.x;
                    body2.velocity.x = avg + nv2 * body2.bounce.x;
                }
                else if (!body1.immovable)
                {
                    body1.x = body1.x - overlap;
                    body1.velocity.x = v2 - v1 * body1.bounce.x;

                    //  This is special case code that handles things like vertically moving platforms you can ride
                    if (body2.moves)
                    {
                        body1.y += (body2.y - body2.prev.y) * body2.friction.y;
                    }
                }
                else if (!body2.immovable)
                {
                    body2.x += overlap;
                    body2.velocity.x = v1 - v2 * body2.bounce.x;

                    //  This is special case code that handles things like vertically moving platforms you can ride
                    if (body1.moves)
                    {
                        body2.y += (body1.y - body1.prev.y) * body1.friction.y;
                    }
                }

                return true;
            }
        }

        return false;

    },

    /**
    * The core separation function to separate two physics bodies on the y axis.
    *
    * @private
    * @method Phaser.Physics.Arcade#separateY
    * @param {Phaser.Physics.Arcade.Body} body1 - The Body object to separate.
    * @param {Phaser.Physics.Arcade.Body} body2 - The Body object to separate.
    * @param {boolean} overlapOnly - If true the bodies will only have their overlap data set, no separation or exchange of velocity will take place.
    * @return {boolean} Returns true if the bodies were separated, otherwise false.
    */
    separateY: function (body1, body2, overlapOnly) {

        //  Can't separate two immovable or non-existing bodies
        if (body1.immovable && body2.immovable)
        {
            return false;
        }

        var overlap = 0;

        //  Check if the hulls actually overlap
        if (this.intersects(body1, body2))
        {
            var maxOverlap = body1.deltaAbsY() + body2.deltaAbsY() + this.OVERLAP_BIAS;

            if (body1.deltaY() === 0 && body2.deltaY() === 0)
            {
                //  They overlap but neither of them are moving
                body1.embedded = true;
                body2.embedded = true;
            }
            else if (body1.deltaY() > body2.deltaY())
            {
                //  Body1 is moving down and/or Body2 is moving up
                overlap = body1.bottom - body2.y;

                if ((overlap > maxOverlap) || body1.checkCollision.down === false || body2.checkCollision.up === false)
                {
                    overlap = 0;
                }
                else
                {
                    body1.touching.none = false;
                    body1.touching.down = true;
                    body2.touching.none = false;
                    body2.touching.up = true;
                }
            }
            else if (body1.deltaY() < body2.deltaY())
            {
                //  Body1 is moving up and/or Body2 is moving down
                overlap = body1.y - body2.bottom;

                if ((-overlap > maxOverlap) || body1.checkCollision.up === false || body2.checkCollision.down === false)
                {
                    overlap = 0;
                }
                else
                {
                    body1.touching.none = false;
                    body1.touching.up = true;
                    body2.touching.none = false;
                    body2.touching.down = true;
                }
            }

            //  Resets the overlapY to zero if there is no overlap, or to the actual pixel value if there is
            body1.overlapY = overlap;
            body2.overlapY = overlap;

            //  Then adjust their positions and velocities accordingly (if there was any overlap)
            if (overlap !== 0)
            {
                if (overlapOnly || body1.customSeparateY || body2.customSeparateY)
                {
                    return true;
                }

                var v1 = body1.velocity.y;
                var v2 = body2.velocity.y;

                if (!body1.immovable && !body2.immovable)
                {
                    overlap *= 0.5;

                    body1.y = body1.y - overlap;
                    body2.y += overlap;

                    var nv1 = Math.sqrt((v2 * v2 * body2.mass) / body1.mass) * ((v2 > 0) ? 1 : -1);
                    var nv2 = Math.sqrt((v1 * v1 * body1.mass) / body2.mass) * ((v1 > 0) ? 1 : -1);
                    var avg = (nv1 + nv2) * 0.5;

                    nv1 -= avg;
                    nv2 -= avg;

                    body1.velocity.y = avg + nv1 * body1.bounce.y;
                    body2.velocity.y = avg + nv2 * body2.bounce.y;
                }
                else if (!body1.immovable)
                {
                    body1.y = body1.y - overlap;
                    body1.velocity.y = v2 - v1 * body1.bounce.y;

                    //  This is special case code that handles things like horizontal moving platforms you can ride
                    if (body2.moves)
                    {
                        body1.x += (body2.x - body2.prev.x) * body2.friction.x;
                    }
                }
                else if (!body2.immovable)
                {
                    body2.y += overlap;
                    body2.velocity.y = v1 - v2 * body2.bounce.y;

                    //  This is special case code that handles things like horizontal moving platforms you can ride
                    if (body1.moves)
                    {
                        body2.x += (body1.x - body1.prev.x) * body1.friction.x;
                    }
                }

                return true;
            }

        }

        return false;

    },

    /**
    * Given a Group and a Pointer this will check to see which Group children overlap with the Pointer coordinates.
    * Each child will be sent to the given callback for further processing.
    * Note that the children are not checked for depth order, but simply if they overlap the Pointer or not.
    *
    * @method Phaser.Physics.Arcade#getObjectsUnderPointer
    * @param {Phaser.Pointer} pointer - The Pointer to check.
    * @param {Phaser.Group} group - The Group to check.
    * @param {function} [callback] - A callback function that is called if the object overlaps with the Pointer. The callback will be sent two parameters: the Pointer and the Object that overlapped with it.
    * @param {object} [callbackContext] - The context in which to run the callback.
    * @return {PIXI.DisplayObject[]} An array of the Sprites from the Group that overlapped the Pointer coordinates.
    */
    getObjectsUnderPointer: function (pointer, group, callback, callbackContext) {

        if (group.length === 0 || !pointer.exists)
        {
            return;
        }

        return this.getObjectsAtLocation(pointer.x, pointer.y, group, callback, callbackContext, pointer);

    },

    /**
    * Given a Group and a location this will check to see which Group children overlap with the coordinates.
    * Each child will be sent to the given callback for further processing.
    * Note that the children are not checked for depth order, but simply if they overlap the coordinate or not.
    *
    * @method Phaser.Physics.Arcade#getObjectsAtLocation
    * @param {number} x - The x coordinate to check.
    * @param {number} y - The y coordinate to check.
    * @param {Phaser.Group} group - The Group to check.
    * @param {function} [callback] - A callback function that is called if the object overlaps the coordinates. The callback will be sent two parameters: the callbackArg and the Object that overlapped the location.
    * @param {object} [callbackContext] - The context in which to run the callback.
    * @param {object} [callbackArg] - An argument to pass to the callback.
    * @return {PIXI.DisplayObject[]} An array of the Sprites from the Group that overlapped the coordinates.
    */
    getObjectsAtLocation: function (x, y, group, callback, callbackContext, callbackArg) {

        this.quadTree.clear();

        this.quadTree.reset(this.game.world.bounds.x, this.game.world.bounds.y, this.game.world.bounds.width, this.game.world.bounds.height, this.maxObjects, this.maxLevels);

        this.quadTree.populate(group);

        var rect = new Phaser.Rectangle(x, y, 1, 1);
        var output = [];

        var items = this.quadTree.retrieve(rect);

        for (var i = 0; i < items.length; i++)
        {
            if (items[i].hitTest(x, y))
            {
                if (callback)
                {
                    callback.call(callbackContext, callbackArg, items[i].sprite);
                }

                output.push(items[i].sprite);
            }
        }

        return output;
        
    },

    /**
    * Move the given display object towards the destination object at a steady velocity.
    * If you specify a maxTime then it will adjust the speed (overwriting what you set) so it arrives at the destination in that number of seconds.
    * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
    *
    * @method Phaser.Physics.Arcade#moveToObject
    * @param {any} displayObject - The display object to move.
    * @param {any} destination - The display object to move towards. Can be any object but must have visible x/y properties.
    * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
    * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
    * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
    */
    moveToObject: function (displayObject, destination, speed, maxTime) {

        if (speed === undefined) { speed = 60; }
        if (maxTime === undefined) { maxTime = 0; }

        var angle = Math.atan2(destination.y - displayObject.y, destination.x - displayObject.x);

        if (maxTime > 0)
        {
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceBetween(displayObject, destination) / (maxTime / 1000);
        }

        displayObject.body.velocity.x = Math.cos(angle) * speed;
        displayObject.body.velocity.y = Math.sin(angle) * speed;

        return angle;

    },

    /**
    * Move the given display object towards the pointer at a steady velocity. If no pointer is given it will use Phaser.Input.activePointer.
    * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.
    * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#moveToPointer
    * @param {any} displayObject - The display object to move.
    * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
    * @param {Phaser.Pointer} [pointer] - The pointer to move towards. Defaults to Phaser.Input.activePointer.
    * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
    * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
    */
    moveToPointer: function (displayObject, speed, pointer, maxTime) {

        if (speed === undefined) { speed = 60; }
        pointer = pointer || this.game.input.activePointer;
        if (maxTime === undefined) { maxTime = 0; }

        var angle = this.angleToPointer(displayObject, pointer);

        if (maxTime > 0)
        {
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceToPointer(displayObject, pointer) / (maxTime / 1000);
        }

        displayObject.body.velocity.x = Math.cos(angle) * speed;
        displayObject.body.velocity.y = Math.sin(angle) * speed;

        return angle;

    },

    /**
    * Move the given display object towards the x/y coordinates at a steady velocity.
    * If you specify a maxTime then it will adjust the speed (over-writing what you set) so it arrives at the destination in that number of seconds.
    * Timings are approximate due to the way browser timers work. Allow for a variance of +- 50ms.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    * Note: Doesn't take into account acceleration, maxVelocity or drag (if you've set drag or acceleration too high this object may not move at all)
    *
    * @method Phaser.Physics.Arcade#moveToXY
    * @param {any} displayObject - The display object to move.
    * @param {number} x - The x coordinate to move towards.
    * @param {number} y - The y coordinate to move towards.
    * @param {number} [speed=60] - The speed it will move, in pixels per second (default is 60 pixels/sec)
    * @param {number} [maxTime=0] - Time given in milliseconds (1000 = 1 sec). If set the speed is adjusted so the object will arrive at destination in the given number of ms.
    * @return {number} The angle (in radians) that the object should be visually set to in order to match its new velocity.
    */
    moveToXY: function (displayObject, x, y, speed, maxTime) {

        if (speed === undefined) { speed = 60; }
        if (maxTime === undefined) { maxTime = 0; }

        var angle = Math.atan2(y - displayObject.y, x - displayObject.x);

        if (maxTime > 0)
        {
            //  We know how many pixels we need to move, but how fast?
            speed = this.distanceToXY(displayObject, x, y) / (maxTime / 1000);
        }

        displayObject.body.velocity.x = Math.cos(angle) * speed;
        displayObject.body.velocity.y = Math.sin(angle) * speed;

        return angle;

    },

    /**
    * Given the angle (in degrees) and speed calculate the velocity and return it as a Point object, or set it to the given point object.
    * One way to use this is: velocityFromAngle(angle, 200, sprite.velocity) which will set the values directly to the sprites velocity and not create a new Point object.
    *
    * @method Phaser.Physics.Arcade#velocityFromAngle
    * @param {number} angle - The angle in degrees calculated in clockwise positive direction (down = 90 degrees positive, right = 0 degrees positive, up = 90 degrees negative)
    * @param {number} [speed=60] - The speed it will move, in pixels per second sq.
    * @param {Phaser.Point|object} [point] - The Point object in which the x and y properties will be set to the calculated velocity.
    * @return {Phaser.Point} - A Point where point.x contains the velocity x value and point.y contains the velocity y value.
    */
    velocityFromAngle: function (angle, speed, point) {

        if (speed === undefined) { speed = 60; }
        point = point || new Phaser.Point();

        return point.setTo((Math.cos(this.game.math.degToRad(angle)) * speed), (Math.sin(this.game.math.degToRad(angle)) * speed));

    },

    /**
    * Given the rotation (in radians) and speed calculate the velocity and return it as a Point object, or set it to the given point object.
    * One way to use this is: velocityFromRotation(rotation, 200, sprite.velocity) which will set the values directly to the sprites velocity and not create a new Point object.
    *
    * @method Phaser.Physics.Arcade#velocityFromRotation
    * @param {number} rotation - The angle in radians.
    * @param {number} [speed=60] - The speed it will move, in pixels per second sq.
    * @param {Phaser.Point|object} [point] - The Point object in which the x and y properties will be set to the calculated velocity.
    * @return {Phaser.Point} - A Point where point.x contains the velocity x value and point.y contains the velocity y value.
    */
    velocityFromRotation: function (rotation, speed, point) {

        if (speed === undefined) { speed = 60; }
        point = point || new Phaser.Point();

        return point.setTo((Math.cos(rotation) * speed), (Math.sin(rotation) * speed));

    },

    /**
    * Given the rotation (in radians) and speed calculate the acceleration and return it as a Point object, or set it to the given point object.
    * One way to use this is: accelerationFromRotation(rotation, 200, sprite.acceleration) which will set the values directly to the sprites acceleration and not create a new Point object.
    *
    * @method Phaser.Physics.Arcade#accelerationFromRotation
    * @param {number} rotation - The angle in radians.
    * @param {number} [speed=60] - The speed it will move, in pixels per second sq.
    * @param {Phaser.Point|object} [point] - The Point object in which the x and y properties will be set to the calculated acceleration.
    * @return {Phaser.Point} - A Point where point.x contains the acceleration x value and point.y contains the acceleration y value.
    */
    accelerationFromRotation: function (rotation, speed, point) {

        if (speed === undefined) { speed = 60; }
        point = point || new Phaser.Point();

        return point.setTo((Math.cos(rotation) * speed), (Math.sin(rotation) * speed));

    },

    /**
    * Sets the acceleration.x/y property on the display object so it will move towards the target at the given speed (in pixels per second sq.)
    * You must give a maximum speed value, beyond which the display object won't go any faster.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#accelerateToObject
    * @param {any} displayObject - The display object to move.
    * @param {any} destination - The display object to move towards. Can be any object but must have visible x/y properties.
    * @param {number} [speed=60] - The speed it will accelerate in pixels per second.
    * @param {number} [xSpeedMax=500] - The maximum x velocity the display object can reach.
    * @param {number} [ySpeedMax=500] - The maximum y velocity the display object can reach.
    * @return {number} The angle (in radians) that the object should be visually set to in order to match its new trajectory.
    */
    accelerateToObject: function (displayObject, destination, speed, xSpeedMax, ySpeedMax) {

        if (speed === undefined) { speed = 60; }
        if (xSpeedMax === undefined) { xSpeedMax = 1000; }
        if (ySpeedMax === undefined) { ySpeedMax = 1000; }

        var angle = this.angleBetween(displayObject, destination);

        displayObject.body.acceleration.setTo(Math.cos(angle) * speed, Math.sin(angle) * speed);
        displayObject.body.maxVelocity.setTo(xSpeedMax, ySpeedMax);

        return angle;

    },

    /**
    * Sets the acceleration.x/y property on the display object so it will move towards the target at the given speed (in pixels per second sq.)
    * You must give a maximum speed value, beyond which the display object won't go any faster.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#accelerateToPointer
    * @param {any} displayObject - The display object to move.
    * @param {Phaser.Pointer} [pointer] - The pointer to move towards. Defaults to Phaser.Input.activePointer.
    * @param {number} [speed=60] - The speed it will accelerate in pixels per second.
    * @param {number} [xSpeedMax=500] - The maximum x velocity the display object can reach.
    * @param {number} [ySpeedMax=500] - The maximum y velocity the display object can reach.
    * @return {number} The angle (in radians) that the object should be visually set to in order to match its new trajectory.
    */
    accelerateToPointer: function (displayObject, pointer, speed, xSpeedMax, ySpeedMax) {

        if (speed === undefined) { speed = 60; }
        if (pointer === undefined) { pointer = this.game.input.activePointer; }
        if (xSpeedMax === undefined) { xSpeedMax = 1000; }
        if (ySpeedMax === undefined) { ySpeedMax = 1000; }

        var angle = this.angleToPointer(displayObject, pointer);

        displayObject.body.acceleration.setTo(Math.cos(angle) * speed, Math.sin(angle) * speed);
        displayObject.body.maxVelocity.setTo(xSpeedMax, ySpeedMax);

        return angle;

    },

    /**
    * Sets the acceleration.x/y property on the display object so it will move towards the x/y coordinates at the given speed (in pixels per second sq.)
    * You must give a maximum speed value, beyond which the display object won't go any faster.
    * Note: The display object does not continuously track the target. If the target changes location during transit the display object will not modify its course.
    * Note: The display object doesn't stop moving once it reaches the destination coordinates.
    *
    * @method Phaser.Physics.Arcade#accelerateToXY
    * @param {any} displayObject - The display object to move.
    * @param {number} x - The x coordinate to accelerate towards.
    * @param {number} y - The y coordinate to accelerate towards.
    * @param {number} [speed=60] - The speed it will accelerate in pixels per second.
    * @param {number} [xSpeedMax=500] - The maximum x velocity the display object can reach.
    * @param {number} [ySpeedMax=500] - The maximum y velocity the display object can reach.
    * @return {number} The angle (in radians) that the object should be visually set to in order to match its new trajectory.
    */
    accelerateToXY: function (displayObject, x, y, speed, xSpeedMax, ySpeedMax) {

        if (speed === undefined) { speed = 60; }
        if (xSpeedMax === undefined) { xSpeedMax = 1000; }
        if (ySpeedMax === undefined) { ySpeedMax = 1000; }

        var angle = this.angleToXY(displayObject, x, y);

        displayObject.body.acceleration.setTo(Math.cos(angle) * speed, Math.sin(angle) * speed);
        displayObject.body.maxVelocity.setTo(xSpeedMax, ySpeedMax);

        return angle;

    },

    /**
    * Find the distance between two display objects (like Sprites).
    *
    * @method Phaser.Physics.Arcade#distanceBetween
    * @param {any} source - The Display Object to test from.
    * @param {any} target - The Display Object to test to.
    * @return {number} The distance between the source and target objects.
    */
    distanceBetween: function (source, target) {

        var dx = source.x - target.x;
        var dy = source.y - target.y;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
    * Find the distance between a display object (like a Sprite) and the given x/y coordinates.
    * The calculation is made from the display objects x/y coordinate. This may be the top-left if its anchor hasn't been changed.
    * If you need to calculate from the center of a display object instead use the method distanceBetweenCenters()
    *
    * @method Phaser.Physics.Arcade#distanceToXY
    * @param {any} displayObject - The Display Object to test from.
    * @param {number} x - The x coordinate to move towards.
    * @param {number} y - The y coordinate to move towards.
    * @return {number} The distance between the object and the x/y coordinates.
    */
    distanceToXY: function (displayObject, x, y) {

        var dx = displayObject.x - x;
        var dy = displayObject.y - y;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
    * Find the distance between a display object (like a Sprite) and a Pointer. If no Pointer is given the Input.activePointer is used.
    * The calculation is made from the display objects x/y coordinate. This may be the top-left if its anchor hasn't been changed.
    * If you need to calculate from the center of a display object instead use the method distanceBetweenCenters()
    * The distance to the Pointer is returned in screen space, not world space.
    *
    * @method Phaser.Physics.Arcade#distanceToPointer
    * @param {any} displayObject - The Display Object to test from.
    * @param {Phaser.Pointer} [pointer] - The Phaser.Pointer to test to. If none is given then Input.activePointer is used.
    * @return {number} The distance between the object and the Pointer.
    */
    distanceToPointer: function (displayObject, pointer) {

        pointer = pointer || this.game.input.activePointer;

        var dx = displayObject.x - pointer.worldX;
        var dy = displayObject.y - pointer.worldY;

        return Math.sqrt(dx * dx + dy * dy);

    },

    /**
    * Find the angle in radians between two display objects (like Sprites).
    *
    * @method Phaser.Physics.Arcade#angleBetween
    * @param {any} source - The Display Object to test from.
    * @param {any} target - The Display Object to test to.
    * @return {number} The angle in radians between the source and target display objects.
    */
    angleBetween: function (source, target) {

        var dx = target.x - source.x;
        var dy = target.y - source.y;

        return Math.atan2(dy, dx);

    },

    /**
    * Find the angle in radians between a display object (like a Sprite) and the given x/y coordinate.
    *
    * @method Phaser.Physics.Arcade#angleToXY
    * @param {any} displayObject - The Display Object to test from.
    * @param {number} x - The x coordinate to get the angle to.
    * @param {number} y - The y coordinate to get the angle to.
    * @return {number} The angle in radians between displayObject.x/y to Pointer.x/y
    */
    angleToXY: function (displayObject, x, y) {

        var dx = x - displayObject.x;
        var dy = y - displayObject.y;

        return Math.atan2(dy, dx);

    },

    /**
    * Find the angle in radians between a display object (like a Sprite) and a Pointer, taking their x/y and center into account.
    *
    * @method Phaser.Physics.Arcade#angleToPointer
    * @param {any} displayObject - The Display Object to test from.
    * @param {Phaser.Pointer} [pointer] - The Phaser.Pointer to test to. If none is given then Input.activePointer is used.
    * @return {number} The angle in radians between displayObject.x/y to Pointer.x/y
    */
    angleToPointer: function (displayObject, pointer) {

        pointer = pointer || this.game.input.activePointer;

        var dx = pointer.worldX - displayObject.x;
        var dy = pointer.worldY - displayObject.y;

        return Math.atan2(dy, dx);

    }

};

//  Merge this with the Arcade Physics prototype
Phaser.Utils.mixinPrototype(Phaser.Physics.Arcade.prototype, Phaser.Physics.Arcade.TilemapCollision.prototype);

module.exports = Phaser.Physics.Arcade;
