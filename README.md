## Fork information:
- This is forked from [the original](https://github.com/mmone/OctoprintKlipperPlugin) version 0.2.5
- The current version is 0.2.5-JEL-0.1 and includes modified versions of:
  - klipper.js
  - klipper_param_macro.js
  - klipper_leveling.js
- Changes made result in multiple GCode commands being sent to OctoPrint.control.sendGcode as an array of strings instead of separate strings or as strings with line breaks or other formatting.  This results in the commands being received in the intended order and interpreted correctly. 

## Fork Installation Information:
- Uninstall any other versions of the plugin using Plugin Manager or other means, as necessary.
- Install this version by using Plugin Manager's "From Url" option and entering this URL:
`https://github.com/jameseleach/OctoprintKlipperPlugin/archive/JEL-0.1.zip`

Original contents follow...

# OctoPrint Klipper Plugin
This plugin assists in managing and monitoring the [Klipper](https://github.com/KevinOConnor/klipper) 3D printer firmware.

## Features
- Simplified connection dialog.
- Restart Host and MCU processes.
- User defineable macro buttons with optional parameter dialogs.
- Assisted bed leveling wizard with user definable probe points.
- PID Tuning Dialog.
- Dialog to set a coordinate offset for future GCODE move commands.
- Message log displaying messages from Klipper prepended with "//" and "!!".
- Basic Klipper configuration editor
- Performance graph displaying key parameters extracted from the Klipper logs.

## Installation

Search for "Klipper" in OctoPrints Plugin Manager.

![Message Log](docs/assets/img/install.png)

or install manually using this URL / zip:

    https://github.com/mmone/OctoPrintKlipper/archive/master.zip

## Update

OctoPrint will inform you when a new version of this plugin becomes available.

## Configuration

Click on the wrench icon in the titlebar to open OctoPrints settings dialog. Select "OctoKlipper" at the bottom of the settings dialog.

## Contributions

Also for the moment this plugin does what I wanted it to do, it is far from finished, pull requests are welcome. If you want to get started, the OctoPrint Plugin API is quite well documented here: [docs.octoprint.org/en/master/plugins](http://docs.octoprint.org/en/master/plugins).


## Screenshots

#### Message Log
![Message Log](docs/assets/img/message-log.png)

#### Bed Leveling
![Bed Leveling](docs/assets/img/bed-leveling.png)

#### PID Tuning
![PID Tuning](docs/assets/img/pid-tuning.png)

#### Coordinate Offset
![Coordinate Offset](docs/assets/img/offset.png)

#### Settings
![Settings](docs/assets/img/settings.png)

#### Klipper Config
![Klipper Config](docs/assets/img/klipper-config.png)

#### Performance Graph
![Performance Grap](docs/assets/img/performance-graph.png)

