# McKathlin Game Over Plugin for RPG Maker MZ

Allows you to change what happens when game over occurs:
* Choose any common event to run when the player’s party dies.
* Choose whether the Game Over image (scene) is shown.
* Choose any common event to run after game over finishes.

In many games, party death or other game over does not result in showing the title screen. If you want your game to make something else happen with game over, then this plugin is for you!

## Compatibility

This plugin is designed to play well by itself and with other plugins.
There are no known conflicts, but conflict is possible with other plugins
that directly alter Game Over behavior.

## Parameter: Party Death Common Event ID

Assigning a Party Death Common Event replaces the usual Game Over scene
call with a common event call. This lets you (the game designer) make 
something happen instead of (or before) the standard Game Over screen.
Here are some pointers:
* The Party Death common event will run in the same scene where the party
  was just defeated. If the party died in battle, the common event will run
  in battle, right after the party-is-defeated message and music effect.
  So if you want to make something happen after a slow fadeout
  and return to the map, I recommend using the After Game Over Common Event
  instead.
* If you would like the Game Over screen (or a fadeout and cut to the map
  if "Show Game Over Scene" is false) to show at the end of your common
  event, remember to use the Game Over command in your common event.
  Avoiding the Game Over screen is easy: avoid calling the Game Over
  command.
* Directly calling the Game Over command from any event will still show
  the Game Over screen normally (unless you've set Show Game Over Scene to
  false). To force your custom party death behavior, use a command that
  calls your party death common event instead.

## Parameter: Show Game Over Scene

RPG Maker's default behavior takes the player to Scene_GameOver on
party death or on a scene processing call to Scene_GameOver.
This processing shows a Game Over screen.
After the player sees the screen and presses any key,
the game exits to the title screen.

If Show Game Over Scene is set to false, player will see a fade to black
before going to the next scene. This will be the case regardless of whether
Game Over state is reached by party death or by a direct command in an
event.

Whether or not the Game Over screen shows, which scene is next depends on
whether the After Game Over Common Event is set, and what it is set to.

## Parameter: After Game Over Common Event ID

**TL;DR:** If you set this common event, remember to make the common event include a fade-in!

Assigning a After Game Over common event makes gameplay continue after
the party loses, instead of RPG Maker's default behavior of returning the
party to the title screen.

In the content of the common event, the game designer can customize what
happens when the party dies or reaches an event-dictated Game Over state.
The After Game Over common event might do some of the following things:
* Take away gold and/or items
* Return the player to a safe place
* Restore HP to one or more party members
* Have the party's rescuer say something
* ...anything that suits this game!

IMPORTANT: When control flows to the After Game Over common event,
the screen will start blacked out. This gives the event time to handle
transfers and other processing before showing the player the screen.
Once those things are ready, remember to fade in!

The After Game Over Common Event (AGOCE) differs from the Party Death
Common Event (PDCE) in the following ways:
* The PDCE runs instead of or before the Game Over screen or fadeout;
  the AGOCE runs after the Game Over scene or fadeout completes.
* The PDCE only automatically replaces Game Overs caused by party death.
  The AGOCE autoruns after all Game Overs, regardless of their cause.
* The PDCE runs in the same scene where party death occurred.
  The AGOCE runs in a newly started map scene, with the screen faded to
  black, and the party leader revived to 1 HP.

## Plugin command: Reload Last Save

Use the Reload Last Save plugin command to make the game reload directly
from its most recent save, without passing through a load game menu.
If the player has not yet saved, then the player is instead returned to the
Title Screen.

This plugin command may be useful in a Party Death Common Event, in an 
After Game Over Common Event, or in any event of the developer's choice.

For more help using the Game Over plugin, see see [Tyruswoo.com](https://www.tyruswoo.com).

## Version History

**v1.3** - 10/10/2020
- Game Over plugin released for RPG Maker MZ!

> **Happy storytelling!**
> 
> *McKathlin*
