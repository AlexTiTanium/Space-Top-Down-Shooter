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


	        this.add(__webpack_require__(28));

	    },

	    /**
	     * Create a world
	     */
	    create: function(){
	        //this.game.world.setBounds(0, 0, 1920, 1200);
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
	        this.listenTo(this.game, 'create', this.create);
	    },

	    /**
	     * Load game object to level
	     *
	     * @param {GameObject} GameObject
	     */
	    add: function(GameObject){

	        var gameObject = new GameObject(this.game);

	        if (gameObject.preload) gameObject.preload();

	        gameObject.listenTo(this.game, 'create', gameObject.beforeCreate);

	        this.game.plugins.add(gameObject);
	        this.gameObjects.push(gameObject);

	    },

	    /**
	     * Stub for preload method
	     */
	    preload: function(){
	        console.warn('Preload not defined');
	    },

	    /**
	     * Stub for create method
	     */
	    create: function(){
	        console.warn('Create not defined');
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
	     * Default renderer, if debug ON will be switched to CANVAS
	     */
	    renderer: Phaser.AUTO,

	    /**
	     * Enable engine debug
	     */
	    debug: true,

	    /**
	     * Enable performance monitor
	     */
	    debugPerformanceMonitor: true,

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
	        Phaser.PluginManager = __webpack_require__(19);
	        Phaser.Keyboard = __webpack_require__(20);
	        Phaser.Physics.Arcade = __webpack_require__(22);

	        // Initialize debug module
	        if(this.debug) {
	            Phaser.Utils.Debug = __webpack_require__(25);
	            Phaser.BitmapData = __webpack_require__(26);
	            this.renderer = Phaser.CANVAS; // Debug not works for WebGL render
	        }

	        // Create game object
	        this.game =  _.extend(new Phaser.Game(this.width, this.height, this.renderer, this.element, {
	            preload: this.preload.bind(this),
	            create:  this.create.bind(this)
	        }), Events);

	        this.game.isDebugEnabled = this.debug;

	        return this.game;
	    },

	    /**
	     * Preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
	     * You shouldn't create any objects in this method that require assets that you're also loading in this method, as
	     * they won't yet be available.
	     */
	    preload: function(){

	        if (this.debugPerformanceMonitor){
	            this.game.plugins.add(__webpack_require__(27));
	        }

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
/***/ function(module, exports) {

	/**
	 * @author       Richard Davey <rich@photonstorm.com>
	 * @copyright    2015 Photon Storm Ltd.
	 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	 */

	/**
	 * The Plugin Manager is responsible for the loading, running and unloading of Phaser Plugins.
	 *
	 * @class Phaser.PluginManager
	 * @constructor
	 * @param {Phaser.Game} game - A reference to the currently running game.
	 */
	var PluginManager = function(game) {

	    /**
	     * @property {Phaser.Game} game - A reference to the currently running game.
	     */
	    this.game = game;

	    /**
	     * @property {Phaser.Plugin[]} plugins - An array of all the plugins being managed by this PluginManager.
	     */
	    this.plugins = [];

	    /**
	     * @property {number} _len - Internal cache var.
	     * @private
	     */
	    this._len = 0;

	    /**
	     * @property {number} _i - Internal cache var.
	     * @private
	     */
	    this._i = 0;

	};

	PluginManager.prototype = {

	    /**
	     * Add a new Plugin into the PluginManager.
	     * The Plugin must have 2 properties: game and parent. Plugin.game is set to the game reference the PluginManager uses, and parent is set to the PluginManager.
	     *
	     * @method Phaser.PluginManager#add
	     * @param {object|Phaser.Plugin} plugin - The Plugin to add into the PluginManager. This can be a function or an existing object.
	     * @param {...*} parameter - Additional arguments that will be passed to the Plugin.init method.
	     * @return {Phaser.Plugin} The Plugin that was added to the manager.
	     */
	    add: function (plugin) {

	        var args = Array.prototype.slice.call(arguments, 1);
	        var result = false;

	        //  Prototype?
	        if (typeof plugin === 'function')
	        {
	            plugin = new plugin(this.game, this);

	        }
	        else
	        {
	            plugin.game = this.game;
	            plugin.parent = this;
	        }

	        //  Check for methods now to avoid having to do this every loop
	        if (typeof plugin['preUpdate'] === 'function')
	        {
	            plugin.hasPreUpdate = true;
	            result = true;
	        }

	        if (typeof plugin['update'] === 'function')
	        {
	            plugin.hasUpdate = true;
	            result = true;
	        }

	        if (typeof plugin['postUpdate'] === 'function')
	        {
	            plugin.hasPostUpdate = true;
	            result = true;
	        }

	        if (typeof plugin['render'] === 'function')
	        {
	            plugin.hasRender = true;
	            result = true;
	        }

	        if (typeof plugin['postRender'] === 'function')
	        {
	            plugin.hasPostRender = true;
	            result = true;
	        }

	        //  The plugin must have at least one of the above functions to be added to the PluginManager.
	        if (result)
	        {
	            if (plugin.hasPreUpdate || plugin.hasUpdate || plugin.hasPostUpdate)
	            {
	                plugin.active = true;
	            }

	            if (plugin.hasRender || plugin.hasPostRender)
	            {
	                plugin.visible = true;
	            }

	            // Allows plugins to run potentially destructive code outside of the constructor, and only if being added to the PluginManager
	            if (typeof plugin['init'] === 'function')
	            {
	                plugin.init.apply(plugin, args);
	            }

	            this._len = this.plugins.push(plugin);

	            return plugin;
	        }
	        else
	        {
	            return null;
	        }
	    },

	    /**
	     * Remove a Plugin from the PluginManager. It calls Plugin.destroy on the plugin before removing it from the manager.
	     *
	     * @method Phaser.PluginManager#remove
	     * @param {Phaser.Plugin} plugin - The plugin to be removed.
	     */
	    remove: function (plugin) {

	        this._i = this._len;

	        while (this._i--)
	        {
	            if (this.plugins[this._i] === plugin)
	            {
	                plugin.destroy();
	                this.plugins.splice(this._i, 1);
	                this._len--;
	                return;
	            }
	        }

	    },

	    /**
	     * Remove all Plugins from the PluginManager. It calls Plugin.destroy on every plugin before removing it from the manager.
	     *
	     * @method Phaser.PluginManager#removeAll
	     */
	    removeAll: function() {

	        this._i = this._len;

	        while (this._i--)
	        {
	            this.plugins[this._i].destroy();
	        }

	        this.plugins.length = 0;
	        this._len = 0;

	    },

	    /**
	     * Pre-update is called at the very start of the update cycle, before any other subsystems have been updated (including Physics).
	     * It only calls plugins who have active=true.
	     *
	     * @method Phaser.PluginManager#preUpdate
	     */
	    preUpdate: function () {

	        this._i = this._len;

	        while (this._i--)
	        {
	            if (this.plugins[this._i].active && this.plugins[this._i].hasPreUpdate)
	            {
	                this.plugins[this._i].preUpdate();
	            }
	        }

	    },

	    /**
	     * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated, but before the render.
	     * It only calls plugins who have active=true.
	     *
	     * @method Phaser.PluginManager#update
	     */
	    update: function () {

	        this._i = this._len;

	        while (this._i--)
	        {
	            if (this.plugins[this._i].active && this.plugins[this._i].hasUpdate)
	            {
	                this.plugins[this._i].update();
	            }
	        }

	    },

	    /**
	     * PostUpdate is the last thing to be called before the world render.
	     * In particular, it is called after the world postUpdate, which means the camera has been adjusted.
	     * It only calls plugins who have active=true.
	     *
	     * @method Phaser.PluginManager#postUpdate
	     */
	    postUpdate: function () {

	        this._i = this._len;

	        while (this._i--)
	        {
	            if (this.plugins[this._i].active && this.plugins[this._i].hasPostUpdate)
	            {
	                this.plugins[this._i].postUpdate();
	            }
	        }

	    },

	    /**
	     * Render is called right after the Game Renderer completes, but before the State.render.
	     * It only calls plugins who have visible=true.
	     *
	     * @method Phaser.PluginManager#render
	     */
	    render: function () {

	        this._i = this._len;

	        while (this._i--)
	        {
	            if (this.plugins[this._i].visible && this.plugins[this._i].hasRender)
	            {
	                this.plugins[this._i].render();
	            }
	        }

	    },

	    /**
	     * Post-render is called after the Game Renderer and State.render have run.
	     * It only calls plugins who have visible=true.
	     *
	     * @method Phaser.PluginManager#postRender
	     */
	    postRender: function () {

	        this._i = this._len;

	        while (this._i--)
	        {
	            if (this.plugins[this._i].visible && this.plugins[this._i].hasPostRender)
	            {
	                this.plugins[this._i].postRender();
	            }
	        }

	    },

	    /**
	     * Clear down this PluginManager, calls destroy on every plugin and nulls out references.
	     *
	     * @method Phaser.PluginManager#destroy
	     */
	    destroy: function () {

	        this.removeAll();

	        this.game = null;

	    }

	};

	PluginManager.prototype.constructor = PluginManager;

	module.exports = PluginManager;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	var Phaser = __webpack_require__(13);
	Phaser.Key = __webpack_require__(21);

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
/* 21 */
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
/* 22 */
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

	Phaser.Physics.Arcade.Body = __webpack_require__(23);
	Phaser.Physics.Arcade.TilemapCollision = __webpack_require__(24);

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
/* 23 */
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
/* 24 */
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


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	var PIXI = __webpack_require__(15);

	/**
	* A collection of methods for displaying debug information about game objects.
	* If your game is running in WebGL then Debug will create a Sprite that is placed at the top of the Stage display list and bind a canvas texture
	* to it, which must be uploaded every frame. Be advised: this is very expensive, especially in browsers like Firefox. So please only enable Debug
	* in WebGL mode if you really need it (or your desktop can cope with it well) and disable it for production!
	* If your game is using a Canvas renderer then the debug information is literally drawn on the top of the active game canvas and no Sprite is used.
	*
	* @class Phaser.Utils.Debug
	* @constructor
	* @param {Phaser.Game} game - A reference to the currently running game.
	*/
	var Debug = function (game) {

	    /**
	    * @property {Phaser.Game} game - A reference to the currently running Game.
	    */
	    this.game = game;

	    /**
	    * @property {Phaser.Image} sprite - If debugging in WebGL mode we need this.
	    */
	    this.sprite = null;

	    /**
	    * @property {Phaser.BitmapData} bmd - In WebGL mode this BitmapData contains a copy of the debug canvas.
	    */
	    this.bmd = null;

	    /**
	    * @property {HTMLCanvasElement} canvas - The canvas to which Debug calls draws.
	    */
	    this.canvas = null;

	    /**
	    * @property {CanvasRenderingContext2D} context - The 2d context of the canvas.
	    */
	    this.context = null;

	    /**
	    * @property {string} font - The font that the debug information is rendered in.
	    * @default '14px Courier'
	    */
	    this.font = '14px Courier';

	    /**
	    * @property {number} columnWidth - The spacing between columns.
	    */
	    this.columnWidth = 100;

	    /**
	    * @property {number} lineHeight - The line height between the debug text.
	    */
	    this.lineHeight = 16;

	    /**
	    * @property {boolean} renderShadow - Should the text be rendered with a slight shadow? Makes it easier to read on different types of background.
	    */
	    this.renderShadow = true;

	    /**
	    * @property {number} currentX - The current X position the debug information will be rendered at.
	    * @default
	    */
	    this.currentX = 0;

	    /**
	    * @property {number} currentY - The current Y position the debug information will be rendered at.
	    * @default
	    */
	    this.currentY = 0;

	    /**
	    * @property {number} currentAlpha - The alpha of the Debug context, set before all debug information is rendered to it.
	    * @default
	    */
	    this.currentAlpha = 1;

	    /**
	    * @property {boolean} dirty - Does the canvas need re-rendering?
	    */
	    this.dirty = false;

	};

	Debug.prototype = {

	    /**
	    * Internal method that boots the debug displayer.
	    *
	    * @method Phaser.Utils.Debug#boot
	    * @protected
	    */
	    boot: function () {

	        if (this.game.renderType === Phaser.CANVAS)
	        {
	            this.context = this.game.context;
	        }
	        else
	        {
	            this.bmd = this.game.make.bitmapData(this.game.width, this.game.height);
	            this.sprite = this.game.make.image(0, 0, this.bmd);
	            this.game.stage.addChild(this.sprite);

	            this.canvas = PIXI.CanvasPool.create(this, this.game.width, this.game.height);
	            this.context = this.canvas.getContext('2d');
	        }

	    },

	    /**
	    * Internal method that clears the canvas (if a Sprite) ready for a new debug session.
	    *
	    * @method Phaser.Utils.Debug#preUpdate
	    */
	    preUpdate: function () {

	        if (this.dirty && this.sprite)
	        {
	            this.bmd.clear();
	            this.bmd.draw(this.canvas, 0, 0);

	            this.context.clearRect(0, 0, this.game.width, this.game.height);
	            this.dirty = false;
	        }

	    },

	    /**
	    * Clears the Debug canvas.
	    *
	    * @method Phaser.Utils.Debug#reset
	    */
	    reset: function () {

	        if (this.context)
	        {
	            this.context.clearRect(0, 0, this.game.width, this.game.height);
	        }

	        if (this.sprite)
	        {
	            this.bmd.clear();
	        }

	    },

	    /**
	    * Internal method that resets and starts the debug output values.
	    *
	    * @method Phaser.Utils.Debug#start
	    * @protected
	    * @param {number} [x=0] - The X value the debug info will start from.
	    * @param {number} [y=0] - The Y value the debug info will start from.
	    * @param {string} [color='rgb(255,255,255)'] - The color the debug text will drawn in.
	    * @param {number} [columnWidth=0] - The spacing between columns.
	    */
	    start: function (x, y, color, columnWidth) {

	        if (typeof x !== 'number') { x = 0; }
	        if (typeof y !== 'number') { y = 0; }
	        color = color || 'rgb(255,255,255)';
	        if (columnWidth === undefined) { columnWidth = 0; }

	        this.currentX = x;
	        this.currentY = y;
	        this.currentColor = color;
	        this.columnWidth = columnWidth;

	        this.dirty = true;

	        this.context.save();
	        this.context.setTransform(1, 0, 0, 1, 0, 0);
	        this.context.strokeStyle = color;
	        this.context.fillStyle = color;
	        this.context.font = this.font;
	        this.context.globalAlpha = this.currentAlpha;

	    },

	    /**
	    * Internal method that stops the debug output.
	    *
	    * @method Phaser.Utils.Debug#stop
	    * @protected
	    */
	    stop: function () {

	        this.context.restore();

	    },

	    /**
	    * Internal method that outputs a single line of text split over as many columns as needed, one per parameter.
	    *
	    * @method Phaser.Utils.Debug#line
	    * @protected
	    */
	    line: function () {

	        var x = this.currentX;

	        for (var i = 0; i < arguments.length; i++)
	        {
	            if (this.renderShadow)
	            {
	                this.context.fillStyle = 'rgb(0,0,0)';
	                this.context.fillText(arguments[i], x + 1, this.currentY + 1);
	                this.context.fillStyle = this.currentColor;
	            }

	            this.context.fillText(arguments[i], x, this.currentY);

	            x += this.columnWidth;
	        }

	        this.currentY += this.lineHeight;

	    },

	    /**
	    * Render Sound information, including decoded state, duration, volume and more.
	    *
	    * @method Phaser.Utils.Debug#soundInfo
	    * @param {Phaser.Sound} sound - The sound object to debug.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    soundInfo: function (sound, x, y, color) {

	        this.start(x, y, color);
	        this.line('Sound: ' + sound.key + ' Locked: ' + sound.game.sound.touchLocked);
	        this.line('Is Ready?: ' + this.game.cache.isSoundReady(sound.key) + ' Pending Playback: ' + sound.pendingPlayback);
	        this.line('Decoded: ' + sound.isDecoded + ' Decoding: ' + sound.isDecoding);
	        this.line('Total Duration: ' + sound.totalDuration + ' Playing: ' + sound.isPlaying);
	        this.line('Time: ' + sound.currentTime);
	        this.line('Volume: ' + sound.volume + ' Muted: ' + sound.mute);
	        this.line('WebAudio: ' + sound.usingWebAudio + ' Audio: ' + sound.usingAudioTag);

	        if (sound.currentMarker !== '')
	        {
	            this.line('Marker: ' + sound.currentMarker + ' Duration: ' + sound.duration + ' (ms: ' + sound.durationMS + ')');
	            this.line('Start: ' + sound.markers[sound.currentMarker].start + ' Stop: ' + sound.markers[sound.currentMarker].stop);
	            this.line('Position: ' + sound.position);
	        }

	        this.stop();

	    },

	    /**
	    * Render camera information including dimensions and location.
	    *
	    * @method Phaser.Utils.Debug#cameraInfo
	    * @param {Phaser.Camera} camera - The Phaser.Camera to show the debug information for.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    cameraInfo: function (camera, x, y, color) {

	        this.start(x, y, color);
	        this.line('Camera (' + camera.width + ' x ' + camera.height + ')');
	        this.line('X: ' + camera.x + ' Y: ' + camera.y);

	        if (camera.bounds)
	        {
	            this.line('Bounds x: ' + camera.bounds.x + ' Y: ' + camera.bounds.y + ' w: ' + camera.bounds.width + ' h: ' + camera.bounds.height);
	        }

	        this.line('View x: ' + camera.view.x + ' Y: ' + camera.view.y + ' w: ' + camera.view.width + ' h: ' + camera.view.height);
	        // this.line('Screen View x: ' + camera.screenView.x + ' Y: ' + camera.screenView.y + ' w: ' + camera.screenView.width + ' h: ' + camera.screenView.height);
	        this.line('Total in view: ' + camera.totalInView);
	        this.stop();

	    },

	    /**
	    * Render Timer information.
	    *
	    * @method Phaser.Utils.Debug#timer
	    * @param {Phaser.Timer} timer - The Phaser.Timer to show the debug information for.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    timer: function (timer, x, y, color) {

	        this.start(x, y, color);
	        this.line('Timer (running: ' + timer.running + ' expired: ' + timer.expired + ')');
	        this.line('Next Tick: ' + timer.next + ' Duration: ' + timer.duration);
	        this.line('Paused: ' + timer.paused + ' Length: ' + timer.length);
	        this.stop();

	    },

	    /**
	    * Renders the Pointer.circle object onto the stage in green if down or red if up along with debug text.
	    *
	    * @method Phaser.Utils.Debug#pointer
	    * @param {Phaser.Pointer} pointer - The Pointer you wish to display.
	    * @param {boolean} [hideIfUp=false] - Doesn't render the circle if the pointer is up.
	    * @param {string} [downColor='rgba(0,255,0,0.5)'] - The color the circle is rendered in if down.
	    * @param {string} [upColor='rgba(255,0,0,0.5)'] - The color the circle is rendered in if up (and hideIfUp is false).
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    pointer: function (pointer, hideIfUp, downColor, upColor, color) {

	        if (pointer == null)
	        {
	            return;
	        }

	        if (hideIfUp === undefined) { hideIfUp = false; }
	        downColor = downColor || 'rgba(0,255,0,0.5)';
	        upColor = upColor || 'rgba(255,0,0,0.5)';

	        if (hideIfUp === true && pointer.isUp === true)
	        {
	            return;
	        }

	        this.start(pointer.x, pointer.y - 100, color);
	        this.context.beginPath();
	        this.context.arc(pointer.x, pointer.y, pointer.circle.radius, 0, Math.PI * 2);

	        if (pointer.active)
	        {
	            this.context.fillStyle = downColor;
	        }
	        else
	        {
	            this.context.fillStyle = upColor;
	        }

	        this.context.fill();
	        this.context.closePath();

	        //  Render the points
	        this.context.beginPath();
	        this.context.moveTo(pointer.positionDown.x, pointer.positionDown.y);
	        this.context.lineTo(pointer.position.x, pointer.position.y);
	        this.context.lineWidth = 2;
	        this.context.stroke();
	        this.context.closePath();

	        //  Render the text
	        this.line('ID: ' + pointer.id + " Active: " + pointer.active);
	        this.line('World X: ' + pointer.worldX + " World Y: " + pointer.worldY);
	        this.line('Screen X: ' + pointer.x + " Screen Y: " + pointer.y + " In: " + pointer.withinGame);
	        this.line('Duration: ' + pointer.duration + " ms");
	        this.line('is Down: ' + pointer.isDown + " is Up: " + pointer.isUp);
	        this.stop();

	    },

	    /**
	    * Render Sprite Input Debug information.
	    *
	    * @method Phaser.Utils.Debug#spriteInputInfo
	    * @param {Phaser.Sprite|Phaser.Image} sprite - The sprite to display the input data for.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    spriteInputInfo: function (sprite, x, y, color) {

	        this.start(x, y, color);
	        this.line('Sprite Input: (' + sprite.width + ' x ' + sprite.height + ')');
	        this.line('x: ' + sprite.input.pointerX().toFixed(1) + ' y: ' + sprite.input.pointerY().toFixed(1));
	        this.line('over: ' + sprite.input.pointerOver() + ' duration: ' + sprite.input.overDuration().toFixed(0));
	        this.line('down: ' + sprite.input.pointerDown() + ' duration: ' + sprite.input.downDuration().toFixed(0));
	        this.line('just over: ' + sprite.input.justOver() + ' just out: ' + sprite.input.justOut());
	        this.stop();

	    },

	    /**
	    * Renders Phaser.Key object information.
	    *
	    * @method Phaser.Utils.Debug#key
	    * @param {Phaser.Key} key - The Key to render the information for.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    key: function (key, x, y, color) {

	        this.start(x, y, color, 150);

	        this.line('Key:', key.keyCode, 'isDown:', key.isDown);
	        this.line('justDown:', key.justDown, 'justUp:', key.justUp);
	        this.line('Time Down:', key.timeDown.toFixed(0), 'duration:', key.duration.toFixed(0));

	        this.stop();

	    },

	    /**
	    * Render debug information about the Input object.
	    *
	    * @method Phaser.Utils.Debug#inputInfo
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    inputInfo: function (x, y, color) {

	        this.start(x, y, color);
	        this.line('Input');
	        this.line('X: ' + this.game.input.x + ' Y: ' + this.game.input.y);
	        this.line('World X: ' + this.game.input.worldX + ' World Y: ' + this.game.input.worldY);
	        this.line('Scale X: ' + this.game.input.scale.x.toFixed(1) + ' Scale Y: ' + this.game.input.scale.x.toFixed(1));
	        this.line('Screen X: ' + this.game.input.activePointer.screenX + ' Screen Y: ' + this.game.input.activePointer.screenY);
	        this.stop();

	    },

	    /**
	    * Renders the Sprites bounds. Note: This is really expensive as it has to calculate the bounds every time you call it!
	    *
	    * @method Phaser.Utils.Debug#spriteBounds
	    * @param {Phaser.Sprite|Phaser.Image} sprite - The sprite to display the bounds of.
	    * @param {string} [color] - Color of the debug info to be rendered (format is css color string).
	    * @param {boolean} [filled=true] - Render the rectangle as a fillRect (default, true) or a strokeRect (false)
	    */
	    spriteBounds: function (sprite, color, filled) {

	        var bounds = sprite.getBounds();

	        bounds.x += this.game.camera.x;
	        bounds.y += this.game.camera.y;

	        this.rectangle(bounds, color, filled);

	    },

	    /**
	    * Renders the Rope's segments. Note: This is really expensive as it has to calculate new segments every time you call it
	    *
	    * @method Phaser.Utils.Debug#ropeSegments
	    * @param {Phaser.Rope} rope - The rope to display the segments of.
	    * @param {string} [color] - Color of the debug info to be rendered (format is css color string).
	    * @param {boolean} [filled=true] - Render the rectangle as a fillRect (default, true) or a strokeRect (false)
	    */
	    ropeSegments: function (rope, color, filled) {

	        var segments = rope.segments;

	        var self = this;

	        segments.forEach(function(segment) {
	            self.rectangle(segment, color, filled);
	        }, this);

	    },

	    /**
	    * Render debug infos (including name, bounds info, position and some other properties) about the Sprite.
	    *
	    * @method Phaser.Utils.Debug#spriteInfo
	    * @param {Phaser.Sprite} sprite - The Sprite to display the information of.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    spriteInfo: function (sprite, x, y, color) {

	        this.start(x, y, color);

	        this.line('Sprite: ' + ' (' + sprite.width + ' x ' + sprite.height + ') anchor: ' + sprite.anchor.x + ' x ' + sprite.anchor.y);
	        this.line('x: ' + sprite.x.toFixed(1) + ' y: ' + sprite.y.toFixed(1));
	        this.line('angle: ' + sprite.angle.toFixed(1) + ' rotation: ' + sprite.rotation.toFixed(1));
	        this.line('visible: ' + sprite.visible + ' in camera: ' + sprite.inCamera);
	        this.line('bounds x: ' + sprite._bounds.x.toFixed(1) + ' y: ' + sprite._bounds.y.toFixed(1) + ' w: ' + sprite._bounds.width.toFixed(1) + ' h: ' + sprite._bounds.height.toFixed(1));

	        this.stop();

	    },

	    /**
	    * Renders the sprite coordinates in local, positional and world space.
	    *
	    * @method Phaser.Utils.Debug#spriteCoords
	    * @param {Phaser.Sprite|Phaser.Image} sprite - The sprite to display the coordinates for.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    spriteCoords: function (sprite, x, y, color) {

	        this.start(x, y, color, 100);

	        if (sprite.name)
	        {
	            this.line(sprite.name);
	        }

	        this.line('x:', sprite.x.toFixed(2), 'y:', sprite.y.toFixed(2));
	        this.line('pos x:', sprite.position.x.toFixed(2), 'pos y:', sprite.position.y.toFixed(2));
	        this.line('world x:', sprite.world.x.toFixed(2), 'world y:', sprite.world.y.toFixed(2));

	        this.stop();

	    },

	    /**
	    * Renders Line information in the given color.
	    *
	    * @method Phaser.Utils.Debug#lineInfo
	    * @param {Phaser.Line} line - The Line to display the data for.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    lineInfo: function (line, x, y, color) {

	        this.start(x, y, color, 80);
	        this.line('start.x:', line.start.x.toFixed(2), 'start.y:', line.start.y.toFixed(2));
	        this.line('end.x:', line.end.x.toFixed(2), 'end.y:', line.end.y.toFixed(2));
	        this.line('length:', line.length.toFixed(2), 'angle:', line.angle);
	        this.stop();

	    },

	    /**
	    * Renders a single pixel at the given size.
	    *
	    * @method Phaser.Utils.Debug#pixel
	    * @param {number} x - X position of the pixel to be rendered.
	    * @param {number} y - Y position of the pixel to be rendered.
	    * @param {string} [color] - Color of the pixel (format is css color string).
	    * @param {number} [size=2] - The 'size' to render the pixel at.
	    */
	    pixel: function (x, y, color, size) {

	        size = size || 2;

	        this.start();
	        this.context.fillStyle = color;
	        this.context.fillRect(x, y, size, size);
	        this.stop();

	    },

	    /**
	    * Renders a Phaser geometry object including Rectangle, Circle, Point or Line.
	    *
	    * @method Phaser.Utils.Debug#geom
	    * @param {Phaser.Rectangle|Phaser.Circle|Phaser.Point|Phaser.Line} object - The geometry object to render.
	    * @param {string} [color] - Color of the debug info to be rendered (format is css color string).
	    * @param {boolean} [filled=true] - Render the objected as a filled (default, true) or a stroked (false)
	    * @param {number} [forceType=0] - Force rendering of a specific type. If 0 no type will be forced, otherwise 1 = Rectangle, 2 = Circle, 3 = Point and 4 = Line.
	    */
	    geom: function (object, color, filled, forceType) {

	        if (filled === undefined) { filled = true; }
	        if (forceType === undefined) { forceType = 0; }

	        color = color || 'rgba(0,255,0,0.4)';

	        this.start();

	        this.context.fillStyle = color;
	        this.context.strokeStyle = color;

	        if (object instanceof Phaser.Rectangle || forceType === 1)
	        {
	            if (filled)
	            {
	                this.context.fillRect(object.x - this.game.camera.x, object.y - this.game.camera.y, object.width, object.height);
	            }
	            else
	            {
	                this.context.strokeRect(object.x - this.game.camera.x, object.y - this.game.camera.y, object.width, object.height);
	            }
	        }
	        else if (object instanceof Phaser.Circle || forceType === 2)
	        {
	            this.context.beginPath();
	            this.context.arc(object.x - this.game.camera.x, object.y - this.game.camera.y, object.radius, 0, Math.PI * 2, false);
	            this.context.closePath();

	            if (filled)
	            {
	                this.context.fill();
	            }
	            else
	            {
	                this.context.stroke();
	            }
	        }
	        else if (object instanceof Phaser.Point || forceType === 3)
	        {
	            this.context.fillRect(object.x - this.game.camera.x, object.y - this.game.camera.y, 4, 4);
	        }
	        else if (object instanceof Phaser.Line || forceType === 4)
	        {
	            this.context.lineWidth = 1;
	            this.context.beginPath();
	            this.context.moveTo((object.start.x + 0.5) - this.game.camera.x, (object.start.y + 0.5) - this.game.camera.y);
	            this.context.lineTo((object.end.x + 0.5) - this.game.camera.x, (object.end.y + 0.5) - this.game.camera.y);
	            this.context.closePath();
	            this.context.stroke();
	        }

	        this.stop();

	    },

	    /**
	    * Renders a Rectangle.
	    *
	    * @method Phaser.Utils.Debug#geom
	    * @param {Phaser.Rectangle|object} object - The geometry object to render.
	    * @param {string} [color] - Color of the debug info to be rendered (format is css color string).
	    * @param {boolean} [filled=true] - Render the objected as a filled (default, true) or a stroked (false)
	    */
	    rectangle: function (object, color, filled) {

	        if (filled === undefined) { filled = true; }

	        color = color || 'rgba(0, 255, 0, 0.4)';

	        this.start();

	        if (filled)
	        {
	            this.context.fillStyle = color;
	            this.context.fillRect(object.x - this.game.camera.x, object.y - this.game.camera.y, object.width, object.height);
	        }
	        else
	        {
	            this.context.strokeStyle = color;
	            this.context.strokeRect(object.x - this.game.camera.x, object.y - this.game.camera.y, object.width, object.height);
	        }

	        this.stop();

	    },

	    /**
	    * Render a string of text.
	    *
	    * @method Phaser.Utils.Debug#text
	    * @param {string} text - The line of text to draw.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color] - Color of the debug info to be rendered (format is css color string).
	    * @param {string} [font] - The font of text to draw.
	    */
	    text: function (text, x, y, color, font) {

	        color = color || 'rgb(255,255,255)';
	        font = font || '16px Courier';

	        this.start();
	        this.context.font = font;

	        if (this.renderShadow)
	        {
	            this.context.fillStyle = 'rgb(0,0,0)';
	            this.context.fillText(text, x + 1, y + 1);
	        }

	        this.context.fillStyle = color;
	        this.context.fillText(text, x, y);

	        this.stop();

	    },

	    /**
	    * Visually renders a QuadTree to the display.
	    *
	    * @method Phaser.Utils.Debug#quadTree
	    * @param {Phaser.QuadTree} quadtree - The quadtree to render.
	    * @param {string} color - The color of the lines in the quadtree.
	    */
	    quadTree: function (quadtree, color) {

	        color = color || 'rgba(255,0,0,0.3)';

	        this.start();

	        var bounds = quadtree.bounds;

	        if (quadtree.nodes.length === 0)
	        {
	            this.context.strokeStyle = color;
	            this.context.strokeRect(bounds.x, bounds.y, bounds.width, bounds.height);
	            this.text('size: ' + quadtree.objects.length, bounds.x + 4, bounds.y + 16, 'rgb(0,200,0)', '12px Courier');

	            this.context.strokeStyle = 'rgb(0,255,0)';

	            for (var i = 0; i < quadtree.objects.length; i++)
	            {
	                this.context.strokeRect(quadtree.objects[i].x, quadtree.objects[i].y, quadtree.objects[i].width, quadtree.objects[i].height);
	            }
	        }
	        else
	        {
	            for (var i = 0; i < quadtree.nodes.length; i++)
	            {
	                this.quadTree(quadtree.nodes[i]);
	            }
	        }

	        this.stop();

	    },

	    /**
	    * Render a Sprites Physics body if it has one set. The body is rendered as a filled or stroked rectangle.
	    * This only works for Arcade Physics, Ninja Physics (AABB and Circle only) and Box2D Physics bodies.
	    * To display a P2 Physics body you should enable debug mode on the body when creating it.
	    *
	    * @method Phaser.Utils.Debug#body
	    * @param {Phaser.Sprite} sprite - The Sprite who's body will be rendered.
	    * @param {string} [color='rgba(0,255,0,0.4)'] - Color of the debug rectangle to be rendered. The format is a CSS color string such as '#ff0000' or 'rgba(255,0,0,0.5)'.
	    * @param {boolean} [filled=true] - Render the body as a filled rectangle (true) or a stroked rectangle (false)
	    */
	    body: function (sprite, color, filled) {

	        if (sprite.body)
	        {
	            this.start();

	            if (sprite.body.type === Phaser.Physics.ARCADE)
	            {
	                Phaser.Physics.Arcade.Body.render(this.context, sprite.body, color, filled);
	            }
	            else if (sprite.body.type === Phaser.Physics.NINJA)
	            {
	                Phaser.Physics.Ninja.Body.render(this.context, sprite.body, color, filled);
	            }
	            else if (sprite.body.type === Phaser.Physics.BOX2D)
	            {
	                Phaser.Physics.Box2D.renderBody(this.context, sprite.body, color);
	            }

	            this.stop();
	        }

	    },

	    /**
	    * Render a Sprites Physic Body information.
	    *
	    * @method Phaser.Utils.Debug#bodyInfo
	    * @param {Phaser.Sprite} sprite - The sprite to be rendered.
	    * @param {number} x - X position of the debug info to be rendered.
	    * @param {number} y - Y position of the debug info to be rendered.
	    * @param {string} [color='rgb(255,255,255)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    bodyInfo: function (sprite, x, y, color) {

	        if (sprite.body)
	        {
	            this.start(x, y, color, 210);

	            if (sprite.body.type === Phaser.Physics.ARCADE)
	            {
	                Phaser.Physics.Arcade.Body.renderBodyInfo(this, sprite.body);
	            }
	            else if (sprite.body.type === Phaser.Physics.BOX2D)
	            {
	                this.game.physics.box2d.renderBodyInfo(this, sprite.body);
	            }

	            this.stop();
	        }

	    },

	    /**
	    * Renders 'debug draw' data for the Box2D world if it exists.
	    * This uses the standard debug drawing feature of Box2D, so colors will be decided by
	    * the Box2D engine.
	    *
	    * @method Phaser.Utils.Debug#box2dWorld
	    */
	    box2dWorld: function () {
	    
	        this.start();
	        
	        this.context.translate(-this.game.camera.view.x, -this.game.camera.view.y, 0);
	        this.game.physics.box2d.renderDebugDraw(this.context);
	        
	        this.stop();

	    },

	    /**
	    * Renders 'debug draw' data for the given Box2D body.
	    * This uses the standard debug drawing feature of Box2D, so colors will be decided by the Box2D engine.
	    *
	    * @method Phaser.Utils.Debug#box2dBody
	    * @param {Phaser.Sprite} sprite - The sprite whos body will be rendered.
	    * @param {string} [color='rgb(0,255,0)'] - color of the debug info to be rendered. (format is css color string).
	    */
	    box2dBody: function (body, color) {
	    
	        this.start();
	        Phaser.Physics.Box2D.renderBody(this.context, body, color);
	        this.stop();

	    },

	    /**
	    * Destroy this object.
	    *
	    * @method Phaser.Utils.Debug#destroy
	    */
	    destroy: function () {
	    
	        PIXI.CanvasPool.remove(this);

	    }

	};

	Debug.prototype.constructor = Debug;

	module.exports = Debug;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	* @author       Richard Davey <rich@photonstorm.com>
	* @copyright    2015 Photon Storm Ltd.
	* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
	*/

	var PIXI = __webpack_require__(15);

	/**
	* A BitmapData object contains a Canvas element to which you can draw anything you like via normal Canvas context operations.
	* A single BitmapData can be used as the texture for one or many Images/Sprites. 
	* So if you need to dynamically create a Sprite texture then they are a good choice.
	*
	* @class Phaser.BitmapData
	* @constructor
	* @param {Phaser.Game} game - A reference to the currently running game.
	* @param {string} key - Internal Phaser reference key for the BitmapData.
	* @param {number} [width=256] - The width of the BitmapData in pixels. If undefined or zero it's set to a default value.
	* @param {number} [height=256] - The height of the BitmapData in pixels. If undefined or zero it's set to a default value.
	*/
	var BitmapData = function (game, key, width, height) {

	    if (width === undefined || width === 0) { width = 256; }
	    if (height === undefined || height === 0) { height = 256; }

	    /**
	    * @property {Phaser.Game} game - A reference to the currently running game.
	    */
	    this.game = game;

	    /**
	    * @property {string} key - The key of the BitmapData in the Cache, if stored there.
	    */
	    this.key = key;

	    /**
	    * @property {number} width - The width of the BitmapData in pixels.
	    */
	    this.width = width;

	    /**
	    * @property {number} height - The height of the BitmapData in pixels.
	    */
	    this.height = height;

	    /**
	    * @property {HTMLCanvasElement} canvas - The canvas to which this BitmapData draws.
	    * @default
	    */
	    // this.canvas = Phaser.Canvas.create(width, height, '', true);
	    this.canvas = PIXI.CanvasPool.create(this, width, height);

	    /**
	    * @property {CanvasRenderingContext2D} context - The 2d context of the canvas.
	    * @default
	    */
	    this.context = this.canvas.getContext('2d', { alpha: true });

	    /**
	    * @property {CanvasRenderingContext2D} ctx - A reference to BitmapData.context.
	    */
	    this.ctx = this.context;

	    /**
	    * @property {ImageData} imageData - The context image data.
	    * Please note that a call to BitmapData.draw() or BitmapData.copy() does not update immediately this property for performance reason. Use BitmapData.update() to do so.
	    * This property is updated automatically after the first game loop, according to the dirty flag property.
	    */
	    this.imageData = this.context.getImageData(0, 0, width, height);

	    /**
	    * A Uint8ClampedArray view into BitmapData.buffer.
	    * Note that this is unavailable in some browsers (such as Epic Browser due to its security restrictions)
	    * @property {Uint8ClampedArray} data
	    */
	    this.data = null;

	    if (this.imageData)
	    {
	        this.data = this.imageData.data;
	    }

	    /**
	    * @property {Uint32Array} pixels - An Uint32Array view into BitmapData.buffer.
	    */
	    this.pixels = null;

	    /**
	    * @property {ArrayBuffer} buffer - An ArrayBuffer the same size as the context ImageData.
	    */
	    if (this.data)
	    {
	        if (this.imageData.data.buffer)
	        {
	            this.buffer = this.imageData.data.buffer;
	            this.pixels = new Uint32Array(this.buffer);
	        }
	        else
	        {
	            if (window['ArrayBuffer'])
	            {
	                this.buffer = new ArrayBuffer(this.imageData.data.length);
	                this.pixels = new Uint32Array(this.buffer);
	            }
	            else
	            {
	                this.pixels = this.imageData.data;
	            }
	        }
	    }

	    /**
	    * @property {PIXI.BaseTexture} baseTexture - The PIXI.BaseTexture.
	    * @default
	    */
	    this.baseTexture = new PIXI.BaseTexture(this.canvas);

	    /**
	    * @property {PIXI.Texture} texture - The PIXI.Texture.
	    * @default
	    */
	    this.texture = new PIXI.Texture(this.baseTexture);

	    /**
	    * @property {Phaser.Frame} textureFrame - The Frame this BitmapData uses for rendering.
	    * @default
	    */
	    this.textureFrame = new Phaser.Frame(0, 0, 0, width, height, 'bitmapData');

	    this.texture.frame = this.textureFrame;

	    /**
	    * @property {number} type - The const type of this object.
	    * @default
	    */
	    this.type = Phaser.BITMAPDATA;

	    /**
	    * @property {boolean} disableTextureUpload - If disableTextureUpload is true this BitmapData will never send its image data to the GPU when its dirty flag is true.
	    */
	    this.disableTextureUpload = false;

	    /**
	    * @property {boolean} dirty - If dirty this BitmapData will be re-rendered.
	    */
	    this.dirty = false;

	    //  Aliases
	    this.cls = this.clear;

	    /**
	    * @property {number} _image - Internal cache var.
	    * @private
	    */
	    this._image = null;

	    /**
	    * @property {Phaser.Point} _pos - Internal cache var.
	    * @private
	    */
	    this._pos = new Phaser.Point();

	    /**
	    * @property {Phaser.Point} _size - Internal cache var.
	    * @private
	    */
	    this._size = new Phaser.Point();

	    /**
	    * @property {Phaser.Point} _scale - Internal cache var.
	    * @private
	    */
	    this._scale = new Phaser.Point();

	    /**
	    * @property {number} _rotate - Internal cache var.
	    * @private
	    */
	    this._rotate = 0;

	    /**
	    * @property {object} _alpha - Internal cache var.
	    * @private
	    */
	    this._alpha = { prev: 1, current: 1 };

	    /**
	    * @property {Phaser.Point} _anchor - Internal cache var.
	    * @private
	    */
	    this._anchor = new Phaser.Point();

	    /**
	    * @property {number} _tempR - Internal cache var.
	    * @private
	    */
	    this._tempR = 0;

	    /**
	    * @property {number} _tempG - Internal cache var.
	    * @private
	    */
	    this._tempG = 0;

	    /**
	    * @property {number} _tempB - Internal cache var.
	    * @private
	    */
	    this._tempB = 0;

	    /**
	    * @property {Phaser.Circle} _circle - Internal cache var.
	    * @private
	    */
	    this._circle = new Phaser.Circle();

	    /**
	    * @property {HTMLCanvasElement} _swapCanvas - A swap canvas.
	    * @private
	    */
	    this._swapCanvas = PIXI.CanvasPool.create(this, width, height);

	};

	BitmapData.prototype = {

	    /**
	    * Shifts the contents of this BitmapData by the distances given.
	    * 
	    * The image will wrap-around the edges on all sides if the wrap argument is true (the default).
	    *
	    * @method Phaser.BitmapData#move
	    * @param {integer} x - The amount of pixels to horizontally shift the canvas by. Use a negative value to shift to the left, positive to the right.
	    * @param {integer} y - The amount of pixels to vertically shift the canvas by. Use a negative value to shift up, positive to shift down.
	    * @param {boolean} [wrap=true] - Wrap the content of the BitmapData.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    move: function (x, y, wrap) {

	        if (x !== 0)
	        {
	            this.moveH(x, wrap);
	        }

	        if (y !== 0)
	        {
	            this.moveV(y, wrap);
	        }

	        return this;

	    },

	    /**
	    * Shifts the contents of this BitmapData horizontally.
	    * 
	    * The image will wrap-around the sides if the wrap argument is true (the default).
	    *
	    * @method Phaser.BitmapData#moveH
	    * @param {integer} distance - The amount of pixels to horizontally shift the canvas by. Use a negative value to shift to the left, positive to the right.
	    * @param {boolean} [wrap=true] - Wrap the content of the BitmapData.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    moveH: function (distance, wrap) {

	        if (wrap === undefined) { wrap = true; }

	        var c = this._swapCanvas;
	        var ctx = c.getContext('2d');
	        var h = this.height;
	        var src = this.canvas;

	        ctx.clearRect(0, 0, this.width, this.height);

	        if (distance < 0)
	        {
	            distance = Math.abs(distance);

	            //  Moving to the left
	            var w = this.width - distance;

	            //  Left-hand chunk
	            if (wrap)
	            {
	                ctx.drawImage(src, 0, 0, distance, h, w, 0, distance, h);
	            }

	            //  Rest of the image
	            ctx.drawImage(src, distance, 0, w, h, 0, 0, w, h);
	        }
	        else
	        {
	            //  Moving to the right
	            var w = this.width - distance;

	            //  Right-hand chunk
	            if (wrap)
	            {
	                ctx.drawImage(src, w, 0, distance, h, 0, 0, distance, h);
	            }

	            //  Rest of the image
	            ctx.drawImage(src, 0, 0, w, h, distance, 0, w, h);
	        }

	        this.clear();

	        return this.copy(this._swapCanvas);

	    },

	    /**
	    * Shifts the contents of this BitmapData vertically.
	    * 
	    * The image will wrap-around the sides if the wrap argument is true (the default).
	    *
	    * @method Phaser.BitmapData#moveV
	    * @param {integer} distance - The amount of pixels to vertically shift the canvas by. Use a negative value to shift up, positive to shift down.
	    * @param {boolean} [wrap=true] - Wrap the content of the BitmapData.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    moveV: function (distance, wrap) {

	        if (wrap === undefined) { wrap = true; }

	        var c = this._swapCanvas;
	        var ctx = c.getContext('2d');
	        var w = this.width;
	        var src = this.canvas;

	        ctx.clearRect(0, 0, this.width, this.height);

	        if (distance < 0)
	        {
	            distance = Math.abs(distance);

	            //  Moving up
	            var h = this.height - distance;

	            //  Top chunk
	            if (wrap)
	            {
	                ctx.drawImage(src, 0, 0, w, distance, 0, h, w, distance);
	            }

	            //  Rest of the image
	            ctx.drawImage(src, 0, distance, w, h, 0, 0, w, h);
	        }
	        else
	        {
	            //  Moving down
	            var h = this.height - distance;

	            //  Bottom chunk
	            if (wrap)
	            {
	                ctx.drawImage(src, 0, h, w, distance, 0, 0, w, distance);
	            }

	            //  Rest of the image
	            ctx.drawImage(src, 0, 0, w, h, 0, distance, w, h);
	        }

	        this.clear();

	        return this.copy(this._swapCanvas);

	    },

	    /**
	    * Updates the given objects so that they use this BitmapData as their texture.
	    * This will replace any texture they will currently have set.
	    *
	    * @method Phaser.BitmapData#add
	    * @param {Phaser.Sprite|Phaser.Sprite[]|Phaser.Image|Phaser.Image[]} object - Either a single Sprite/Image or an Array of Sprites/Images.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    add: function (object) {

	        if (Array.isArray(object))
	        {
	            for (var i = 0; i < object.length; i++)
	            {
	                if (object[i]['loadTexture'])
	                {
	                    object[i].loadTexture(this);
	                }
	            }
	        }
	        else
	        {
	            object.loadTexture(this);
	        }

	        return this;

	    },

	    /**
	    * Takes the given Game Object, resizes this BitmapData to match it and then draws it into this BitmapDatas canvas, ready for further processing.
	    * The source game object is not modified by this operation.
	    * If the source object uses a texture as part of a Texture Atlas or Sprite Sheet, only the current frame will be used for sizing.
	    * If a string is given it will assume it's a cache key and look in Phaser.Cache for an image key matching the string.
	    *
	    * @method Phaser.BitmapData#load
	    * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} source - The object that will be used to populate this BitmapData. If you give a string it will try and find the Image in the Game.Cache first.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    load: function (source) {

	        if (typeof source === 'string')
	        {
	            source = this.game.cache.getImage(source);
	        }

	        if (source)
	        {
	            this.resize(source.width, source.height);
	            this.cls();
	        }
	        else
	        {
	            return;
	        }

	        this.draw(source);

	        this.update();

	        return this;

	    },

	    /**
	    * Clears the BitmapData context using a clearRect.
	    *
	    * @method Phaser.BitmapData#cls
	    */

	    /**
	    * Clears the BitmapData context using a clearRect.
	    *
	    * You can optionally define the area to clear.
	    * If the arguments are left empty it will clear the entire canvas.
	    *
	    * @method Phaser.BitmapData#clear
	    * @param {number} [x=0] - The x coordinate of the top-left of the area to clear.
	    * @param {number} [y=0] - The y coordinate of the top-left of the area to clear.
	    * @param {number} [width] - The width of the area to clear. If undefined it will use BitmapData.width.
	    * @param {number} [height] - The height of the area to clear. If undefined it will use BitmapData.height.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    clear: function (x, y, width, height) {

	        if (x === undefined) { x = 0; }
	        if (y === undefined) { y = 0; }
	        if (width === undefined) { width = this.width; }
	        if (height === undefined) { height = this.height; }

	        this.context.clearRect(x, y, width, height);

	        this.update();

	        this.dirty = true;

	        return this;

	    },

	    /**
	    * Fills the BitmapData with the given color.
	    *
	    * @method Phaser.BitmapData#fill
	    * @param {number} r - The red color value, between 0 and 0xFF (255).
	    * @param {number} g - The green color value, between 0 and 0xFF (255).
	    * @param {number} b - The blue color value, between 0 and 0xFF (255).
	    * @param {number} [a=1] - The alpha color value, between 0 and 1.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    fill: function (r, g, b, a) {

	        if (a === undefined) { a = 1; }

	        this.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
	        this.context.fillRect(0, 0, this.width, this.height);
	        this.dirty = true;

	        return this;

	    },

	    /**
	    * Creates a new Image element by converting this BitmapDatas canvas into a dataURL.
	    *
	    * The image is then stored in the image Cache using the key given.
	    *
	    * Finally a PIXI.Texture is created based on the image and returned.
	    *
	    * You can apply the texture to a sprite or any other supporting object by using either the
	    * key or the texture. First call generateTexture:
	    *
	    * `var texture = bitmapdata.generateTexture('ball');`
	    *
	    * Then you can either apply the texture to a sprite:
	    * 
	    * `game.add.sprite(0, 0, texture);`
	    *
	    * or by using the string based key:
	    *
	    * `game.add.sprite(0, 0, 'ball');`
	    *
	    * @method Phaser.BitmapData#generateTexture
	    * @param {string} key - The key which will be used to store the image in the Cache.
	    * @return {PIXI.Texture} The newly generated texture.
	    */
	    generateTexture: function (key) {

	        var image = new Image();

	        image.src = this.canvas.toDataURL("image/png");

	        var obj = this.game.cache.addImage(key, '', image);

	        return new PIXI.Texture(obj.base);

	    },

	    /**
	    * Resizes the BitmapData. This changes the size of the underlying canvas and refreshes the buffer.
	    *
	    * @method Phaser.BitmapData#resize
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    resize: function (width, height) {

	        if (width !== this.width || height !== this.height)
	        {
	            this.width = width;
	            this.height = height;

	            this.canvas.width = width;
	            this.canvas.height = height;

	            this._swapCanvas.width = width;
	            this._swapCanvas.height = height;

	            this.baseTexture.width = width;
	            this.baseTexture.height = height;

	            this.textureFrame.width = width;
	            this.textureFrame.height = height;

	            this.texture.width = width;
	            this.texture.height = height;

	            this.texture.crop.width = width;
	            this.texture.crop.height = height;

	            this.update();
	            this.dirty = true;
	        }

	        return this;

	    },

	    /**
	    * This re-creates the BitmapData.imageData from the current context.
	    * It then re-builds the ArrayBuffer, the data Uint8ClampedArray reference and the pixels Int32Array.
	    * If not given the dimensions defaults to the full size of the context.
	    *
	    * @method Phaser.BitmapData#update
	    * @param {number} [x=0] - The x coordinate of the top-left of the image data area to grab from.
	    * @param {number} [y=0] - The y coordinate of the top-left of the image data area to grab from.
	    * @param {number} [width=1] - The width of the image data area.
	    * @param {number} [height=1] - The height of the image data area.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    update: function (x, y, width, height) {

	        if (x === undefined) { x = 0; }
	        if (y === undefined) { y = 0; }
	        if (width === undefined) { width = Math.max(1, this.width); }
	        if (height === undefined) { height = Math.max(1, this.height); }

	        this.imageData = this.context.getImageData(x, y, width, height);
	        this.data = this.imageData.data;

	        if (this.imageData.data.buffer)
	        {
	            this.buffer = this.imageData.data.buffer;
	            this.pixels = new Uint32Array(this.buffer);
	        }
	        else
	        {
	            if (window['ArrayBuffer'])
	            {
	                this.buffer = new ArrayBuffer(this.imageData.data.length);
	                this.pixels = new Uint32Array(this.buffer);
	            }
	            else
	            {
	                this.pixels = this.imageData.data;
	            }
	        }

	        return this;

	    },

	    /**
	    * Scans through the area specified in this BitmapData and sends a color object for every pixel to the given callback.
	    * The callback will be sent a color object with 6 properties: `{ r: number, g: number, b: number, a: number, color: number, rgba: string }`.
	    * Where r, g, b and a are integers between 0 and 255 representing the color component values for red, green, blue and alpha.
	    * The `color` property is an Int32 of the full color. Note the endianess of this will change per system.
	    * The `rgba` property is a CSS style rgba() string which can be used with context.fillStyle calls, among others.
	    * The callback will also be sent the pixels x and y coordinates respectively.
	    * The callback must return either `false`, in which case no change will be made to the pixel, or a new color object.
	    * If a new color object is returned the pixel will be set to the r, g, b and a color values given within it.
	    *
	    * @method Phaser.BitmapData#processPixelRGB
	    * @param {function} callback - The callback that will be sent each pixel color object to be processed.
	    * @param {object} callbackContext - The context under which the callback will be called.
	    * @param {number} [x=0] - The x coordinate of the top-left of the region to process from.
	    * @param {number} [y=0] - The y coordinate of the top-left of the region to process from.
	    * @param {number} [width] - The width of the region to process.
	    * @param {number} [height] - The height of the region to process.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    processPixelRGB: function (callback, callbackContext, x, y, width, height) {

	        if (x === undefined) { x = 0; }
	        if (y === undefined) { y = 0; }
	        if (width === undefined) { width = this.width; }
	        if (height === undefined) { height = this.height; }

	        var w = x + width;
	        var h = y + height;
	        var pixel = Phaser.Color.createColor();
	        var result = { r: 0, g: 0, b: 0, a: 0 };
	        var dirty = false;

	        for (var ty = y; ty < h; ty++)
	        {
	            for (var tx = x; tx < w; tx++)
	            {
	                Phaser.Color.unpackPixel(this.getPixel32(tx, ty), pixel);

	                result = callback.call(callbackContext, pixel, tx, ty);

	                if (result !== false && result !== null && result !== undefined)
	                {
	                    this.setPixel32(tx, ty, result.r, result.g, result.b, result.a, false);
	                    dirty = true;
	                }
	            }
	        }

	        if (dirty)
	        {
	            this.context.putImageData(this.imageData, 0, 0);
	            this.dirty = true;
	        }

	        return this;

	    },

	    /**
	    * Scans through the area specified in this BitmapData and sends the color for every pixel to the given callback along with its x and y coordinates.
	    * Whatever value the callback returns is set as the new color for that pixel, unless it returns the same color, in which case it's skipped.
	    * Note that the format of the color received will be different depending on if the system is big or little endian.
	    * It is expected that your callback will deal with endianess. If you'd rather Phaser did it then use processPixelRGB instead.
	    * The callback will also be sent the pixels x and y coordinates respectively.
	    *
	    * @method Phaser.BitmapData#processPixel
	    * @param {function} callback - The callback that will be sent each pixel color to be processed.
	    * @param {object} callbackContext - The context under which the callback will be called.
	    * @param {number} [x=0] - The x coordinate of the top-left of the region to process from.
	    * @param {number} [y=0] - The y coordinate of the top-left of the region to process from.
	    * @param {number} [width] - The width of the region to process.
	    * @param {number} [height] - The height of the region to process.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    processPixel: function (callback, callbackContext, x, y, width, height) {

	        if (x === undefined) { x = 0; }
	        if (y === undefined) { y = 0; }
	        if (width === undefined) { width = this.width; }
	        if (height === undefined) { height = this.height; }

	        var w = x + width;
	        var h = y + height;
	        var pixel = 0;
	        var result = 0;
	        var dirty = false;

	        for (var ty = y; ty < h; ty++)
	        {
	            for (var tx = x; tx < w; tx++)
	            {
	                pixel = this.getPixel32(tx, ty);
	                result = callback.call(callbackContext, pixel, tx, ty);

	                if (result !== pixel)
	                {
	                    this.pixels[ty * this.width + tx] = result;
	                    dirty = true;
	                }
	            }
	        }

	        if (dirty)
	        {
	            this.context.putImageData(this.imageData, 0, 0);
	            this.dirty = true;
	        }

	        return this;

	    },

	    /**
	    * Replaces all pixels matching one color with another. The color values are given as two sets of RGBA values.
	    * An optional region parameter controls if the replacement happens in just a specific area of the BitmapData or the entire thing. 
	    *
	    * @method Phaser.BitmapData#replaceRGB
	    * @param {number} r1 - The red color value to be replaced. Between 0 and 255.
	    * @param {number} g1 - The green color value to be replaced. Between 0 and 255.
	    * @param {number} b1 - The blue color value to be replaced. Between 0 and 255.
	    * @param {number} a1 - The alpha color value to be replaced. Between 0 and 255.
	    * @param {number} r2 - The red color value that is the replacement color. Between 0 and 255.
	    * @param {number} g2 - The green color value that is the replacement color. Between 0 and 255.
	    * @param {number} b2 - The blue color value that is the replacement color. Between 0 and 255.
	    * @param {number} a2 - The alpha color value that is the replacement color. Between 0 and 255.
	    * @param {Phaser.Rectangle} [region] - The area to perform the search over. If not given it will replace over the whole BitmapData.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    replaceRGB: function (r1, g1, b1, a1, r2, g2, b2, a2, region) {

	        var sx = 0;
	        var sy = 0;
	        var w = this.width;
	        var h = this.height;
	        var source = Phaser.Color.packPixel(r1, g1, b1, a1);

	        if (region !== undefined && region instanceof Phaser.Rectangle)
	        {
	            sx = region.x;
	            sy = region.y;
	            w = region.width;
	            h = region.height;
	        }

	        for (var y = 0; y < h; y++)
	        {
	            for (var x = 0; x < w; x++)
	            {
	                if (this.getPixel32(sx + x, sy + y) === source)
	                {
	                    this.setPixel32(sx + x, sy + y, r2, g2, b2, a2, false);
	                }
	            }
	        }

	        this.context.putImageData(this.imageData, 0, 0);
	        this.dirty = true;

	        return this;

	    },

	    /**
	    * Sets the hue, saturation and lightness values on every pixel in the given region, or the whole BitmapData if no region was specified.
	    *
	    * @method Phaser.BitmapData#setHSL
	    * @param {number} [h=null] - The hue, in the range 0 - 1.
	    * @param {number} [s=null] - The saturation, in the range 0 - 1.
	    * @param {number} [l=null] - The lightness, in the range 0 - 1.
	    * @param {Phaser.Rectangle} [region] - The area to perform the operation on. If not given it will run over the whole BitmapData.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    setHSL: function (h, s, l, region) {

	        if (h === undefined || h === null) { h = false; }
	        if (s === undefined || s === null) { s = false; }
	        if (l === undefined || l === null) { l = false; }

	        if (!h && !s && !l)
	        {
	            return;
	        }

	        if (region === undefined)
	        {
	            region = new Phaser.Rectangle(0, 0, this.width, this.height);
	        }

	        var pixel = Phaser.Color.createColor();

	        for (var y = region.y; y < region.bottom; y++)
	        {
	            for (var x = region.x; x < region.right; x++)
	            {
	                Phaser.Color.unpackPixel(this.getPixel32(x, y), pixel, true);

	                if (h)
	                {
	                    pixel.h = h;
	                }

	                if (s)
	                {
	                    pixel.s = s;
	                }

	                if (l)
	                {
	                    pixel.l = l;
	                }

	                Phaser.Color.HSLtoRGB(pixel.h, pixel.s, pixel.l, pixel);
	                this.setPixel32(x, y, pixel.r, pixel.g, pixel.b, pixel.a, false);
	            }
	        }

	        this.context.putImageData(this.imageData, 0, 0);
	        this.dirty = true;

	        return this;

	    },

	    /**
	    * Shifts any or all of the hue, saturation and lightness values on every pixel in the given region, or the whole BitmapData if no region was specified.
	    * Shifting will add the given value onto the current h, s and l values, not replace them.
	    * The hue is wrapped to keep it within the range 0 to 1. Saturation and lightness are clamped to not exceed 1.
	    *
	    * @method Phaser.BitmapData#shiftHSL
	    * @param {number} [h=null] - The amount to shift the hue by.
	    * @param {number} [s=null] - The amount to shift the saturation by.
	    * @param {number} [l=null] - The amount to shift the lightness by.
	    * @param {Phaser.Rectangle} [region] - The area to perform the operation on. If not given it will run over the whole BitmapData.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    shiftHSL: function (h, s, l, region) {

	        if (h === undefined || h === null) { h = false; }
	        if (s === undefined || s === null) { s = false; }
	        if (l === undefined || l === null) { l = false; }

	        if (!h && !s && !l)
	        {
	            return;
	        }

	        if (region === undefined)
	        {
	            region = new Phaser.Rectangle(0, 0, this.width, this.height);
	        }

	        var pixel = Phaser.Color.createColor();

	        for (var y = region.y; y < region.bottom; y++)
	        {
	            for (var x = region.x; x < region.right; x++)
	            {
	                Phaser.Color.unpackPixel(this.getPixel32(x, y), pixel, true);

	                if (h)
	                {
	                    pixel.h = this.game.math.wrap(pixel.h + h, 0, 1);
	                }

	                if (s)
	                {
	                    pixel.s = this.game.math.limitValue(pixel.s + s, 0, 1);
	                }

	                if (l)
	                {
	                    pixel.l = this.game.math.limitValue(pixel.l + l, 0, 1);
	                }

	                Phaser.Color.HSLtoRGB(pixel.h, pixel.s, pixel.l, pixel);
	                this.setPixel32(x, y, pixel.r, pixel.g, pixel.b, pixel.a, false);
	            }
	        }

	        this.context.putImageData(this.imageData, 0, 0);
	        this.dirty = true;

	        return this;

	    },

	    /**
	    * Sets the color of the given pixel to the specified red, green, blue and alpha values.
	    *
	    * @method Phaser.BitmapData#setPixel32
	    * @param {number} x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} red - The red color value, between 0 and 0xFF (255).
	    * @param {number} green - The green color value, between 0 and 0xFF (255).
	    * @param {number} blue - The blue color value, between 0 and 0xFF (255).
	    * @param {number} alpha - The alpha color value, between 0 and 0xFF (255).
	    * @param {boolean} [immediate=true] - If `true` the context.putImageData will be called and the dirty flag set.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    setPixel32: function (x, y, red, green, blue, alpha, immediate) {

	        if (immediate === undefined) { immediate = true; }

	        if (x >= 0 && x <= this.width && y >= 0 && y <= this.height)
	        {
	            if (Phaser.Device.LITTLE_ENDIAN)
	            {
	                this.pixels[y * this.width + x] = (alpha << 24) | (blue << 16) | (green << 8) | red;
	            }
	            else
	            {
	                this.pixels[y * this.width + x] = (red << 24) | (green << 16) | (blue << 8) | alpha;
	            }

	            if (immediate)
	            {
	                this.context.putImageData(this.imageData, 0, 0);
	                this.dirty = true;
	            }
	        }

	        return this;

	    },

	    /**
	    * Sets the color of the given pixel to the specified red, green and blue values.
	    *
	    * @method Phaser.BitmapData#setPixel
	    * @param {number} x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} red - The red color value, between 0 and 0xFF (255).
	    * @param {number} green - The green color value, between 0 and 0xFF (255).
	    * @param {number} blue - The blue color value, between 0 and 0xFF (255).
	    * @param {boolean} [immediate=true] - If `true` the context.putImageData will be called and the dirty flag set.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    setPixel: function (x, y, red, green, blue, immediate) {

	        return this.setPixel32(x, y, red, green, blue, 255, immediate);

	    },

	    /**
	    * Get the color of a specific pixel in the context into a color object.
	    * If you have drawn anything to the BitmapData since it was created you must call BitmapData.update to refresh the array buffer,
	    * otherwise this may return out of date color values, or worse - throw a run-time error as it tries to access an array element that doesn't exist.
	    *
	    * @method Phaser.BitmapData#getPixel
	    * @param {number} x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {object} [out] - An object into which 4 properties will be created: r, g, b and a. If not provided a new object will be created.
	    * @return {object} An object with the red, green, blue and alpha values set in the r, g, b and a properties.
	    */
	    getPixel: function (x, y, out) {

	        if (!out)
	        {
	            out = Phaser.Color.createColor();
	        }

	        var index = ~~(x + (y * this.width));

	        index *= 4;

	        out.r = this.data[index];
	        out.g = this.data[++index];
	        out.b = this.data[++index];
	        out.a = this.data[++index];

	        return out;

	    },

	    /**
	    * Get the color of a specific pixel including its alpha value.
	    * If you have drawn anything to the BitmapData since it was created you must call BitmapData.update to refresh the array buffer,
	    * otherwise this may return out of date color values, or worse - throw a run-time error as it tries to access an array element that doesn't exist.
	    * Note that on little-endian systems the format is 0xAABBGGRR and on big-endian the format is 0xRRGGBBAA.
	    *
	    * @method Phaser.BitmapData#getPixel32
	    * @param {number} x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @return {number} A native color value integer (format: 0xAARRGGBB)
	    */
	    getPixel32: function (x, y) {

	        if (x >= 0 && x <= this.width && y >= 0 && y <= this.height)
	        {
	            return this.pixels[y * this.width + x];
	        }

	    },

	    /**
	    * Get the color of a specific pixel including its alpha value as a color object containing r,g,b,a and rgba properties.
	    * If you have drawn anything to the BitmapData since it was created you must call BitmapData.update to refresh the array buffer,
	    * otherwise this may return out of date color values, or worse - throw a run-time error as it tries to access an array element that doesn't exist.
	    *
	    * @method Phaser.BitmapData#getPixelRGB
	    * @param {number} x - The x coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {number} y - The y coordinate of the pixel to be set. Must lay within the dimensions of this BitmapData.
	    * @param {object} [out] - An object into which 3 properties will be created: r, g and b. If not provided a new object will be created.
	    * @param {boolean} [hsl=false] - Also convert the rgb values into hsl?
	    * @param {boolean} [hsv=false] - Also convert the rgb values into hsv?
	    * @return {object} An object with the red, green and blue values set in the r, g and b properties.
	    */
	    getPixelRGB: function (x, y, out, hsl, hsv) {

	        return Phaser.Color.unpackPixel(this.getPixel32(x, y), out, hsl, hsv);

	    },

	    /**
	    * Gets all the pixels from the region specified by the given Rectangle object.
	    *
	    * @method Phaser.BitmapData#getPixels
	    * @param {Phaser.Rectangle} rect - The Rectangle region to get.
	    * @return {ImageData} Returns a ImageData object containing a Uint8ClampedArray data property.
	    */
	    getPixels: function (rect) {

	        return this.context.getImageData(rect.x, rect.y, rect.width, rect.height);

	    },

	    /**
	    * Scans the BitmapData, pixel by pixel, until it encounters a pixel that isn't transparent (i.e. has an alpha value > 0).
	    * It then stops scanning and returns an object containing the color of the pixel in r, g and b properties and the location in the x and y properties.
	    * 
	    * The direction parameter controls from which direction it should start the scan:
	    * 
	    * 0 = top to bottom
	    * 1 = bottom to top
	    * 2 = left to right
	    * 3 = right to left
	    *
	    * @method Phaser.BitmapData#getFirstPixel
	    * @param {number} [direction=0] - The direction in which to scan for the first pixel. 0 = top to bottom, 1 = bottom to top, 2 = left to right and 3 = right to left.
	    * @return {object} Returns an object containing the color of the pixel in the `r`, `g` and `b` properties and the location in the `x` and `y` properties.
	    */
	    getFirstPixel: function (direction) {

	        if (direction === undefined) { direction = 0; }

	        var pixel = Phaser.Color.createColor();

	        var x = 0;
	        var y = 0;
	        var v = 1;
	        var scan = false;

	        if (direction === 1)
	        {
	            v = -1;
	            y = this.height;
	        }
	        else if (direction === 3)
	        {
	            v = -1;
	            x = this.width;
	        }

	        do {

	            Phaser.Color.unpackPixel(this.getPixel32(x, y), pixel);

	            if (direction === 0 || direction === 1)
	            {
	                //  Top to Bottom / Bottom to Top
	                x++;

	                if (x === this.width)
	                {
	                    x = 0;
	                    y += v;

	                    if (y >= this.height || y <= 0)
	                    {
	                        scan = true;
	                    }
	                }
	            }
	            else if (direction === 2 || direction === 3)
	            {
	                //  Left to Right / Right to Left
	                y++;

	                if (y === this.height)
	                {
	                    y = 0;
	                    x += v;

	                    if (x >= this.width || x <= 0)
	                    {
	                        scan = true;
	                    }
	                }
	            }
	        }
	        while (pixel.a === 0 && !scan);

	        pixel.x = x;
	        pixel.y = y;

	        return pixel;

	    },

	    /**
	    * Scans the BitmapData and calculates the bounds. This is a rectangle that defines the extent of all non-transparent pixels.
	    * The rectangle returned will extend from the top-left of the image to the bottom-right, excluding transparent pixels.
	    *
	    * @method Phaser.BitmapData#getBounds
	    * @param {Phaser.Rectangle} [rect] - If provided this Rectangle object will be populated with the bounds, otherwise a new object will be created.
	    * @return {Phaser.Rectangle} A Rectangle whose dimensions encompass the full extent of non-transparent pixels in this BitmapData.
	    */
	    getBounds: function (rect) {

	        if (rect === undefined) { rect = new Phaser.Rectangle(); }

	        rect.x = this.getFirstPixel(2).x;

	        //  If we hit this, there's no point scanning any more, the image is empty
	        if (rect.x === this.width)
	        {
	            return rect.setTo(0, 0, 0, 0);
	        }

	        rect.y = this.getFirstPixel(0).y;
	        rect.width = (this.getFirstPixel(3).x - rect.x) + 1;
	        rect.height = (this.getFirstPixel(1).y - rect.y) + 1;

	        return rect;

	    },

	    /**
	    * Creates a new Phaser.Image object, assigns this BitmapData to be its texture, adds it to the world then returns it.
	    *
	    * @method Phaser.BitmapData#addToWorld
	    * @param {number} [x=0] - The x coordinate to place the Image at.
	    * @param {number} [y=0] - The y coordinate to place the Image at.
	    * @param {number} [anchorX=0] - Set the x anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
	    * @param {number} [anchorY=0] - Set the y anchor point of the Image. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
	    * @param {number} [scaleX=1] - The horizontal scale factor of the Image. A value of 1 means no scaling. 2 would be twice the size, and so on.
	    * @param {number} [scaleY=1] - The vertical scale factor of the Image. A value of 1 means no scaling. 2 would be twice the size, and so on.
	    * @return {Phaser.Image} The newly added Image object.
	    */
	    addToWorld: function (x, y, anchorX, anchorY, scaleX, scaleY) {

	        scaleX = scaleX || 1;
	        scaleY = scaleY || 1;

	        var image = this.game.add.image(x, y, this);

	        image.anchor.set(anchorX, anchorY);
	        image.scale.set(scaleX, scaleY);

	        return image;

	    },

	    /**
	     * Copies a rectangular area from the source object to this BitmapData. If you give `null` as the source it will copy from itself.
	     * You can optionally resize, translate, rotate, scale, alpha or blend as it's drawn.
	     * All rotation, scaling and drawing takes place around the regions center point by default, but can be changed with the anchor parameters.
	     * Note that the source image can also be this BitmapData, which can create some interesting effects.
	     * 
	     * This method has a lot of parameters for maximum control.
	     * You can use the more friendly methods like `copyRect` and `draw` to avoid having to remember them all.
	     *
	     * @method Phaser.BitmapData#copy
	     * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} [source] - The source to copy from. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself.
	     * @param {number} [x=0] - The x coordinate representing the top-left of the region to copy from the source image.
	     * @param {number} [y=0] - The y coordinate representing the top-left of the region to copy from the source image.
	     * @param {number} [width] - The width of the region to copy from the source image. If not specified it will use the full source image width.
	     * @param {number} [height] - The height of the region to copy from the source image. If not specified it will use the full source image height.
	     * @param {number} [tx] - The x coordinate to translate to before drawing. If not specified it will default to the `x` parameter. If `null` and `source` is a Display Object, it will default to `source.x`.
	     * @param {number} [ty] - The y coordinate to translate to before drawing. If not specified it will default to the `y` parameter. If `null` and `source` is a Display Object, it will default to `source.y`.
	     * @param {number} [newWidth] - The new width of the block being copied. If not specified it will default to the `width` parameter.
	     * @param {number} [newHeight] - The new height of the block being copied. If not specified it will default to the `height` parameter.
	     * @param {number} [rotate=0] - The angle in radians to rotate the block to before drawing. Rotation takes place around the center by default, but can be changed with the `anchor` parameters.
	     * @param {number} [anchorX=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
	     * @param {number} [anchorY=0] - The anchor point around which the block is rotated and scaled. A value between 0 and 1, where 0 is the top-left and 1 is bottom-right.
	     * @param {number} [scaleX=1] - The horizontal scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
	     * @param {number} [scaleY=1] - The vertical scale factor of the block. A value of 1 means no scaling. 2 would be twice the size, and so on.
	     * @param {number} [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
	     * @param {string} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
	     * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
	     * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	     */
	    copy: function (source, x, y, width, height, tx, ty, newWidth, newHeight, rotate, anchorX, anchorY, scaleX, scaleY, alpha, blendMode, roundPx) {

	        if (source === undefined || source === null) { source = this; }

	        this._image = source;

	        if (source instanceof Phaser.Sprite || source instanceof Phaser.Image || source instanceof Phaser.Text || source instanceof PIXI.Sprite)
	        {
	            //  Copy over sprite values
	            this._pos.set(source.texture.crop.x, source.texture.crop.y);
	            this._size.set(source.texture.crop.width, source.texture.crop.height);
	            this._scale.set(source.scale.x, source.scale.y);
	            this._anchor.set(source.anchor.x, source.anchor.y);
	            this._rotate = source.rotation;
	            this._alpha.current = source.alpha;
	            this._image = source.texture.baseTexture.source;

	            if (tx === undefined || tx === null) { tx = source.x; }
	            if (ty === undefined || ty === null) { ty = source.y; }

	            if (source.texture.trim)
	            {
	                //  Offset the translation coordinates by the trim amount
	                tx += source.texture.trim.x - source.anchor.x * source.texture.trim.width;
	                ty += source.texture.trim.y - source.anchor.y * source.texture.trim.height;
	            }

	            if (source.tint !== 0xFFFFFF)
	            {
	                if (source.cachedTint !== source.tint)
	                {
	                    source.cachedTint = source.tint;
	                    source.tintedTexture = PIXI.CanvasTinter.getTintedTexture(source, source.tint);
	                }

	                this._image = source.tintedTexture;
	            }
	        }
	        else
	        {
	            //  Reset
	            this._pos.set(0);
	            this._scale.set(1);
	            this._anchor.set(0);
	            this._rotate = 0;
	            this._alpha.current = 1;

	            if (source instanceof Phaser.BitmapData)
	            {
	                this._image = source.canvas;
	            }
	            else if (typeof source === 'string')
	            {
	                source = this.game.cache.getImage(source);

	                if (source === null)
	                {
	                    return;
	                }
	                else
	                {
	                    this._image = source;
	                }
	            }

	            this._size.set(this._image.width, this._image.height);
	        }

	        //  The source region to copy from
	        if (x === undefined || x === null) { x = 0; }
	        if (y === undefined || y === null) { y = 0; }

	        //  If they set a width/height then we override the frame values with them
	        if (width)
	        {
	            this._size.x = width;
	        }

	        if (height)
	        {
	            this._size.y = height;
	        }

	        //  The destination region to copy to
	        if (tx === undefined || tx === null) { tx = x; }
	        if (ty === undefined || ty === null) { ty = y; }
	        if (newWidth === undefined || newWidth === null) { newWidth = this._size.x; }
	        if (newHeight === undefined || newHeight === null) { newHeight = this._size.y; }

	        //  Rotation - if set this will override any potential Sprite value
	        if (typeof rotate === 'number')
	        {
	            this._rotate = rotate;
	        }

	        //  Anchor - if set this will override any potential Sprite value
	        if (typeof anchorX === 'number')
	        {
	            this._anchor.x = anchorX;
	        }

	        if (typeof anchorY === 'number')
	        {
	            this._anchor.y = anchorY;
	        }

	        //  Scaling - if set this will override any potential Sprite value
	        if (typeof scaleX === 'number')
	        {
	            this._scale.x = scaleX;
	        }

	        if (typeof scaleY === 'number')
	        {
	            this._scale.y = scaleY;
	        }

	        //  Effects
	        if (typeof alpha === 'number')
	        {
	            this._alpha.current = alpha;
	        }

	        if (blendMode === undefined) { blendMode = null; }
	        if (roundPx === undefined) { roundPx = false; }

	        if (this._alpha.current <= 0 || this._scale.x === 0 || this._scale.y === 0 || this._size.x === 0 || this._size.y === 0)
	        {
	            //  Why bother wasting CPU cycles drawing something you can't see?
	            return;
	        }

	        var ctx = this.context;

	        this._alpha.prev = ctx.globalAlpha;

	        ctx.save();

	        ctx.globalAlpha = this._alpha.current;

	        if (blendMode)
	        {
	            this.op = blendMode;
	        }

	        if (roundPx)
	        {
	            tx |= 0;
	            ty |= 0;
	        }

	        ctx.translate(tx, ty);

	        ctx.scale(this._scale.x, this._scale.y);

	        ctx.rotate(this._rotate);

	        ctx.drawImage(this._image, this._pos.x + x, this._pos.y + y, this._size.x, this._size.y, -newWidth * this._anchor.x, -newHeight * this._anchor.y, newWidth, newHeight);

	        ctx.restore();

	        ctx.globalAlpha = this._alpha.prev;

	        this.dirty = true;

	        return this;

	    },

	    /**
	    * Copies the area defined by the Rectangle parameter from the source image to this BitmapData at the given location.
	    *
	    * @method Phaser.BitmapData#copyRect
	    * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|string} source - The Image to copy from. If you give a string it will try and find the Image in the Game.Cache.
	    * @param {Phaser.Rectangle} area - The Rectangle region to copy from the source image.
	    * @param {number} x - The destination x coordinate to copy the image to.
	    * @param {number} y - The destination y coordinate to copy the image to.
	    * @param {number} [alpha=1] - The alpha that will be set on the context before drawing. A value between 0 (fully transparent) and 1, opaque.
	    * @param {string} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
	    * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    copyRect: function (source, area, x, y, alpha, blendMode, roundPx) {

	        return this.copy(source, area.x, area.y, area.width, area.height, x, y, area.width, area.height, 0, 0, 0, 1, 1, alpha, blendMode, roundPx);

	    },

	    /**
	    * Draws the given Phaser.Sprite, Phaser.Image or Phaser.Text to this BitmapData at the coordinates specified.
	    * You can use the optional width and height values to 'stretch' the sprite as it is drawn. This uses drawImage stretching, not scaling.
	    * When drawing it will take into account the Sprites rotation, scale and alpha values.
	    *
	    * @method Phaser.BitmapData#draw
	    * @param {Phaser.Sprite|Phaser.Image|Phaser.Text} source - The Sprite, Image or Text object to draw onto this BitmapData.
	    * @param {number} [x=0] - The x coordinate to translate to before drawing. If not specified it will default to `source.x`.
	    * @param {number} [y=0] - The y coordinate to translate to before drawing. If not specified it will default to `source.y`.
	    * @param {number} [width] - The new width of the Sprite being copied. If not specified it will default to `source.width`.
	    * @param {number} [height] - The new height of the Sprite being copied. If not specified it will default to `source.height`.
	    * @param {string} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
	    * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    draw: function (source, x, y, width, height, blendMode, roundPx) {

	        //  By specifying null for most parameters it will tell `copy` to use the Sprite values instead, which is what we want here
	        return this.copy(source, null, null, null, null, x, y, width, height, null, null, null, null, null, null, blendMode, roundPx);

	    },

	    /**
	    * Draws the immediate children of a Phaser.Group to this BitmapData.
	    * Children are only drawn if they have their `exists` property set to `true`.
	    * The children will be drawn at their `x` and `y` world space coordinates. If this is outside the bounds of the BitmapData they won't be drawn.
	    * When drawing it will take into account the child's rotation, scale and alpha values.
	    * No iteration takes place. Groups nested inside other Groups will not be iterated through.
	    *
	    * @method Phaser.BitmapData#drawGroup
	    * @param {Phaser.Group} group - The Group to draw onto this BitmapData.
	    * @param {string} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
	    * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    drawGroup: function (group, blendMode, roundPx) {

	        if (group.total > 0)
	        {
	            group.forEachExists(this.copy, this, null, null, null, null, null, null, null, null, null, null, null, null, null, null, blendMode, roundPx);
	        }

	        return this;

	    },

	    /**
	    * Draws the Game Object or Group to this BitmapData and then recursively iterates through all of its children.
	    * 
	    * If a child has an `exists` property then it (and its children) will be only be drawn if exists is `true`.
	    * 
	    * The children will be drawn at their `x` and `y` world space coordinates. If this is outside the bounds of the BitmapData 
	    * they won't be drawn. Depending on your requirements you may need to resize the BitmapData in advance to match the 
	    * bounds of the top-level Game Object.
	    * 
	    * When drawing it will take into account the child's world rotation, scale and alpha values.
	    *
	    * It's perfectly valid to pass in `game.world` as the parent object, and it will iterate through the entire display list.
	    * 
	    * Note: If you are trying to grab your entire game at the start of a State then you should ensure that at least 1 full update
	    * has taken place before doing so, otherwise all of the objects will render with incorrect positions and scales. You can 
	    * trigger an update yourself by calling `stage.updateTransform()` before calling `drawFull`.
	    *
	    * @method Phaser.BitmapData#drawFull
	    * @param {Phaser.World|Phaser.Group|Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapText} parent - The Game Object to draw onto this BitmapData and then recursively draw all of its children.
	    * @param {string} [blendMode=null] - The composite blend mode that will be used when drawing. The default is no blend mode at all. This is a Canvas globalCompositeOperation value such as 'lighter' or 'xor'.
	    * @param {boolean} [roundPx=false] - Should the x and y values be rounded to integers before drawing? This prevents anti-aliasing in some instances.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    drawFull: function (parent, blendMode, roundPx) {

	        if (parent.worldVisible === false || parent.worldAlpha === 0 || (parent.hasOwnProperty('exists') && parent.exists === false))
	        {
	            return this;
	        }

	        if (parent.type !== Phaser.GROUP && parent.type !== Phaser.EMITTER && parent.type !== Phaser.BITMAPTEXT)
	        {
	            if (parent.type === Phaser.GRAPHICS)
	            {
	                var bounds = parent.getBounds();
	                this.ctx.save();
	                this.ctx.translate(bounds.x, bounds.y);
	                PIXI.CanvasGraphics.renderGraphics(parent, this.ctx);
	                this.ctx.restore();
	            }
	            else
	            {
	                this.copy(parent, null, null, null, null, parent.worldPosition.x, parent.worldPosition.y, null, null, parent.worldRotation, null, null, parent.worldScale.x, parent.worldScale.y, parent.worldAlpha, blendMode, roundPx);
	            }
	        }

	        if (parent.children)
	        {
	            for (var i = 0; i < parent.children.length; i++)
	            {
	                this.drawFull(parent.children[i], blendMode, roundPx);
	            }
	        }

	        return this;

	    },

	    /**
	    * Sets the shadow properties of this BitmapDatas context which will affect all draw operations made to it.
	    * You can cancel an existing shadow by calling this method and passing no parameters.
	    * Note: At the time of writing (October 2014) Chrome still doesn't support shadowBlur used with drawImage.
	    *
	    * @method Phaser.BitmapData#shadow
	    * @param {string} color - The color of the shadow, given in a CSS format, i.e. `#000000` or `rgba(0,0,0,1)`. If `null` or `undefined` the shadow will be reset.
	    * @param {number} [blur=5] - The amount the shadow will be blurred by. Low values = a crisp shadow, high values = a softer shadow.
	    * @param {number} [x=10] - The horizontal offset of the shadow in pixels.
	    * @param {number} [y=10] - The vertical offset of the shadow in pixels.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    shadow: function (color, blur, x, y) {

	        var ctx = this.context;

	        if (color === undefined || color === null)
	        {
	            ctx.shadowColor = 'rgba(0,0,0,0)';
	        }
	        else
	        {
	            ctx.shadowColor = color;
	            ctx.shadowBlur = blur || 5;
	            ctx.shadowOffsetX = x || 10;
	            ctx.shadowOffsetY = y || 10;
	        }

	    },

	    /**
	    * Draws the image onto this BitmapData using an image as an alpha mask.
	    *
	    * @method Phaser.BitmapData#alphaMask
	    * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} source - The source to copy from. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself.
	    * @param {Phaser.Sprite|Phaser.Image|Phaser.Text|Phaser.BitmapData|Image|HTMLCanvasElement|string} [mask] - The object to be used as the mask. If you give a string it will try and find the Image in the Game.Cache first. This is quite expensive so try to provide the image itself. If you don't provide a mask it will use this BitmapData as the mask.
	    * @param {Phaser.Rectangle} [sourceRect] - A Rectangle where x/y define the coordinates to draw the Source image to and width/height define the size.
	    * @param {Phaser.Rectangle} [maskRect] - A Rectangle where x/y define the coordinates to draw the Mask image to and width/height define the size.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    alphaMask: function (source, mask, sourceRect, maskRect) {

	        if (maskRect === undefined || maskRect === null)
	        {
	            this.draw(mask).blendSourceAtop();
	        }
	        else
	        {
	            this.draw(mask, maskRect.x, maskRect.y, maskRect.width, maskRect.height).blendSourceAtop();
	        }

	        if (sourceRect === undefined || sourceRect === null)
	        {
	            this.draw(source).blendReset();
	        }
	        else
	        {
	            this.draw(source, sourceRect.x, sourceRect.y, sourceRect.width, sourceRect.height).blendReset();
	        }

	        return this;

	    },

	    /**
	    * Scans this BitmapData for all pixels matching the given r,g,b values and then draws them into the given destination BitmapData.
	    * The original BitmapData remains unchanged.
	    * The destination BitmapData must be large enough to receive all of the pixels that are scanned unless the 'resize' parameter is true.
	    * Although the destination BitmapData is returned from this method, it's actually modified directly in place, meaning this call is perfectly valid:
	    * `picture.extract(mask, r, g, b)`
	    * You can specify optional r2, g2, b2 color values. If given the pixel written to the destination bitmap will be of the r2, g2, b2 color.
	    * If not given it will be written as the same color it was extracted. You can provide one or more alternative colors, allowing you to tint
	    * the color during extraction.
	    *
	    * @method Phaser.BitmapData#extract
	    * @param {Phaser.BitmapData} destination - The BitmapData that the extracted pixels will be drawn to.
	    * @param {number} r - The red color component, in the range 0 - 255.
	    * @param {number} g - The green color component, in the range 0 - 255.
	    * @param {number} b - The blue color component, in the range 0 - 255.
	    * @param {number} [a=255] - The alpha color component, in the range 0 - 255 that the new pixel will be drawn at.
	    * @param {boolean} [resize=false] - Should the destination BitmapData be resized to match this one before the pixels are copied?
	    * @param {number} [r2] - An alternative red color component to be written to the destination, in the range 0 - 255.
	    * @param {number} [g2] - An alternative green color component to be written to the destination, in the range 0 - 255.
	    * @param {number} [b2] - An alternative blue color component to be written to the destination, in the range 0 - 255.
	    * @returns {Phaser.BitmapData} The BitmapData that the extract pixels were drawn on.
	    */
	    extract: function (destination, r, g, b, a, resize, r2, g2, b2) {

	        if (a === undefined) { a = 255; }
	        if (resize === undefined) { resize = false; }
	        if (r2 === undefined) { r2 = r; }
	        if (g2 === undefined) { g2 = g; }
	        if (b2 === undefined) { b2 = b; }

	        if (resize)
	        {
	            destination.resize(this.width, this.height);
	        }

	        this.processPixelRGB(
	            function (pixel, x, y)
	            {
	                if (pixel.r === r && pixel.g === g && pixel.b === b)
	                {
	                    destination.setPixel32(x, y, r2, g2, b2, a, false);
	                }
	                return false;
	            },
	            this);

	        destination.context.putImageData(destination.imageData, 0, 0);
	        destination.dirty = true;

	        return destination;

	    },

	    /**
	    * Draws a filled Rectangle to the BitmapData at the given x, y coordinates and width / height in size.
	    *
	    * @method Phaser.BitmapData#rect
	    * @param {number} x - The x coordinate of the top-left of the Rectangle.
	    * @param {number} y - The y coordinate of the top-left of the Rectangle.
	    * @param {number} width - The width of the Rectangle.
	    * @param {number} height - The height of the Rectangle.
	    * @param {string} [fillStyle] - If set the context fillStyle will be set to this value before the rect is drawn.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    rect: function (x, y, width, height, fillStyle) {

	        if (typeof fillStyle !== 'undefined')
	        {
	            this.context.fillStyle = fillStyle;
	        }

	        this.context.fillRect(x, y, width, height);

	        return this;

	    },

	    /**
	    * Draws text to the BitmapData in the given font and color.
	    * The default font is 14px Courier, so useful for quickly drawing debug text.
	    * If you need to do a lot of font work to this BitmapData we'd recommend implementing your own text draw method.
	    *
	    * @method Phaser.BitmapData#text
	    * @param {string} text - The text to write to the BitmapData.
	    * @param {number} x - The x coordinate of the top-left of the text string.
	    * @param {number} y - The y coordinate of the top-left of the text string.
	    * @param {string} [font='14px Courier'] - The font. This is passed directly to Context.font, so anything that can support, this can.
	    * @param {string} [color='rgb(255,255,255)'] - The color the text will be drawn in.
	    * @param {boolean} [shadow=true] - Draw a single pixel black shadow below the text (offset by text.x/y + 1)
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    text: function (text, x, y, font, color, shadow) {

	        if (x === undefined) { x = 0; }
	        if (y === undefined) { y = 0; }
	        if (font === undefined) { font = '14px Courier'; }
	        if (color === undefined) { color = 'rgb(255,255,255)'; }
	        if (shadow === undefined) { shadow = true; }

	        var ctx = this.context;
	        var prevFont = ctx.font;

	        ctx.font = font;

	        if (shadow)
	        {
	            ctx.fillStyle = 'rgb(0,0,0)';
	            ctx.fillText(text, x + 1, y + 1);
	        }
	        
	        ctx.fillStyle = color;
	        ctx.fillText(text, x, y);

	        ctx.font = prevFont;

	    },

	    /**
	    * Draws a filled Circle to the BitmapData at the given x, y coordinates and radius in size.
	    *
	    * @method Phaser.BitmapData#circle
	    * @param {number} x - The x coordinate to draw the Circle at. This is the center of the circle.
	    * @param {number} y - The y coordinate to draw the Circle at. This is the center of the circle.
	    * @param {number} radius - The radius of the Circle in pixels. The radius is half the diameter.
	    * @param {string} [fillStyle] - If set the context fillStyle will be set to this value before the circle is drawn.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    circle: function (x, y, radius, fillStyle) {

	        var ctx = this.context;

	        if (fillStyle !== undefined)
	        {
	            ctx.fillStyle = fillStyle;
	        }

	        ctx.beginPath();
	        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
	        ctx.closePath();

	        ctx.fill();

	        return this;

	    },

	    /**
	    * Draws a line between the coordinates given in the color and thickness specified.
	    *
	    * @method Phaser.BitmapData#line
	    * @param {number} x1 - The x coordinate to start the line from.
	    * @param {number} y1 - The y coordinate to start the line from.
	    * @param {number} x2 - The x coordinate to draw the line to.
	    * @param {number} y2 - The y coordinate to draw the line to.
	    * @param {string} [color='#fff'] - The stroke color that the line will be drawn in.
	    * @param {number} [width=1] - The line thickness.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    line: function (x1, y1, x2, y2, color, width) {

	        if (color === undefined) { color = '#fff'; }
	        if (width === undefined) { width = 1; }

	        var ctx = this.context;

	        ctx.beginPath();

	        ctx.moveTo(x1, y1);
	        ctx.lineTo(x2, y2);

	        ctx.lineWidth = width;
	        ctx.strokeStyle = color;
	        ctx.stroke();

	        ctx.closePath();

	        return this;

	    },

	    /**
	    * Takes the given Line object and image and renders it to this BitmapData as a repeating texture line.
	    *
	    * @method Phaser.BitmapData#textureLine
	    * @param {Phaser.Line} line - A Phaser.Line object that will be used to plot the start and end of the line.
	    * @param {string|Image} image - The key of an image in the Phaser.Cache to use as the texture for this line, or an actual Image.
	    * @param {string} [repeat='repeat-x'] - The pattern repeat mode to use when drawing the line. Either `repeat`, `repeat-x` or `no-repeat`.
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    textureLine: function (line, image, repeat) {

	        if (repeat === undefined) { repeat = 'repeat-x'; }

	        if (typeof image === 'string')
	        {
	            image = this.game.cache.getImage(image);

	            if (!image)
	            {
	                return;
	            }
	        }

	        var width = line.length;

	        if (repeat === 'no-repeat' && width > image.width)
	        {
	            width = image.width;
	        }

	        var ctx = this.context;

	        ctx.fillStyle = ctx.createPattern(image, repeat);

	        this._circle = new Phaser.Circle(line.start.x, line.start.y, image.height);

	        this._circle.circumferencePoint(line.angle - 1.5707963267948966, false, this._pos);

	        ctx.save();
	        ctx.translate(this._pos.x, this._pos.y);
	        ctx.rotate(line.angle);
	        ctx.fillRect(0, 0, width, image.height);
	        ctx.restore();

	        this.dirty = true;

	        return this;

	    },

	    /**
	    * If the game is running in WebGL this will push the texture up to the GPU if it's dirty.
	    * This is called automatically if the BitmapData is being used by a Sprite, otherwise you need to remember to call it in your render function.
	    * If you wish to suppress this functionality set BitmapData.disableTextureUpload to `true`.
	    *
	    * @method Phaser.BitmapData#render
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    render: function () {

	        if (!this.disableTextureUpload && this.dirty)
	        {
	            this.baseTexture.dirty();
	            this.dirty = false;
	        }

	        return this;

	    },

	    /**
	    * Destroys this BitmapData and puts the canvas it was using back into the canvas pool for re-use.
	    *
	    * @method Phaser.BitmapData#destroy
	    */
	    destroy: function () {

	        PIXI.CanvasPool.remove(this);

	    },

	    /**
	    * Resets the blend mode (effectively sets it to 'source-over')
	    *
	    * @method Phaser.BitmapData#blendReset
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendReset: function () {

	        this.op = 'source-over';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'source-over'
	    *
	    * @method Phaser.BitmapData#blendSourceOver
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendSourceOver: function () {

	        this.op = 'source-over';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'source-in'
	    *
	    * @method Phaser.BitmapData#blendSourceIn
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendSourceIn: function () {

	        this.op = 'source-in';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'source-out'
	    *
	    * @method Phaser.BitmapData#blendSourceOut
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendSourceOut: function () {

	        this.op = 'source-out';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'source-atop'
	    *
	    * @method Phaser.BitmapData#blendSourceAtop
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendSourceAtop: function () {

	        this.op = 'source-atop';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'destination-over'
	    *
	    * @method Phaser.BitmapData#blendDestinationOver
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendDestinationOver: function () {

	        this.op = 'destination-over';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'destination-in'
	    *
	    * @method Phaser.BitmapData#blendDestinationIn
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendDestinationIn: function () {

	        this.op = 'destination-in';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'destination-out'
	    *
	    * @method Phaser.BitmapData#blendDestinationOut
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendDestinationOut: function () {

	        this.op = 'destination-out';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'destination-atop'
	    *
	    * @method Phaser.BitmapData#blendDestinationAtop
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendDestinationAtop: function () {

	        this.op = 'destination-atop';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'xor'
	    *
	    * @method Phaser.BitmapData#blendXor
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendXor: function () {

	        this.op = 'xor';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'lighter'
	    *
	    * @method Phaser.BitmapData#blendAdd
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendAdd: function () {

	        this.op = 'lighter';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'multiply'
	    *
	    * @method Phaser.BitmapData#blendMultiply
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendMultiply: function () {

	        this.op = 'multiply';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'screen'
	    *
	    * @method Phaser.BitmapData#blendScreen
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendScreen: function () {

	        this.op = 'screen';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'overlay'
	    *
	    * @method Phaser.BitmapData#blendOverlay
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendOverlay: function () {

	        this.op = 'overlay';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'darken'
	    *
	    * @method Phaser.BitmapData#blendDarken
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendDarken: function () {

	        this.op = 'darken';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'lighten'
	    *
	    * @method Phaser.BitmapData#blendLighten
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendLighten: function () {

	        this.op = 'lighten';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'color-dodge'
	    *
	    * @method Phaser.BitmapData#blendColorDodge
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendColorDodge: function () {

	        this.op = 'color-dodge';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'color-burn'
	    *
	    * @method Phaser.BitmapData#blendColorBurn
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendColorBurn: function () {

	        this.op = 'color-burn';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'hard-light'
	    *
	    * @method Phaser.BitmapData#blendHardLight
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendHardLight: function () {

	        this.op = 'hard-light';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'soft-light'
	    *
	    * @method Phaser.BitmapData#blendSoftLight
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendSoftLight: function () {

	        this.op = 'soft-light';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'difference'
	    *
	    * @method Phaser.BitmapData#blendDifference
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendDifference: function () {

	        this.op = 'difference';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'exclusion'
	    *
	    * @method Phaser.BitmapData#blendExclusion
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendExclusion: function () {

	        this.op = 'exclusion';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'hue'
	    *
	    * @method Phaser.BitmapData#blendHue
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendHue: function () {

	        this.op = 'hue';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'saturation'
	    *
	    * @method Phaser.BitmapData#blendSaturation
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendSaturation: function () {

	        this.op = 'saturation';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'color'
	    *
	    * @method Phaser.BitmapData#blendColor
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendColor: function () {

	        this.op = 'color';
	        return this;

	    },

	    /**
	    * Sets the blend mode to 'luminosity'
	    *
	    * @method Phaser.BitmapData#blendLuminosity
	    * @return {Phaser.BitmapData} This BitmapData object for method chaining.
	    */
	    blendLuminosity: function () {

	        this.op = 'luminosity';
	        return this;

	    }

	};

	/**
	* @memberof Phaser.BitmapData
	* @property {boolean} smoothed - Gets or sets this BitmapData.contexts smoothing enabled value.
	*/
	Object.defineProperty(BitmapData.prototype, "smoothed", {

	    get: function () {

	        Phaser.Canvas.getSmoothingEnabled(this.context);

	    },

	    set: function (value) {

	        Phaser.Canvas.setSmoothingEnabled(this.context, value);

	    }

	});

	/**
	* @memberof Phaser.BitmapData
	* @property {string} op - A short-hand code to get or set the global composite operation of the BitmapDatas canvas.
	*/
	Object.defineProperty(BitmapData.prototype, "op", {

	    get: function () {

	        return this.context.globalCompositeOperation;

	    },

	    set: function (value) {

	        this.context.globalCompositeOperation = value;

	    }

	});

	/**
	 * Gets a JavaScript object that has 6 properties set that are used by BitmapData in a transform.
	 *
	 * @method Phaser.BitmapData.getTransform
	 * @param {number} translateX - The x translate value.
	 * @param {number} translateY - The y translate value.
	 * @param {number} scaleX - The scale x value.
	 * @param {number} scaleY - The scale y value.
	 * @param {number} skewX - The skew x value.
	 * @param {number} skewY - The skew y value.
	 * @return {object} A JavaScript object containing all of the properties BitmapData needs for transforms.
	 */
	BitmapData.getTransform = function (translateX, translateY, scaleX, scaleY, skewX, skewY) {

	    if (typeof translateX !== 'number') { translateX = 0; }
	    if (typeof translateY !== 'number') { translateY = 0; }
	    if (typeof scaleX !== 'number') { scaleX = 1; }
	    if (typeof scaleY !== 'number') { scaleY = 1; }
	    if (typeof skewX !== 'number') { skewX = 0; }
	    if (typeof skewY !== 'number') { skewY = 0; }

	    return { sx: scaleX, sy: scaleY, scaleX: scaleX, scaleY: scaleY, skewX: skewX, skewY: skewY, translateX: translateX, translateY: translateY, tx: translateX, ty: translateY };

	};

	BitmapData.prototype.constructor = BitmapData;

	module.exports = BitmapData;


/***/ },
/* 27 */
/***/ function(module, exports) {

	!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n;"undefined"!=typeof window?n=window:"undefined"!=typeof global?n=global:"undefined"!=typeof self&&(n=self);var f=n;f=f.Phaser||(f.Phaser={}),f=f.Plugin||(f.Plugin={}),f.Debug=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	var ui = require('./util/ui'),
	    css = require('./styles/main.less'),
	    PerformancePanel = require('./panels/Performance'),
	    ScenePanel = require('./panels/Scene');

	/**
	 * @class Phaser.Plugin.Debug
	 * @classdesc Phaser - Debug Plugin
	 *
	 * @constructor
	 * @extends Phaser.Plugin
	 *
	 * @param {Phaser.Game} game - A reference to the currently running game.
	 * @param {Any} parent - The object that owns this plugin, usually Phaser.PluginManager.
	 */
	function Debug(game, parent) {
	    Phaser.Plugin.call(this, game, parent);

	    this.panels = {
	        performance: null,
	        scene: null
	    };

	    this.tickTimings = {
	        lastStart: 0,
	        start: 0,
	        ms: 0
	    };

	    this.timings = {
	        preUpdate: {
	            physics  : 0,
	            state    : 0,
	            plugins  : 0,
	            stage    : 0
	        },
	        update: {
	            state    : 0,
	            stage    : 0,
	            tweens   : 0,
	            sound    : 0,
	            input    : 0,
	            physics  : 0,
	            particles: 0,
	            plugins  : 0
	        },
	        postUpdate: {
	            stage    : 0,
	            plugins  : 0
	        },
	        preRender: {
	            state    : 0
	        },
	        render: {
	            renderer : 0,
	            plugins  : 0,
	            state    : 0
	        },
	        postRender: {
	            plugins  : 0
	        }
	    };

	    this._container = null;
	    this._bar = null;

	    this._stats = {
	        ms: null,
	        fps: null,
	        dpf: null,
	        ent: null
	    };

	    this.timer = (window.performance ? window.performance : Date);
	}

	//  Extends the Phaser.Plugin template, setting up values we need
	Debug.prototype = Object.create(Phaser.Plugin.prototype);
	Debug.prototype.constructor = Debug;

	Debug.PKG = require('../package.json');
	Debug.VERSION = Debug.PKG.version;

	module.exports = Debug;

	Debug.prototype.init = function () {
	    // create the panels
	    this.panels.performance = new PerformancePanel(this.game, this);
	    this.panels.scene = new ScenePanel(this.game, this);

	    // add elements to the page
	    ui.addCss(css);
	    document.body.appendChild(this._createElement());

	    this._bindEvents();

	    // wrap each component's update methods so we can time them
	    for (var method in this.timings) {
	        for (var comp in this.timings[method]) {
	            this._wrap(this.game, comp, method, comp);
	        }
	    }

	    // wrap the game update method
	    this._wrap(this, 'game', 'update');

	    // initialize each panel
	    for (var p in this.panels) {
	        if (this.panels[p].init) {
	            this.panels[p].init.apply(this.panels[p], arguments);
	        }
	    }
	};

	/**
	 * Post-Update is called after all the update methods have already been called, but before the render calls.
	 * It is only called if active is set to true.
	 *
	 * @method Phaser.Plugin.Debug#postUpdate
	 */
	Debug.prototype.postUpdate = function () {
	    for (var p in this.panels) {
	        if (this.panels[p].update && this.panels[p].active) {
	            this.panels[p].update();
	        }
	    }

	    var fps = Math.round(1000 / (this.tickTimings.start - this.tickTimings.lastStart)),
	        dpf = this.game.renderer.renderSession.drawCount;

	    fps = fps > 60 ? 60 : fps;

	    // update stats indicators
	    ui.setText(this._stats.dpf.firstElementChild, dpf === undefined ? '(N/A)' : dpf, 3);
	    ui.setText(this._stats.ms.firstElementChild, Math.round(this.tickTimings.ms), 4);
	    ui.setText(this._stats.fps.firstElementChild, Math.round(fps), 2);
	};

	/**
	 * Marks a point on the performance graph with a label to help you corrolate events and timing on the graph
	 *
	 * @method Phaser.Plugin.Debug#mark
	 */
	Debug.prototype.mark = function (label) {
	    if (this.panels.performance) {
	        this.panels.performance.mark(label);
	    }
	};

	Debug.prototype.destroy = function () {
	    Phaser.Plugin.prototype.destroy.call(this);

	    for (var p in this.panels) {
	        this.panels[p].destroy();
	    }

	    this.panels = null;
	    this.tickTimings = null;
	    this.timings = null;

	    this._container = null;
	    this._bar = null;
	    this._stats = null;

	    this.timer = null;
	};

	Debug.prototype._wrap = function (obj, component, method, timingStat) {
	    if (!obj[component] || !obj[component][method]) {
	        return;
	    }

	    obj[component][method] = (function(self, name, method, stat, fn) {
	        var start = 0,
	            end = 0;

	        // special tick capture for game update
	        if (name === 'game' && method === 'update' && !stat) {
	            return function () {
	                start = self.timer.now();

	                self.tickTimings.lastStart = self.tickTimings.start;
	                self.tickTimings.start = start;

	                fn.apply(this, arguments);

	                end = self.timer.now();

	                self.tickTimings.ms = end - start;
	            };
	        }
	        else {
	            return function () {
	                start = self.timer.now();

	                fn.apply(this, arguments);

	                end = self.timer.now();

	                self.timings[method][stat] = end - start;
	            };
	        }
	    })(this, component, method, timingStat, obj[component][method]);
	};

	Debug.prototype._bindEvents = function () {
	    var activePanel,
	        self = this;

	    ui.on(this._bar, 'click', '.pdebug-menu-item', function(e) {
	        e.preventDefault();

	        var panel = self.panels[e.target.getAttribute('href').replace('#', '')];

	        if(!panel) {
	            return;
	        }

	        if(activePanel) {
	            activePanel.toggle();
	            ui.removeClass(activePanel._menuItem, 'active');

	            if(activePanel.name === panel.name) {
	                activePanel = null;
	                return;
	            }
	        }

	        ui.addClass(e.target, 'active');
	        panel.toggle();
	        activePanel = panel;
	    });
	};

	Debug.prototype._createElement = function () {
	    var c = this._container = document.createElement('div'),
	        bar = this._bar = document.createElement('div');

	    //container
	    ui.addClass(c, 'pdebug');
	    c.appendChild(bar);

	    //the menu bar
	    ui.addClass(bar, 'pdebug-menu');
	    bar.appendChild(this._createMenuHead());
	    bar.appendChild(this._createMenuStats());

	    //add the panels
	    for(var p in this.panels) {
	        bar.appendChild(this.panels[p].createMenuElement());
	        c.appendChild(this.panels[p].createPanelElement());
	    }

	    return c;
	};

	Debug.prototype._createMenuHead = function () {
	    var div = document.createElement('span'),
	        r = this.game.renderType,
	        type = (r === Phaser.WEBGL ? 'WebGL' : (r === Phaser.HEADLESS ? 'Headless' : 'Canvas'));

	    ui.addClass(div, 'pdebug-head');
	    ui.setText(div, 'Phaser Debug (' + type + '):');

	    return div;
	};

	Debug.prototype._createMenuStats = function () {
	    var div = document.createElement('div');

	    ui.addClass(div, 'pdebug-stats');

	    this._stats.ms = document.createElement('span');
	    this._stats.fps = document.createElement('span');
	    this._stats.dpf = document.createElement('span');
	    // this._stats.ent = document.createElement('span');

	    ui.addClass(this._stats.ms, 'pdebug-stats-item ms');
	    ui.setHtml(this._stats.ms, '<span>0</span> ms');
	    div.appendChild(this._stats.ms);

	    ui.addClass(this._stats.fps, 'pdebug-stats-item fps');
	    ui.setHtml(this._stats.fps, '<span>0</span> fps');
	    div.appendChild(this._stats.fps);

	    ui.addClass(this._stats.dpf, 'pdebug-stats-item dpf');
	    ui.setHtml(this._stats.dpf, '<span>0</span> draws');
	    div.appendChild(this._stats.dpf);

	    // ui.addClass(this._stats.ent, 'pdebug-stats-item ent');
	    // ui.setHtml(this._stats.ent, '<span>0</span> entities');
	    // div.appendChild(this._stats.ent);

	    return div;
	};

	},{"../package.json":10,"./panels/Performance":15,"./panels/Scene":16,"./styles/main.less":17,"./util/ui":19}],2:[function(require,module,exports){
	"use strict";
	/*globals Handlebars: true */
	var base = require("./handlebars/base");

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	var SafeString = require("./handlebars/safe-string")["default"];
	var Exception = require("./handlebars/exception")["default"];
	var Utils = require("./handlebars/utils");
	var runtime = require("./handlebars/runtime");

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	var create = function() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = SafeString;
	  hb.Exception = Exception;
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function(spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	};

	var Handlebars = create();
	Handlebars.create = create;

	Handlebars['default'] = Handlebars;

	exports["default"] = Handlebars;
	},{"./handlebars/base":3,"./handlebars/exception":4,"./handlebars/runtime":5,"./handlebars/safe-string":6,"./handlebars/utils":7}],3:[function(require,module,exports){
	"use strict";
	var Utils = require("./utils");
	var Exception = require("./exception")["default"];

	var VERSION = "2.0.0";
	exports.VERSION = VERSION;var COMPILER_REVISION = 6;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1'
	};
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};

	  registerDefaultHelpers(this);
	}

	exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: logger,
	  log: log,

	  registerHelper: function(name, fn) {
	    if (toString.call(name) === objectType) {
	      if (fn) { throw new Exception('Arg not supported with multiple helpers'); }
	      Utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function(name, partial) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials,  name);
	    } else {
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function(name) {
	    delete this.partials[name];
	  }
	};

	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function(/* [args, ]options */) {
	    if(arguments.length === 1) {
	      // A missing field in a {{foo}} constuct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new Exception("Missing helper: '" + arguments[arguments.length-1].name + "'");
	    }
	  });

	  instance.registerHelper('blockHelperMissing', function(context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if(context === true) {
	      return fn(this);
	    } else if(context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if(context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.name);
	        options = {data: data};
	      }

	      return fn(context, options);
	    }
	  });

	  instance.registerHelper('each', function(context, options) {
	    if (!options) {
	      throw new Exception('Must pass iterator to #each');
	    }

	    var fn = options.fn, inverse = options.inverse;
	    var i = 0, ret = "", data;

	    var contextPath;
	    if (options.data && options.ids) {
	      contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (isFunction(context)) { context = context.call(this); }

	    if (options.data) {
	      data = createFrame(options.data);
	    }

	    if(context && typeof context === 'object') {
	      if (isArray(context)) {
	        for(var j = context.length; i<j; i++) {
	          if (data) {
	            data.index = i;
	            data.first = (i === 0);
	            data.last  = (i === (context.length-1));

	            if (contextPath) {
	              data.contextPath = contextPath + i;
	            }
	          }
	          ret = ret + fn(context[i], { data: data });
	        }
	      } else {
	        for(var key in context) {
	          if(context.hasOwnProperty(key)) {
	            if(data) {
	              data.key = key;
	              data.index = i;
	              data.first = (i === 0);

	              if (contextPath) {
	                data.contextPath = contextPath + key;
	              }
	            }
	            ret = ret + fn(context[key], {data: data});
	            i++;
	          }
	        }
	      }
	    }

	    if(i === 0){
	      ret = inverse(this);
	    }

	    return ret;
	  });

	  instance.registerHelper('if', function(conditional, options) {
	    if (isFunction(conditional)) { conditional = conditional.call(this); }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function(conditional, options) {
	    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
	  });

	  instance.registerHelper('with', function(context, options) {
	    if (isFunction(context)) { context = context.call(this); }

	    var fn = options.fn;

	    if (!Utils.isEmpty(context)) {
	      if (options.data && options.ids) {
	        var data = createFrame(options.data);
	        data.contextPath = Utils.appendContextPath(options.data.contextPath, options.ids[0]);
	        options = {data:data};
	      }

	      return fn(context, options);
	    } else {
	      return options.inverse(this);
	    }
	  });

	  instance.registerHelper('log', function(message, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, message);
	  });

	  instance.registerHelper('lookup', function(obj, field) {
	    return obj && obj[field];
	  });
	}

	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 3,

	  // can be overridden in the host environment
	  log: function(level, message) {
	    if (logger.level <= level) {
	      var method = logger.methodMap[level];
	      if (typeof console !== 'undefined' && console[method]) {
	        console[method].call(console, message);
	      }
	    }
	  }
	};
	exports.logger = logger;
	var log = logger.log;
	exports.log = log;
	var createFrame = function(object) {
	  var frame = Utils.extend({}, object);
	  frame._parent = object;
	  return frame;
	};
	exports.createFrame = createFrame;
	},{"./exception":4,"./utils":7}],4:[function(require,module,exports){
	"use strict";

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var line;
	  if (node && node.firstLine) {
	    line = node.firstLine;

	    message += ' - ' + line + ':' + node.firstColumn;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  if (line) {
	    this.lineNumber = line;
	    this.column = node.firstColumn;
	  }
	}

	Exception.prototype = new Error();

	exports["default"] = Exception;
	},{}],5:[function(require,module,exports){
	"use strict";
	var Utils = require("./utils");
	var Exception = require("./exception")["default"];
	var COMPILER_REVISION = require("./base").COMPILER_REVISION;
	var REVISION_CHANGES = require("./base").REVISION_CHANGES;
	var createFrame = require("./base").createFrame;

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = REVISION_CHANGES[currentRevision],
	          compilerVersions = REVISION_CHANGES[compilerRevision];
	      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
	            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
	            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
	    }
	  }
	}

	exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new Exception("No environment passed to template");
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new Exception('Unknown template object: ' + typeof templateSpec);
	  }

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  var invokePartialWrapper = function(partial, indent, name, context, hash, helpers, partials, data, depths) {
	    if (hash) {
	      context = Utils.extend({}, context, hash);
	    }

	    var result = env.VM.invokePartial.call(this, partial, name, context, helpers, partials, data, depths);

	    if (result == null && env.compile) {
	      var options = { helpers: helpers, partials: partials, data: data, depths: depths };
	      partials[name] = env.compile(partial, { data: data !== undefined, compat: templateSpec.compat }, env);
	      result = partials[name](context, options);
	    }
	    if (result != null) {
	      if (indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
	    }
	  };

	  // Just add water
	  var container = {
	    lookup: function(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function(i) {
	      return templateSpec[i];
	    },

	    programs: [],
	    program: function(i, data, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths) {
	        programWrapper = program(this, i, fn, data, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = program(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function(data, depth) {
	      while (data && depth--) {
	        data = data._parent;
	      }
	      return data;
	    },
	    merge: function(param, common) {
	      var ret = param || common;

	      if (param && common && (param !== common)) {
	        ret = Utils.extend({}, common, param);
	      }

	      return ret;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  var ret = function(context, options) {
	    options = options || {};
	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths;
	    if (templateSpec.useDepths) {
	      depths = options.depths ? [context].concat(options.depths) : [context];
	    }

	    return templateSpec.main.call(container, context, container.helpers, container.partials, data, depths);
	  };
	  ret.isTop = true;

	  ret._setup = function(options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	    }
	  };

	  ret._child = function(i, data, depths) {
	    if (templateSpec.useDepths && !depths) {
	      throw new Exception('must pass parent depths');
	    }

	    return program(container, i, templateSpec[i], data, depths);
	  };
	  return ret;
	}

	exports.template = template;function program(container, i, fn, data, depths) {
	  var prog = function(context, options) {
	    options = options || {};

	    return fn.call(container, context, container.helpers, container.partials, options.data || data, depths && [context].concat(depths));
	  };
	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  return prog;
	}

	exports.program = program;function invokePartial(partial, name, context, helpers, partials, data, depths) {
	  var options = { partial: true, helpers: helpers, partials: partials, data: data, depths: depths };

	  if(partial === undefined) {
	    throw new Exception("The partial " + name + " could not be found");
	  } else if(partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	exports.invokePartial = invokePartial;function noop() { return ""; }

	exports.noop = noop;function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}
	},{"./base":3,"./exception":4,"./utils":7}],6:[function(require,module,exports){
	"use strict";
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = function() {
	  return "" + this.string;
	};

	exports["default"] = SafeString;
	},{}],7:[function(require,module,exports){
	"use strict";
	/*jshint -W004 */
	var SafeString = require("./safe-string")["default"];

	var escape = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': "&quot;",
	  "'": "&#x27;",
	  "`": "&#x60;"
	};

	var badChars = /[&<>"'`]/g;
	var possible = /[&<>"'`]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	exports.extend = extend;var toString = Object.prototype.toString;
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	var isFunction = function(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  isFunction = function(value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	/* istanbul ignore next */
	var isArray = Array.isArray || function(value) {
	  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
	};
	exports.isArray = isArray;

	function escapeExpression(string) {
	  // don't escape SafeStrings, since they're already safe
	  if (string instanceof SafeString) {
	    return string.toString();
	  } else if (string == null) {
	    return "";
	  } else if (!string) {
	    return string + '';
	  }

	  // Force a string conversion as this will be done by the append regardless and
	  // the regex test will do this transparently behind the scenes, causing issues if
	  // an object's to string has escaped characters in it.
	  string = "" + string;

	  if(!possible.test(string)) { return string; }
	  return string.replace(badChars, escapeChar);
	}

	exports.escapeExpression = escapeExpression;function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	exports.isEmpty = isEmpty;function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

	exports.appendContextPath = appendContextPath;
	},{"./safe-string":6}],8:[function(require,module,exports){
	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = require('./dist/cjs/handlebars.runtime');

	},{"./dist/cjs/handlebars.runtime":2}],9:[function(require,module,exports){
	module.exports = require("handlebars/runtime")["default"];

	},{"handlebars/runtime":8}],10:[function(require,module,exports){
	module.exports={
	  "name": "phaser-debug",
	  "version": "1.1.8",
	  "description": "Simple debug module for phaser",
	  "author": "Chad Engler <chad@pantherdev.com>",
	  "license": "MIT",
	  "homepage": "https://github.com/englercj/phaser-debug",
	  "repository": {
	    "type": "git",
	    "url": "https://github.com/englercj/phaser-debug.git"
	  },
	  "bugs": {
	    "url": "https://github.com/englercj/phaser-debug/issues"
	  },
	  "keywords": [
	    "phaser",
	    "debug",
	    "html5",
	    "game",
	    "engine"
	  ],
	  "dependencies": {
	    "handlebars": "^2.0.0",
	    "node-lessify": "^0.0.5",
	    "hbsfy": "^2.1.0"
	  },
	  "devDependencies": {
	    "browserify": "^5.11.1",
	    "event-stream": "^3.1.7",
	    "gulp": "^3.8.8",
	    "gulp-bump": "^0.1.11",
	    "gulp-git": "^0.5.3",
	    "gulp-jshint": "^1.8.4",
	    "gulp-util": "^3.0.1",
	    "jshint-summary": "^0.4.0",
	    "vinyl-source-stream": "^0.1.1",
	    "watchify": "^1.0.2"
	  },
	  "main": "./dist/phaser-debug.js",
	  "browser": "./src/index.js",
	  "browserify": {
	    "transform": [
	      "hbsfy",
	      "node-lessify"
	    ],
	    "transform-options": {
	      "node-lessify": "textMode"
	    }
	  }
	}

	},{}],11:[function(require,module,exports){
	// hbsfy compiled Handlebars template
	var HandlebarsCompiler = require('hbsfy/runtime');
	module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
	  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
	  return "    <label>Children:</label>\n    <strong>"
	    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.children : depth0)) != null ? stack1.length : stack1), depth0))
	    + "</strong>\n    <br/>\n";
	},"3":function(depth0,helpers,partials,data) {
	  var stack1, buffer = "    <label>Texture:</label>\n";
	  stack1 = helpers['if'].call(depth0, ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1)) != null ? stack1.src : stack1), {"name":"if","hash":{},"fn":this.program(4, data),"inverse":this.program(6, data),"data":data});
	  if (stack1 != null) { buffer += stack1; }
	  return buffer + "    <br/>\n";
	},"4":function(depth0,helpers,partials,data) {
	  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
	  return "        <a href=\""
	    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1)) != null ? stack1.src : stack1), depth0))
	    + "\" target=\"_blank\">"
	    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1)) != null ? stack1.src : stack1), depth0))
	    + "</a>\n";
	},"6":function(depth0,helpers,partials,data) {
	  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
	  return "        <strong>"
	    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.texture : depth0)) != null ? stack1.baseTexture : stack1)) != null ? stack1.source : stack1), depth0))
	    + "</strong>\n";
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<br/><br/>\n\n<label>Name:</label>\n<strong>"
	    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
	    + "</strong>\n<br/>\n\n<label>Type:</label>\n<strong>"
	    + escapeExpression(((helper = (helper = helpers.typeString || (depth0 != null ? depth0.typeString : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"typeString","hash":{},"data":data}) : helper)))
	    + "</strong>\n<br/>\n\n<label>Position:</label>\n<strong>"
	    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.position : depth0)) != null ? stack1.x : stack1), depth0))
	    + "</strong> x <strong>"
	    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.position : depth0)) != null ? stack1.y : stack1), depth0))
	    + "</strong>\n<br/>\n\n";
	  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.children : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
	  if (stack1 != null) { buffer += stack1; }
	  buffer += "\n";
	  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.texture : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
	  if (stack1 != null) { buffer += stack1; }
	  return buffer;
	},"useData":true});

	},{"hbsfy/runtime":9}],12:[function(require,module,exports){
	// hbsfy compiled Handlebars template
	var HandlebarsCompiler = require('hbsfy/runtime');
	module.exports = HandlebarsCompiler.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	  return "<ul class=\"sidebar\">\n</ul>\n\n<a href=\"#\" class=\"refresh\">refresh</a>\n<div class=\"details\">\n</div>\n";
	  },"useData":true});

	},{"hbsfy/runtime":9}],13:[function(require,module,exports){
	// hbsfy compiled Handlebars template
	var HandlebarsCompiler = require('hbsfy/runtime');
	module.exports = HandlebarsCompiler.template({"1":function(depth0,helpers,partials,data) {
	  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
	  return "        <span class=\"weak\">("
	    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
	    + ")</span>\n";
	},"3":function(depth0,helpers,partials,data) {
	  var stack1, buffer = "        <ul>\n";
	  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.children : depth0), {"name":"each","hash":{},"fn":this.program(4, data),"inverse":this.noop,"data":data});
	  if (stack1 != null) { buffer += stack1; }
	  return buffer + "        </ul>\n";
	},"4":function(depth0,helpers,partials,data) {
	  var stack1, buffer = "";
	  stack1 = this.invokePartial(partials.sceneTree, '                ', 'sceneTree', depth0, undefined, helpers, partials, data);
	  if (stack1 != null) { buffer += stack1; }
	  return buffer;
	},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
	  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = escapeExpression(((helper = (helper = helpers.listItemOpen || (depth0 != null ? depth0.listItemOpen : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"listItemOpen","hash":{},"data":data}) : helper)))
	    + "\n    "
	    + escapeExpression(((helper = (helper = helpers.typeString || (depth0 != null ? depth0.typeString : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"typeString","hash":{},"data":data}) : helper)))
	    + "\n\n";
	  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.name : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
	  if (stack1 != null) { buffer += stack1; }
	  buffer += "\n";
	  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.children : depth0), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.noop,"data":data});
	  if (stack1 != null) { buffer += stack1; }
	  return buffer + "</li>\n";
	},"usePartial":true,"useData":true});

	},{"hbsfy/runtime":9}],14:[function(require,module,exports){
	var ui = require('../util/ui');

	function Panel(game, parent) {
	    this.game = game;
	    this.parent = parent;

	    this.name = '';
	    this.title = '';
	    this.active = false;

	    this._panel = null;
	}

	Panel.prototype.constructor = Panel;

	module.exports = Panel;

	//builds the html for a panel
	Panel.prototype.createPanelElement = function () {
	    var elm = this._panel = document.createElement('div');
	    ui.addClass(elm, 'pdebug-panel ' + this.name);

	    return elm;
	};

	//builds the html for this panels menu item
	Panel.prototype.createMenuElement = function () {
	    var elm = this._menuItem = document.createElement('a');

	    elm.href = '#' + this.name;

	    ui.addClass(elm, 'pdebug-menu-item ' + this.name);
	    ui.setText(elm, this.title);

	    return elm;
	};

	Panel.prototype.toggle = function () {
	    if (this.active) {
	        this.hide();
	    } else {
	        this.show();
	    }
	};

	Panel.prototype.show = function () {
	    this.active = true;
	    ui.setStyle(this._panel, 'display', 'block');
	};

	Panel.prototype.hide = function () {
	    this.active = false;
	    ui.setStyle(this._panel, 'display', 'none');
	};

	Panel.prototype.destroy = function () {
	    this.game = null;
	    this.parent = null;

	    this.name = null;
	    this.title = null;
	    this.active = null;

	    this._panel = null;
	};

	},{"../util/ui":19}],15:[function(require,module,exports){
	// TODO: Not measuring render time!!

	var Panel = require('./Panel'),
	    Graph = require('../util/Graph');

	function Performance(game, parent) {
	    Panel.call(this, game, parent);

	    this.name = 'performance';
	    this.title = 'Performance';
	    this.eventQueue = [];

	    this.graph = null;

	    this.colorPalettes = {
	        _default: [
	            // Colors from: https://github.com/highslide-software/highcharts.com/blob/master/js/themes/grid.js
	            '#058DC7', '#50B432', '#ED561B', '#DDDF00',
	            '#24CBE5', '#64E572', '#FF9655', '#FFF263',
	            '#6AF9C4',
	            // Colors from: https://github.com/highslide-software/highcharts.com/blob/master/js/themes/dark-unica.js
	            '#2b908f', '#90ee7e', '#f45b5b', '#7798BF',
	            '#aaeeee', '#ff0066', '#eeaaee',
	            '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
	        ]
	    };
	}

	Performance.prototype = Object.create(Panel.prototype);
	Performance.prototype.constructor = Performance;

	module.exports = Performance;

	Performance.prototype.createPanelElement = function () {
	    var elm = Panel.prototype.createPanelElement.call(this);

	    this.graph = new Graph(elm, window.innerWidth - 20, 256, this.colorPalettes._default);

	    return elm;
	};

	Performance.prototype.update = function () {
	    this.graph.addData(this.parent.timings, this.eventQueue.shift());
	};

	Performance.prototype.mark = function (label) {
	    this.eventQueue.push(label);
	};

	Performance.prototype.destroy = function () {
	    Panel.prototype.destroy.call(this);

	    this.graph.destroy();

	    this.eventQueue = null;
	    this.graph = null;
	    this.colorPalettes = null;
	};

	},{"../util/Graph":18,"./Panel":14}],16:[function(require,module,exports){
	var Panel = require('./Panel'),
	    ui = require('../util/ui'),
	    Handlebars = require('hbsfy/runtime');

	//require templates
	var panelHtml = require('../hbs/scene/panel.hbs'),
	    detailsHtml = require('../hbs/scene/details.hbs'),
	    treeHtml = require('../hbs/scene/tree.hbs'),
	    _cache = {},
	    _id = 0;

	Handlebars.registerPartial('sceneDetails', detailsHtml);
	Handlebars.registerPartial('sceneTree', treeHtml);
	Handlebars.registerHelper('typeString', typeToString);
	Handlebars.registerHelper('listItemOpen', listItemOpen);

	function Scene(game, parent) {
	    Panel.call(this, game, parent);

	    this.name = 'scene';
	    this.title = 'Scene Tree';

	    this._tree = null;

	    this.tree = null;
	    this.details = null;
	    this.refresh = null;

	    this.selected = null;
	}

	Scene.prototype = Object.create(Panel.prototype);
	Scene.prototype.constructor = Scene;

	module.exports = Scene;

	Scene.prototype.createPanelElement = function () {
	    Panel.prototype.createPanelElement.call(this);

	    this._panel.innerHTML = panelHtml(this.game.stage);

	    this.tree = this._panel.querySelector('.sidebar');
	    this.details = this._panel.querySelector('.details');
	    this.refresh = this._panel.querySelector('.refresh');

	    ui.on(this.tree, 'click', 'li', this._onLiClick.bind(this));
	    ui.on(this.refresh, 'click', this._onRefreshClick.bind(this));

	    // this.renderer = new PIXI.CanvasRenderer(
	    //     512,
	    //     256,
	    //     document.createElement('canvas'),
	    //     true
	    // );

	    return this._panel;
	};

	Scene.prototype.rebuildTree = function () {
	    ui.empty(this.tree);

	    _cache = {};

	    this.tree.innerHTML = treeHtml(this.game.stage);

	    this.select(this.tree.querySelector('li:first-child'));
	    ui.addClass(this.selected, 'expanded');

	    this.reloadDetails();
	};

	Scene.prototype.reloadDetails = function () {
	    var id = this.selected.dataset.id;

	    this.details.innerHTML = detailsHtml(_cache[id]);
	    // this.details.appendChild(this.renderer.view);

	    // this.renderer.renderDisplayObject(_cache[id]);
	};

	Scene.prototype.select = function (li) {
	    if (this.selected) {
	        ui.removeClass(this.selected, 'selected');
	    }

	    this.selected = li;
	    ui.addClass(this.selected, 'selected');
	};

	Scene.prototype.show = function () {
	    this.rebuildTree();

	    Panel.prototype.show.call(this);
	};

	Scene.prototype.destroy = function () {
	    Panel.prototype.destroy.call(this);

	    this.tree = null;
	    this.details = null;
	    this.refresh = null;
	};

	Scene.prototype._onLiClick = function (e) {
	    e.stopPropagation();

	    this.select(e.delegateTarget);

	    ui.toggleClass(e.delegateTarget, 'expanded');

	    this.reloadDetails();
	};

	Scene.prototype._onRefreshClick = function (e) {
	    e.preventDefault();
	    e.stopPropagation();

	    this.rebuildTree();
	};

	function listItemOpen () {
	    _cache[++_id] = this;

	    return new Handlebars.SafeString(
	        '<li ' + (this.children && this.children.length ? 'class="has-children" ' : '') + 'data-id="' + _id + '">'
	    );
	}

	function typeToString () {
	    var node = this;

	    // If no phaser type defined, try to guess
	    if (node.type === undefined) {
	        // Phaser.Stage does not have its 'type' property defined, so check here.
	        if (node instanceof Phaser.Stage) {
	            return 'Stage';
	        }
	        // PIXI.Stage was removed in Phaser 2.4.4, so make sure it's defined first.
	        else if (typeof PIXI.Stage !== 'undefined' &&
	            node instanceof PIXI.Stage) {
	            return 'PIXI Stage';
	        }
	        else if (node instanceof PIXI.Sprite) {
	            return 'PIXI Sprite';
	        }
	        else if (node instanceof PIXI.DisplayObjectContainer) {
	            return 'PIXI DisplayObjectContainer';
	        }
	        else if (node instanceof PIXI.DisplayObject) {
	            return 'PIXI DisplayObject';
	        }
	        else {
	            return 'Unknown';
	        }
	    }
	    // return a string for the phaser type
	    else {
	        switch(node.type) {
	            case Phaser.SPRITE:
	                return 'Sprite';

	            case Phaser.BUTTON:
	                return 'Button';

	            case Phaser.IMAGE:
	                return 'Image';

	            case Phaser.GRAPHICS:
	                return 'Graphics';

	            case Phaser.TEXT:
	                return 'Text';

	            case Phaser.TILESPRITE:
	                return 'Tile Sprite';

	            case Phaser.BITMAPTEXT:
	                return 'Bitmap Text';

	            case Phaser.GROUP:
	                return 'Group';

	            case Phaser.RENDERTEXTURE:
	                return 'Render Texture';

	            case Phaser.TILEMAP:
	                return 'Tilemap';

	            case Phaser.TILEMAPLAYER:
	                return 'Tilemap Layer';

	            case Phaser.EMITTER:
	                return 'Emitter';

	            case Phaser.POLYGON:
	                return 'Polygon';

	            case Phaser.BITMAPDATA:
	                return 'Bitmap Data';

	            case Phaser.CANVAS_FILTER:
	                return 'Canvas Filter';

	            case Phaser.WEBGL_FILTER:
	                return 'WebGL Filter';

	            case Phaser.ELLIPSE:
	                return 'Ellipse';

	            case Phaser.SPRITEBATCH:
	                return 'Sprite Batch';

	            case Phaser.RETROFONT:
	                return 'Retro Font';

	            case Phaser.POINTER:
	                return 'Pointer';

	            case Phaser.ROPE:
	                return 'Rope';

	            default:
	                return 'Unknown';
	        }
	    }
	}

	},{"../hbs/scene/details.hbs":11,"../hbs/scene/panel.hbs":12,"../hbs/scene/tree.hbs":13,"../util/ui":19,"./Panel":14,"hbsfy/runtime":9}],17:[function(require,module,exports){
	module.exports = ".pdebug{font-size:14px;position:fixed;bottom:0;width:100%;color:#aaa;background:#333;border-top:3px solid #00bf00;z-index:999999}.pdebug a{color:#00bf00}.pdebug label{display:inline-block;width:60px}.pdebug strong{font-weight:400;color:#fff}.pdebug .weak{color:#aaa}.pdebug .pdebug-menu{height:32px;padding:0 15px;text-shadow:1px 1px 0 #111;background:#333}.pdebug .pdebug-menu span{display:inline-block;height:32px;line-height:32px}.pdebug .pdebug-menu .pdebug-head{padding-right:25px;border-right:1px solid #666}.pdebug .pdebug-menu .pdebug-stats{float:right;padding:0 0 0 10px}.pdebug .pdebug-menu .pdebug-stats .pdebug-stats-item{display:inline-block;width:100px;text-align:right}.pdebug .pdebug-menu .pdebug-stats .pdebug-stats-item>span{color:#fff}.pdebug .pdebug-menu .pdebug-stats .pdebug-stats-item.obj{width:100px;border:0}.pdebug .pdebug-menu .pdebug-menu-item{color:#fff;display:inline-block;text-decoration:none;padding:0 10px;height:32px;line-height:32px;border-right:1px solid #666}.pdebug .pdebug-menu .pdebug-menu-item.active{color:#00bf00;background:#111}.pdebug .pdebug-panel{display:none;height:265px;overflow:auto;font-size:12px;background:#111}.pdebug .pdebug-panel.scene .sidebar{float:left;height:100%;min-width:175px;max-width:500px;resize:horizontal;overflow:auto}.pdebug .pdebug-panel.scene .details{float:left;height:100%}.pdebug .pdebug-panel.scene .refresh{position:absolute}.pdebug .pdebug-panel.scene>ul{padding:0;margin:0;border-right:solid 1px #aaa;margin-right:10px}.pdebug .pdebug-panel.scene>ul li{color:#fff;list-style:none;cursor:pointer}.pdebug .pdebug-panel.scene>ul li.expanded>ul{display:block}.pdebug .pdebug-panel.scene>ul li.selected{color:#00bf00}.pdebug .pdebug-panel.scene>ul li::before{content:\'-\';display:inline-block;width:12px;height:1px;color:#aaa}.pdebug .pdebug-panel.scene>ul li.has-children::before{content:\'\';display:inline-block;width:0;height:0;margin:0 6px 0 0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:0;border-left:6px solid rgba(255,255,255,.3)}.pdebug .pdebug-panel.scene>ul li.has-children.expanded::before{margin:0 4px 0 -4px;border-top:6px solid rgba(255,255,255,.3);border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:0}.pdebug .pdebug-panel.scene>ul li>ul{display:none;padding:0 0 0 10px}.pdebug input[type=checkbox]{visibility:hidden}.pdebug .checkbox{width:75px;height:26px;background:#333;position:relative;line-height:normal;-webkit-border-radius:50px;-moz-border-radius:50px;border-radius:50px;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);-moz-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);-o-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);-ms-box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2);box-shadow:inset 0 1px 1px rgba(0,0,0,.5),0 1px 0 rgba(255,255,255,.2)}.pdebug .checkbox:after{content:\'OFF\';font:12px/26px Arial,sans-serif;color:#000;position:absolute;right:10px;z-index:0;font-weight:700;text-shadow:1px 1px 0 rgba(255,255,255,.15)}.pdebug .checkbox:before{content:\'ON\';font:12px/26px Arial,sans-serif;color:#00bf00;position:absolute;left:10px;z-index:0;font-weight:700}.pdebug .checkbox+span{position:relative;display:block;top:-25px;left:90px;width:200px;color:#fcfff4;font-size:1.1em}.pdebug .checkbox input[type=checkbox]:checked+label{left:38px}.pdebug .checkbox label{display:block;width:34px;height:20px;-webkit-border-radius:50px;-moz-border-radius:50px;border-radius:50px;-webkit-transition:all .4s ease;-moz-transition:all .4s ease;-o-transition:all .4s ease;-ms-transition:all .4s ease;transition:all .4s ease;cursor:pointer;position:absolute;top:3px;left:3px;z-index:1;background:#fcfff4;background:-webkit-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:-moz-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:-o-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:-ms-linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);background:linear-gradient(top,#fcfff4 0,#dfe5d7 40%,#b3bead 100%);-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.3);-moz-box-shadow:0 2px 5px 0 rgba(0,0,0,.3);box-shadow:0 2px 5px 0 rgba(0,0,0,.3)}";
	},{}],18:[function(require,module,exports){
	// TODO: Move the legend into DOM?

	function Graph(container, width, height, colors, options) {
	    options = options || {};

	    this.canvas = document.createElement('canvas');
	    this.canvas.width = width;
	    this.canvas.height = height;
	    container.appendChild(this.canvas);

	    this.ctx = this.canvas.getContext('2d');

	    this.labelStyle = 'rgba(200, 200, 200, 0.6)';

	    this.maxValue = options.maxValue || 50;
	    this.padding = options.labelPadding || 5;

	    this.dataLineWidth = options.lineWidth || 1;
	    this.legendWidth = 230;
	    this.legendBoxSize = 10;
	    this.legendIndent = 5;

	    this.eventY = this.padding * 2;

	    this.colors = colors;

	    this.dataCanvas = document.createElement('canvas');
	    this.dataCanvas.width = width - this.legendWidth;
	    this.dataCanvas.height = height;
	    this.dctx = this.dataCanvas.getContext('2d');

	    this.dataCanvasBuffer = document.createElement('canvas');
	    this.dataCanvasBuffer.width = this.dataCanvas.width - this.dataLineWidth;
	    this.dataCanvasBuffer.height = this.dataCanvas.height;
	    this.bctx = this.dataCanvasBuffer.getContext('2d');
	}

	Graph.prototype.constructor = Graph;

	module.exports = Graph;

	// render the graph with the new data point
	Graph.prototype.addData = function (values, event) {
	    // clear the main canvas
	    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

	    this.drawBg();
	    this.drawLegend(values);
	    this.drawData(values, event);
	};

	Graph.prototype.drawBg = function () {
	    var fps60 = Math.floor(this.canvas.height - (this.canvas.height * (16 / this.maxValue))) + 0.5,
	        fps30 = Math.floor(this.canvas.height - (this.canvas.height * (33 / this.maxValue))) + 0.5;

	    this.ctx.strokeStyle = this.ctx.fillStyle = this.labelStyle;
	    this.ctx.lineWidth = 1;

	    //draw top marker line
	    this.ctx.beginPath();
	    this.ctx.moveTo(this.legendWidth, fps60);
	    this.ctx.lineTo(this.canvas.width, fps60);
	    this.ctx.stroke();

	    this.ctx.fillText('16ms (60 fps)', this.legendWidth + this.padding, fps60 - this.padding);

	    //draw the second marker line
	    this.ctx.beginPath();
	    this.ctx.moveTo(this.legendWidth, fps30);
	    this.ctx.lineTo(this.canvas.width, fps30);
	    this.ctx.stroke();

	    this.ctx.fillText('33ms (30 fps)', this.legendWidth + this.padding, fps30 - this.padding);

	    //draw baseline marker
	    this.ctx.beginPath();
	    this.ctx.moveTo(this.legendWidth, this.canvas.height - 0.5);
	    this.ctx.lineTo(this.canvas.width, this.canvas.height - 0.5);
	    this.ctx.stroke();
	};

	Graph.prototype.drawLegend = function (values) {
	    var colorIndex = 0,
	        yIndex = 0,
	        x = this.padding,
	        y = 0;

	    for (var k in values) {
	        y = (yIndex * this.legendBoxSize) + (this.padding * (yIndex + 1)) + this.padding;

	        // Draw parent label
	        this.ctx.fillStyle = this.labelStyle;
	        this.ctx.fillText(k, x, y);

	        ++yIndex;

	        // Draw children
	        for (var c in values[k]) {
	            y = (yIndex * this.legendBoxSize) + (this.padding * yIndex);

	            this.ctx.fillStyle = this.colors[colorIndex++ % this.colors.length];
	            this.ctx.fillRect(x + this.legendIndent, y, this.legendBoxSize, this.legendBoxSize);

	            this.ctx.fillStyle = this.labelStyle;
	            this.ctx.fillText(
	                Math.round(values[k][c]) + 'ms - ' + c,
	                x + this.legendIndent + this.legendBoxSize + this.padding,
	                y + this.legendBoxSize
	            );

	            ++yIndex;

	            if (yIndex > 16) {
	                x += this.legendWidth / 2;
	                yIndex = 0;
	            }
	        }
	    }
	};

	Graph.prototype.drawData = function (values, event) {
	    var x = this.dataCanvas.width - this.dataLineWidth + 0.5,
	        y = this.dataCanvas.height - 0.5;

	    // clear the buffer
	    this.bctx.clearRect(0, 0, this.dataCanvasBuffer.width, this.dataCanvasBuffer.height);

	    // draw the data canvas to the buffer, skipping the first line
	    this.bctx.drawImage(
	        this.dataCanvas,
	        this.dataLineWidth, 0, x, y,
	        0, 0, x, y
	    );

	    // clear the data canvas
	    this.dctx.clearRect(0, 0, this.dataCanvas.width, this.dataCanvas.height);

	    // draw the buffer back to the data canvas
	    this.dctx.drawImage(this.dataCanvasBuffer, 0, 0);

	    // draw event to the new line of the data canvas if there was one
	    if (event) {
	        this.dctx.beginPath();
	        this.dctx.strokeStyle = this.dctx.fillStyle = '#ff0000';
	        this.dctx.lineWidth = this.dataLineWidth;

	        this.dctx.moveTo(x, y);
	        this.dctx.lineTo(x, 0);

	        this.dctx.stroke();

	        this.dctx.textAlign = 'right';
	        this.dctx.fillText(event, x - this.padding, this.eventY);

	        this.eventY += (this.padding * 2);

	        if (this.eventY > (this.dataCanvas.height / 2)) {
	            this.eventY = (this.padding * 2);
	        }
	    }

	    // draws the data values to the new line of the data canvas

	    // draw the new data points
	    var colorIndex = 0,
	        step = 0;

	    for (var k in values) {
	        for (var c in values[k]) {
	            this.dctx.beginPath();
	            this.dctx.strokeStyle = this.dctx.fillStyle = this.colors[colorIndex++ % this.colors.length];
	            this.dctx.lineWidth = this.dataLineWidth;

	            step = ((values[k][c] / this.maxValue) * this.dataCanvas.height);
	            step = step < 0 ? 0 : step;

	            this.dctx.moveTo(x, y);
	            this.dctx.lineTo(x, y-=step);

	            this.dctx.stroke();
	        }
	    }

	    // draw the data canvas to the main rendered canvas
	    this.ctx.drawImage(this.dataCanvas, this.legendWidth, 0);
	};

	Graph.prototype.destroy = function () {
	    this.canvas = null;
	    this.ctx = null;

	    this.labelStyle = null;

	    this.maxValue = null;
	    this.padding = null;

	    this.dataLineWidth = null;
	    this.legendWidth = null;
	    this.legendBoxSize = null;
	    this.legendIndent = null;

	    this.colors = null;

	    this.dataCanvas = null;
	    this.dctx = null;

	    this.dataCanvasBuffer = null;
	    this.bctx = null;
	};

	},{}],19:[function(require,module,exports){
	//Some general dom helpers
	var ui = {
	    delegate: function (dom, evt, selector, fn) {
	        dom.addEventListener(evt, function(e) {
	            window.target = e.target;
	            if (e.target && e.target.matches(selector)) {
	                e.delegateTarget = e.target;

	                if (fn) {
	                    fn(e);
	                }
	            }
	            else if (e.target.parentElement && e.target.parentElement.matches(selector)) {
	                e.delegateTarget = e.target.parentElement;

	                if (fn) {
	                    fn(e);
	                }
	            }
	        });
	    },

	    on: function (dom, evt, delegate, fn) {
	        if (typeof delegate === 'function') {
	            fn = delegate;
	            delegate = null;
	        }

	        if (delegate) {
	            return ui.delegate(dom, evt, delegate, fn);
	        }

	        dom.addEventListener(evt, fn);
	    },

	    removeClass: function (dom, cls) {
	        var classes = dom.className.split(' '),
	            i = classes.indexOf(cls);

	        if(i !== -1) {
	            classes.splice(i, 1);
	            dom.className = classes.join(' ').trim();
	        }
	    },

	    addClass: function (dom, cls) {
	        var classes = dom.className.split(' ');

	        classes.push(cls);
	        dom.className = classes.join(' ').trim();
	    },

	    hasClass: function (dom, cls) {
	        return dom.className.split(' ').indexOf(cls) !== -1;
	    },

	    toggleClass: function (dom, cls) {
	        if (ui.hasClass(dom, cls)) {
	            ui.removeClass(dom, cls);
	        } else {
	            ui.addClass(dom, cls);
	        }
	    },

	    setText: function (dom, txt) {
	        dom.textContent = txt;
	    },

	    setHtml: function (dom, html) {
	        dom.innerHTML = html;
	    },

	    setStyle: function (dom, style, value) {
	        if(typeof style === 'string') {
	            dom.style[style] = value;
	        } else {
	            for(var key in style) {
	                dom.style[key] = style[key];
	            }
	        }
	    },

	    empty: function (dom) {
	        while(dom.firstChild) {
	            dom.removeChild(dom.firstChild);
	        }
	    },

	    show: function (dom) {
	        ui.setStyle(dom, 'display', 'block');
	    },

	    hide: function (dom) {
	        ui.setStyle(dom, 'display', 'none');
	    },

	    clear: function () {
	        var br = document.createElement('br');
	        ui.setStyle(br, 'clear', 'both');

	        return br;
	    },

	    addCss: function (css) {
	        var style = document.createElement('style');

	        style.type = 'text/css';

	        if (style.styleSheet){
	            style.styleSheet.cssText = css;
	        } else {
	            style.appendChild(document.createTextNode(css));
	        }

	        document.head.appendChild(style);
	    }
	};

	module.exports = ui;

	// polyfill for matchesSelector
	if (!HTMLElement.prototype.matches) {
	    var htmlprot = HTMLElement.prototype;

	    htmlprot.matches =
	        htmlprot.matches ||
	        htmlprot.webkitMatchesSelector ||
	        htmlprot.mozMatchesSelector ||
	        htmlprot.msMatchesSelector ||
	        htmlprot.oMatchesSelector ||
	        function (selector) {
	            // poorman's polyfill for matchesSelector
	            var elements = this.parentElement.querySelectorAll(selector),
	                element,
	                i = 0;

	            while (element = elements[i++]) {
	                if (element === this) {
	                    return true;
	                }
	            }

	            return false;
	        };
	}

	},{}]},{},[1])(1)
	});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var GameObject = __webpack_require__(29);
	var KeyCodes = __webpack_require__(30);

	// Shortcuts
	var game, ship, speed = 0;

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
	        ship = this.ship = game.add.sprite(game.world.centerX, game.world.centerY, 'ship');
	        ship.anchor.set(0.5);

	        // Add physics
	        game.physics.enable(ship, Phaser.Physics.ARCADE);

	        // Setup physics
	        ship.body.drag.set(0);
	        ship.body.maxVelocity.set(200);

	        // Camera setup
	        //game.camera.follow(ship, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
	    },

	    /**
	     * Update is called after all the core subsystems (Input, Tweens, Sound, etc) and the State have updated,
	     * but before the render. It is only called if active is set to true.
	     */
	    update: function(){

	        ship.rotation = game.physics.arcade.angleToPointer(ship);

	        if(game.input.keyboard.isDown(KeyCodes.SPACEBAR)){
	            speed += 5;
	            game.physics.arcade.accelerationFromRotation(ship.rotation, speed, ship.body.acceleration);
	        }else{
	            speed = 0;
	        }

	    },

	    /**
	     * Render is called right after the Game Renderer completes,
	     * but before the State.render. It is only called if visible is set to true.
	     */
	    render: function(){

	        if(game.isDebugEnabled){
	            game.debug.spriteInfo(ship, 32, 32);
	            game.debug.bodyInfo(ship, 400, 32);
	            game.debug.body(ship);
	            game.debug.cameraInfo(game.camera, 32, 120);
	        }
	    }

	});


