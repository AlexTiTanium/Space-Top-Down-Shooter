webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);

	var Router = __webpack_require__(7);

	// Hide loading screen
	$("#loading-mask").remove();

	// This need for access to current router globally
	Backbone.application = { };
	Backbone.application.router = new Router();

	// Enable history
	Backbone.history.start();
	Backbone.history.stop();


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(8);

	// App router
	module.exports = Backbone.Router.extend({

	    routes: {
	        '': 'loadTestLevel'
	    },

	    /**
	     * Load level
	     */
	    loadTestLevel: function(){ new GameView({
	        el: '#canvas',
	        level: __webpack_require__(9)
	    }); }

	});


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Here we load the game levels
	 *
	 * @type {void|*|Object}
	 */
	module.exports = Backbone.View.extend({

	    /**
	     * @type {Level} - Link to game level
	     */
	    level: null,

	    /**
	     * Init game and start render level
	     *
	     * @param {Object} attrs { level: 'Level' }
	     */
	    initialize: function (attrs) {
	        this.render(attrs.level);
	    },

	    /**
	     * Load engine and game level
	     *
	     * @param {Level} Level
	     */
	    render: function (Level) {
	        this.level = new Level(this.el);
	    }

	});



/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Level = __webpack_require__(10);

	/**
	 * Test level
	 *
	 * @name MainLevel
	 * @class MainLevel
	 */
	module.exports = Level.extend({

	    /**
	     * Start loading game object
	     */
	    preload: function(){

	        this.add(__webpack_require__(19));

	    }

	});


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Events = __webpack_require__(11);
	var Engine = __webpack_require__(12);
	var Class = __webpack_require__(16);

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


/***/ },
/* 11 */
/***/ function(module, exports) {

	// Backbone.Events
	// ---------------

	// A module that can be mixed in to *any object* in order to provide it with
	// custom events. You may bind with `on` or remove with `off` callback
	// functions to an event; `trigger`-ing an event fires all callbacks in
	// succession.
	//
	//     var object = {};
	//     _.extend(object, Events);
	//     object.on('expand', function(){ alert('expanded'); });
	//     object.trigger('expand');
	//

	var Events = {

	    // Bind an event to a `callback` function. Passing `"all"` will bind
	    // the callback to all events fired.
	    on: function(name, callback, context) {
	        if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	        this._events || (this._events = {});
	        var events = this._events[name] || (this._events[name] = []);
	        events.push({callback: callback, context: context, ctx: context || this});
	        return this;
	    },

	    // Bind an event to only be triggered a single time. After the first time
	    // the callback is invoked, it will be removed.
	    once: function(name, callback, context) {
	        if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	        var self = this;
	        var once = _.once(function() {
	            self.off(name, once);
	            callback.apply(this, arguments);
	        });
	        once._callback = callback;
	        return this.on(name, once, context);
	    },

	    // Remove one or many callbacks. If `context` is null, removes all
	    // callbacks with that function. If `callback` is null, removes all
	    // callbacks for the event. If `name` is null, removes all bound
	    // callbacks for all events.
	    off: function(name, callback, context) {
	        var retain, ev, events, names, i, l, j, k;
	        if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
	        if (!name && !callback && !context) {
	            this._events = void 0;
	            return this;
	        }
	        names = name ? [name] : _.keys(this._events);
	        for (i = 0, l = names.length; i < l; i++) {
	            name = names[i];
	            if (events = this._events[name]) {
	                this._events[name] = retain = [];
	                if (callback || context) {
	                    for (j = 0, k = events.length; j < k; j++) {
	                        ev = events[j];
	                        if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
	                            (context && context !== ev.context)) {
	                            retain.push(ev);
	                        }
	                    }
	                }
	                if (!retain.length) delete this._events[name];
	            }
	        }

	        return this;
	    },

	    // Trigger one or many events, firing all bound callbacks. Callbacks are
	    // passed the same arguments as `trigger` is, apart from the event name
	    // (unless you're listening on `"all"`, which will cause your callback to
	    // receive the true name of the event as the first argument).
	    trigger: function(name) {
	        if (!this._events) return this;
	        var args = Array.prototype.slice.call(arguments, 1);
	        if (!eventsApi(this, 'trigger', name, args)) return this;
	        var events = this._events[name];
	        var allEvents = this._events.all;
	        if (events) triggerEvents(events, args);
	        if (allEvents) triggerEvents(allEvents, arguments);
	        return this;
	    },

	    // Tell this object to stop listening to either specific events ... or
	    // to every object it's currently listening to.
	    stopListening: function(obj, name, callback) {
	        var listeningTo = this._listeningTo;
	        if (!listeningTo) return this;
	        var remove = !name && !callback;
	        if (!callback && typeof name === 'object') callback = this;
	        if (obj) (listeningTo = {})[obj._listenId] = obj;
	        for (var id in listeningTo) {
	            obj = listeningTo[id];
	            obj.off(name, callback, this);
	            if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
	        }
	        return this;
	    }

	};

	// Regular expression used to split event strings.
	var eventSplitter = /\s+/;

	// Implement fancy features of the Events API such as multiple event
	// names `"change blur"` and jQuery-style event maps `{change: action}`
	// in terms of the existing API.
	var eventsApi = function(obj, action, name, rest) {
	    if (!name) return true;

	    // Handle event maps.
	    if (typeof name === 'object') {
	        for (var key in name) {
	            obj[action].apply(obj, [key, name[key]].concat(rest));
	        }
	        return false;
	    }

	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	        var names = name.split(eventSplitter);
	        for (var i = 0, l = names.length; i < l; i++) {
	            obj[action].apply(obj, [names[i]].concat(rest));
	        }
	        return false;
	    }

	    return true;
	};

	// A difficult-to-believe, but optimized internal dispatch function for
	// triggering events. Tries to keep the usual cases speedy (most internal
	// Backbone events have 3 arguments).
	var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	        case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	        case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	        case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	        case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	        default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
	    }
	};

	var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

	// Inversion-of-control versions of `on` and `once`. Tell *this* object to
	// listen to an event in another object ... keeping track of what it's
	// listening to.
	_.each(listenMethods, function(implementation, method) {
	    Events[method] = function(obj, name, callback) {
	        var listeningTo = this._listeningTo || (this._listeningTo = {});
	        var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	        listeningTo[id] = obj;
	        if (!callback && typeof name === 'object') callback = this;
	        obj[implementation](name, callback, this);
	        return this;
	    };
	});

	// Aliases for backwards compatibility.
	Events.bind   = Events.on;
	Events.unbind = Events.off;

	module.exports = Events;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Phaser = __webpack_require__(13);
	var Events = __webpack_require__(11);
	var Class = __webpack_require__(16);
	var _ = __webpack_require__(17);

	/**
	 * Main engine class
	 *
	 * @extend {Events}
	 *
	 * @class Engine
	 * @name Engine
	 */
	module.exports = Class.extend([Events], {

	    /**
	    * The width of your game in game pixels.
	    * If given as a string the value must be between 0 and 100 and will be used as the percentage width
	    * of the parent container, or the browser window if no parent is given
	    *
	    * @type {Number|String}
	    */
	    width: "100", // 100%

	    /**
	    * The height  of your game in game pixels.
	    * If given as a string the value must be between 0 and 100 and will be used as the percentage width
	    * of the parent container, or the browser window if no parent is given
	    *
	    * @type {Number|String}
	    */
	    height: "100", // 100%

	    /**
	    * This is where the magic happens. The Game object is the heart of your game, providing quick access to common
	    * functions and handling the boot process.
	    *
	    * @type {Phaser.Game}
	    */
	    game: null,

	    /**
	     * Init object
	     *
	     * @constructor
	     */
	    constructor: function(){

	        // Make phaser accessible global, this is not good practice, but I don't give a fuck!
	        window.Phaser = Phaser;
	    },

	    /**
	     * Start game level
	     */
	    createGame: function() {

	        // Initialize optional modules
	        Phaser.Keyboard = __webpack_require__(24);
	        Phaser.Physics.Arcade = __webpack_require__(26);

	        // Create game object
	        this.game =  _.extend(new Phaser.Game(this.width, this.height, Phaser.AUTO, this.element, {
	            preload: this.preload.bind(this),
	            create:  this.create.bind(this)
	        }), Events);

	        return this.game;
	    },

	    /**
	     * Preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
	     * You shouldn't create any objects in this method that require assets that you're also loading in this method, as
	     * they won't yet be available.
	     */
	    preload: function(){

	        this.game.trigger('preload');

	    },

	    /**
	     * Create is called once preload has completed, this includes the loading of any assets from the Loader.
	     * If you don't have a preload method then create is the first method called in your State.
	     */
	    create: function(){

	        //  Enable physics
	        this.game.physics.startSystem(Phaser.Physics.ARCADE);

	        this.game.trigger('create');
	    }

	});



/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(17);

	/**
	 * `inherits` are from Backbone (with some modifications):
	 * http://documentcloud.github.com/backbone/
	 *
	 * Shared empty constructor function to aid in prototype-chain creation.
	 *
	 * @example:
	 *
	 * With mixin:
	 * var MyClass = Class.extend([Mixin, Mixin2],{
	 *      constructor: function(){ constructor function }
	 *      someProp: 'My property value',
	 *      someMethod: function () { ... }
	 * );
	 *
	 *
	 * var MyClass = Class.extend({
	 *      constructor: function(){ constructor function }
	 *      someProp: 'My property value',
	 *      someMethod: function () { ... }
	 * });
	 *
	 *
	 * With static properties and functions:
	 *
	 * var MyClass = Class.extend({   },{
	 *      constructor: function(){ constructor function }
	 *      someProp: 'My property value',
	 *      someMethod: function () { ... }
	 * });
	 *
	 */

	var Class = {};
	var ctor = function () {};

	/**
	 * Helper function to correctly set up the prototype chain, for subclasses.
	 * Similar to `goog.inherits`, but uses a hash of prototype properties and
	 * class properties to be extended.
	 */

	var inherits = function (parent, protoProps, staticProps, mixins) {
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call `super()`.
	    if (protoProps && protoProps.hasOwnProperty('constructor')) {
	        child = protoProps.constructor;
	    } else {
	        child = function () {
	            return parent.apply(this, arguments);
	        };
	    }

	    // Inherit class (static) properties from parent.
	    _.extend(child, parent);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function.
	    ctor.prototype = parent.prototype;
	    child.prototype = new ctor();

	    // Add prototype properties (instance properties) to the subclass,
	    // if supplied.
	    if (protoProps) _.extend(child.prototype, protoProps);

	    // Add mixins
	    if(mixins){
	        _.each(mixins, function(mixin){

	            if(_.isFunction(mixin) && mixin.prototype){
	                mixin = mixin.prototype;
	            }

	            _.extend(child.prototype, mixin);
	        });
	    }

	    // Add static properties to the constructor function, if supplied.
	    if (staticProps) _.extend(child, staticProps);

	    // Correctly set child's `prototype.constructor`.
	    child.prototype.constructor = child;

	    // Set a convenience property in case the parent's prototype is needed later.
	    child.__super__ = parent.prototype;

	    return child;
	};

	/**
	 * Self-propagating extend function.
	 * Create a new class that inherits from the class found in the `this` context object.
	 * This function is meant to be called in the context of a constructor function.
	 */
	function extendThis(mixin, protoProps, staticProps) {

	    // If no mixin
	    if(!_.isArray(mixin)){
	        protoProps = mixin;
	        staticProps = protoProps
	    }

	    var child = inherits(this, protoProps, staticProps, mixin);
	    child.extend = extendThis;
	    return child;
	}

	// A primitive base class for creating subclasses.
	// All subclasses will have the `extend` function.
	Class = function () {};

	// Export class extend method
	Class.extend = extendThis;

	// Return prepared class object
	module.exports = Class;



