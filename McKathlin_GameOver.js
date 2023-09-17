//=============================================================================
// Custom Game Over
// For RPG Maker MZ
// by McKathlin
//=============================================================================

/*
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

var Imported = Imported || {};
Imported.McKathlin_GameOver = true;

var McKathlin = McKathlin || {};
McKathlin.GameOver = McKathlin.GameOver || {};

/*:
 * @target MZ
 * @plugindesc MZ v1.3.1 Change what happens when the party dies or Game Over is called.
 * @author McKathlin
 * @url https://www.tyruswoo.com
 * 
 * @help This plugin is designed to play well by itself and with other plugins.
 * There are no known conflicts, but conflict is possible with other plugins
 * that directly alter Game Over behavior.
 * 
 * ===========================================
 * = Parameter: Party Death Common Event ID  =
 * ===========================================
 * Assigning a Party Death Common Event replaces the usual Game Over scene
 * call with a common event call. This lets you (the game designer) make 
 * something happen instead of (or before) the standard Game Over screen.
 * Here are some pointers:
 * * The Party Death common event will run in the same scene where the party
 *   was just defeated. If the party died in battle, the common event will run
 *   in battle, right after the party-is-defeated message and music effect.
 *   So if you want to make something happen after a slow fadeout
 *   and return to the map, I recommend using the After Game Over Common Event
 *   instead.
 * * If you would like the Game Over screen (or a fadeout and cut to the map
 *   if "Show Game Over Scene" is false) to show at the end of your common
 *   event, remember to use the Game Over command in your common event.
 *   Avoiding the Game Over screen is easy: avoid calling the Game Over
 *   command.
 * * Directly calling the Game Over command from any event will still show
 *   the Game Over screen normally (unless you've set Show Game Over Scene to
 *   false). To force your custom party death behavior, use a command that
 *   calls your party death common event instead.
 * 
 * ====================================
 * = Parameter: Show Game Over Scene  =
 * ====================================
 * RPG Maker's default behavior takes the player to Scene_GameOver on
 * party death or on a scene processing call to Scene_GameOver.
 * This processing shows a Game Over screen.
 * After the player sees the screen and presses any key,
 * the game exits to the title screen.
 * 
 * If Show Game Over Scene is set to false, player will see a fade to black
 * before going to the next scene. This will be the case regardless of whether
 * Game Over state is reached by party death or by a direct command in an
 * event.
 * 
 * Whether or not the Game Over screen shows, which scene is next depends on
 * whether the After Game Over Common Event is set, and what it is set to.
 * 
 * ===============================================
 * = Parameter: After Game Over Common Event ID  =
 * ===============================================
 * TL;DR: If you set this common event, remember to make it include a fade-in!
 * 
 * Assigning a After Game Over common event makes gameplay continue after
 * the party loses, instead of RPG Maker's default behavior of returning the
 * party to the title screen.
 * 
 * In the content of the common event, the game designer can customize what
 * happens when the party dies or reaches an event-dictated Game Over state.
 * The After Game Over common event might do some of the following things:
 * * Take away gold and/or items
 * * Return the player to a safe place
 * * Restore HP to one or more party members
 * * Have the party's rescuer say something
 * * ...anything that suits this game!
 *
 * IMPORTANT: When control flows to the After Game Over common event,
 * the screen will start blacked out. This gives the event time to handle
 * transfers and other processing before showing the player the screen.
 * Once those things are ready, remember to fade in!
 * 
 * The After Game Over Common Event (AGOCE) differs from the Party Death
 * Common Event (PDCE) in the following ways:
 * * The PDCE runs instead of or before the Game Over screen or fadeout;
 *   the AGOCE runs after the Game Over scene or fadeout completes.
 * * The PDCE only automatically replaces Game Overs caused by party death.
 *   The AGOCE autoruns after all Game Overs, regardless of their cause.
 * * The PDCE runs in the same scene where party death occurred.
 *   The AGOCE runs in a newly started map scene, with the screen faded to
 *   black, and the party leader revived to 1 HP.
 * 
 * ====================================
 * = Plugin command: Reload Last Save =
 * ====================================
 * Use the Reload Last Save plugin command to make the game reload directly
 * from its most recent save, without passing through a load game menu.
 * If the player has not yet saved, then the player is instead returned to the
 * Title Screen.
 * This plugin command may be useful in a Party Death Common Event, in an 
 * After Game Over Common Event, or in any event of the developer's choice.
 * 
 * ============================================================================
 * For more help using the Game Over plugin, see Tyruswoo.com.
 * ============================================================================
 * Version History:
 *
 * v1.3  10/10/2020
 *        - Game Over plugin released for RPG Maker MZ!
 * 
 * v1.3.1  8/30/2023
 *        - This plugin is now free and open source under the MIT license.
 * 
 * ============================================================================
 * MIT License
 *
 * Copyright (c) 2023 Kathy Bunn and Scott Tyrus Washburn
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the “Software”), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 * ============================================================================
 * Happy storytelling!
 * -McKathlin
 * 
 * @param Party Death Common Event ID
 * @type common_event
 * @desc The common event to run as soon as the party dies.
 * Leave blank to fade immediately to Game Over.
 * @default
 * 
 * @param Show Game Over Scene
 * @type boolean
 * @desc Whether to show Scene_Gameover. If false, only a brief fade to black is seen.
 * @default true
 * 
 * @param After Game Over Common Event ID
 * @type common_event
 * @desc The common event to run AFTER the Game Over scene (or fadeout).
 * Leave blank to go to title.
 * @default 
 * 
 * @command reload_last_save
 * @text Reload Last Save
 * @desc Reloads the most recent save. If this game hasn't ever
 *       been saved, goes to the title screen instead.
 */