/***/ },
/* 29 */
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
	    },

	    /**
	     * Plugin init event
	     */
	    init: function(){
	        this.disable(); // Disable updates and render for gameObject, we will enable it after create event
	    },

	    /**
	     * Before create event
	     */
	    beforeCreate: function(){
	        if(this.create){ this.create(); }
	        this.enable();
	    },

	    /**
	     * Enable render and update events
	     */
	    enable: function(){

	        if(this.preUpdate) this.hasPreUpdate = true;
	        if(this.update) this.hasUpdate = true;
	        if(this.postUpdate) this.hasPostUpdate = true;
	        if(this.render) this.hasRender = true;
	        if(this.postRender) this.hasPostRender = true;

	        if (this.hasPreUpdate || this.hasUpdate || this.hasPostUpdate)
	        {
	            this.active = true;
	        }

	        if (this.hasRender || this.hasPostRender)
	        {
	            this.visible = true;
	        }

	    },

	    /**
	     * Disable plugin rendering end updates
	     */
	    disable: function(){

	        this.hasUpdate = false;
	        this.hasPreUpdate = false;
	        this.hasPostUpdate = false;
	        this.hasRender = false;
	        this.hasPostRender = false;

	        this.active = false;
	        this.visible = false;
	    }

	});


/***/ },
/* 30 */
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


/***/ }
]);