# bme-branded-login
A very simple and clean lightdm-webkit2-greeter theme.
Inspired by the layout of [Doto](https://github.com/declantyson/doto). And a photo, my dad took about a university building.

## Demo
You can try it out here: https://marcsello.github.io/bme-branded-login/

## Simple
I wanted to make this theme as simple as possible. By simplicity I mean leaving out all the stuff I will never ever use on my login screen after a first time setup.
 -  No built in settings menu... I saw this in many other lightdm-webkit2-greeter themes, and I find it very odd, that they include a settings menu... in the greeter. Like this screen is supposed to welcome anyone that sits in front of the computer, and I don't really want anyone to mess around with my settings. I also don't like the idea of including something, that must be loaded by the greeter, but never actually used or seen most of the time.
 -  No Desktop environment chooser. Let's be honest here, most of the people don't even know that they can change it. I have only one installed, and that's it, and I believe most people won't change it so ofthen that they need a dedicated settings button for it. bme-branded-login will always use your "default" session.
 -  No User list... Well, just remember your username damint.
 -  No profile pic, or hostname... Well, actually those would be nice, but they does not really fit in the "simple" style.
 -  No shutdown/reboot/etc. button... Well, this would nice as well, I'm looking forward adding it.
 
I also didn't really wanted to use any js or css libraries. They are all bloated and slow.  
Well, to achive this, everything is hardcoded (however, at least reading and using the configuration provided by lightdm would be nice).

## Clean
What I don't like in many of the aviliable lightdm-webkit2-greeter themes that they are trying to add as many things to the screen as possible.
They put a border, or some marking around everything, putting them into a box, that's inside a circle and all that stuff. As well as adding heavy animations that looks a bit choppy on my computers.   
I wanted a theme that leaves out all of this, and looks clean. This is what I came up with.

## Installion
1. For the first step, I assume, you have already set up [lightdm](https://www.freedesktop.org/wiki/Software/LightDM/) and [lightdm-webkit2-greeter](https://github.com/Antergos/web-greeter) for your distro.
2. Just git clone, or download this repo somewhere on your disk.
3. Copy the contents of the repo into a new folder named `bme-branded` under lightdm's theme folder (Usually `/usr/share/lightdm-webkit/themes`)
4. Change the greeter theme to `bme-branded` in `/etc/lightdm/lightdm-webkit2-greeter.conf`
5. ???
6. Profit!

## Contribute!
Since I'm not a great web developer, any help would be apprechiated!  
Adding missing features, hunting down bugs and refactoring are all things You could help me out with.