(() => {
	const pluginName = "McKathlin_GameOver";
 
	//=============================================================================
	// Parameters and Constants
	//=============================================================================

	McKathlin.Parameters = PluginManager.parameters('McKathlin_GameOver');
	McKathlin.Param = McKathlin.Param || {};

	McKathlin.Param.PartyDeathCommonEventID =
		Number(McKathlin.Parameters['Party Death Common Event ID']);
	McKathlin.Param.ShowGameOverScene =
		(McKathlin.Parameters['Show Game Over Scene'] == 'true');
	McKathlin.Param.ReloadLastSave =
		(McKathlin.Parameters['Reload Last Save'] == 'true');
	McKathlin.Param.AfterGameOverCommonEventID =
		Number(McKathlin.Parameters['After Game Over Common Event ID']);

	McKathlin.GameOver = {};

	//=============================================================================
	// Plugin Command: Reload Last Save
	// This is accomplished by going to a brief, unseen Scene_ReloadLastSave.
	// The scene change helps the reloaded game start fresh.
	//=============================================================================
	
	// Reload Last Save plugin command
	PluginManager.registerCommand(pluginName, "reload_last_save", args => {
		SceneManager.goto(McKathlin.GameOver.Scene_ReloadLastSave);
	});
	
	// Scene_ReloadLastSave
	// new scene type
	McKathlin.GameOver.Scene_ReloadLastSave = function(){
		this.initialize(...arguments);
	};
	
	McKathlin.GameOver.Scene_ReloadLastSave.prototype = Object.create(Scene_Base.prototype);
	McKathlin.GameOver.Scene_ReloadLastSave.prototype.constructor = McKathlin.GameOver.Scene_ReloadLastSave;
	
	McKathlin.GameOver.Scene_ReloadLastSave.prototype.initialize = function() {
		Scene_Base.prototype.initialize.call(this);
		this._loadSuccess = false;
	};
	
	McKathlin.GameOver.Scene_ReloadLastSave.prototype.terminate = function() {
		Scene_Base.prototype.terminate.call(this);
		if (this._loadSuccess) {
			$gameSystem.onAfterLoad();
		}
	};
	
	McKathlin.GameOver.Scene_ReloadLastSave.prototype.create = function() {
		Scene_Base.prototype.create.call(this);
	};

	McKathlin.GameOver.Scene_ReloadLastSave.prototype.start = function() {
		Scene_Base.prototype.start.call(this);
		var saveId = $gameSystem.savefileId();
		if (DataManager.savefileExists(saveId)) {
			try {
				DataManager.loadGame(saveId);
				this.fadeOutAll();
				this.reloadMapIfUpdated();
				SceneManager.goto(Scene_Map);
				this._loadSuccess = true;
			} catch (error) {
				console.warn("ReloadLastSave load error: " + error);
				SceneManager.goto(Scene_Title);
			}
		} else {
			console.log("ReloadLastSave: No savefile available. Going to title.");
			SceneManager.goto(Scene_Title);
		}
	};

	McKathlin.GameOver.Scene_ReloadLastSave.prototype.update = function() {
		Scene_Base.prototype.update.call(this);
	};
	
	// reloadMapIfUpdated
	// This method is an exact copy of Scene_Load.prototype.reloadMapIfUpdated.
	McKathlin.GameOver.Scene_ReloadLastSave.prototype.reloadMapIfUpdated = function() {
		if ($gameSystem.versionId() !== $dataSystem.versionId) {
			const mapId = $gameMap.mapId();
			const x = $gamePlayer.x;
			const y = $gamePlayer.y;
			$gamePlayer.reserveTransfer(mapId, x, y);
			$gamePlayer.requestMapReload();
		}
	};
	
	// Scene_Map needsFadeIn
	// extended method
	// marks Scene_ReloadLastSave as calling for fade in.
	McKathlin.GameOver.Scene_Map_needsFadeIn = Scene_Map.prototype.needsFadeIn;
	Scene_Map.prototype.needsFadeIn = function() {
		return (
			McKathlin.GameOver.Scene_Map_needsFadeIn.call(this) ||
				SceneManager.isPreviousScene(McKathlin.GameOver.Scene_ReloadLastSave)
		);
	};
	
	//=============================================================================
	// Party Death Common Event
	//=============================================================================

	// TODO: refactor to redefine function only if parameter calls for it.
	
	// Game_Party reviveLeader
	// new helper method
	Game_Party.prototype.reviveLeader = function() {
		if ($gameParty.isAllDead()) {
			$gameParty.leader().setHp(1);
			$gameParty.leader().clearStates();
		}
	};
	
	if (McKathlin.Param.PartyDeathCommonEventID > 0) {
		// BattleManager process defeat
		// Replacement method
		// Like original, but with handling added for Party Death Common Event case.
		BattleManager.processDefeat = function() {
			this.displayDefeatMessage();
			this.playDefeatMe();
			if (this._canLose) {
				this.replayBgmAndBgs();
				this.endBattle(2);
			} else {
				AudioManager.stopBgm();
				$gameParty.reviveLeader();
				$gameTemp.reserveCommonEvent(McKathlin.Param.PartyDeathCommonEventID);
				$gameTroop.setupBattleEvent(); // Run the reserved common event.
				// the battle doesn't end here in this case,
				// unless a scene control command ends it in the common event.
			}
		};

		// Scene_Base check game over
		// replacement method
		// Reroute to party death common event.
		Scene_Base.prototype.checkGameover = function() {
			if ($gameParty.isAllDead()) {
				$gameParty.reviveLeader();
				$gameTemp.reserveCommonEvent(McKathlin.Param.PartyDeathCommonEventID);
			}
		};
	}

	//=============================================================================
	// Skip Game Over Scene
	// Redefine several methods of Scene_GameOver
	// so that it hides, and skips straight to the next scene.
	//=============================================================================

	if (!McKathlin.Param.ShowGameOverScene) {
		Scene_Gameover.prototype.create = function() {
			Scene_Base.prototype.create.call(this);
			//this.playGameoverMusic(); // No music.
			this.createBackground();
		};

		Scene_Gameover.prototype.start = function() {
			Scene_Base.prototype.start.call(this);
			//this.startFadeIn(this.slowFadeSpeed(), false); // No fadein.
		};

		// Scene_Gameover isTriggered
		// replacement method
		Scene_Gameover.prototype.isTriggered = function() {
			// Disable need for trigger input by treating it as already pressed.
			return true;
		};

		Scene_Gameover.prototype.createBackground = function() {
			// Load image to avoid potential conflicts.
			this._backSprite = new Sprite();
			this._backSprite.bitmap = ImageManager.loadSystem('GameOver');
			//this.addChild(this._backSprite); // But don't show it!
		};
	}

	//=============================================================================
	// After Game Over Common Event
	//=============================================================================
	
	if (McKathlin.Param.AfterGameOverCommonEventID > 0) {
		// Scene_Gameover update
		// extended method
		McKathlin.GameOver.Scene_Gameover_update = Scene_Gameover.prototype.update;
		Scene_Gameover.prototype.update = function() {
			if (this._nextSceneFadeoutCalled) {
				$gameScreen.update();
				McKathlin.GameOver.Scene_Gameover_update.call(this);
			} else if (this.isActive() && !this.isBusy()) {
				this._nextSceneFadeoutCalled = true;
				this.startNextSceneFadedOut();
			} else {
				Scene_Base.prototype.update.call(this);
			}
		};
		
		// Scene_Gameover go to title
		// replacement method
		// Instead of going to title, go to latest map and call common event.
		Scene_Gameover.prototype.gotoTitle = function() {
			$gameParty.reviveLeader();
			$gameTemp.reserveCommonEvent(McKathlin.Param.AfterGameOverCommonEventID);
			SceneManager.goto(Scene_Map);
		};
		
		// Scene_Gameover start next scene faded out
		// new method
		Scene_Gameover.prototype.startNextSceneFadedOut = function() {
			this._fadeDuration = 2; // buy time for fadeout
			$gameScreen.startFadeOut(1); // start next scene blacked out
		};
	}

})();