/***/ },
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var GameObject = __webpack_require__(20);
	var KeyCodes = __webpack_require__(21);

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


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Class = __webpack_require__(16);
	var Phaser = __webpack_require__(13);
	var Events = __webpack_require__(11);

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


/***/ },
/* 21 */
/***/ function(module, exports) {

	
	var KeyCodes = {

	    /** @static */
	    A: "A".charCodeAt(0),
	    /** @static */
	    B: "B".charCodeAt(0),
	    /** @static */
	    C: "C".charCodeAt(0),
	    /** @static */
	    D: "D".charCodeAt(0),
	    /** @static */
	    E: "E".charCodeAt(0),
	    /** @static */
	    F: "F".charCodeAt(0),
	    /** @static */
	    G: "G".charCodeAt(0),
	    /** @static */
	    H: "H".charCodeAt(0),
	    /** @static */
	    I: "I".charCodeAt(0),
	    /** @static */
	    J: "J".charCodeAt(0),
	    /** @static */
	    K: "K".charCodeAt(0),
	    /** @static */
	    L: "L".charCodeAt(0),
	    /** @static */
	    M: "M".charCodeAt(0),
	    /** @static */
	    N: "N".charCodeAt(0),
	    /** @static */
	    O: "O".charCodeAt(0),
	    /** @static */
	    P: "P".charCodeAt(0),
	    /** @static */
	    Q: "Q".charCodeAt(0),
	    /** @static */
	    R: "R".charCodeAt(0),
	    /** @static */
	    S: "S".charCodeAt(0),
	    /** @static */
	    T: "T".charCodeAt(0),
	    /** @static */
	    U: "U".charCodeAt(0),
	    /** @static */
	    V: "V".charCodeAt(0),
	    /** @static */
	    W: "W".charCodeAt(0),
	    /** @static */
	    X: "X".charCodeAt(0),
	    /** @static */
	    Y: "Y".charCodeAt(0),
	    /** @static */
	    Z: "Z".charCodeAt(0),
	    /** @static */
	    ZERO: "0".charCodeAt(0),
	    /** @static */
	    ONE: "1".charCodeAt(0),
	    /** @static */
	    TWO: "2".charCodeAt(0),
	    /** @static */
	    THREE: "3".charCodeAt(0),
	    /** @static */
	    FOUR: "4".charCodeAt(0),
	    /** @static */
	    FIVE: "5".charCodeAt(0),
	    /** @static */
	    SIX: "6".charCodeAt(0),
	    /** @static */
	    SEVEN: "7".charCodeAt(0),
	    /** @static */
	    EIGHT: "8".charCodeAt(0),
	    /** @static */
	    NINE: "9".charCodeAt(0),
	    /** @static */
	    NUMPAD_0: 96,
	    /** @static */
	    NUMPAD_1: 97,
	    /** @static */
	    NUMPAD_2: 98,
	    /** @static */
	    NUMPAD_3: 99,
	    /** @static */
	    NUMPAD_4: 100,
	    /** @static */
	    NUMPAD_5: 101,
	    /** @static */
	    NUMPAD_6: 102,
	    /** @static */
	    NUMPAD_7: 103,
	    /** @static */
	    NUMPAD_8: 104,
	    /** @static */
	    NUMPAD_9: 105,
	    /** @static */
	    NUMPAD_MULTIPLY: 106,
	    /** @static */
	    NUMPAD_ADD: 107,
	    /** @static */
	    NUMPAD_ENTER: 108,
	    /** @static */
	    NUMPAD_SUBTRACT: 109,
	    /** @static */
	    NUMPAD_DECIMAL: 110,
	    /** @static */
	    NUMPAD_DIVIDE: 111,
	    /** @static */
	    F1: 112,
	    /** @static */
	    F2: 113,
	    /** @static */
	    F3: 114,
	    /** @static */
	    F4: 115,
	    /** @static */
	    F5: 116,
	    /** @static */
	    F6: 117,
	    /** @static */
	    F7: 118,
	    /** @static */
	    F8: 119,
	    /** @static */
	    F9: 120,
	    /** @static */
	    F10: 121,
	    /** @static */
	    F11: 122,
	    /** @static */
	    F12: 123,
	    /** @static */
	    F13: 124,
	    /** @static */
	    F14: 125,
	    /** @static */
	    F15: 126,
	    /** @static */
	    COLON: 186,
	    /** @static */
	    EQUALS: 187,
	    /** @static */
	    COMMA: 188,
	    /** @static */
	    UNDERSCORE: 189,
	    /** @static */
	    PERIOD: 190,
	    /** @static */
	    QUESTION_MARK: 191,
	    /** @static */
	    TILDE: 192,
	    /** @static */
	    OPEN_BRACKET: 219,
	    /** @static */
	    BACKWARD_SLASH: 220,
	    /** @static */
	    CLOSED_BRACKET: 221,
	    /** @static */
	    QUOTES: 222,
	    /** @static */
	    BACKSPACE: 8,
	    /** @static */
	    TAB: 9,
	    /** @static */
	    CLEAR: 12,
	    /** @static */
	    ENTER: 13,
	    /** @static */
	    SHIFT: 16,
	    /** @static */
	    CONTROL: 17,
	    /** @static */
	    ALT: 18,
	    /** @static */
	    CAPS_LOCK: 20,
	    /** @static */
	    ESC: 27,
	    /** @static */
	    SPACEBAR: 32,
	    /** @static */
	    PAGE_UP: 33,
	    /** @static */
	    PAGE_DOWN: 34,
	    /** @static */
	    END: 35,
	    /** @static */
	    HOME: 36,
	    /** @static */
	    LEFT: 37,
	    /** @static */
	    UP: 38,
	    /** @static */
	    RIGHT: 39,
	    /** @static */
	    DOWN: 40,
	    /** @static */
	    PLUS: 43,
	    /** @static */
	    MINUS: 44,
	    /** @static */
	    INSERT: 45,
	    /** @static */
	    DELETE: 46,
	    /** @static */
	    HELP: 47,
	    /** @static */
	    NUM_LOCK: 144
	};

	module.exports = KeyCodes;


/***/ },
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	var Phaser = __webpack_require__(13);
	Phaser.Key = __webpack_require__(25);

	/**
	* The Keyboard class monitors keyboard input and dispatches keyboard events.
	*
	* _Note_: many keyboards are unable to process certain combinations of keys due to hardware limitations known as ghosting.
	* See http://www.html5gamedevs.com/topic/4876-impossible-to-use-more-than-2-keyboard-input-buttons-at-the-same-time/ for more details.
	*
	* @class Phaser.Keyboard
	* @constructor
	* @param {Phaser.Game} game - A reference to the currently running game.
	*/
	Phaser.Keyboard = function (game) {

	    /**
	    * @property {Phaser.Game} game - Local reference to game.
	    */
	    this.game = game;

	    /**
	    * Keyboard input will only be processed if enabled.
	    * @property {boolean} enabled
	    * @default
	    */
	    this.enabled = true;

	    /**
	    * @property {object} event - The most recent DOM event from keydown or keyup. This is updated every time a new key is pressed or released.
	    */
	    this.event = null;

	    /**
	    * @property {object} pressEvent - The most recent DOM event from keypress.
	    */
	    this.pressEvent = null;

	    /**
	    * @property {object} callbackContext - The context under which the callbacks are run.
	    */
	    this.callbackContext = this;

	    /**
	    * @property {function} onDownCallback - This callback is invoked every time a key is pressed down, including key repeats when a key is held down.
	    */
	    this.onDownCallback = null;

	    /**
	    * @property {function} onPressCallback - This callback is invoked every time a DOM onkeypress event is raised, which is only for printable keys.
	    */
	    this.onPressCallback = null;

	    /**
	    * @property {function} onUpCallback - This callback is invoked every time a key is released.
	    */
	    this.onUpCallback = null;

	    /**
	    * @property {array<Phaser.Key>} _keys - The array the Phaser.Key objects are stored in.
	    * @private
	    */
	    this._keys = [];

	    /**
	    * @property {array} _capture - The array the key capture values are stored in.
	    * @private
	    */
	    this._capture = [];

	    /**
	    * @property {function} _onKeyDown
	    * @private
	    * @default
	    */
	    this._onKeyDown = null;

	    /**
	    * @property {function} _onKeyPress
	    * @private
	    * @default
	    */
	    this._onKeyPress = null;

	    /**
	    * @property {function} _onKeyUp
	    * @private
	    * @default
	    */
	    this._onKeyUp = null;

	    /**
	    * @property {number} _i - Internal cache var
	    * @private
	    */
	    this._i = 0;

	    /**
	    * @property {number} _k - Internal cache var
	    * @private
	    */
	    this._k = 0;

	};

	Phaser.Keyboard.prototype = {

	    /**
	    * Add callbacks to the Keyboard handler so that each time a key is pressed down or released the callbacks are activated.
	    *
	    * @method Phaser.Keyboard#addCallbacks
	    * @param {object} context - The context under which the callbacks are run.
	    * @param {function} [onDown=null] - This callback is invoked every time a key is pressed down.
	    * @param {function} [onUp=null] - This callback is invoked every time a key is released.
	    * @param {function} [onPress=null] - This callback is invoked every time the onkeypress event is raised.
	    */
	    addCallbacks: function (context, onDown, onUp, onPress) {

	        this.callbackContext = context;

	        if (onDown !== undefined && onDown !== null)
	        {
	            this.onDownCallback = onDown;
	        }

	        if (onUp !== undefined && onUp !== null)
	        {
	            this.onUpCallback = onUp;
	        }

	        if (onPress !== undefined && onPress !== null)
	        {
	            this.onPressCallback = onPress;
	        }

	    },

	    /**
	    * If you need more fine-grained control over a Key you can create a new Phaser.Key object via this method.
	    * The Key object can then be polled, have events attached to it, etc.
	    *
	    * @method Phaser.Keyboard#addKey
	    * @param {integer} keycode - The {@link Phaser.KeyCode keycode} of the key.
	    * @return {Phaser.Key} The Key object which you can store locally and reference directly.
	    */
	    addKey: function (keycode) {

	        if (!this._keys[keycode])
	        {
	            this._keys[keycode] = new Phaser.Key(this.game, keycode);

	            this.addKeyCapture(keycode);
	        }

	        return this._keys[keycode];

	    },

	    /**
	    * A practical way to create an object containing user selected hotkeys.
	    *
	    * For example,
	    *
	    *     addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D } );
	    *
	    * would return an object containing properties (`up`, `down`, `left` and `right`) referring to {@link Phaser.Key} object.
	    *
	    * @method Phaser.Keyboard#addKeys
	    * @param {object} keys - A key mapping object, i.e. `{ 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S }` or `{ 'up': 52, 'down': 53 }`.
	    * @return {object} An object containing the properties mapped to {@link Phaser.Key} values.
	    */
	    addKeys: function (keys) {

	        var output = {};

	        for (var key in keys)
	        {
	            output[key] = this.addKey(keys[key]);
	        }

	        return output;

	    },

	    /**
	    * Removes a Key object from the Keyboard manager.
	    *
	    * @method Phaser.Keyboard#removeKey
	    * @param {integer} keycode - The {@link Phaser.KeyCode keycode} of the key to remove.
	    */
	    removeKey: function (keycode) {

	        if (this._keys[keycode])
	        {
	            this._keys[keycode] = null;

	            this.removeKeyCapture(keycode);
	        }

	    },

	    /**
	    * Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
	    *
	    * @method Phaser.Keyboard#createCursorKeys
	    * @return {object} An object containing properties: `up`, `down`, `left` and `right` of {@link Phaser.Key} objects.
	    */
	    createCursorKeys: function () {

	        return this.addKeys({ 'up': Phaser.KeyCode.UP, 'down': Phaser.KeyCode.DOWN, 'left': Phaser.KeyCode.LEFT, 'right': Phaser.KeyCode.RIGHT });

	    },

	    /**
	    * Starts the Keyboard event listeners running (keydown and keyup). They are attached to the window.
	    * This is called automatically by Phaser.Input and should not normally be invoked directly.
	    *
	    * @method Phaser.Keyboard#start
	    * @protected
	    */
	    start: function () {

	        if (this.game.device.cocoonJS)
	        {
	            return;
	        }

	        if (this._onKeyDown !== null)
	        {
	            //  Avoid setting multiple listeners
	            return;
	        }

	        var _this = this;

	        this._onKeyDown = function (event) {
	            return _this.processKeyDown(event);
	        };

	        this._onKeyUp = function (event) {
	            return _this.processKeyUp(event);
	        };

	        this._onKeyPress = function (event) {
	            return _this.processKeyPress(event);
	        };

	        window.addEventListener('keydown', this._onKeyDown, false);
	        window.addEventListener('keyup', this._onKeyUp, false);
	        window.addEventListener('keypress', this._onKeyPress, false);

	    },

	    /**
	    * Stops the Keyboard event listeners from running (keydown, keyup and keypress). They are removed from the window.
	    *
	    * @method Phaser.Keyboard#stop
	    */
	    stop: function () {

	        window.removeEventListener('keydown', this._onKeyDown);
	        window.removeEventListener('keyup', this._onKeyUp);
	        window.removeEventListener('keypress', this._onKeyPress);

	        this._onKeyDown = null;
	        this._onKeyUp = null;
	        this._onKeyPress = null;

	    },

	    /**
	    * Stops the Keyboard event listeners from running (keydown and keyup). They are removed from the window.
	    * Also clears all key captures and currently created Key objects.
	    *
	    * @method Phaser.Keyboard#destroy
	    */
	    destroy: function () {

	        this.stop();

	        this.clearCaptures();

	        this._keys.length = 0;
	        this._i = 0;

	    },

	    /**
	    * By default when a key is pressed Phaser will not stop the event from propagating up to the browser.
	    * There are some keys this can be annoying for, like the arrow keys or space bar, which make the browser window scroll.
	    *
	    * The `addKeyCapture` method enables consuming keyboard event for specific keys so it doesn't bubble up to the the browser
	    * and cause the default browser behavior.
	    *
	    * Pass in either a single keycode or an array/hash of keycodes.
	    *
	    * @method Phaser.Keyboard#addKeyCapture
	    * @param {integer|integer[]|object} keycode - Either a single {@link Phaser.KeyCode keycode} or an array/hash of keycodes such as `[65, 67, 68]`.
	    */
	    addKeyCapture: function (keycode) {

	        if (typeof keycode === 'object')
	        {
	            for (var key in keycode)
	            {
	                this._capture[keycode[key]] = true;
	            }
	        }
	        else
	        {
	            this._capture[keycode] = true;
	        }
	    },

	    /**
	    * Removes an existing key capture.
	    *
	    * @method Phaser.Keyboard#removeKeyCapture
	    * @param {integer} keycode - The {@link Phaser.KeyCode keycode} to remove capturing of.
	    */
	    removeKeyCapture: function (keycode) {

	        delete this._capture[keycode];

	    },

	    /**
	    * Clear all set key captures.
	    *
	    * @method Phaser.Keyboard#clearCaptures
	    */
	    clearCaptures: function () {

	        this._capture = {};

	    },

	    /**
	    * Updates all currently defined keys.
	    *
	    * @method Phaser.Keyboard#update
	    */
	    update: function () {

	        this._i = this._keys.length;

	        while (this._i--)
	        {
	            if (this._keys[this._i])
	            {
	                this._keys[this._i].update();
	            }
	        }

	    },

	    /**
	    * Process the keydown event.
	    *
	    * @method Phaser.Keyboard#processKeyDown
	    * @param {KeyboardEvent} event
	    * @protected
	    */
	    processKeyDown: function (event) {

	        this.event = event;

	        if (!this.game.input.enabled || !this.enabled)
	        {
	            return;
	        }

	        //   The event is being captured but another hotkey may need it
	        if (this._capture[event.keyCode])
	        {
	            event.preventDefault();
	        }

	        if (!this._keys[event.keyCode])
	        {
	            this._keys[event.keyCode] = new Phaser.Key(this.game, event.keyCode);
	        }

	        this._keys[event.keyCode].processKeyDown(event);

	        this._k = event.keyCode;

	        if (this.onDownCallback)
	        {
	            this.onDownCallback.call(this.callbackContext, event);
	        }

	    },

	    /**
	    * Process the keypress event.
	    *
	    * @method Phaser.Keyboard#processKeyPress
	    * @param {KeyboardEvent} event
	    * @protected
	    */
	    processKeyPress: function (event) {

	        this.pressEvent = event;

	        if (!this.game.input.enabled || !this.enabled)
	        {
	            return;
	        }

	        if (this.onPressCallback)
	        {
	            this.onPressCallback.call(this.callbackContext, String.fromCharCode(event.charCode), event);
	        }

	    },

	    /**
	    * Process the keyup event.
	    *
	    * @method Phaser.Keyboard#processKeyUp
	    * @param {KeyboardEvent} event
	    * @protected
	    */
	    processKeyUp: function (event) {

	        this.event = event;

	        if (!this.game.input.enabled || !this.enabled)
	        {
	            return;
	        }

	        if (this._capture[event.keyCode])
	        {
	            event.preventDefault();
	        }

	        if (!this._keys[event.keyCode])
	        {
	            this._keys[event.keyCode] = new Phaser.Key(this.game, event.keyCode);
	        }

	        this._keys[event.keyCode].processKeyUp(event);

	        if (this.onUpCallback)
	        {
	            this.onUpCallback.call(this.callbackContext, event);
	        }

	    },

	    /**
	    * Resets all Keys.
	    *
	    * @method Phaser.Keyboard#reset
	    * @param {boolean} [hard=true] - A soft reset won't reset any events or callbacks that are bound to the Keys. A hard reset will.
	    */
	    reset: function (hard) {

	        if (hard === undefined) { hard = true; }

	        this.event = null;

	        var i = this._keys.length;

	        while (i--)
	        {
	            if (this._keys[i])
	            {
	                this._keys[i].reset(hard);
	            }
	        }

	    },

	    /**
	    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
	    * or was pressed down longer ago than then given duration.
	    * 
	    * @method Phaser.Keyboard#downDuration
	    * @param {integer} keycode - The {@link Phaser.KeyCode keycode} of the key to check: i.e. Phaser.KeyCode.UP or Phaser.KeyCode.SPACEBAR.
	    * @param {number} [duration=50] - The duration within which the key is considered as being just pressed. Given in ms.
	    * @return {boolean} True if the key was pressed down within the given duration, false if not or null if the Key wasn't found.
	    */
	    downDuration: function (keycode, duration) {

	        if (this._keys[keycode])
	        {
	            return this._keys[keycode].downDuration(duration);
	        }
	        else
	        {
	            return null;
	        }

	    },

	    /**
	    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
	    * or was pressed down longer ago than then given duration.
	    * 
	    * @method Phaser.Keyboard#upDuration
	    * @param {Phaser.KeyCode|integer} keycode - The keycode of the key to check, i.e. Phaser.KeyCode.UP or Phaser.KeyCode.SPACEBAR.
	    * @param {number} [duration=50] - The duration within which the key is considered as being just released. Given in ms.
	    * @return {boolean} True if the key was released within the given duration, false if not or null if the Key wasn't found.
	    */
	    upDuration: function (keycode, duration) {

	        if (this._keys[keycode])
	        {
	            return this._keys[keycode].upDuration(duration);
	        }
	        else
	        {
	            return null;
	        }

	    },

	    /**
	    * Returns true of the key is currently pressed down. Note that it can only detect key presses on the web browser.
	    *
	    * @method Phaser.Keyboard#isDown
	    * @param {integer} keycode - The {@link Phaser.KeyCode keycode} of the key to check: i.e. Phaser.KeyCode.UP or Phaser.KeyCode.SPACEBAR.
	    * @return {boolean} True if the key is currently down, false if not or null if the Key wasn't found.
	    */
	    isDown: function (keycode) {

	        if (this._keys[keycode])
	        {
	            return this._keys[keycode].isDown;
	        }
	        else
	        {
	            return null;
	        }

	    }

	};

	/**
	* Returns the string value of the most recently pressed key.
	* @name Phaser.Keyboard#lastChar
	* @property {string} lastChar - The string value of the most recently pressed key.
	* @readonly
	*/
	Object.defineProperty(Phaser.Keyboard.prototype, "lastChar", {

	    get: function () {

	        if (this.event.charCode === 32)
	        {
	            return '';
	        }
	        else
	        {
	            return String.fromCharCode(this.pressEvent.charCode);
	        }

	    }

	});

	/**
	* Returns the most recently pressed Key. This is a Phaser.Key object and it changes every time a key is pressed.
	* @name Phaser.Keyboard#lastKey
	* @property {Phaser.Key} lastKey - The most recently pressed Key.
	* @readonly
	*/
	Object.defineProperty(Phaser.Keyboard.prototype, "lastKey", {

	    get: function () {

	        return this._keys[this._k];

	    }

	});

	Phaser.Keyboard.prototype.constructor = Phaser.Keyboard;

	/**
	* A key code represents a physical key on a keyboard.
	*
	* The KeyCode class contains commonly supported keyboard key codes which can be used
	* as keycode`-parameters in several {@link Phaser.Keyboard} and {@link Phaser.Key} methods.
	*
	* _Note_: These values should only be used indirectly, eg. as `Phaser.KeyCode.KEY`.
	* Future versions may replace the actual values, such that they remain compatible with `keycode`-parameters.
	* The current implementation maps to the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode KeyboardEvent.keyCode} property.
	*
	* _Note_: Use `Phaser.KeyCode.KEY` instead of `Phaser.Keyboard.KEY` to refer to a key code;
	* the latter approach is supported for compatibility.
	*
	* @namespace
	*/

	module.exports = Phaser.Keyboard;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	var Phaser = __webpack_require__(13);

	/**
	* If you need more fine-grained control over the handling of specific keys you can create and use Phaser.Key objects.
	* 
	* @class Phaser.Key
	* @constructor
	* @param {Phaser.Game} game - Current game instance.
	* @param {integer} keycode - The key code this Key is responsible for. See {@link Phaser.KeyCode}.
	*/
	Phaser.Key = function (game, keycode) {

	    /**
	    * @property {Phaser.Game} game - A reference to the currently running game.
	    */
	    this.game = game;

	    /**
	    * The enabled state of the key - see `enabled`.
	    * @property {boolean} _enabled
	    * @private
	    */
	    this._enabled = true;

	    /**
	    * @property {object} event - Stores the most recent DOM event.
	    * @readonly
	    */
	    this.event = null;

	    /**
	    * @property {boolean} isDown - The "down" state of the key. This will remain `true` for as long as the keyboard thinks this key is held down.
	    * @default
	    */
	    this.isDown = false;

	    /**
	    * @property {boolean} isUp - The "up" state of the key. This will remain `true` for as long as the keyboard thinks this key is up.
	    * @default
	    */
	    this.isUp = true;

	    /**
	    * @property {boolean} altKey - The down state of the ALT key, if pressed at the same time as this key.
	    * @default
	    */
	    this.altKey = false;

	    /**
	    * @property {boolean} ctrlKey - The down state of the CTRL key, if pressed at the same time as this key.
	    * @default
	    */
	    this.ctrlKey = false;

	    /**
	    * @property {boolean} shiftKey - The down state of the SHIFT key, if pressed at the same time as this key.
	    * @default
	    */
	    this.shiftKey = false;

	    /**
	    * @property {number} timeDown - The timestamp when the key was last pressed down. This is based on Game.time.now.
	    */
	    this.timeDown = 0;

	    /**
	    * If the key is down this value holds the duration of that key press and is constantly updated.
	    * If the key is up it holds the duration of the previous down session.
	    * @property {number} duration - The number of milliseconds this key has been held down for.
	    * @default
	    */
	    this.duration = 0;

	    /**
	    * @property {number} timeUp - The timestamp when the key was last released. This is based on Game.time.now.
	    * @default
	    */
	    this.timeUp = -2500;

	    /**
	    * @property {number} repeats - If a key is held down this holds down the number of times the key has 'repeated'.
	    * @default
	    */
	    this.repeats = 0;

	    /**
	    * @property {number} keyCode - The keycode of this key.
	    */
	    this.keyCode = keycode;

	    /**
	    * @property {Phaser.Signal} onDown - This Signal is dispatched every time this Key is pressed down. It is only dispatched once (until the key is released again).
	    */
	    this.onDown = new Phaser.Signal();

	    /**
	    * @property {function} onHoldCallback - A callback that is called while this Key is held down. Warning: Depending on refresh rate that could be 60+ times per second.
	    */
	    this.onHoldCallback = null;

	    /**
	    * @property {object} onHoldContext - The context under which the onHoldCallback will be called.
	    */
	    this.onHoldContext = null;

	    /**
	    * @property {Phaser.Signal} onUp - This Signal is dispatched every time this Key is released. It is only dispatched once (until the key is pressed and released again).
	    */
	    this.onUp = new Phaser.Signal();

	    /**
	     * @property {boolean} _justDown - True if the key has just been pressed (NOTE: requires to be reset, see justDown getter)
	     * @private
	     */
	    this._justDown = false;

	    /**
	     * @property {boolean} _justUp - True if the key has just been pressed (NOTE: requires to be reset, see justDown getter)
	     * @private
	     */
	    this._justUp = false;

	};

	Phaser.Key.prototype = {

	    /**
	    * Called automatically by Phaser.Keyboard.
	    * 
	    * @method Phaser.Key#update
	    * @protected
	    */
	    update: function () {

	        if (!this._enabled) { return; }

	        if (this.isDown)
	        {
	            this.duration = this.game.time.time - this.timeDown;
	            this.repeats++;

	            if (this.onHoldCallback)
	            {
	                this.onHoldCallback.call(this.onHoldContext, this);
	            }
	        }

	    },

	    /**
	    * Called automatically by Phaser.Keyboard.
	    * 
	    * @method Phaser.Key#processKeyDown
	    * @param {KeyboardEvent} event - The DOM event that triggered this.
	    * @protected
	    */
	    processKeyDown: function (event) {

	        if (!this._enabled) { return; }

	        this.event = event;

	        // exit if this key down is from auto-repeat
	        if (this.isDown)
	        {
	            return;
	        }

	        this.altKey = event.altKey;
	        this.ctrlKey = event.ctrlKey;
	        this.shiftKey = event.shiftKey;

	        this.isDown = true;
	        this.isUp = false;
	        this.timeDown = this.game.time.time;
	        this.duration = 0;
	        this.repeats = 0;

	        // _justDown will remain true until it is read via the justDown Getter
	        // this enables the game to poll for past presses, or reset it at the start of a new game state
	        this._justDown = true;

	        this.onDown.dispatch(this);

	    },

	    /**
	    * Called automatically by Phaser.Keyboard.
	    * 
	    * @method Phaser.Key#processKeyUp
	    * @param {KeyboardEvent} event - The DOM event that triggered this.
	    * @protected
	    */
	    processKeyUp: function (event) {

	        if (!this._enabled) { return; }

	        this.event = event;

	        if (this.isUp)
	        {
	            return;
	        }

	        this.isDown = false;
	        this.isUp = true;
	        this.timeUp = this.game.time.time;
	        this.duration = this.game.time.time - this.timeDown;

	        // _justUp will remain true until it is read via the justUp Getter
	        // this enables the game to poll for past presses, or reset it at the start of a new game state
	        this._justUp = true;

	        this.onUp.dispatch(this);

	    },

	    /**
	    * Resets the state of this Key.
	    *
	    * This sets isDown to false, isUp to true, resets the time to be the current time, and _enables_ the key.
	    * In addition, if it is a "hard reset", it clears clears any callbacks associated with the onDown and onUp events and removes the onHoldCallback.
	    *
	    * @method Phaser.Key#reset
	    * @param {boolean} [hard=true] - A soft reset won't reset any events or callbacks; a hard reset will.
	    */
	    reset: function (hard) {

	        if (hard === undefined) { hard = true; }

	        this.isDown = false;
	        this.isUp = true;
	        this.timeUp = this.game.time.time;
	        this.duration = 0;
	        this._enabled = true; // .enabled causes reset(false)
	        this._justDown = false;
	        this._justUp = false;

	        if (hard)
	        {
	            this.onDown.removeAll();
	            this.onUp.removeAll();
	            this.onHoldCallback = null;
	            this.onHoldContext = null;
	        }

	    },

	    /**
	    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
	    * or was pressed down longer ago than then given duration.
	    * 
	    * @method Phaser.Key#downDuration
	    * @param {number} [duration=50] - The duration within which the key is considered as being just pressed. Given in ms.
	    * @return {boolean} True if the key was pressed down within the given duration.
	    */
	    downDuration: function (duration) {

	        if (duration === undefined) { duration = 50; }

	        return (this.isDown && this.duration < duration);

	    },

	    /**
	    * Returns `true` if the Key was pressed down within the `duration` value given, or `false` if it either isn't down,
	    * or was pressed down longer ago than then given duration.
	    * 
	    * @method Phaser.Key#upDuration
	    * @param {number} [duration=50] - The duration within which the key is considered as being just released. Given in ms.
	    * @return {boolean} True if the key was released within the given duration.
	    */
	    upDuration: function (duration) {

	        if (duration === undefined) { duration = 50; }

	        return (!this.isDown && ((this.game.time.time - this.timeUp) < duration));

	    }

	};

	/**
	* The justDown value allows you to test if this Key has just been pressed down or not.
	* When you check this value it will return `true` if the Key is down, otherwise `false`.
	* You can only call justDown once per key press. It will only return `true` once, until the Key is released and pressed down again.
	* This allows you to use it in situations where you want to check if this key is down without using a Signal, such as in a core game loop.
	* 
	* @property {boolean} justDown
	* @memberof Phaser.Key
	* @default false
	*/
	Object.defineProperty(Phaser.Key.prototype, "justDown", {

	    get: function () {

	        var current = this._justDown;
	        this._justDown = false;
	        return current;

	    }

	});

	/**
	* The justUp value allows you to test if this Key has just been released or not.
	* When you check this value it will return `true` if the Key is up, otherwise `false`.
	* You can only call justUp once per key release. It will only return `true` once, until the Key is pressed down and released again.
	* This allows you to use it in situations where you want to check if this key is up without using a Signal, such as in a core game loop.
	* 
	* @property {boolean} justUp
	* @memberof Phaser.Key
	* @default false
	*/
	Object.defineProperty(Phaser.Key.prototype, "justUp", {

	    get: function () {

	        var current = this._justUp;
	        this._justUp = false;
	        return current;

	    }

	});

	/**
	* An enabled key processes its update and dispatches events.
	* A key can be disabled momentarily at runtime instead of deleting it.
	* 
	* @property {boolean} enabled
	* @memberof Phaser.Key
	* @default true
	*/
	Object.defineProperty(Phaser.Key.prototype, "enabled", {

	    get: function () {

	        return this._enabled;

	    },

	    set: function (value) {

	        value = !!value;

	        if (value !== this._enabled)
	        {
	            if (!value)
	            {
	                this.reset(false);
	            }

	            this._enabled = value;
	        }
	    }

	});

	Phaser.Key.prototype.constructor = Phaser.Key;

	module.exports = Phaser.Key;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Phaser = __webpack_require__(13);

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

	Phaser.Physics.Arcade.Body = __webpack_require__(27);
	Phaser.Physics.Arcade.TilemapCollision = __webpack_require__(28);

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


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Phaser = __webpack_require__(13);

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	/**
	* The Physics Body is linked to a single Sprite. All physics operations should be performed against the body rather than
	* the Sprite itself. For example you can set the velocity, acceleration, bounce values etc all on the Body.
	*
	* @class Phaser.Physics.Arcade.Body
	* @constructor
	* @param {Phaser.Sprite} sprite - The Sprite object this physics body belongs to.
	*/
	Phaser.Physics.Arcade.Body = function (sprite) {

	    /**
	    * @property {Phaser.Sprite} sprite - Reference to the parent Sprite.
	    */
	    this.sprite = sprite;

	    /**
	    * @property {Phaser.Game} game - Local reference to game.
	    */
	    this.game = sprite.game;

	    /**
	    * @property {number} type - The type of physics system this body belongs to.
	    */
	    this.type = Phaser.Physics.ARCADE;

	    /**
	    * @property {boolean} enable - A disabled body won't be checked for any form of collision or overlap or have its pre/post updates run.
	    * @default
	    */
	    this.enable = true;

	    /**
	    * @property {Phaser.Point} offset - The offset of the Physics Body from the Sprite x/y position.
	    */
	    this.offset = new Phaser.Point();

	    /**
	    * @property {Phaser.Point} position - The position of the physics body.
	    * @readonly
	    */
	    this.position = new Phaser.Point(sprite.x, sprite.y);

	    /**
	    * @property {Phaser.Point} prev - The previous position of the physics body.
	    * @readonly
	    */
	    this.prev = new Phaser.Point(this.position.x, this.position.y);

	    /**
	    * @property {boolean} allowRotation - Allow this Body to be rotated? (via angularVelocity, etc)
	    * @default
	    */
	    this.allowRotation = true;

	    /**
	    * An Arcade Physics Body can have angularVelocity and angularAcceleration. Please understand that the collision Body
	    * itself never rotates, it is always axis-aligned. However these values are passed up to the parent Sprite and updates its rotation.
	    * @property {number} rotation
	    */
	    this.rotation = sprite.rotation;

	    /**
	    * @property {number} preRotation - The previous rotation of the physics body.
	    * @readonly
	    */
	    this.preRotation = sprite.rotation;

	    /**
	    * @property {number} width - The calculated width of the physics body.
	    * @readonly
	    */
	    this.width = sprite.width;

	    /**
	    * @property {number} height - The calculated height of the physics body.
	    * @readonly
	    */
	    this.height = sprite.height;

	    /**
	    * @property {number} sourceWidth - The un-scaled original size.
	    * @readonly
	    */
	    this.sourceWidth = sprite.width;

	    /**
	    * @property {number} sourceHeight - The un-scaled original size.
	    * @readonly
	    */
	    this.sourceHeight = sprite.height;

	    if (sprite.texture)
	    {
	        this.sourceWidth = sprite.texture.frame.width;
	        this.sourceHeight = sprite.texture.frame.height;
	    }

	    /**
	    * @property {number} halfWidth - The calculated width / 2 of the physics body.
	    * @readonly
	    */
	    this.halfWidth = Math.abs(sprite.width / 2);

	    /**
	    * @property {number} halfHeight - The calculated height / 2 of the physics body.
	    * @readonly
	    */
	    this.halfHeight = Math.abs(sprite.height / 2);

	    /**
	    * @property {Phaser.Point} center - The center coordinate of the Physics Body.
	    * @readonly
	    */
	    this.center = new Phaser.Point(sprite.x + this.halfWidth, sprite.y + this.halfHeight);

	    /**
	    * @property {Phaser.Point} velocity - The velocity, or rate of change in speed of the Body. Measured in pixels per second.
	    */
	    this.velocity = new Phaser.Point();

	    /**
	    * @property {Phaser.Point} newVelocity - The new velocity. Calculated during the Body.preUpdate and applied to its position.
	    * @readonly
	    */
	    this.newVelocity = new Phaser.Point(0, 0);

	    /**
	    * @property {Phaser.Point} deltaMax - The Sprite position is updated based on the delta x/y values. You can set a cap on those (both +-) using deltaMax.
	    */
	    this.deltaMax = new Phaser.Point(0, 0);

	    /**
	    * @property {Phaser.Point} acceleration - The acceleration is the rate of change of the velocity. Measured in pixels per second squared.
	    */
	    this.acceleration = new Phaser.Point();

	    /**
	    * @property {Phaser.Point} drag - The drag applied to the motion of the Body.
	    */
	    this.drag = new Phaser.Point();

	    /**
	    * @property {boolean} allowGravity - Allow this Body to be influenced by gravity? Either world or local.
	    * @default
	    */
	    this.allowGravity = true;

	    /**
	    * @property {Phaser.Point} gravity - A local gravity applied to this Body. If non-zero this over rides any world gravity, unless Body.allowGravity is set to false.
	    */
	    this.gravity = new Phaser.Point(0, 0);

	    /**
	    * @property {Phaser.Point} bounce - The elasticity of the Body when colliding. bounce.x/y = 1 means full rebound, bounce.x/y = 0.5 means 50% rebound velocity.
	    */
	    this.bounce = new Phaser.Point();

	    /**
	    * @property {Phaser.Point} maxVelocity - The maximum velocity in pixels per second sq. that the Body can reach.
	    * @default
	    */
	    this.maxVelocity = new Phaser.Point(10000, 10000);

	    /**
	    * @property {Phaser.Point} friction - The amount of movement that will occur if another object 'rides' this one.
	    */
	    this.friction = new Phaser.Point(1, 0);

	    /**
	    * @property {number} angularVelocity - The angular velocity controls the rotation speed of the Body. It is measured in radians per second.
	    * @default
	    */
	    this.angularVelocity = 0;

	    /**
	    * @property {number} angularAcceleration - The angular acceleration is the rate of change of the angular velocity. Measured in radians per second squared.
	    * @default
	    */
	    this.angularAcceleration = 0;

	    /**
	    * @property {number} angularDrag - The drag applied during the rotation of the Body.
	    * @default
	    */
	    this.angularDrag = 0;

	    /**
	    * @property {number} maxAngular - The maximum angular velocity in radians per second that the Body can reach.
	    * @default
	    */
	    this.maxAngular = 1000;

	    /**
	    * @property {number} mass - The mass of the Body. When two bodies collide their mass is used in the calculation to determine the exchange of velocity.
	    * @default
	    */
	    this.mass = 1;

	    /**
	    * @property {number} angle - The angle of the Body in radians, as calculated by its angularVelocity.
	    * @readonly
	    */
	    this.angle = 0;

	    /**
	    * @property {number} speed - The speed of the Body as calculated by its velocity.
	    * @readonly
	    */
	    this.speed = 0;

	    /**
	    * @property {number} facing - A const reference to the direction the Body is traveling or facing.
	    * @default
	    */
	    this.facing = Phaser.NONE;

	    /**
	    * @property {boolean} immovable - An immovable Body will not receive any impacts from other bodies.
	    * @default
	    */
	    this.immovable = false;

	    /**
	    * If you have a Body that is being moved around the world via a tween or a Group motion, but its local x/y position never
	    * actually changes, then you should set Body.moves = false. Otherwise it will most likely fly off the screen.
	    * If you want the physics system to move the body around, then set moves to true.
	    * @property {boolean} moves - Set to true to allow the Physics system to move this Body, otherwise false to move it manually.
	    * @default
	    */
	    this.moves = true;

	    /**
	    * This flag allows you to disable the custom x separation that takes place by Physics.Arcade.separate.
	    * Used in combination with your own collision processHandler you can create whatever type of collision response you need.
	    * @property {boolean} customSeparateX - Use a custom separation system or the built-in one?
	    * @default
	    */
	    this.customSeparateX = false;

	    /**
	    * This flag allows you to disable the custom y separation that takes place by Physics.Arcade.separate.
	    * Used in combination with your own collision processHandler you can create whatever type of collision response you need.
	    * @property {boolean} customSeparateY - Use a custom separation system or the built-in one?
	    * @default
	    */
	    this.customSeparateY = false;

	    /**
	    * When this body collides with another, the amount of overlap is stored here.
	    * @property {number} overlapX - The amount of horizontal overlap during the collision.
	    */
	    this.overlapX = 0;

	    /**
	    * When this body collides with another, the amount of overlap is stored here.
	    * @property {number} overlapY - The amount of vertical overlap during the collision.
	    */
	    this.overlapY = 0;

	    /**
	    * If a body is overlapping with another body, but neither of them are moving (maybe they spawned on-top of each other?) this is set to true.
	    * @property {boolean} embedded - Body embed value.
	    */
	    this.embedded = false;

	    /**
	    * A Body can be set to collide against the World bounds automatically and rebound back into the World if this is set to true. Otherwise it will leave the World.
	    * @property {boolean} collideWorldBounds - Should the Body collide with the World bounds?
	    */
	    this.collideWorldBounds = false;

	    /**
	    * Set the checkCollision properties to control which directions collision is processed for this Body.
	    * For example checkCollision.up = false means it won't collide when the collision happened while moving up.
	    * @property {object} checkCollision - An object containing allowed collision.
	    */
	    this.checkCollision = { none: false, any: true, up: true, down: true, left: true, right: true };

	    /**
	    * This object is populated with boolean values when the Body collides with another.
	    * touching.up = true means the collision happened to the top of this Body for example.
	    * @property {object} touching - An object containing touching results.
	    */
	    this.touching = { none: true, up: false, down: false, left: false, right: false };

	    /**
	    * This object is populated with previous touching values from the bodies previous collision.
	    * @property {object} wasTouching - An object containing previous touching results.
	    */
	    this.wasTouching = { none: true, up: false, down: false, left: false, right: false };

	    /**
	    * This object is populated with boolean values when the Body collides with the World bounds or a Tile.
	    * For example if blocked.up is true then the Body cannot move up.
	    * @property {object} blocked - An object containing on which faces this Body is blocked from moving, if any.
	    */
	    this.blocked = { up: false, down: false, left: false, right: false };

	    /**
	    * If this is an especially small or fast moving object then it can sometimes skip over tilemap collisions if it moves through a tile in a step.
	    * Set this padding value to add extra padding to its bounds. tilePadding.x applied to its width, y to its height.
	    * @property {Phaser.Point} tilePadding - Extra padding to be added to this sprite's dimensions when checking for tile collision.
	    */
	    this.tilePadding = new Phaser.Point();

	    /**
	    * @property {boolean} dirty - If this Body in a preUpdate (true) or postUpdate (false) state?
	    */
	    this.dirty = false;

	    /**
	    * @property {boolean} skipQuadTree - If true and you collide this Sprite against a Group, it will disable the collision check from using a QuadTree.
	    */
	    this.skipQuadTree = false;

	    /**
	    * If true the Body will check itself against the Sprite.getBounds() dimensions and adjust its width and height accordingly.
	    * If false it will compare its dimensions against the Sprite scale instead, and adjust its width height if the scale has changed.
	    * Typically you would need to enable syncBounds if your sprite is the child of a responsive display object such as a FlexLayer, 
	    * or in any situation where the Sprite scale doesn't change, but its parents scale is effecting the dimensions regardless.
	    * @property {boolean} syncBounds
	    * @default
	    */
	    this.syncBounds = false;

	    /**
	    * @property {boolean} _reset - Internal cache var.
	    * @private
	    */
	    this._reset = true;

	    /**
	    * @property {number} _sx - Internal cache var.
	    * @private
	    */
	    this._sx = sprite.scale.x;

	    /**
	    * @property {number} _sy - Internal cache var.
	    * @private
	    */
	    this._sy = sprite.scale.y;

	    /**
	    * @property {number} _dx - Internal cache var.
	    * @private
	    */
	    this._dx = 0;

	    /**
	    * @property {number} _dy - Internal cache var.
	    * @private
	    */
	    this._dy = 0;

	};

	Phaser.Physics.Arcade.Body.prototype = {

	    /**
	    * Internal method.
	    *
	    * @method Phaser.Physics.Arcade.Body#updateBounds
	    * @protected
	    */
	    updateBounds: function () {

	        if (this.syncBounds)
	        {
	            var b = this.sprite.getBounds();
	            b.ceilAll();

	            if (b.width !== this.width || b.height !== this.height)
	            {
	                this.width = b.width;
	                this.height = b.height;
	                this._reset = true;
	            }
	        }
	        else
	        {
	            var asx = Math.abs(this.sprite.scale.x);
	            var asy = Math.abs(this.sprite.scale.y);

	            if (asx !== this._sx || asy !== this._sy)
	            {
	                this.width = this.sourceWidth * asx;
	                this.height = this.sourceHeight * asy;
	                this._sx = asx;
	                this._sy = asy;
	                this._reset = true;
	            }
	        }

	        if (this._reset)
	        {
	            this.halfWidth = Math.floor(this.width / 2);
	            this.halfHeight = Math.floor(this.height / 2);
	            this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);
	        }

	    },

	    /**
	    * Internal method.
	    *
	    * @method Phaser.Physics.Arcade.Body#preUpdate
	    * @protected
	    */
	    preUpdate: function () {

	        if (!this.enable || this.game.physics.arcade.isPaused)
	        {
	            return;
	        }

	        this.dirty = true;

	        //  Store and reset collision flags
	        this.wasTouching.none = this.touching.none;
	        this.wasTouching.up = this.touching.up;
	        this.wasTouching.down = this.touching.down;
	        this.wasTouching.left = this.touching.left;
	        this.wasTouching.right = this.touching.right;

	        this.touching.none = true;
	        this.touching.up = false;
	        this.touching.down = false;
	        this.touching.left = false;
	        this.touching.right = false;

	        this.blocked.up = false;
	        this.blocked.down = false;
	        this.blocked.left = false;
	        this.blocked.right = false;

	        this.embedded = false;

	        this.updateBounds();

	        this.position.x = (this.sprite.world.x - (this.sprite.anchor.x * this.width)) + this.offset.x;
	        this.position.y = (this.sprite.world.y - (this.sprite.anchor.y * this.height)) + this.offset.y;
	        this.rotation = this.sprite.angle;

	        this.preRotation = this.rotation;

	        if (this._reset || this.sprite.fresh)
	        {
	            this.prev.x = this.position.x;
	            this.prev.y = this.position.y;
	        }

	        if (this.moves)
	        {
	            this.game.physics.arcade.updateMotion(this);

	            this.newVelocity.set(this.velocity.x * this.game.time.physicsElapsed, this.velocity.y * this.game.time.physicsElapsed);

	            this.position.x += this.newVelocity.x;
	            this.position.y += this.newVelocity.y;

	            if (this.position.x !== this.prev.x || this.position.y !== this.prev.y)
	            {
	                this.speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
	                this.angle = Math.atan2(this.velocity.y, this.velocity.x);
	            }

	            //  Now the State update will throw collision checks at the Body
	            //  And finally we'll integrate the new position back to the Sprite in postUpdate

	            if (this.collideWorldBounds)
	            {
	                this.checkWorldBounds();
	            }
	        }

	        this._dx = this.deltaX();
	        this._dy = this.deltaY();

	        this._reset = false;

	    },

	    /**
	    * Internal method.
	    *
	    * @method Phaser.Physics.Arcade.Body#postUpdate
	    * @protected
	    */
	    postUpdate: function () {

	        //  Only allow postUpdate to be called once per frame
	        if (!this.enable || !this.dirty)
	        {
	            return;
	        }

	        this.dirty = false;

	        if (this.deltaX() < 0)
	        {
	            this.facing = Phaser.LEFT;
	        }
	        else if (this.deltaX() > 0)
	        {
	            this.facing = Phaser.RIGHT;
	        }

	        if (this.deltaY() < 0)
	        {
	            this.facing = Phaser.UP;
	        }
	        else if (this.deltaY() > 0)
	        {
	            this.facing = Phaser.DOWN;
	        }

	        if (this.moves)
	        {
	            this._dx = this.deltaX();
	            this._dy = this.deltaY();

	            if (this.deltaMax.x !== 0 && this._dx !== 0)
	            {
	                if (this._dx < 0 && this._dx < -this.deltaMax.x)
	                {
	                    this._dx = -this.deltaMax.x;
	                }
	                else if (this._dx > 0 && this._dx > this.deltaMax.x)
	                {
	                    this._dx = this.deltaMax.x;
	                }
	            }

	            if (this.deltaMax.y !== 0 && this._dy !== 0)
	            {
	                if (this._dy < 0 && this._dy < -this.deltaMax.y)
	                {
	                    this._dy = -this.deltaMax.y;
	                }
	                else if (this._dy > 0 && this._dy > this.deltaMax.y)
	                {
	                    this._dy = this.deltaMax.y;
	                }
	            }

	            this.sprite.position.x += this._dx;
	            this.sprite.position.y += this._dy;
	            this._reset = true;
	        }

	        this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

	        if (this.allowRotation)
	        {
	            this.sprite.angle += this.deltaZ();
	        }

	        this.prev.x = this.position.x;
	        this.prev.y = this.position.y;

	    },

	    /**
	    * Removes this bodys reference to its parent sprite, freeing it up for gc.
	    *
	    * @method Phaser.Physics.Arcade.Body#destroy
	    */
	    destroy: function () {

	        if (this.sprite.parent && this.sprite.parent instanceof Phaser.Group)
	        {
	            this.sprite.parent.removeFromHash(this.sprite);
	        }

	        this.sprite.body = null;
	        this.sprite = null;

	    },

	    /**
	    * Internal method.
	    *
	    * @method Phaser.Physics.Arcade.Body#checkWorldBounds
	    * @protected
	    */
	    checkWorldBounds: function () {

	        var pos = this.position;
	        var bounds = this.game.physics.arcade.bounds;
	        var check = this.game.physics.arcade.checkCollision;

	        if (pos.x < bounds.x && check.left)
	        {
	            pos.x = bounds.x;
	            this.velocity.x *= -this.bounce.x;
	            this.blocked.left = true;
	        }
	        else if (this.right > bounds.right && check.right)
	        {
	            pos.x = bounds.right - this.width;
	            this.velocity.x *= -this.bounce.x;
	            this.blocked.right = true;
	        }

	        if (pos.y < bounds.y && check.up)
	        {
	            pos.y = bounds.y;
	            this.velocity.y *= -this.bounce.y;
	            this.blocked.up = true;
	        }
	        else if (this.bottom > bounds.bottom && check.down)
	        {
	            pos.y = bounds.bottom - this.height;
	            this.velocity.y *= -this.bounce.y;
	            this.blocked.down = true;
	        }

	    },

	    /**
	    * You can modify the size of the physics Body to be any dimension you need.
	    * So it could be smaller or larger than the parent Sprite. You can also control the x and y offset, which
	    * is the position of the Body relative to the top-left of the Sprite.
	    *
	    * @method Phaser.Physics.Arcade.Body#setSize
	    * @param {number} width - The width of the Body.
	    * @param {number} height - The height of the Body.
	    * @param {number} [offsetX] - The X offset of the Body from the Sprite position.
	    * @param {number} [offsetY] - The Y offset of the Body from the Sprite position.
	    */
	    setSize: function (width, height, offsetX, offsetY) {

	        if (offsetX === undefined) { offsetX = this.offset.x; }
	        if (offsetY === undefined) { offsetY = this.offset.y; }

	        this.sourceWidth = width;
	        this.sourceHeight = height;
	        this.width = this.sourceWidth * this._sx;
	        this.height = this.sourceHeight * this._sy;
	        this.halfWidth = Math.floor(this.width / 2);
	        this.halfHeight = Math.floor(this.height / 2);
	        this.offset.setTo(offsetX, offsetY);

	        this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

	    },

	    /**
	    * Resets all Body values (velocity, acceleration, rotation, etc)
	    *
	    * @method Phaser.Physics.Arcade.Body#reset
	    * @param {number} x - The new x position of the Body.
	    * @param {number} y - The new y position of the Body.
	    */
	    reset: function (x, y) {

	        this.velocity.set(0);
	        this.acceleration.set(0);

	        this.speed = 0;
	        this.angularVelocity = 0;
	        this.angularAcceleration = 0;

	        this.position.x = (x - (this.sprite.anchor.x * this.width)) + this.offset.x;
	        this.position.y = (y - (this.sprite.anchor.y * this.height)) + this.offset.y;

	        this.prev.x = this.position.x;
	        this.prev.y = this.position.y;

	        this.rotation = this.sprite.angle;
	        this.preRotation = this.rotation;

	        this._sx = this.sprite.scale.x;
	        this._sy = this.sprite.scale.y;

	        this.center.setTo(this.position.x + this.halfWidth, this.position.y + this.halfHeight);

	    },

	    /**
	    * Tests if a world point lies within this Body.
	    *
	    * @method Phaser.Physics.Arcade.Body#hitTest
	    * @param {number} x - The world x coordinate to test.
	    * @param {number} y - The world y coordinate to test.
	    * @return {boolean} True if the given coordinates are inside this Body, otherwise false.
	    */
	    hitTest: function (x, y) {
	        return Phaser.Rectangle.contains(this, x, y);
	    },

	    /**
	    * Returns true if the bottom of this Body is in contact with either the world bounds or a tile.
	    *
	    * @method Phaser.Physics.Arcade.Body#onFloor
	    * @return {boolean} True if in contact with either the world bounds or a tile.
	    */
	    onFloor: function () {
	        return this.blocked.down;
	    },

	    /**
	    * Returns true if either side of this Body is in contact with either the world bounds or a tile.
	    *
	    * @method Phaser.Physics.Arcade.Body#onWall
	    * @return {boolean} True if in contact with either the world bounds or a tile.
	    */
	    onWall: function () {
	        return (this.blocked.left || this.blocked.right);
	    },

	    /**
	    * Returns the absolute delta x value.
	    *
	    * @method Phaser.Physics.Arcade.Body#deltaAbsX
	    * @return {number} The absolute delta value.
	    */
	    deltaAbsX: function () {
	        return (this.deltaX() > 0 ? this.deltaX() : -this.deltaX());
	    },

	    /**
	    * Returns the absolute delta y value.
	    *
	    * @method Phaser.Physics.Arcade.Body#deltaAbsY
	    * @return {number} The absolute delta value.
	    */
	    deltaAbsY: function () {
	        return (this.deltaY() > 0 ? this.deltaY() : -this.deltaY());
	    },

	    /**
	    * Returns the delta x value. The difference between Body.x now and in the previous step.
	    *
	    * @method Phaser.Physics.Arcade.Body#deltaX
	    * @return {number} The delta value. Positive if the motion was to the right, negative if to the left.
	    */
	    deltaX: function () {
	        return this.position.x - this.prev.x;
	    },

	    /**
	    * Returns the delta y value. The difference between Body.y now and in the previous step.
	    *
	    * @method Phaser.Physics.Arcade.Body#deltaY
	    * @return {number} The delta value. Positive if the motion was downwards, negative if upwards.
	    */
	    deltaY: function () {
	        return this.position.y - this.prev.y;
	    },

	    /**
	    * Returns the delta z value. The difference between Body.rotation now and in the previous step.
	    *
	    * @method Phaser.Physics.Arcade.Body#deltaZ
	    * @return {number} The delta value. Positive if the motion was clockwise, negative if anti-clockwise.
	    */
	    deltaZ: function () {
	        return this.rotation - this.preRotation;
	    }

	};

	/**
	* @name Phaser.Physics.Arcade.Body#bottom
	* @property {number} bottom - The bottom value of this Body (same as Body.y + Body.height)
	* @readonly
	*/
	Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "bottom", {

	    get: function () {
	        return this.position.y + this.height;
	    }

	});

	/**
	* @name Phaser.Physics.Arcade.Body#right
	* @property {number} right - The right value of this Body (same as Body.x + Body.width)
	* @readonly
	*/
	Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "right", {

	    get: function () {
	        return this.position.x + this.width;
	    }

	});

	/**
	* @name Phaser.Physics.Arcade.Body#x
	* @property {number} x - The x position.
	*/
	Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "x", {

	    get: function () {
	        return this.position.x;
	    },

	    set: function (value) {

	        this.position.x = value;
	    }

	});

	/**
	* @name Phaser.Physics.Arcade.Body#y
	* @property {number} y - The y position.
	*/
	Object.defineProperty(Phaser.Physics.Arcade.Body.prototype, "y", {

	    get: function () {
	        return this.position.y;
	    },

	    set: function (value) {

	        this.position.y = value;

	    }

	});

	/**
	* Render Sprite Body.
	*
	* @method Phaser.Physics.Arcade.Body#render
	* @param {object} context - The context to render to.
	* @param {Phaser.Physics.Arcade.Body} body - The Body to render the info of.
	* @param {string} [color='rgba(0,255,0,0.4)'] - color of the debug info to be rendered. (format is css color string).
	* @param {boolean} [filled=true] - Render the objected as a filled (default, true) or a stroked (false)
	*/
	Phaser.Physics.Arcade.Body.render = function (context, body, color, filled) {

	    if (filled === undefined) { filled = true; }

	    color = color || 'rgba(0,255,0,0.4)';

	    if (filled)
	    {
	        context.fillStyle = color;
	        context.fillRect(body.position.x - body.game.camera.x, body.position.y - body.game.camera.y, body.width, body.height);
	    }
	    else
	    {
	        context.strokeStyle = color;
	        context.strokeRect(body.position.x - body.game.camera.x, body.position.y - body.game.camera.y, body.width, body.height);
	    }

	};

	/**
	* Render Sprite Body Physics Data as text.
	*
	* @method Phaser.Physics.Arcade.Body#renderBodyInfo
	* @param {Phaser.Physics.Arcade.Body} body - The Body to render the info of.
	* @param {number} x - X position of the debug info to be rendered.
	* @param {number} y - Y position of the debug info to be rendered.
	* @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	*/
	Phaser.Physics.Arcade.Body.renderBodyInfo = function (debug, body) {

	    debug.line('x: ' + body.x.toFixed(2), 'y: ' + body.y.toFixed(2), 'width: ' + body.width, 'height: ' + body.height);
	    debug.line('velocity x: ' + body.velocity.x.toFixed(2), 'y: ' + body.velocity.y.toFixed(2), 'deltaX: ' + body._dx.toFixed(2), 'deltaY: ' + body._dy.toFixed(2));
	    debug.line('acceleration x: ' + body.acceleration.x.toFixed(2), 'y: ' + body.acceleration.y.toFixed(2), 'speed: ' + body.speed.toFixed(2), 'angle: ' + body.angle.toFixed(2));
	    debug.line('gravity x: ' + body.gravity.x, 'y: ' + body.gravity.y, 'bounce x: ' + body.bounce.x.toFixed(2), 'y: ' + body.bounce.y.toFixed(2));
	    debug.line('touching left: ' + body.touching.left, 'right: ' + body.touching.right, 'up: ' + body.touching.up, 'down: ' + body.touching.down);
	    debug.line('blocked left: ' + body.blocked.left, 'right: ' + body.blocked.right, 'up: ' + body.blocked.up, 'down: ' + body.blocked.down);

	};

	Phaser.Physics.Arcade.Body.prototype.constructor = Phaser.Physics.Arcade.Body;

	module.exports = Phaser.Physics.Arcade.Body;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var Phaser = __webpack_require__(13);

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	/**
	* The Arcade Physics Tile map collision methods.
	*
	* @class Phaser.Physics.Arcade.TilemapCollision
	* @constructor
	*/
	Phaser.Physics.Arcade.TilemapCollision = function () {};

	Phaser.Physics.Arcade.TilemapCollision.prototype = {

	    /**
	    * @property {number} TILE_BIAS - A value added to the delta values during collision with tiles. Adjust this if you get tunneling.
	    */
	    TILE_BIAS: 16,

	    /**
	    * An internal function. Use Phaser.Physics.Arcade.collide instead.
	    *
	    * @method Phaser.Physics.Arcade#collideSpriteVsTilemapLayer
	    * @private
	    * @param {Phaser.Sprite} sprite - The sprite to check.
	    * @param {Phaser.TilemapLayer} tilemapLayer - The layer to check.
	    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
	    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
	    * @param {object} callbackContext - The context in which to run the callbacks.
	    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
	    */
	    collideSpriteVsTilemapLayer: function (sprite, tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly) {

	        if (!sprite.body)
	        {
	            return;
	        }

	        var mapData = tilemapLayer.getTiles(
	            sprite.body.position.x - sprite.body.tilePadding.x,
	            sprite.body.position.y - sprite.body.tilePadding.y,
	            sprite.body.width + sprite.body.tilePadding.x,
	            sprite.body.height + sprite.body.tilePadding.y,
	            false, false);

	        if (mapData.length === 0)
	        {
	            return;
	        }

	        for (var i = 0; i < mapData.length; i++)
	        {
	            if (processCallback)
	            {
	                if (processCallback.call(callbackContext, sprite, mapData[i]))
	                {
	                    if (this.separateTile(i, sprite.body, mapData[i], overlapOnly))
	                    {
	                        this._total++;

	                        if (collideCallback)
	                        {
	                            collideCallback.call(callbackContext, sprite, mapData[i]);
	                        }
	                    }
	                }
	            }
	            else
	            {
	                if (this.separateTile(i, sprite.body, mapData[i], overlapOnly))
	                {
	                    this._total++;

	                    if (collideCallback)
	                    {
	                        collideCallback.call(callbackContext, sprite, mapData[i]);
	                    }
	                }
	            }
	        }

	    },

	    /**
	    * An internal function. Use Phaser.Physics.Arcade.collide instead.
	    *
	    * @private
	    * @method Phaser.Physics.Arcade#collideGroupVsTilemapLayer
	    * @param {Phaser.Group} group - The Group to check.
	    * @param {Phaser.TilemapLayer} tilemapLayer - The layer to check.
	    * @param {function} collideCallback - An optional callback function that is called if the objects collide. The two objects will be passed to this function in the same order in which you specified them.
	    * @param {function} processCallback - A callback function that lets you perform additional checks against the two objects if they overlap. If this is set then collision will only happen if processCallback returns true. The two objects will be passed to this function in the same order in which you specified them.
	    * @param {object} callbackContext - The context in which to run the callbacks.
	    * @param {boolean} overlapOnly - Just run an overlap or a full collision.
	    */
	    collideGroupVsTilemapLayer: function (group, tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly) {

	        if (group.length === 0)
	        {
	            return;
	        }

	        for (var i = 0; i < group.children.length; i++)
	        {
	            if (group.children[i].exists)
	            {
	                this.collideSpriteVsTilemapLayer(group.children[i], tilemapLayer, collideCallback, processCallback, callbackContext, overlapOnly);
	            }
	        }

	    },

	    /**
	    * The core separation function to separate a physics body and a tile.
	    *
	    * @private
	    * @method Phaser.Physics.Arcade#separateTile
	    * @param {Phaser.Physics.Arcade.Body} body - The Body object to separate.
	    * @param {Phaser.Tile} tile - The tile to collide against.
	    * @return {boolean} Returns true if the body was separated, otherwise false.
	    */
	    separateTile: function (i, body, tile, overlapOnly) {

	        if (!body.enable)
	        {
	            return false;
	        }

	        //  We re-check for collision in case body was separated in a previous step
	        if (!tile.intersects(body.position.x, body.position.y, body.right, body.bottom))
	        {
	            //  no collision so bail out (separated in a previous step)
	            return false;
	        }
	        else if (overlapOnly)
	        {
	            //  There is an overlap, and we don't need to separate. Bail.
	            return true;
	        }

	        //  They overlap. Any custom callbacks?

	        //  A local callback always takes priority over a layer level callback
	        if (tile.collisionCallback && !tile.collisionCallback.call(tile.collisionCallbackContext, body.sprite, tile))
	        {
	            //  If it returns true then we can carry on, otherwise we should abort.
	            return false;
	        }
	        else if (tile.layer.callbacks[tile.index] && !tile.layer.callbacks[tile.index].callback.call(tile.layer.callbacks[tile.index].callbackContext, body.sprite, tile))
	        {
	            //  If it returns true then we can carry on, otherwise we should abort.
	            return false;
	        }

	        //  We don't need to go any further if this tile doesn't actually separate
	        if (!tile.faceLeft && !tile.faceRight && !tile.faceTop && !tile.faceBottom)
	        {
	            //   This could happen if the tile was meant to be collided with re: a callback, but otherwise isn't needed for separation
	            return false;
	        }

	        var ox = 0;
	        var oy = 0;
	        var minX = 0;
	        var minY = 1;

	        if (body.deltaAbsX() > body.deltaAbsY())
	        {
	            //  Moving faster horizontally, check X axis first
	            minX = -1;
	        }
	        else if (body.deltaAbsX() < body.deltaAbsY())
	        {
	            //  Moving faster vertically, check Y axis first
	            minY = -1;
	        }

	        if (body.deltaX() !== 0 && body.deltaY() !== 0 && (tile.faceLeft || tile.faceRight) && (tile.faceTop || tile.faceBottom))
	        {
	            //  We only need do this if both axis have checking faces AND we're moving in both directions
	            minX = Math.min(Math.abs(body.position.x - tile.right), Math.abs(body.right - tile.left));
	            minY = Math.min(Math.abs(body.position.y - tile.bottom), Math.abs(body.bottom - tile.top));
	        }

	        if (minX < minY)
	        {
	            if (tile.faceLeft || tile.faceRight)
	            {
	                ox = this.tileCheckX(body, tile);

	                //  That's horizontal done, check if we still intersects? If not then we can return now
	                if (ox !== 0 && !tile.intersects(body.position.x, body.position.y, body.right, body.bottom))
	                {
	                    return true;
	                }
	            }

	            if (tile.faceTop || tile.faceBottom)
	            {
	                oy = this.tileCheckY(body, tile);
	            }
	        }
	        else
	        {
	            if (tile.faceTop || tile.faceBottom)
	            {
	                oy = this.tileCheckY(body, tile);

	                //  That's vertical done, check if we still intersects? If not then we can return now
	                if (oy !== 0 && !tile.intersects(body.position.x, body.position.y, body.right, body.bottom))
	                {
	                    return true;
	                }
	            }

	            if (tile.faceLeft || tile.faceRight)
	            {
	                ox = this.tileCheckX(body, tile);
	            }
	        }

	        return (ox !== 0 || oy !== 0);

	    },

	    /**
	    * Check the body against the given tile on the X axis.
	    *
	    * @private
	    * @method Phaser.Physics.Arcade#tileCheckX
	    * @param {Phaser.Physics.Arcade.Body} body - The Body object to separate.
	    * @param {Phaser.Tile} tile - The tile to check.
	    * @return {number} The amount of separation that occurred.
	    */
	    tileCheckX: function (body, tile) {

	        var ox = 0;

	        if (body.deltaX() < 0 && !body.blocked.left && tile.collideRight && body.checkCollision.left)
	        {
	            //  Body is moving LEFT
	            if (tile.faceRight && body.x < tile.right)
	            {
	                ox = body.x - tile.right;

	                if (ox < -this.TILE_BIAS)
	                {
	                    ox = 0;
	                }
	            }
	        }
	        else if (body.deltaX() > 0 && !body.blocked.right && tile.collideLeft && body.checkCollision.right)
	        {
	            //  Body is moving RIGHT
	            if (tile.faceLeft && body.right > tile.left)
	            {
	                ox = body.right - tile.left;

	                if (ox > this.TILE_BIAS)
	                {
	                    ox = 0;
	                }
	            }
	        }

	        if (ox !== 0)
	        {
	            if (body.customSeparateX)
	            {
	                body.overlapX = ox;
	            }
	            else
	            {
	                this.processTileSeparationX(body, ox);
	            }
	        }

	        return ox;

	    },

	    /**
	    * Check the body against the given tile on the Y axis.
	    *
	    * @private
	    * @method Phaser.Physics.Arcade#tileCheckY
	    * @param {Phaser.Physics.Arcade.Body} body - The Body object to separate.
	    * @param {Phaser.Tile} tile - The tile to check.
	    * @return {number} The amount of separation that occurred.
	    */
	    tileCheckY: function (body, tile) {

	        var oy = 0;

	        if (body.deltaY() < 0 && !body.blocked.up && tile.collideDown && body.checkCollision.up)
	        {
	            //  Body is moving UP
	            if (tile.faceBottom && body.y < tile.bottom)
	            {
	                oy = body.y - tile.bottom;

	                if (oy < -this.TILE_BIAS)
	                {
	                    oy = 0;
	                }
	            }
	        }
	        else if (body.deltaY() > 0 && !body.blocked.down && tile.collideUp && body.checkCollision.down)
	        {
	            //  Body is moving DOWN
	            if (tile.faceTop && body.bottom > tile.top)
	            {
	                oy = body.bottom - tile.top;

	                if (oy > this.TILE_BIAS)
	                {
	                    oy = 0;
	                }
	            }
	        }

	        if (oy !== 0)
	        {
	            if (body.customSeparateY)
	            {
	                body.overlapY = oy;
	            }
	            else
	            {
	                this.processTileSeparationY(body, oy);
	            }
	        }

	        return oy;

	    },

	    /**
	    * Internal function to process the separation of a physics body from a tile.
	    *
	    * @private
	    * @method Phaser.Physics.Arcade#processTileSeparationX
	    * @param {Phaser.Physics.Arcade.Body} body - The Body object to separate.
	    * @param {number} x - The x separation amount.
	    */
	    processTileSeparationX: function (body, x) {

	        if (x < 0)
	        {
	            body.blocked.left = true;
	        }
	        else if (x > 0)
	        {
	            body.blocked.right = true;
	        }

	        body.position.x -= x;

	        if (body.bounce.x === 0)
	        {
	            body.velocity.x = 0;
	        }
	        else
	        {
	            body.velocity.x = -body.velocity.x * body.bounce.x;
	        }

	    },

	    /**
	    * Internal function to process the separation of a physics body from a tile.
	    *
	    * @private
	    * @method Phaser.Physics.Arcade#processTileSeparationY
	    * @param {Phaser.Physics.Arcade.Body} body - The Body object to separate.
	    * @param {number} y - The y separation amount.
	    */
	    processTileSeparationY: function (body, y) {

	        if (y < 0)
	        {
	            body.blocked.up = true;
	        }
	        else if (y > 0)
	        {
	            body.blocked.down = true;
	        }

	        body.position.y -= y;

	        if (body.bounce.y === 0)
	        {
	            body.velocity.y = 0;
	        }
	        else
	        {
	            body.velocity.y = -body.velocity.y * body.bounce.y;
	        }

	    }

	};

	module.exports = Phaser.Physics.Arcade.TilemapCollision;


/***/ }
]);