    // --- Custom Message Box Functionality ---
    let resolveMessageBoxPromise;
    const messageBoxOverlay = document.getElementById('messageBoxOverlay');
    const messageBoxText = document.getElementById('messageBoxText');
    const messageBoxConfirm = document.getElementById('messageBoxConfirm');
    const messageBoxCancel = document.getElementById('messageBoxCancel');

    function showMessageBox(message, isConfirm = false) {
        messageBoxText.textContent = message;
        messageBoxCancel.classList.toggle('hidden', !isConfirm);
        messageBoxConfirm.textContent = isConfirm ? 'Confirm' : 'OK'; // Change button text for clarity
        messageBoxOverlay.classList.add('active');

        return new Promise(resolve => {
            resolveMessageBoxPromise = resolve;
        });
    }

    messageBoxConfirm.addEventListener('click', () => {
        messageBoxOverlay.classList.remove('active');
        if (resolveMessageBoxPromise) {
            resolveMessageBoxPromise(true);
        }
    });

    messageBoxCancel.addEventListener('click', () => {
        messageBoxOverlay.classList.remove('active');
        if (resolveMessageBoxPromise) {
            resolveMessageBoxPromise(false);
        }
    });
    // --- End Custom Message Box Functionality ---

    /**
     * Converts RGB float values (0-1) to a hex color string (#RRGGBB).
     * @param {number} r - Red component (0-1).
     * @param {number} g - Green component (0-1).
     * @param {number} b - Blue component (0-1).
     * @returns {string} Hex color string (e.g., "#FF0000").
     */
    function rgbFloatToHex(r, g, b) {
        const toHex = (c) => {
            const hex = Math.round(c * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    // --- Role Wiki Data & Logic ---

    // Define colors for team categories (used for the team dot)
    const teamColors = {
    "Crewmate": { dotColor: '#00ffff', boxBg: 'rgba(0, 255, 255, 0.2)', boxShadow: '0 0 8px #00ffff' }, /* Cyan */
    "Impostor": { dotColor: '#ff0000', boxBg: 'rgba(255, 0, 0, 0.2)', boxShadow: '0 0 8px #ff0000' }, /* Red */
    "Neutral": { dotColor: '#808080', boxBg: 'rgba(70, 70, 70, 0.2)', boxShadow: '0 0 8px #808080' },  /* Yellow */
    // Add modifiers if they need distinct colors:
    "Crewmate Modifier": { dotColor: '#00ffff', boxBg: 'rgba(0, 255, 255, 0.1)', boxShadow: '0 0 5px #00ffff' }, // Slightly less opaque for modifiers
    "Global Modifier": { dotColor: '#9333ea', boxBg: 'rgba(147, 51, 234, 0.1)', boxShadow: '0 0 5px #9333ea' }, /* A purple-ish tone for Global Modifiers */
    "Impostor Modifier": { dotColor: '#ff0000', boxBg: 'rgba(255, 0, 0, 0.1)', boxShadow: '0 0 5px #ff0000' }
};

    // Define unique colors for each individual role name, icon outline, and card outline
    // These colors are based on the image snippets provided and will be used for glow/accents
    const roleColors = {
        "Crewmate": rgbFloatToHex(0.00, 0.75, 1.00), // Palette.CrewmateBlue -> Cyan
        "Mayor": rgbFloatToHex(0.44, 0.31, 0.66),
        "Sheriff": rgbFloatToHex(1.00, 1.00, 0.00), // Color.yellow
        "Engineer": rgbFloatToHex(1.00, 0.65, 0.04),
        "Swapper": rgbFloatToHex(0.40, 0.90, 0.40),
        "Investigator": rgbFloatToHex(0.00, 0.70, 0.70),
        "Medic": rgbFloatToHex(0.00, 0.40, 0.00),
        "Seer": rgbFloatToHex(1.00, 0.80, 0.50),
        "Spy": rgbFloatToHex(0.80, 0.64, 0.80),
        "Snitch": rgbFloatToHex(0.83, 0.69, 0.22),
        "Altruist": rgbFloatToHex(0.40, 0.00, 0.00),
        "Vigilante": rgbFloatToHex(1.00, 1.00, 0.60),
        "Veteran": rgbFloatToHex(0.60, 0.50, 0.25),
        "Haunter": rgbFloatToHex(0.83, 0.83, 0.83),
        "Tracker": rgbFloatToHex(0.00, 0.60, 0.00),
        "Transporter": rgbFloatToHex(0.00, 0.93, 1.00),
        "Medium": rgbFloatToHex(0.65, 0.50, 1.00),
        "Mystic": rgbFloatToHex(0.30, 0.60, 0.90),
        "Trapper": rgbFloatToHex(0.65, 0.82, 0.70),
        "Detective": rgbFloatToHex(0.30, 0.30, 1.00),
        "Imitator": rgbFloatToHex(0.70, 0.85, 0.30),
        "Prosecutor": rgbFloatToHex(0.70, 0.50, 0.00),
        "Oracle": rgbFloatToHex(0.75, 0.00, 0.75),
        "Aurial": rgbFloatToHex(0.70, 0.30, 0.60),
        "Hunter": rgbFloatToHex(0.16, 0.67, 0.53),
        "Politician": rgbFloatToHex(0.40, 0.00, 0.60),
        "Warden": rgbFloatToHex(0.60, 0.00, 1.00),
        "Jailor": rgbFloatToHex(0.65, 0.65, 0.65),
        "Lookout": rgbFloatToHex(0.20, 1.00, 0.40),
        "Deputy": rgbFloatToHex(1.00, 0.80, 0.00),
        "Plumber": rgbFloatToHex(0.80, 0.40, 0.00),
        "Cleric": rgbFloatToHex(0.00, 1.00, 0.70),

        // Neutral Roles
        "Jester": rgbFloatToHex(1.00, 0.75, 0.80),
        "Executioner": rgbFloatToHex(0.55, 0.25, 0.02),
        "Glitch": rgbFloatToHex(0.00, 1.00, 0.00), // Color.green
        "Arsonist": rgbFloatToHex(1.00, 0.30, 0.00),
        "Phantom": rgbFloatToHex(0.40, 0.16, 0.38),
        "Amnesiac": rgbFloatToHex(0.50, 0.70, 1.00),
        "Juggernaut": rgbFloatToHex(0.55, 0.00, 0.30),
        "Survivor": rgbFloatToHex(1.00, 0.90, 0.30),
        "Guardian Angel": rgbFloatToHex(0.70, 1.00, 1.00),
        "Plaguebearer": rgbFloatToHex(0.90, 1.00, 0.70),
        "Pestilence": rgbFloatToHex(0.30, 0.30, 0.30), // Color.grey
        "Werewolf": rgbFloatToHex(0.66, 0.40, 0.16),
        "Doomsayer": rgbFloatToHex(0.00, 1.00, 0.50),
        "Vampire": rgbFloatToHex(0.15, 0.15, 0.15),
        "Soul Collector": rgbFloatToHex(0.60, 1.00, 0.80),
        "Mercenary": rgbFloatToHex(0.55, 0.40, 0.60),

        // Impostor Colors
        "Impostor": rgbFloatToHex(1.00, 0.00, 0.00), // Palette.ImpostorRed -> Red

        // Impostor Roles (from old data, adjust if new specific ones needed)
        "Eclipsal": rgbFloatToHex(1.00, 0.00, 0.00),
        "Escapist": rgbFloatToHex(1.00, 0.00, 0.00),
        "Grenadier": rgbFloatToHex(1.00, 0.00, 0.00),
        "Morphling": rgbFloatToHex(1.00, 0.00, 0.00),
        "Swooper": rgbFloatToHex(1.00, 0.00, 0.00),
        "Venerer": rgbFloatToHex(1.00, 0.00, 0.00),
        "Bomber": rgbFloatToHex(1.00, 0.00, 0.00),
        "Scavenger": rgbFloatToHex(1.00, 0.00, 0.00),
        "Traitor": rgbFloatToHex(1.00, 0.00, 0.00),
        "Warlock": rgbFloatToHex(1.00, 0.00, 0.00),
        "Blackmailer": rgbFloatToHex(1.00, 0.00, 0.00),
        "Hypnotist": rgbFloatToHex(1.00, 0.00, 0.00),
        "Janitor": rgbFloatToHex(1.00, 0.00, 0.00),
        "Miner": rgbFloatToHex(1.00, 0.00, 0.00),
        "Undertaker": rgbFloatToHex(1.00, 0.00, 0.00)
    };

    // Modifiers (Converted from provided list)
    const modifierColors = {
        "Bait": rgbFloatToHex(0.20, 0.70, 0.70),
        "Aftermath": rgbFloatToHex(0.65, 1.00, 0.65),
        "Diseased": rgbFloatToHex(0.50, 0.50, 0.50), // Color.grey
        "Torch": rgbFloatToHex(1.00, 1.00, 0.60),
        "Button Barry": rgbFloatToHex(0.90, 0.00, 1.00),
        "Flash": rgbFloatToHex(1.00, 0.50, 0.50),
        "Giant": rgbFloatToHex(1.00, 0.70, 0.30),
        "Lovers": rgbFloatToHex(1.00, 0.40, 0.80),
        "Sleuth": rgbFloatToHex(0.50, 0.20, 0.20),
        "Tiebreaker": rgbFloatToHex(0.60, 0.90, 0.60),
        "Radar": rgbFloatToHex(1.00, 0.00, 0.50),
        "Multitasker": rgbFloatToHex(1.00, 0.50, 0.30),
        "Frosty": rgbFloatToHex(0.60, 1.00, 1.00),
        "Sixth Sense": rgbFloatToHex(0.85, 1.00, 0.55),
        "Shy": rgbFloatToHex(1.00, 0.70, 0.80),
        "Mini": rgbFloatToHex(0.80, 1.00, 0.90),
        "Celebrity": rgbFloatToHex(1.00, 0.60, 0.60),
        "Taskmaster": rgbFloatToHex(0.40, 0.60, 0.40),
        "Immovable": rgbFloatToHex(0.90, 0.90, 0.80),
        "Satellite": rgbFloatToHex(0.00, 0.60, 0.80),
        "Disperser": rgbFloatToHex(1.00, 0.00, 0.00), /* Using Orange Red */
        "Double Shot": rgbFloatToHex(1.00, 0.00, 0.00), /* Using Red */
        "Saboteur": rgbFloatToHex(1.00, 0.00, 0.00), /* Using Dark Brown-Red */
        "Underdog": rgbFloatToHex(1.00, 0.00, 0.00) /* Using Indian Red */
    };


    // Raw settings from the provided file
    const rawSavedSettings = `
<color=#B34D99FF>Aurial</color>
0
<color=#4D4DFFFF>Detective</color>
0
<color=#D3D3D3FF>Haunter</color>
50
<color=#00B3B3FF>Investigator</color>
0
<color=#33FF66FF>Lookout</color>
50
<color=#4D99E6FF>Mystic</color>
20
<color=#FFCC80FF>Seer</color>
5
<color=#D4AF37FF>Snitch</color>
40
<color=#CCA3CCFF>Spy</color>
10
<color=#009900FF>Tracker</color>
20
<color=#A7D1B3FF>Trapper</color>
40
<color=#FFCC00FF>Deputy</color>
40
<color=#29AB87FF>Hunter</color>
40
<color=#FFFF00FF>Sheriff</color>
40
<color=#998040FF>Veteran</color>
40
<color=#FFFF99FF>Vigilante</color>
40
<color=#A6A6A6FF>Jailor</color>
40
<color=#660099FF>Politician</color>
40
<color=#B38000FF>Prosecutor</color>
40
<color=#66E666FF>Swapper</color>
40
<color=#660000FF>Altruist</color>
45
<color=#00FFB3FF>Cleric</color>
40
<color=#006600FF>Medic</color>
40
<color=#BF00BFFF>Oracle</color>
40
<color=#9900FFFF>Warden</color>
40
<color=#FFA60AFF>Engineer</color>
40
<color=#B3D94DFF>Imitator</color>
40
<color=#A680FFFF>Medium</color>
40
<color=#CC6600FF>Plumber</color>
40
<color=#00EEFFFF>Transporter</color>
40
<color=#80B2FFFF>Amnesiac</color>
50
<color=#B3FFFFFF>Guardian Angel</color>
50
<color=#8C6699FF>Mercenary</color>
45
<color=#FFE64DFF>Survivor</color>
45
<color=#00FF80FF>Doomsayer</color>
45
<color=#8C4005FF>Executioner</color>
10
<color=#FFBFCCFF>Jester</color>
50
<color=#662962FF>Phantom</color>
55
<color=#FF4D00FF>Arsonist</color>
35
<color=#00FF00FF>Glitch</color>
45
<color=#8C004DFF>Juggernaut</color>
45
<color=#E6FFB3FF>Plaguebearer</color>
35
<color=#99FFCCFF>Soul Collector</color>
45
<color=#262626FF>Vampire</color>
25
<color=#A86629FF>Werewolf</color>
45
<color=#FF0000FF>Eclipsal</color>
50
<color=#FF0000FF>Escapist</color>
50
<color=#FF0000FF>Grenadier</color>
50
<color=#FF0000FF>Morphling</color>
50
<color=#FF0000FF>Swooper</color>
50
<color=#FF0000FF>Venerer</color>
50
<color=#FF0000FF>Bomber</color>
50
<color=#FF0000FF>Scavenger</color>
50
<color=#FF0000FF>Traitor</color>
50
<color=#FF0000FF>Warlock</color>
50
<color=#FF0000FF>Blackmailer</color>
45
<color=#FF0000FF>Hypnotist</color>
45
<color=#FF0000FF>Janitor</color>
45
<color=#FF0000FF>Miner</color>
45
<color=#FF0000FF>Undertaker</color>
50
<color=#A6FFA6FF>Aftermath</color>
50
<color=#33B3B3FF>Bait</color>
40
<color=#FF9999FF>Celebrity</color>
50
<color=#808080FF>Diseased</color>
40
<color=#99FFFFFF>Frosty</color>
40
<color=#FF804DFF>Multitasker</color>
50
<color=#669966FF>Taskmaster</color>
50
<color=#FFFF99FF>Torch</color>
50
<color=#E600FFFF>Button Barry</color>
40
<color=#FF8080FF>Flash</color>
50
<color=#FFB34DFF>Giant</color>
50
<color=#E6E6CCFF>Immovable</color>
50
<color=#FF66CCFF>Lovers</color>
50
<color=#CCFFE6FF>Mini</color>
50
<color=#FF0080FF>Radar</color>
50
<color=#0099CCFF>Satellite</color>
50
<color=#FFB3CCFF>Shy</color>
50
<color=#D9FF8CFF>Sixth Sense</color>
50
<color=#803333FF>Sleuth</color>
50
<color=#99E699FF>Tiebreaker</color>
50
<color=#FF0000FF>Disperser</color>
100
<color=#FF0000FF>Double Shot</color>
50
<color=#FF0000FF>Saboteur</color>
100
<color=#FF0000FF>Underdog</color>
100
All Roles Are Unique
True
Slot 1
7
Slot 2
7
Slot 3
17
Slot 4
7
Slot 5
8
Slot 6
7
Slot 7
9
Slot 8
7
Slot 9
7
Slot 10
17
Slot 11
7
Slot 12
12
Slot 13
7
Slot 14
7
Slot 15
17
Choose Random Map
True
Skeld Chance
50
Mira Chance
50
Polus Chance
50
Airship Chance
5
Fungle Chance
5
Submerged Chance
0
Level Impostor Chance
0
Half Vision On Skeld/Mira HQ
False
Mira HQ Decreased Cooldowns
0
Airship/Submerged Increased Cooldowns
0
Skeld/Mira HQ Increased Short Tasks
0
Skeld/Mira HQ Increased Long Tasks
0
Airship/Submerged Decreased Short Tasks
0
Airship/Submerged Decreased Long Tasks
0
Better Polus Vent Layout
True
Vitals Moved To Lab
True
Cold Temp Moved To Death Valley
True
Reboot Wifi And Chart Course Swapped
True
Airship Doors Are Polus Doors
True
Camouflaged Comms
True
Kill Anyone During Camouflaged Comms
True
Impostors Can See The Roles Of Their Team
True
Dead Can See Everyone's Roles/Votes
True
Game Start Cooldowns
10
Temp Save Cooldown Reset
5
Parallel Medbay Scans
True
Disable Meeting Skip Button
0
First Death Shield Next Game
True
Crew Killers Continue Game
True
See Tasks During Round
False
See Tasks During Meetings
True
See Tasks When Dead
True
Impostor Assassins Count
2
Neutral Assassins Count
2
Amnesiac Turned Impostor Gets Ability
True
Amnesiac Turned Neutral Killing Gets Ability
True
Traitor Gets Ability
True
Number Of Assassin Kills
15
Assassin Can Kill More Than Once Per Meeting
True
Assassin Can Guess "Crewmate"
True
Assassin Can Guess Neutral Benign Roles
True
Assassin Can Guess Neutral Evil Roles
True
Assassin Can Guess Neutral Killing Roles
True
Assassin Can Guess Impostor Roles
True
Assassin Can Guess Crewmate Modifiers
True
Assassin Can Guess Lovers
True
Radiate Colour Range
0.5
Radiate Max Range
1.5
Sense Duration
10
Examine Cooldown
25
Show Detective Reports
True
Time Where Detective Will Have Role
15
Time Where Detective Will Have Faction
30
Tasks Remaining When Haunter Can Be Clicked
5
Tasks Remaining When Alert Is Sent
1
Haunter Reveals Neutral Roles
True
Who Can Click Haunter
0
Footprint Size
5
Footprint Interval
0.10000001
Footprint Duration
10
Anonymous Footprint
False
Footprint Vent Visible
True
Watch Cooldown
10
Lookout Watches Reset After Each Round
True
Maximum Number Of Players That Can Be Watched
5
Dead Body Arrow Duration
0.2
Seer Cooldown
20
Crewmate Killing Roles Are Red
True
Neutral Benign Roles Are Red
True
Neutral Evil Roles Are Red
True
Neutral Killing Roles Are Red
True
Traitor Does Not Swap Colours
True
Snitch Sees Neutral Roles
False
Tasks Remaining When Revealed
1
Snitch Sees Impostors In Meetings
True
Snitch Sees Traitor
False
Who Sees Dead Bodies On Admin
1
Arrow Update Interval
0.5
Track Cooldown
10
Tracker Arrows Reset After Each Round
True
Maximum Number Of Tracks
10
Min Amount Of Time In Trap To Register
0.5
Trap Cooldown
10
Traps Removed After Each Round
True
Maximum Number Of Traps
5
Trap Size
0.25
Minimum Number Of Roles Required To Trigger Trap
3
Hunter Kill Cooldown
17.5
Hunter Stalk Cooldown
10
Hunter Stalk Duration
25
Maximum Stalk Uses
5
Hunter Kills Last Voter If Voted Out
True
Hunter Can Report Who They've Killed
True
Sheriff Miskill Kills Crewmate
False
Sheriff Kills Neutral Evil Roles
True
Sheriff Kills Neutral Killing Roles
True
Sheriff Kill Cooldown
22.5
Sheriff Can Report Who They've Killed
True
Can Be Killed On Alert
False
Alert Cooldown
22.5
Alert Duration
15
Maximum Number Of Alerts
5
Number Of Vigilante Kills
15
Vigilante Can Kill More Than Once Per Meeting
True
Vigilante Can Guess Neutral Benign Roles
True
Vigilante Can Guess Neutral Evil Roles
True
Vigilante Can Guess Neutral Killing Roles
True
Vigilante Can Guess Impostor Modifiers
True
Vigilante Can Guess Lovers
True
Jail Cooldown
10
Maximum Number Of Executes
4
Campaign Cooldown
15
Prosecutor Dies When They Exile A Crewmate
True
Swapper Can Button
True
Altruist Revive Duration
1
Revive Uses
2
Revive Radius
2
Barrier Cooldown
20
Show Barriered Player
1
Cleric Gets Attack Notification
True
Show Shielded Player
2
Who Gets Murder Attempt Indicator
0
Shield Breaks On Murder Attempt
False
Show Medic Reports
True
Time Where Medic Will Have Color Type
15
Confess Cooldown
10
Initial Bless Cooldown
10
Reveal Accuracy
0
Neutral Benign Roles Show Evil
True
Neutral Evil Roles Show Evil
True
Neutral Killing Roles Show Evil
True
Show Fortified Player
2
Maximum Number Of Fixes
10
Mediate Cooldown
4
Reveal Appearance Of Mediate Target
True
Reveal The Medium To The Mediate Target
True
Who Is Revealed With Mediate
2
Flush Cooldown
10
Maximum Number Of Barricades
6
Transport Cooldown
15
Maximum Number Of Transports
15
Transporter Can Use Vitals
True
Amnesiac Gets Arrows Pointing To Dead Bodies
True
Time After Death Arrow Appears
0
Protect Cooldown
15
Protect Duration
10
Maximum Number Of Protects
15
Show Protected Player
1
GA Becomes On Target Dead
1
Target Knows GA Exists
True
GA Knows Targets Role
True
Odds Of Target Being Evil
30
Guard Cooldown
10
Maximum Number Of Guards
5
Gold To Bribe
3
Vest Cooldown
25
Vest Duration
10
Maximum Number Of Vests
15
Survivor Scatter Mechanic Enabled
False
Survivor Scatter Timer
20
Observe Cooldown
5
Doomsayer Guesses All Roles At Once
False
Doomsayer Can't Observe
False
Doomsayer Win Ends Game
True
Executioner Becomes On Target Dead
1
Executioner Can Button
True
Executioner Win
0
Jester Can Button
True
Jester Can Hide In Vents
True
Jester Has Impostor Vision
True
Jester Scatter Mechanic Enabled
False
Jester Scatter Timer
60
Jester Win
0
Tasks Remaining When Phantom Can Be Clicked
3
Phantom Win Ends Game
True
Douse Cooldown
22.5
Ignite Radius
1
Arsonist Can Vent
True
Mimic Cooldown
20
Mimic Duration
15
Hack Cooldown
20
Hack Duration
15
Glitch Kill Cooldown
25
Glitch Can Vent
True
Juggernaut Initial Kill Cooldown
30
Reduced Kill Cooldown Per Kill
5
Juggernaut Can Vent
True
Infect Cooldown
20
Pestilence Kill Cooldown
25
Pestilence Can Vent
True
Reap Cooldown
25
Soul Collector Can Vent
True
Vampire Bite Cooldown
25
Vampires Have Impostor Vision
True
Vampires Can Vent
True
New Vampire Can Assassinate
True
Maximum Vampires Per Game
2
Can Convert Neutral Benign Roles
True
Can Convert Neutral Evil Roles
True
Rampage Cooldown
25
Rampage Duration
25
Rampage Kill Cooldown
10
Werewolf Can Vent When Rampaged
True
Blind Cooldown
25
Blind Duration
25
Blind Radius
2
Recall Cooldown
20
Escapist Can Vent
True
Flash Grenade Cooldown
25
Flash Grenade Duration
15
Flash Radius
2
Grenadier Can Vent
True
Morphling Cooldown
20
Morphling Duration
15
Morphling Can Vent
True
Swoop Cooldown
25
Swoop Duration
15
Swooper Can Vent
True
Ability Cooldown
20
Ability Duration
15
Sprint Speed
1.4999998
Minimum Freeze Speed
0.15
Freeze Radius
2
Detonate Delay
5
Max Kills In Detonation
15
Detonate Radius
0.50000006
Bomber Can Vent
True
All Impostors See Bomb
True
Scavenge Duration
20
Scavenge Duration Increase Per Kill
10
Scavenge Kill Cooldown On Correct Kill
10
Kill Cooldown Multiplier On Incorrect Kill
2.5
Minimum People Alive When Traitor Can Spawn
5
Traitor Won't Spawn If Any Neutral Killing Is Alive
False
Time It Takes To Fully Charge
20
Time It Takes To Use Full Charge
1.1999998
Initial Blackmail Cooldown
10
Only Target Sees Blackmail
False
Maximum People Alive Where Blackmailed Can Vote
5
Hypnotize Cooldown
20
Mine Cooldown
20
Drag Cooldown
20
Undertaker Drag Speed
0.9
Undertaker Can Vent
True
Undertaker Can Vent While Dragging
True
Minimum Delay for the Bait Report
1
Maximum Delay for the Bait Report
1
Diseased Kill Multiplier
3
Chill Duration
10
Chill Start Speed
0.75
Flash Speed
2.5
Giant Speed
0.49999988
Both Lovers Die
True
Loving Impostor Probability
40
Neutral Roles Can Be Lovers
True
Impostor Lover Can Kill Teammate
True
Broadcast Duration
10
Transparency Delay
3
Turn Transparent Duration
5
Final Opacity
80
Reduced Sabotage Bonus
15
Kill Cooldown Bonus
5
Increased Kill Cooldown When 2+ Imps
True
`;

    // Function to parse the settings from the text file into a flat object
    function parseSettings(text) {
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const settings = {};
        for (let i = 0; i < lines.length; i++) {
            let key = lines[i];
            // Remove color tags like <color=#B34D99FF> and </color>
            key = key.replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/<\/color>/g, '');

            // Check if the next line exists and is a value (not another key starting with <color=)
            // This heuristic assumes settings are always key-value pairs on consecutive lines
            if (i + 1 < lines.length && !lines[i + 1].startsWith('<color=')) {
                const value = lines[++i]; // Consume the next line as the value
                settings[key] = value;
            } else if (i + 1 < lines.length && lines[i + 1].startsWith('<color=')) {
                // This is a role name, and the next line is its probability.
                // The role name itself is the key, and the next line is the value.
                const value = lines[++i];
                settings[key] = value;
            }
        }
        return settings;
    }

    const initialParsedSettings = parseSettings(rawSavedSettings); // Keep a copy of all parsed settings
    const currentParsedSettings = { ...initialParsedSettings
    }; // Create a mutable copy for removal (only entity-specific settings will remain)

    // Helper to add a setting to an entity's settings array and remove it from the general settings pool
    function addAndRemoveSetting(entitySettingsArray, settingNameInFile, displaySettingName) {
        if (currentParsedSettings[settingNameInFile] !== undefined) {
            entitySettingsArray.push({
                name: displaySettingName,
                value: currentParsedSettings[settingNameInFile]
            });
            delete currentParsedSettings[settingNameInFile]; // Remove from general settings pool
        }
    }

    // Combined data for roles and modifiers (initial data without settings)
    const allEntitiesData = [
        // Crewmate Roles
        { category: "Role", name: "Aurial", team: "Crewmate", desc: "The Aurial is a Crewmate that can sense when players use an ability nearby. If a player is very close they will even know who used the ability.", ability: "Passive Ability", icon: 'aurial.png', skillIcon: 'Sense.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Detective", team: "Crewmate", desc: "The Detective has a 2 step ability. The first stage involves inspecting a crime scene. Once a crime scene is inspected they can then examine other players on cooldown to see if that player was at the scene of the crime. Crime scenes spawn at each dead body. They also get a detective report telling them the type of killer if they examine someone’s body.", ability: "Inspect / Examine", icon: 'detective.png', skillIcon: 'Inspect.png', types: ["Detection"] },
        { category: "Role", name: "Haunter", team: "Crewmate", desc: "Once a random crewmate dies they become the Haunter. The Haunter has the ability to run around as a ghost and to do tasks. Once all tasks are finished they reveal the impostors to all alive non-impostors. However, to stop them from finishing their tasks they can be clicked by the impostors which kills them and negates their ability. The impostors also get a warning shortly before and as the Haunter finishes their tasks.", ability: "Passive Ability", icon: 'haunter.png', skillIcon: 'Ghost.png', types: ["Detection", "Utility", "Other"] },
        { category: "Role", name: "Investigator", team: "Crewmate", desc: "The Investigator is a crewmate who can see footprints for a certain duration.", ability: "View Footprints", icon: 'investigator.png', skillIcon: 'Footprint.png', types: ["Detection"] },
        { category: "Role", name: "Lookout", team: "Crewmate", desc: "The Lookout is a crewmate who can watch other players. The following meeting, the Lookout will see all roles who interacted with all watched players after they began watching them.", ability: "Watch Player", icon: 'lookout.png', skillIcon: 'Watch.png', types: ["Detection"] },
        { category: "Role", name: "Mystic", team: "Crewmate", desc: "The Mystic is a crewmate who gets a flash on their screen, every time someone dies, on top of this, they also get an arrow briefly pointing in the rough direction of the body.", ability: "Passive Ability", icon: 'mystic.png', skillIcon: 'Passive.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Seer", team: "Crewmate", desc: "The Seer is a crewmate who can reveal a player’s alliance on a cooldown. All neutral roles and crew killing roles are customisable, however, all Impostors (except Traitor) always show red, and non-crew killing show green.", ability: "Reveal Alliance", icon: 'seer.png', skillIcon: 'Seer.png', types: ["Detection"] },
        { category: "Role", name: "Snitch", team: "Crewmate", desc: "The Snitch is a crewmate who can find out the Impostors via finishing tasks. Once the Snitch finishes all their tasks they reveal the impostors to themselves via arrows and their names are highlighted red. The impostors also get a warning shortly before and as the Snitch finishes their tasks.", ability: "Passive Ability", icon: 'snitch.png', skillIcon: 'Passive.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Spy", team: "Crewmate", desc: "The Spy is a crewmate who gains extra information via the admin table. On admin they not only see how many people are in a room, but also see who is in what room.", ability: "Passive Ability", icon: 'spy.png', skillIcon: 'Spy.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Tracker", team: "Crewmate", desc: "The Tracker is a crewmate who can track people on a cooldown. Foreach person they track, they see an arrow of the colour of the person they tracked, pointing towards them which updates in specific intervals.", ability: "Track Player", icon: 'tracker.png', skillIcon: 'Track.png', types: ["Detection"] },
        { category: "Role", name: "Trapper", team: "Crewmate", desc: "The Trapper is a crewmate who can place traps. When a meeting is called the Trapper receives information on which roles entered the trap.", ability: "Place Trap", icon: 'trapper.png', skillIcon: 'Trap.png', types: ["Detection", "Utility"] },
        { category: "Role", name: "Deputy", team: "Crewmate", desc: "The Deputy is a crewmate who can camp other players. Once a camped player dies the Deputy is alerted to their death. The following meeting the Deputy may then attempt to shoot the killer of the camped player. If successful the killer dies and if not nothing happens.", ability: "Camp / Shoot", icon: 'deputy.png', skillIcon: 'Camp.png', types: ["Kill", "Detection"] },
        { category: "Role", name: "Hunter", team: "Crewmate", desc: "The Hunter is a crewmate who can stalk people for a short duration. If a stalked player uses an ability the Hunter may then be able to kill them.", ability: "Stalk (Kill on Use)", icon: 'hunter.png', skillIcon: 'Stalk.png', types: ["Kill", "Detection"] },
        { category: "Role", name: "Jailor", team: "Crewmate", desc: "The Jailor is a crewmate who can Jail players and during meetings may decide whether to Execute them. The Jailor may also anonymously communicate with their jailed target via the text chat. Everyone sees who is jailed, the jailed player may not use any meeting ability, and no meeting ability (other than prosecute) may be used on the jailed player. If the Jailor executes incorrectly, they lose the ability to jail.", ability: "Jail / Execute", icon: 'jailor.png', skillIcon: 'Jail.png', types: ["Kill", "Utility"] },
        { category: "Role", name: "Sheriff", team: "Crewmate", desc: "The Sheriff is a crewmate who can kill, their job is to kill the Impostors, however, if they attempt to kill a crewmate, they will die themselves.", ability: "Kill", icon: 'sheriff.png', skillIcon: 'Kill.png', types: ["Kill"] },
        { category: "Role", name: "Veteran", team: "Crewmate", desc: "The Veteran is a crewmate who has the option to go on alert. When they are on alert they will kill whoever interacts with them, this includes, tracking, shielding, seering, dousing, hacking and even killing!", ability: "Toggle Alert", icon: 'veteran.png', skillIcon: 'Alert.png', types: ["Kill", "Support"] },
        { category: "Role", name: "Vigilante", team: "Crewmate", desc: "The Vigilante is a crewmate who has the option during a meeting to guess someone else's role, if they are correct the other person dies, if the Vigilante is incorrect, the Vigilante dies.", ability: "Guess Role", icon: 'vigilante.png', skillIcon: 'Guess.png', types: ["Kill"] },
        { category: "Role", name: "Altruist", team: "Crewmate", desc: "The Altruist is a crewmate who can revive other players. To do this they must be located near a body. When they start reviving all Neutral Killers and Impostors get an alert that an Altruist is reviving and an arrow pointing towards the Altruist. After the revive duration ends, killers instead get an arrow to all revived players. The Altruist and revived players cannot button once a revive has taken place.", ability: "Revive", icon: 'altruist.png', skillIcon: 'Revive.png', types: ["Support"] },
        { category: "Role", name: "Cleric", team: "Crewmate", desc: "The Cleric is a crewmate who can barrier other players, providing temporary defence and cleanse other players, removing all negative effects (e.g. blackmail, douse).", ability: "Barrier / Cleanse", icon: 'cleric.png', skillIcon: 'Cleanse.png', types: ["Support"] },
        { category: "Role", name: "Medic", team: "Crewmate", desc: "The Medic is a crewmate who can shield another player. If the shielded player is attacked, the Medic is alerted to this and the shield saves the other player from dying.", ability: "Shield Player", icon: 'medic.png', skillIcon: 'Shield.png', types: ["Support"] },
        { category: "Role", name: "Oracle", team: "Crewmate", desc: "During rounds the Oracle can choose to make someone confess on their demise (death). The alliance of that player is revealed to a certain accuracy to everyone in the meeting after the Oracle’s death. In addition to that, the Oracle will receive a confession from that player at the start of each meeting, they will receive information that either that confessing player, or 2 others is evil. They also have another ability, bless, that provides someone immunity during meetings!", ability: "Confess / Bless", icon: 'oracle.png', skillIcon: 'Confess.png', types: ["Detection", "Support"] },
        { category: "Role", name: "Warden", team: "Crewmate", desc: "The Warden is a crewmate who can Fortify a player, if anyone interacts with this fortified player the ability will fail and both the Warden and person attempting to use an ability will get a purple flash on their screen.", ability: "Fortify Player", icon: 'warden.png', skillIcon: 'Fortify.png', types: ["Support"] },
        { category: "Role", name: "Engineer", team: "Crewmate", desc: "The Engineer is a crewmate who can both vent and fix sabotages.", ability: "Vent / Fix Sabotage", icon: 'engineer.png', skillIcon: 'Vent.png', types: ["Utility"] },
        { category: "Role", name: "Imitator", team: "Crewmate", desc: "The Imitator is a crewmate who can use fallen crewmates to their advantage. During meetings the Imitator can select a player who they wish to imitate the following round. They will not know what role they are imitating until the following round.", ability: "Imitate Role", icon: 'imitator.png', skillIcon: 'ImitateSelect.png', types: ["Utility", "Other"] },
        { category: "Role", name: "Mayor", team: "Crewmate", desc: "Once per game the Mayor can reveal themselves as the Mayor mid-meeting, once done so they gain an additional 2 votes.", ability: "Reveal as Mayor", icon: 'mayor.png', skillIcon: 'Mayor.png', types: ["Utility"] },
        { category: "Role", name: "Medium", team: "Crewmate", desc: "The Medium is a crewmate who can see ghosts. During rounds the Medium has an option to Mediate, which lets ghosts know who the Medium is, as well as where they are, and the same thing for the Medium in reverse.", ability: "Mediate", icon: 'medium.png', skillIcon: 'Mediate.png', types: ["Utility", "Detection"] },
        { category: "Role", name: "Plumber", team: "Crewmate", desc: "The Plumber is a crewmate who can flush vents, ejecting all players in vents at that moment and barricade vents, placing a barricade on that vent the following round.", ability: "Flush / Barricade", icon: 'plumber.png', skillIcon: 'Flush.png', types: ["Utility", "Sabotage"] },
        { category: "Role", name: "Politician", team: "Crewmate", desc: "The Politician is a crewmate who can campaign to other players. During meetings they may attempt to reveal themselves as the Mayor. If they have received enough votes from Crewmates (must be Crewmates not Neutral or Impostors) they will reveal, if not they may not campaign the following round.", ability: "Campaign to Reveal", icon: 'politician.png', skillIcon: 'Campaign.png', types: ["Utility"] },
        { category: "Role", name: "Prosecutor", team: "Crewmate", desc: "The Prosecutor has 2 abilities, one is the ability for them to see all the votes (non-anonymous voting), the other, once per game during a meeting the Prosecutor can prosecute someone, making all other votes redundant and having whoever the Prosecutor selected exiled that meeting.", ability: "Prosecute", icon: 'prosecutor.png', skillIcon: 'Prosecute.png', types: ["Utility", "Detection"] },
        { category: "Role", name: "Swapper", team: "Crewmate", desc: "The Swapper is a crewmate who can swap two players during a meeting.", ability: "Swap Players", icon: 'swapper.png', skillIcon: 'Swap.png', types: ["Utility"] },
        { category: "Role", name: "Transporter", team: "Crewmate", desc: "The Transporter is a crewmate who can swap the locations of two people on cooldown at will. The other two people have no knowledge or control of when it will happen. The Transporter just does what they want, when they want to.", ability: "Transport", icon: 'transporter.png', skillIcon: 'Transport.png', types: ["Utility"] },

        // Neutral Roles
        { category: "Role", name: "Amnesiac", team: "Neutral", desc: "The Amnesiac is a neutral role which can remember the role of a dead player. Their objective is to find a dead body in order to remember who they were. This means they can remember that they were an Impostor!", ability: "Remember Role", icon: 'amnesiac.png', skillIcon: 'Amnesiac.png', types: ["Other"] },
        { category: "Role", name: "Guardian Angel", team: "Neutral", desc: "The Guardian Angel is a neutral role which has one job, to protect their target and make sure they live. If their target wins they win.", ability: "Protect Target", icon: 'guardian_angel.png', skillIcon: 'Protect.png', types: ["Support"] },
        { category: "Role", name: "Mercenary", team: "Neutral", desc: "The Mercenary is a neutral role which can guard other players, allowing them to absorb abilities on other players. And bribe, using gold (from converting absorbed abilities) to bribe other players to join their team. If any bribed player lives and wins, the Mercenary does too.", ability: "Guard / Bribe", icon: 'mercenary.png', skillIcon: 'Bribe.png', types: ["Support"] },
        { category: "Role", name: "Survivor", team: "Neutral", desc: "The Survivor is a neutral role which has to live to win, however, if any neutral evil role or lovers win the Survivor still loses.", ability: "No Active Ability", icon: 'survivor.png', skillIcon: 'Passive.png', types: ["Other"] },
        { category: "Role", name: "Doomsayer", team: "Neutral", desc: "The Doomsayer wins by guessing 3 player’s roles at the same time. The Doomsayer also has an observe ability hinting at other player’s roles.", ability: "Observe / Guess", icon: 'doomsayer.png', skillIcon: 'Observe.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Executioner", team: "Neutral", desc: "The Executioner is a neutral role who needs to vote out a certain crewmate to win.", ability: "No Active Ability", icon: 'executioner.png', skillIcon: 'Passive.png', types: ["Other"] },
        { category: "Role", name: "Jester", team: "Neutral", desc: "The Jester is a neutral role who needs to be voted out to win.", ability: "No Active Ability", icon: 'jester.png', skillIcon: 'Passive.png', types: ["Other"] },
        { category: "Role", name: "Phantom", team: "Neutral", desc: "Once a random crewmate dies they become the Phantom. To win the Phantom needs to complete all their tasks, however, to stop them any player can click them which kills them.", ability: "Passive Ability", icon: 'phantom.png', skillIcon: 'Ghost.png', types: ["Other"] },
        { category: "Role", name: "Soul Collector", team: "Neutral", desc: "The Soul Collector wins by collecting a certain number of souls. Each round the Soul Collector may Reap players and Collect souls. For a soul to spawn a player must first be reaped and then they must die. Everyone sees a soul on the ground for the remaining duration of the round since a soul spawns. The Soul Collector sees the soul until they collect it.", ability: "Reap / Collect Souls", icon: 'soul_collector.png', skillIcon: 'Reap.png', types: ["Kill", "Other"] },
        { category: "Role", name: "Arsonist", team: "Neutral", desc: "The Arsonist is a neutral role who needs to kill everyone to win. The Arsonist however, does not have a kill button. Instead they need to douse and ignite people. The Arsonist is unique in that they can kill multiple people at once with one ignite, when they ignite all douses nearby die.", ability: "Douse / Ignite", icon: 'arsonist.png', skillIcon: 'Douse.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Juggernaut", team: "Neutral", desc: "The Juggernaut is a neutral role who needs to kill everyone to win. The Juggernaut's special querk is that they have an altered kill cooldown which decreases with each kill. The starting kill cooldown is the Glitch kill cooldown plus 5 seconds.", ability: "Kill", icon: 'juggernaut.png', skillIcon: 'Kill.png', types: ["Kill"] },
        { category: "Role", name: "Plaguebearer", team: "Neutral", desc: "The Plaguebearer is a neutral role who needs to infect everyone to turn into Pestilence (not win the game). The infection can be spread by other players via seering, tracking, examining, killing etc.", ability: "Infect", icon: 'plaguebearer.png', skillIcon: 'Infect.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Pestilence", team: "Neutral", desc: "The Pestilence is a neutral role who needs to kill everyone to win, however the only way to get rid of Pestilence is by voting it out in a meeting, otherwise it is unkillable.", ability: "Passive Ability", icon: 'pestilence.png', skillIcon: 'Passive.png', types: ["Kill", "Sabotage", "Other"] },
        { category: "Role", name: "Glitch", team: "Neutral", desc: "The Glitch is a neutral role who needs to kill everyone to win. The glitch also has additional abilities including hacking, which disables all abilities of the hacked player, and mimicing which makes them transform into another player.", ability: "Glitch / Mimic", icon: 'glitch.png', skillIcon: 'Hack.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Vampire", team: "Neutral", desc: "The Vampire and Vampire Faction wins by being the only players alive. During the game Vampires can bite other players. Every player a Vampire bites dies, except the first Crewmate, in this case the Crewmate is converted into a Vampire and loses their original ability. The only exception to this is when they bite a Vampire Hunter, in this case the Vampire Hunter stakes the Vampire. Once there are 2 Vampires alive no more players can be converted into Vampires, however, depending on settings if 1 dies they may be able to convert again.", ability: "Bite", icon: 'vampire.png', skillIcon: 'Bite.png', types: ["Kill"] },
        { category: "Role", name: "Werewolf", team: "Neutral", desc: "The Werewolf is a neutral role who needs to kill everyone to win. The Werewolf cannot kill unless they are rampaged. Once they are rampaged the Werewolf can kill multiple people during a short duration.", ability: "Transform / Rampage", icon: 'werewolf.png', skillIcon: 'Rampage.png', types: ["Kill"] },

        // Impostor Roles
        { category: "Role", name: "Eclipsal", team: "Impostor", desc: "The Eclipsal is an Impostor who can blind other players for a moderate amount of time. Blinded players have Ox vision and their report button doesn't light up.", ability: "Blind", icon: 'eclipsal.png', skillIcon: 'Blind.png', types: ["Sabotage"] },
        { category: "Role", name: "Escapist", team: "Impostor", desc: "The Escapist is an Impostor who can teleport to a desired location on the map whenever they feel like (on cooldown).", ability: "Teleport", icon: 'escapist.png', skillIcon: 'Recall.2.png', types: ["Utility"] },
        { category: "Role", name: "Grenadier", team: "Impostor", desc: "The Grenadier is an Impostor who can throw down a flash grenade. When this is done all players inside a small radius get blinded by the flash grenade.", ability: "Throw Grenade", icon: 'grenadier.png', skillIcon: 'Flash_Grenade.png', types: ["Kill"] },
        { category: "Role", name: "Morphling", team: "Impostor", desc: "The Morphling is an Impostor who can transform into another player. They can do this by sampling a player and then can proceed to morph into that player for a short period of time.", ability: "Sample / Morph", icon: 'morphling.png', skillIcon: 'Morph.png', types: ["Utility", "Sabotage"] },
        { category: "Role", name: "Swooper", team: "Impostor", desc: "The Swooper is an Impostor who can turn invisible for a short period of time.", ability: "Turn Invisible", icon: 'swooper.png', skillIcon: 'Swoop.png', types: ["Utility"] },
        { category: "Role", name: "Venerer", team: "Impostor", desc: "The Venerer is an Impostor who gains perks for killing. The perks in order are: a camouflage ability (for just the Venerer), a sprint ability and finally a freeze ability which temporarily slows all players except the Venerer.", ability: "Passive Ability", icon: 'venerer.png', skillIcon: 'Passive.png', types: ["Sabotage", "Utility"] },
        { category: "Role", name: "Bomber", team: "Impostor", desc: "The Bomber is an Impostor who can plant bombs around the map. When a bomb is planted it will detonate x seconds later (according to settings). Once detonated the bomb will kill anyone in the radius of the blast, including themselves or teammates.", ability: "Plant Bomb", icon: 'bomber.png', skillIcon: 'Bomb.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Scavenger", team: "Impostor", desc: "The Scavenger is an Impostor who must hunt down prey. When their kill cooldown becomes available they are given a timer and a target, if they kill the target the timer increases and they get a new target, if they kill wrong they get a significantly increased kill cooldown and if they don't kill anyone their kill cooldown resets.", ability: "Scavenge / Hunt", icon: 'scavenger.png', skillIcon: 'Scavenge.png', types: ["Utility", "Sabotage"] },
        { category: "Role", name: "Traitor", team: "Impostor", desc: "Once all Impostors die, a random crewmate becomes the Traitor, the Traitor can select an Impostor role to be and their sole purpose is to avenge all fallen Impostors.", ability: "No Active Ability", icon: 'traitor.png', skillIcon: 'Passive.png', types: ["Other"] },
        { category: "Role", name: "Warlock", team: "Impostor", desc: "The Warlock is an Impostor who can charge up their kill button by not killing for a long duration. Once the Warlock hits kill their charge starts decreasing and the Warlock can keep killing until this charge runs out.", ability: "Charge Kill", icon: 'warlock.png', skillIcon: 'Charge.png', types: ["Sabotage"] },
        { category: "Role", name: "Blackmailer", team: "Impostor", desc: "The Blackmailer is an Impostor who can silence a player in a meeting. During each round the Blackmailer can go up to someone to blackmail them. This prevents the blackmailed player from being able to talk in meetings.", ability: "Blackmail", icon: 'blackmailer.png', skillIcon: 'Blackmail.png', types: ["Sabotage"] },
        { category: "Role", name: "Hypnotist", team: "Impostor", desc: "The Hypnotist is an Impostor who can Hypnotise players. During a meeting they may then release Mass Hysteria, once released the Hypnotist can no longer hypnotise other players and all hypnotised players now see everyone else as either themselves, camouflaged or invisible.", ability: "Hypnotize / Mass Hysteria", icon: 'hypnotist.png', skillIcon: 'Hypnotize.png', types: ["Sabotage"] },
        { category: "Role", name: "Janitor", team: "Impostor", desc: "The Janitor is an Impostor who can choose between killing and cleaning. If they choose to clean a body the body disappears and becomes unreportable.", ability: "Clean Body", icon: 'janitor.png', skillIcon: 'Clean.png', types: ["Utility"] },
        { category: "Role", name: "Miner", team: "Impostor", desc: "The Miner is an Impostor who can place vents around the map. These vents can be used by anyone who can vent and the vents are all connected to each other via a vent system.", ability: "Place Vent", icon: 'miner.png', skillIcon: 'Vent.png', types: ["Utility"] },
        { category: "Role", name: "Undertaker", team: "Impostor", desc: "The Undertaker is an Impostor who can drag and drop bodies to hide them in certain locations.", ability: "Drag Body", icon: 'undertaker.png', skillIcon: 'Drag.png', types: ["Utility"] },

        // Crewmate Modifiers
        { category: "Modifier", name: "Aftermath", team: "Crewmate Modifier", desc: "Aftermath is a Crewmate Modifier which activates upon death. Once the Aftermath is killed the killer of the Aftermath will be forced to use their ability (will have no effect if ability is in use or the killer has no viable ability).", ability: "Passive Ability", icon: 'aftermath.png', skillIcon: 'Passive.png', types: ["Passive", "Death Trigger"] },
        { category: "Modifier", name: "Bait", team: "Crewmate Modifier", desc: "Bait is a Crewmate Modifier which activates upon death. Once the Bait is killed the killer of the Bait will be forced to report their body.", ability: "Passive Ability", icon: 'bait.png', skillIcon: 'Passive.png', types: ["Passive", "Death Trigger"] },
        { category: "Modifier", name: "Celebrity", team: "Crewmate Modifier", desc: "Celebrity is a Crewmate Modifier that activates the meeting following the Celebrity's death. It tells everyone how, when and where the Celebrity died.", ability: "Passive Ability", icon: 'celebrity.png', skillIcon: 'Passive.png', types: ["Passive", "Death Trigger", "Information"] },
        { category: "Modifier", name: "Diseased", team: "Crewmate Modifier", desc: "Diseased is a Crewmate Modifier which activates upon death. Once the Diseased is killed the killer of the Diseased will have an increased kill cooldown before they kill again or a meeting is called.", ability: "Passive Ability", icon: 'diseased.png', skillIcon: 'Passive.png', types: ["Passive", "Death Trigger", "Debuff"] },
        { category: "Modifier", name: "Frosty", team: "Crewmate Modifier", desc: "Frosty is a Crewmate Modifier which activates upon death. Once the Frosty is killed their killer will be temporarily slowed.", ability: "Passive Ability", icon: 'frosty.png', skillIcon: 'Passive.png', types: ["Passive", "Death Trigger", "Debuff"] },
        { category: "Modifier", name: "Multitasker", team: "Crewmate Modifier", desc: "Multitasker is a Crewmate Modifier which makes all tasks transparent.", ability: "Passive Ability", icon: 'multitasker.png', skillIcon: 'Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Taskmaster", team: "Crewmate Modifier", desc: "Taskmaster is a Crewmate Modifier which makes the player automatically complete a random task following each meeting.", ability: "Passive Ability", icon: 'taskmaster.png', skillIcon: 'Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Torch", team: "Crewmate Modifier", desc: "Torch is a Crewmate Modifier which makes lights ineffective against themselves.", ability: "Passive Ability", icon: 'torch.png', skillIcon: 'Passive.png', types: ["Passive", "Utility"] },

        // Global Modifiers
        { category: "Modifier", name: "Button Barry", team: "Global Modifier", desc: "Button Barry is a Global Modifier which allows themself to button from anywhere on the map, even if a sabotage is currently active.", ability: "Passive Ability", icon: 'buttonbarry.png', skillIcon: 'Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Flash", team: "Global Modifier", desc: "Flash is a Global Modifier which gives the player increased speed.", ability: "Passive Ability", icon: 'flash.png', skillIcon: 'Passive.png', types: ["Passive", "Buff"] },
        { category: "Modifier", name: "Giant", team: "Global Modifier", desc: "Giant is a Global Modifier which increases the size of a player.", ability: "Passive Ability", icon: 'giant.png', skillIcon: 'Passive.png', types: ["Passive", "Buff"] },
        { category: "Modifier", name: "Immovable", team: "Global Modifier", desc: "Immovable is a Global Modifier which makes the player unable to be moved by disperse, transport and meetings.", ability: "Passive Ability", icon: 'immovable.png', skillIcon: 'Passive.png', types: ["Passive", "Defense"] },
        { category: "Modifier", name: "Lovers", team: "Global Modifier", desc: "Lovers is a Global Modifier which links two players who can both chat with each other during rounds and win together in the final 3 if both players are alive.", ability: "Passive Ability", icon: 'lovers.png', skillIcon: 'Passive.png', types: ["Passive", "Social", "Win Condition"] },
        { category: "Modifier", name: "Mini", team: "Global Modifier", desc: "Mini is a Global Modifier which decreases the size of a player.", ability: "Passive Ability", icon: 'mini.png', skillIcon: 'Passive.png', types: ["Passive", "Debuff"] },
        { category: "Modifier", name: "Radar", team: "Global Modifier", desc: "Radar is a Global Modifier which allows the player to see where the closest player to them currently is. This includes if they are inside a vent.", ability: "Passive Ability", icon: 'radar.png', skillIcon: 'Passive.png', types: ["Passive", "Detection"] },
        { category: "Modifier", name: "Satellite", team: "Global Modifier", desc: "Satellite is a Global Modifier which allows the player to have a 1 time ability to detect all dead bodies on the map for a short duration.", ability: "Detect Dead Bodies", icon: 'satellite.png', skillIcon: 'Satellite.png', types: ["Active", "Detection"] },
        { category: "Modifier", name: "Shy", team: "Global Modifier", desc: "Shy is a Global Modifier which allows the player to become more transparent the longer they stand still.", ability: "Passive Ability", icon: 'shy.png', skillIcon: 'Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Sixth Sense", team: "Global Modifier", desc: "Sixth Sense is a Global Modifier which allows the player to know when someone interacts with them.", ability: "Passive Ability", icon: 'sixth_sense.png', skillIcon: 'Passive.png', types: ["Passive", "Detection"] },
        { category: "Modifier", name: "Sleuth", team: "Global Modifier", desc: "Sleuth is a Global Modifier which allows the player to see the dead player’s roles of who they report during meetings.", ability: "Passive Ability", icon: 'sleuth.png', skillIcon: 'Passive.png', types: ["Passive", "Detection"] },
        { category: "Modifier", name: "Tiebreaker", team: "Global Modifier", desc: "Tiebreaker is a Global Modifier which gives the player the ability to break a tie during a meeting. In other words, whoever the Tiebreaker votes for has an extra half vote for that meeting.", ability: "Break Tie Vote", icon: 'tiebreaker.png', skillIcon: 'Tiebreaker.png', types: ["Active", "Utility"] },

        // Impostor Modifiers
        { category: "Modifier", name: "Disperser", team: "Impostor Modifier", desc: "Disperser is an Impostor Modifier which has a 1 time use ability to send all players to a random vent on the map.", ability: "Disperse Players", icon: 'disperse.png', skillIcon: 'Disperse.png', types: ["Active", "Sabotage"] },
        { category: "Modifier", name: "Double Shot", team: "Impostor Modifier", desc: "Double Shot is an Impostor Modifier who has an extra life when assassinating. When the Double Shot has their first incorrect guess they will receive a red flash on their screen and be unable to guess who they guessed incorrectly for the remainder of that meeting.", ability: "Passive Ability", icon: 'doubleshot.png', skillIcon: 'Passive.png', types: ["Passive", "Kill", "Defense"] },
        { category: "Modifier", name: "Saboteur", team: "Impostor Modifier", desc: "Saboteur is an Impostor Modifier which passively decreases non-door sabotage cooldowns.", ability: "Passive Ability", icon: 'saboteur.png', skillIcon: 'Passive.png', types: ["Passive", "Sabotage"] },
        { category: "Modifier", name: "Underdog", team: "Impostor Modifier", desc: "Underdog is an Impostor Modifier which grants the player a decreased kill cooldown when they are the last Impostor, however, when they have a teammate which is still alive (adjustable by settings), they may have an increased cooldown while that teammate is still alive.", ability: "Passive Ability", icon: 'underdog.png', skillIcon: 'Passive.png', types: ["Passive", "Kill", "Buff"] }
    ];

    // Function to assign settings to entities
    function assignSettingsToEntities() {
        allEntitiesData.forEach(entity => {
            entity.settings = []; // Initialize settings array for each entity

            // Role-specific settings
            switch (entity.name) {
                case "Aurial":
                    addAndRemoveSetting(entity.settings, "Radiate Colour Range", "Radiate Color Range");
                    addAndRemoveSetting(entity.settings, "Radiate Max Range", "Radiate Max Range");
                    addAndRemoveSetting(entity.settings, "Sense Duration", "Sense Duration");
                    break;
                case "Detective":
                    addAndRemoveSetting(entity.settings, "Examine Cooldown", "Examine Cooldown");
                    addAndRemoveSetting(entity.settings, "Show Detective Reports", "Show Reports");
                    addAndRemoveSetting(entity.settings, "Time Where Detective Will Have Role", "Role Reveal Time");
                    addAndRemoveSetting(entity.settings, "Time Where Detective Will Have Faction", "Faction Reveal Time");
                    break;
                case "Haunter":
                    addAndRemoveSetting(entity.settings, "Tasks Remaining When Haunter Can Be Clicked", "Tasks to Click Haunter");
                    addAndRemoveSetting(entity.settings, "Tasks Remaining When Alert Is Sent", "Tasks for Alert");
                    addAndRemoveSetting(entity.settings, "Haunter Reveals Neutral Roles", "Reveals Neutral Roles");
                    addAndRemoveSetting(entity.settings, "Who Can Click Haunter", "Who Can Click"); // This is a number
                    break;
                case "Investigator":
                    addAndRemoveSetting(entity.settings, "Footprint Size", "Footprint Size");
                    addAndRemoveSetting(entity.settings, "Footprint Interval", "Footprint Interval");
                    addAndRemoveSetting(entity.settings, "Footprint Duration", "Footprint Duration");
                    addAndRemoveSetting(entity.settings, "Anonymous Footprint", "Anonymous Footprint");
                    addAndRemoveSetting(entity.settings, "Footprint Vent Visible", "Vent Visible");
                    break;
                case "Lookout":
                    addAndRemoveSetting(entity.settings, "Watch Cooldown", "Watch Cooldown");
                    addAndRemoveSetting(entity.settings, "Lookout Watches Reset After Each Round", "Watches Reset Per Round");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Players That Can Be Watched", "Max Watched Players");
                    break;
                case "Mystic":
                    addAndRemoveSetting(entity.settings, "Dead Body Arrow Duration", "Body Arrow Duration");
                    break;
                case "Seer":
                    addAndRemoveSetting(entity.settings, "Seer Cooldown", "Seer Cooldown");
                    addAndRemoveSetting(entity.settings, "Crewmate Killing Roles Are Red", "Crewmate Killers Red");
                    addAndRemoveSetting(entity.settings, "Neutral Benign Roles Are Red", "Neutral Benign Red");
                    addAndRemoveSetting(entity.settings, "Neutral Evil Roles Are Red", "Neutral Evil Red");
                    addAndRemoveSetting(entity.settings, "Neutral Killing Roles Are Red", "Neutral Killing Red");
                    addAndRemoveSetting(entity.settings, "Traitor Does Not Swap Colours", "Traitor Doesn't Swap Color");
                    break;
                case "Snitch":
                    addAndRemoveSetting(entity.settings, "Snitch Sees Neutral Roles", "Sees Neutral Roles");
                    addAndRemoveSetting(entity.settings, "Tasks Remaining When Revealed", "Tasks to Reveal");
                    addAndRemoveSetting(entity.settings, "Snitch Sees Impostors In Meetings", "Sees Impostors in Meetings");
                    addAndRemoveSetting(entity.settings, "Snitch Sees Traitor", "Sees Traitor");
                    break;
                case "Spy":
                    addAndRemoveSetting(entity.settings, "Who Sees Dead Bodies On Admin", "Who Sees Bodies on Admin"); // This is a number
                    addAndRemoveSetting(entity.settings, "Arrow Update Interval", "Arrow Update Interval");
                    break;
                case "Tracker":
                    addAndRemoveSetting(entity.settings, "Track Cooldown", "Track Cooldown");
                    addAndRemoveSetting(entity.settings, "Tracker Arrows Reset After Each Round", "Arrows Reset Per Round");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Tracks", "Max Tracks");
                    break;
                case "Trapper":
                    addAndRemoveSetting(entity.settings, "Min Amount Of Time In Trap To Register", "Min Time in Trap");
                    addAndRemoveSetting(entity.settings, "Trap Cooldown", "Trap Cooldown");
                    addAndRemoveSetting(entity.settings, "Traps Removed After Each Round", "Traps Removed Per Round");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Traps", "Max Traps");
                    addAndRemoveSetting(entity.settings, "Trap Size", "Trap Size");
                    addAndRemoveSetting(entity.settings, "Minimum Number Of Roles Required To Trigger Trap", "Min Roles to Trigger");
                    break;
                case "Deputy":
                    addAndRemoveSetting(entity.settings, "Deputy Camp Cooldown", "Camp Cooldown"); // Add this line if 'Deputy Camp Cooldown' exists in file
                    break;
                case "Hunter":
                    addAndRemoveSetting(entity.settings, "Hunter Kill Cooldown", "Kill Cooldown");
                    addAndRemoveSetting(entity.settings, "Hunter Stalk Cooldown", "Stalk Cooldown");
                    addAndRemoveSetting(entity.settings, "Hunter Stalk Duration", "Stalk Duration");
                    addAndRemoveSetting(entity.settings, "Maximum Stalk Uses", "Max Stalk Uses");
                    addAndRemoveSetting(entity.settings, "Hunter Kills Last Voter If Voted Out", "Kills Last Voter If Voted Out");
                    addAndRemoveSetting(entity.settings, "Hunter Can Report Who They've Killed", "Can Report Kills");
                    break;
                case "Jailor":
                    addAndRemoveSetting(entity.settings, "Jail Cooldown", "Jail Cooldown");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Executes", "Max Executes");
                    break;
                case "Sheriff":
                    addAndRemoveSetting(entity.settings, "Sheriff Miskill Kills Crewmate", "Miskill Kills Crewmate");
                    addAndRemoveSetting(entity.settings, "Sheriff Kills Neutral Evil Roles", "Kills Neutral Evil");
                    addAndRemoveSetting(entity.settings, "Sheriff Kills Neutral Killing Roles", "Kills Neutral Killing");
                    addAndRemoveSetting(entity.settings, "Sheriff Kill Cooldown", "Kill Cooldown");
                    addAndRemoveSetting(entity.settings, "Sheriff Can Report Who They've Killed", "Can Report Kills");
                    break;
                case "Veteran":
                    addAndRemoveSetting(entity.settings, "Can Be Killed On Alert", "Can Be Killed On Alert");
                    addAndRemoveSetting(entity.settings, "Alert Cooldown", "Alert Cooldown");
                    addAndRemoveSetting(entity.settings, "Alert Duration", "Alert Duration");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Alerts", "Max Alerts");
                    break;
                case "Vigilante":
                    addAndRemoveSetting(entity.settings, "Number Of Vigilante Kills", "Number of Kills");
                    addAndRemoveSetting(entity.settings, "Vigilante Can Kill More Than Once Per Meeting", "Can Kill Multiple Per Meeting");
                    addAndRemoveSetting(entity.settings, "Vigilante Can Guess Neutral Benign Roles", "Can Guess Neutral Benign");
                    addAndRemoveSetting(entity.settings, "Vigilante Can Guess Neutral Evil Roles", "Can Guess Neutral Evil");
                    addAndRemoveSetting(entity.settings, "Vigilante Can Guess Neutral Killing Roles", "Can Guess Neutral Killing");
                    addAndRemoveSetting(entity.settings, "Vigilante Can Guess Impostor Modifiers", "Can Guess Impostor Modifiers");
                    addAndRemoveSetting(entity.settings, "Vigilante Can Guess Lovers", "Can Guess Lovers");
                    break;
                case "Altruist":
                    addAndRemoveSetting(entity.settings, "Altruist Revive Duration", "Revive Duration");
                    addAndRemoveSetting(entity.settings, "Revive Uses", "Revive Uses");
                    addAndRemoveSetting(entity.settings, "Revive Radius", "Revive Radius");
                    break;
                case "Cleric":
                    addAndRemoveSetting(entity.settings, "Barrier Cooldown", "Barrier Cooldown");
                    addAndRemoveSetting(entity.settings, "Show Barriered Player", "Show Barriered Player"); // This is a number
                    addAndRemoveSetting(entity.settings, "Cleric Gets Attack Notification", "Gets Attack Notification");
                    break;
                case "Medic":
                    addAndRemoveSetting(entity.settings, "Show Shielded Player", "Show Shielded Player"); // This is a number
                    addAndRemoveSetting(entity.settings, "Who Gets Murder Attempt Indicator", "Who Gets Murder Indicator"); // This is a number
                    addAndRemoveSetting(entity.settings, "Shield Breaks On Murder Attempt", "Shield Breaks On Murder");
                    addAndRemoveSetting(entity.settings, "Show Medic Reports", "Show Medic Reports");
                    addAndRemoveSetting(entity.settings, "Time Where Medic Will Have Color Type", "Color Type Reveal Time");
                    break;
                case "Oracle":
                    addAndRemoveSetting(entity.settings, "Confess Cooldown", "Confess Cooldown");
                    addAndRemoveSetting(entity.settings, "Initial Bless Cooldown", "Initial Bless Cooldown");
                    addAndRemoveSetting(entity.settings, "Reveal Accuracy", "Reveal Accuracy"); // This is a number
                    addAndRemoveSetting(entity.settings, "Neutral Benign Roles Show Evil", "Neutral Benign Show Evil");
                    addAndRemoveSetting(entity.settings, "Neutral Evil Roles Show Evil", "Neutral Evil Show Evil");
                    addAndRemoveSetting(entity.settings, "Neutral Killing Roles Show Evil", "Neutral Killing Show Evil");
                    break;
                case "Warden":
                    addAndRemoveSetting(entity.settings, "Show Fortified Player", "Show Fortified Player"); // This is a number
                    break;
                case "Engineer":
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Fixes", "Max Fixes");
                    break;
                case "Medium":
                    addAndRemoveSetting(entity.settings, "Mediate Cooldown", "Mediate Cooldown");
                    addAndRemoveSetting(entity.settings, "Reveal Appearance Of Mediate Target", "Reveal Target Appearance");
                    addAndRemoveSetting(entity.settings, "Reveal The Medium To The Mediate Target", "Reveal Medium To Target");
                    addAndRemoveSetting(entity.settings, "Who Is Revealed With Mediate", "Who Is Revealed"); // This is a number
                    break;
                case "Plumber":
                    addAndRemoveSetting(entity.settings, "Flush Cooldown", "Flush Cooldown");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Barricades", "Max Barricades");
                    break;
                case "Politician":
                    addAndRemoveSetting(entity.settings, "Campaign Cooldown", "Campaign Cooldown");
                    break;
                case "Prosecutor":
                    addAndRemoveSetting(entity.settings, "Prosecutor Dies When They Exile A Crewmate", "Dies On Crewmate Exile");
                    break;
                case "Swapper":
                    addAndRemoveSetting(entity.settings, "Swapper Can Button", "Can Button");
                    break;
                case "Transporter":
                    addAndRemoveSetting(entity.settings, "Transport Cooldown", "Transport Cooldown");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Transports", "Max Transports");
                    addAndRemoveSetting(entity.settings, "Transporter Can Use Vitals", "Can Use Vitals");
                    break;
                case "Amnesiac":
                    addAndRemoveSetting(entity.settings, "Amnesiac Gets Arrows Pointing To Dead Bodies", "Gets Arrows To Bodies");
                    addAndRemoveSetting(entity.settings, "Time After Death Arrow Appears", "Death Arrow Delay");
                    break;
                case "Guardian Angel":
                    addAndRemoveSetting(entity.settings, "Protect Cooldown", "Protect Cooldown");
                    addAndRemoveSetting(entity.settings, "Protect Duration", "Protect Duration");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Protects", "Max Protects");
                    addAndRemoveSetting(entity.settings, "Show Protected Player", "Show Protected Player"); // This is a number
                    addAndRemoveSetting(entity.settings, "GA Becomes On Target Dead", "Becomes On Target Dead"); // This is a number
                    addAndRemoveSetting(entity.settings, "Target Knows GA Exists", "Target Knows GA");
                    addAndRemoveSetting(entity.settings, "GA Knows Targets Role", "Knows Target's Role");
                    addAndRemoveSetting(entity.settings, "Odds Of Target Being Evil", "Odds Of Target Being Evil"); // This is a number
                    break;
                case "Mercenary":
                    addAndRemoveSetting(entity.settings, "Guard Cooldown", "Guard Cooldown");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Guards", "Max Guards");
                    addAndRemoveSetting(entity.settings, "Gold To Bribe", "Gold For Bribe");
                    break;
                case "Survivor":
                    addAndRemoveSetting(entity.settings, "Vest Cooldown", "Vest Cooldown");
                    addAndRemoveSetting(entity.settings, "Vest Duration", "Vest Duration");
                    addAndRemoveSetting(entity.settings, "Maximum Number Of Vests", "Max Vests");
                    addAndRemoveSetting(entity.settings, "Survivor Scatter Mechanic Enabled", "Scatter Enabled");
                    addAndRemoveSetting(entity.settings, "Survivor Scatter Timer", "Scatter Timer");
                    break;
                case "Doomsayer":
                    addAndRemoveSetting(entity.settings, "Observe Cooldown", "Observe Cooldown");
                    addAndRemoveSetting(entity.settings, "Doomsayer Guesses All Roles At Once", "Guesses All At Once");
                    addAndRemoveSetting(entity.settings, "Doomsayer Can't Observe", "Can't Observe");
                    addAndRemoveSetting(entity.settings, "Doomsayer Win Ends Game", "Win Ends Game");
                    break;
                case "Executioner":
                    addAndRemoveSetting(entity.settings, "Executioner Becomes On Target Dead", "Becomes On Target Dead"); // This is a number
                    addAndRemoveSetting(entity.settings, "Executioner Can Button", "Can Button");
                    addAndRemoveSetting(entity.settings, "Executioner Win", "Win Condition"); // This is a number
                    break;
                case "Jester":
                    addAndRemoveSetting(entity.settings, "Jester Can Button", "Can Button");
                    addAndRemoveSetting(entity.settings, "Jester Can Hide In Vents", "Can Hide In Vents");
                    addAndRemoveSetting(entity.settings, "Jester Has Impostor Vision", "Has Impostor Vision");
                    addAndRemoveSetting(entity.settings, "Jester Scatter Mechanic Enabled", "Scatter Enabled");
                    addAndRemoveSetting(entity.settings, "Jester Scatter Timer", "Scatter Timer");
                    addAndRemoveSetting(entity.settings, "Jester Win", "Win Condition"); // This is a number
                    break;
                case "Phantom":
                    addAndRemoveSetting(entity.settings, "Tasks Remaining When Phantom Can Be Clicked", "Tasks to Click Phantom");
                    addAndRemoveSetting(entity.settings, "Phantom Win Ends Game", "Win Ends Game");
                    break;
                case "Soul Collector":
                    addAndRemoveSetting(entity.settings, "Reap Cooldown", "Reap Cooldown");
                    addAndRemoveSetting(entity.settings, "Soul Collector Can Vent", "Can Vent");
                    break;
                case "Arsonist":
                    addAndRemoveSetting(entity.settings, "Douse Cooldown", "Douse Cooldown");
                    addAndRemoveSetting(entity.settings, "Ignite Radius", "Ignite Radius");
                    addAndRemoveSetting(entity.settings, "Arsonist Can Vent", "Can Vent");
                    break;
                case "Glitch":
                    addAndRemoveSetting(entity.settings, "Mimic Cooldown", "Mimic Cooldown");
                    addAndRemoveSetting(entity.settings, "Mimic Duration", "Mimic Duration");
                    addAndRemoveSetting(entity.settings, "Hack Cooldown", "Hack Cooldown");
                    addAndRemoveSetting(entity.settings, "Hack Duration", "Hack Duration");
                    addAndRemoveSetting(entity.settings, "Glitch Kill Cooldown", "Kill Cooldown");
                    addAndRemoveSetting(entity.settings, "Glitch Can Vent", "Can Vent");
                    break;
                case "Juggernaut":
                    addAndRemoveSetting(entity.settings, "Juggernaut Initial Kill Cooldown", "Initial Kill Cooldown");
                    addAndRemoveSetting(entity.settings, "Reduced Kill Cooldown Per Kill", "Reduced Kill Cooldown Per Kill");
                    addAndRemoveSetting(entity.settings, "Juggernaut Can Vent", "Can Vent");
                    break;
                case "Plaguebearer":
                    addAndRemoveSetting(entity.settings, "Infect Cooldown", "Infect Cooldown");
                    break;
                case "Pestilence":
                    addAndRemoveSetting(entity.settings, "Pestilence Kill Cooldown", "Kill Cooldown");
                    addAndRemoveSetting(entity.settings, "Pestilence Can Vent", "Can Vent");
                    break;
                case "Vampire":
                    addAndRemoveSetting(entity.settings, "Vampire Bite Cooldown", "Bite Cooldown");
                    addAndRemoveSetting(entity.settings, "Vampires Have Impostor Vision", "Have Impostor Vision");
                    addAndRemoveSetting(entity.settings, "Vampires Can Vent", "Can Vent");
                    addAndRemoveSetting(entity.settings, "New Vampire Can Assassinate", "New Vampire Can Assassinate");
                    addAndRemoveSetting(entity.settings, "Maximum Vampires Per Game", "Max Vampires Per Game");
                    addAndRemoveSetting(entity.settings, "Can Convert Neutral Benign Roles", "Can Convert Neutral Benign");
                    addAndRemoveSetting(entity.settings, "Can Convert Neutral Evil Roles", "Can Convert Neutral Evil");
                    break;
                case "Werewolf":
                    addAndRemoveSetting(entity.settings, "Rampage Cooldown", "Rampage Cooldown");
                    addAndRemoveSetting(entity.settings, "Rampage Duration", "Rampage Duration");
                    addAndRemoveSetting(entity.settings, "Rampage Kill Cooldown", "Rampage Kill Cooldown");
                    addAndRemoveSetting(entity.settings, "Werewolf Can Vent When Rampaged", "Can Vent When Rampaged");
                    break;
                case "Eclipsal":
                    addAndRemoveSetting(entity.settings, "Blind Cooldown", "Blind Cooldown");
                    addAndRemoveSetting(entity.settings, "Blind Duration", "Blind Duration");
                    addAndRemoveSetting(entity.settings, "Blind Radius", "Blind Radius");
                    break;
                case "Escapist":
                    addAndRemoveSetting(entity.settings, "Recall Cooldown", "Recall Cooldown");
                    addAndRemoveSetting(entity.settings, "Escapist Can Vent", "Can Vent");
                    break;
                case "Grenadier":
                    addAndRemoveSetting(entity.settings, "Flash Grenade Cooldown", "Flash Grenade Cooldown");
                    addAndRemoveSetting(entity.settings, "Flash Grenade Duration", "Flash Grenade Duration");
                    addAndRemoveSetting(entity.settings, "Flash Radius", "Flash Radius");
                    addAndRemoveSetting(entity.settings, "Grenadier Can Vent", "Can Vent");
                    break;
                case "Morphling":
                    addAndRemoveSetting(entity.settings, "Morphling Cooldown", "Morphling Cooldown");
                    addAndRemoveSetting(entity.settings, "Morphling Duration", "Morphling Duration");
                    addAndRemoveSetting(entity.settings, "Morphling Can Vent", "Can Vent");
                    break;
                case "Swooper":
                    addAndRemoveSetting(entity.settings, "Swoop Cooldown", "Swoop Cooldown");
                    addAndRemoveSetting(entity.settings, "Swoop Duration", "Swoop Duration");
                    addAndRemoveSetting(entity.settings, "Swooper Can Vent", "Can Vent");
                    break;
                case "Venerer":
                    addAndRemoveSetting(entity.settings, "Ability Cooldown", "Ability Cooldown");
                    addAndRemoveSetting(entity.settings, "Ability Duration", "Ability Duration");
                    addAndRemoveSetting(entity.settings, "Sprint Speed", "Sprint Speed");
                    addAndRemoveSetting(entity.settings, "Minimum Freeze Speed", "Min Freeze Speed");
                    addAndRemoveSetting(entity.settings, "Freeze Radius", "Freeze Radius");
                    break;
                case "Bomber":
                    addAndRemoveSetting(entity.settings, "Detonate Delay", "Detonate Delay");
                    addAndRemoveSetting(entity.settings, "Max Kills In Detonation", "Max Kills in Detonation");
                    addAndRemoveSetting(entity.settings, "Detonate Radius", "Detonate Radius");
                    addAndRemoveSetting(entity.settings, "Bomber Can Vent", "Can Vent");
                    addAndRemoveSetting(entity.settings, "All Impostors See Bomb", "Impostors See Bomb");
                    break;
                case "Scavenger":
                    addAndRemoveSetting(entity.settings, "Scavenge Duration", "Scavenge Duration");
                    addAndRemoveSetting(entity.settings, "Scavenge Duration Increase Per Kill", "Duration Inc. Per Kill");
                    addAndRemoveSetting(entity.settings, "Scavenge Kill Cooldown On Correct Kill", "Kill Cooldown On Correct Kill");
                    addAndRemoveSetting(entity.settings, "Kill Cooldown Multiplier On Incorrect Kill", "CD Multiplier On Incorrect Kill");
                    break;
                case "Traitor":
                    addAndRemoveSetting(entity.settings, "Minimum People Alive When Traitor Can Spawn", "Min People For Traitor Spawn");
                    addAndRemoveSetting(entity.settings, "Traitor Won't Spawn If Any Neutral Killing Is Alive", "No Spawn If Neutral Killing Alive");
                    break;
                case "Warlock":
                    addAndRemoveSetting(entity.settings, "Time It Takes To Fully Charge", "Time To Full Charge");
                    addAndRemoveSetting(entity.settings, "Time It Takes To Use Full Charge", "Time To Use Full Charge");
                    break;
                case "Blackmailer":
                    addAndRemoveSetting(entity.settings, "Initial Blackmail Cooldown", "Initial Blackmail Cooldown");
                    addAndRemoveSetting(entity.settings, "Only Target Sees Blackmail", "Only Target Sees Blackmail");
                    addAndRemoveSetting(entity.settings, "Maximum People Alive Where Blackmailed Can Vote", "Max People For Blackmail Vote");
                    break;
                case "Hypnotist":
                    addAndRemoveSetting(entity.settings, "Hypnotize Cooldown", "Hypnotize Cooldown");
                    break;
                case "Janitor":
                    addAndRemoveSetting(entity.settings, "Clean Cooldown", "Clean Cooldown"); // Add this if it exists in your settings file
                    break;
                case "Miner":
                    addAndRemoveSetting(entity.settings, "Mine Cooldown", "Mine Cooldown");
                    break;
                case "Undertaker":
                    addAndRemoveSetting(entity.settings, "Drag Cooldown", "Drag Cooldown");
                    addAndRemoveSetting(entity.settings, "Undertaker Drag Speed", "Drag Speed");
                    addAndRemoveSetting(entity.settings, "Undertaker Can Vent", "Can Vent");
                    addAndRemoveSetting(entity.settings, "Undertaker Can Vent While Dragging", "Can Vent While Dragging");
                    break;
                case "Bait":
                    addAndRemoveSetting(entity.settings, "Minimum Delay for the Bait Report", "Min Report Delay");
                    addAndRemoveSetting(entity.settings, "Maximum Delay for the Bait Report", "Max Report Delay");
                    break;
                case "Diseased":
                    addAndRemoveSetting(entity.settings, "Diseased Kill Multiplier", "Kill Multiplier");
                    break;
                case "Frosty":
                    addAndRemoveSetting(entity.settings, "Chill Duration", "Chill Duration");
                    addAndRemoveSetting(entity.settings, "Chill Start Speed", "Chill Start Speed");
                    break;
                case "Flash":
                    addAndRemoveSetting(entity.settings, "Flash Speed", "Speed Multiplier");
                    break;
                case "Giant":
                    addAndRemoveSetting(entity.settings, "Giant Speed", "Speed Multiplier");
                    break;
                case "Lovers":
                    addAndRemoveSetting(entity.settings, "Both Lovers Die", "Both Die");
                    addAndRemoveSetting(entity.settings, "Loving Impostor Probability", "Impostor Probability");
                    addAndRemoveSetting(entity.settings, "Neutral Roles Can Be Lovers", "Neutrals Can Be Lovers");
                    addAndRemoveSetting(entity.settings, "Impostor Lover Can Kill Teammate", "Impostor Lover Can Kill Teammate");
                    break;
                case "Radar":
                    addAndRemoveSetting(entity.settings, "Broadcast Duration", "Broadcast Duration");
                    break;
                case "Shy":
                    addAndRemoveSetting(entity.settings, "Transparency Delay", "Transparency Delay");
                    addAndRemoveSetting(entity.settings, "Turn Transparent Duration", "Turn Transparent Duration");
                    addAndRemoveSetting(entity.settings, "Final Opacity", "Final Opacity (%)");
                    break;
                case "Saboteur":
                    addAndRemoveSetting(entity.settings, "Reduced Sabotage Bonus", "Sabotage Cooldown Reduction");
                    break;
                case "Underdog":
                    addAndRemoveSetting(entity.settings, "Kill Cooldown Bonus", "Kill Cooldown Bonus");
                    addAndRemoveSetting(entity.settings, "Increased Kill Cooldown When 2+ Imps", "Increased CD When 2+ Impostors");
                    break;
                // Add more cases for other roles and their specific settings
            }
        });
    }

    // Call the function to assign settings BEFORE rendering cards or loading other data
    assignSettingsToEntities();


    const roleWikiCardGrid = document.getElementById('card-grid');
    const searchInput = document.getElementById('search-input');
    const combinedFilterSelect = document.getElementById('combined-filter-select');

    function createCard(entity) {
    const card = document.createElement('div');
    card.className = `role-card`;

    const uniqueColor = entity.category === 'Role' ? roleColors[entity.name] : modifierColors[entity.name];
    const defaultCardColor = entity.category === 'Role' ? 'rgba(255, 0, 0, 0.4)' : 'rgba(0, 255, 255, 0.4)';
    const glowColor = uniqueColor || defaultCardColor;

    card.style.boxShadow = `0 0 15px ${glowColor}`;

    card.style.setProperty('--card-scrollbar-thumb-color', uniqueColor || 'cyan');
    card.style.setProperty('--card-scrollbar-track-color', 'rgba(31, 31, 31, 0.5)'); // Slightly transparent dark for track

    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = `0 0 20px ${uniqueColor ? uniqueColor + '90' : 'rgba(0, 255, 255, 0.6)'}`;
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = `0 0 15px ${glowColor}`;
    });

    card.addEventListener('click', () => openModal(entity));

    // Get team specific colors and apply them
    const teamKey = entity.team.split(' ')[0]; // Use "Crewmate", "Impostor", "Neutral"
    const teamStyle = teamColors[teamKey] || teamColors[entity.team] || { dotColor: 'cyan', boxBg: 'rgba(0, 255, 255, 0.1)', boxShadow: '0 0 8px #00ffff' }; // Fallback
    //const descriptionText = document.getElementByClass('description-text');
    card.innerHTML = `
        <div class="role-card-header">
          <div class="icon-container">
            <img src="./Role Icons/${entity.icon}" alt="${entity.name} Icon" class="${entity.category === 'Role' ? 'role-icon' : 'modifier-icon'} mr-4"
                 onerror="this.onerror=null;this.src='placeholder.png';"
                 >
          </div>
          <div class="text-container">
            <h2 style="color: ${uniqueColor || 'red'};">${entity.name.toUpperCase()}</h2>
            <!-- NEW/MODIFIED: Wrap the team text in the new span with dynamic styles -->
            <span class="team-display-box" style="
                background-color: ${teamStyle.boxBg};
                color: ${teamStyle.dotColor}; /* Text color should be the main team color */
                
            ">
                TEAM: ${entity.team.toUpperCase()}
            </span>
          </div>
        </div>
        <div class="description-abilities-settings">
            <p class="description-text">
              ${entity.desc}
            </p>
            <div class="abilities-section">
              <h3 class="text-cyan-400">Abilities</h3>
              <div class="flex items-center">
                <img src="./Abilities/${entity.skillIcon}" alt="${entity.ability} Icon" class="ability-icon"
                     onerror="this.onerror=null;this.src='placeholder.png';"
                     style="filter: drop-shadow(0 0 6px ${uniqueColor || 'cyan'});">
                <span>${entity.ability}</span>
              </div>
            </div>
            ${entity.settings && entity.settings.length > 0 ? `
            <div class="settings-section">
              <h3 class="text-yellow-300">Settings</h3>
              <ul class="list-disc list-inside">
                ${entity.settings.sort((a, b) => a.name.localeCompare(b.name)).map(s => `<li>${s.name}: ${s.value}</li>`).join('')}
              </ul>
            </div>
            ` : ''}
        </div>
    `;
    const descriptionTextElement = card.querySelector('.description-text');
    if (descriptionTextElement) {
        // Set the border-left-color dynamically
        descriptionTextElement.style.borderLeftColor = uniqueColor || '#805ad5'; // Fallback to original purple if uniqueColor is not found
    }
    return card;
    
}


// ... (rest of script.js) ...

function openModal(entity) {
    const uniqueColor = entity.category === 'Role' ? roleColors[entity.name] : modifierColors[entity.name];

    modalName.textContent = entity.name.toUpperCase();
    modalName.style.color = uniqueColor || 'white';

    // NEW/MODIFIED: Apply the team box styling to the modal team text as well
    const teamKey = entity.team.split(' ')[0];
    const teamStyle = teamColors[teamKey] || teamColors[entity.team] || { dotColor: 'cyan', boxBg: 'rgba(0, 255, 255, 0.1)', boxShadow: '0 0 8px #00ffff' };

    modalTeam.innerHTML = `
        <span class="team-display-box" style="
            background-color: ${teamStyle.boxBg};
            box-shadow: ${teamStyle.boxShadow};
            color: ${teamStyle.dotColor};
            border: 1px solid ${teamStyle.dotColor};
        ">
            TEAM: ${entity.team.toUpperCase()}
        </span>
    `;

     modalDescription.textContent = entity.desc;
    // Set the border-left-color for the modal description
    modalDescription.style.borderLeftColor = uniqueColor || '#805ad5'; // Fallback to original purple

    modalIcon.src = `./Role Icons/${entity.icon}`; // Updated path
    modalIcon.onerror = function() {
        this.onerror = null;
        this.src = `placeholder.png`; // Use your general placeholder
    };
    modalIcon.className = 'modal-icon'; // Reset classes
    if (entity.category === 'Modifier') {
        modalIcon.classList.add('square'); // Modifiers are square icons in your provided images
    }
    // Set border and shadow for the modal icon based on unique color, matching the image.
    modalIcon.style.border = `3px solid ${uniqueColor || 'cyan'}`;
    modalIcon.style.boxShadow = `0 0 15px ${uniqueColor ? uniqueColor + '90' : 'rgba(0, 255, 255, 0.6)'}`;


    modalAbilityIcon.src = `./Abilities/${entity.skillIcon}`; // Updated path
    modalAbilityIcon.onerror = function() {
        this.onerror = null;
        this.src = 'placeholder.png'; // Use your general placeholder
    };
    modalAbilityIcon.style.filter = `drop-shadow(0 0 6px ${uniqueColor || 'cyan'})`;
    modalAbilityName.textContent = entity.ability;

    // Modal content border and shadow
    modalContent.style.boxShadow = `0 0 20px ${uniqueColor ? uniqueColor + '60' : 'rgba(0, 255, 255, 0.6)'}`;
    modalContent.style.border = `2px solid ${uniqueColor || 'cyan'}`;


    if (entity.settings && entity.settings.length > 0) {
        modalSettingsSection.style.display = 'block';
        modalSettingsList.innerHTML = ''; // Clear previous settings
        entity.settings.sort((a, b) => a.name.localeCompare(b.name)).forEach(setting => {
            const settingItem = document.createElement('div');
            settingItem.className = 'modal-setting-item';
            settingItem.textContent = `${setting.name}: ${setting.value}`;
            modalSettingsList.appendChild(settingItem);
        });
    } else {
        modalSettingsSection.style.display = 'none';
    }

    detailModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

    // Modal Elements (Role Wiki)
    const detailModalOverlay = document.getElementById('detail-modal-overlay');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalIcon = document.getElementById('modal-icon');
    const modalName = document.getElementById('modal-name');
    const modalTeam = document.getElementById('modal-team');
    const modalDescription = document.getElementById('modal-description');
    const modalAbilityIcon = document.getElementById('modal-ability-icon');
    const modalAbilityName = document.getElementById('modal-ability-name');
    const modalSettingsSection = document.getElementById('modal-settings-section');
    const modalSettingsList = document.getElementById('modal-settings-list');
    const modalContent = document.getElementById('detail-modal-content');


    // In script.js, locate the openModal function

function openModal(entity) {
    const uniqueColor = entity.category === 'Role' ? roleColors[entity.name] : modifierColors[entity.name];

    modalName.textContent = entity.name.toUpperCase();
    modalName.style.color = uniqueColor || 'white';

    const teamKey = entity.team.split(' ')[0];
    const teamStyle = teamColors[teamKey] || teamColors[entity.team] || { dotColor: 'cyan', boxBg: 'rgba(0, 255, 255, 0.2)', boxShadow: '0 0 8px #00ffff' };

    modalTeam.innerHTML = `
        <span class="team-display-box" style="
            background-color: ${teamStyle.boxBg};
            box-shadow: ${teamStyle.boxShadow};
            color: ${teamStyle.dotColor};
            border: 1px solid ${teamStyle.dotColor};
        ">
            TEAM: ${entity.team.toUpperCase()}
        </span>
    `;

    modalDescription.textContent = entity.desc;
    // --- NEW/MODIFIED: Set the border-left-color for the modal description dynamically ---
    modalDescription.style.borderLeftColor = uniqueColor || '#805ad5'; // Fallback to original purple
    // --- END NEW/MODIFIED ---

    modalIcon.src = `./Role Icons/${entity.icon}`;
    modalIcon.onerror = function() {
        this.onerror = null;
        this.src = `placeholder.png`;
    };
    modalIcon.className = 'modal-icon';
    if (entity.category === 'Modifier') {
        modalIcon.classList.add('square');
    }
    modalIcon.style.border = `3px solid ${uniqueColor || 'cyan'}`;
    modalIcon.style.boxShadow = `0 0 15px ${uniqueColor ? uniqueColor + '90' : 'rgba(0, 255, 255, 0.6)'}`;

    modalAbilityIcon.src = `./Abilities/${entity.skillIcon}`;
    modalAbilityIcon.onerror = function() {
        this.onerror = null;
        this.src = 'placeholder.png';
    };
    modalAbilityIcon.style.filter = `drop-shadow(0 0 6px ${uniqueColor || 'cyan'})`;
    modalAbilityName.textContent = entity.ability;

    modalContent.style.boxShadow = `0 0 20px ${uniqueColor ? uniqueColor + '60' : 'rgba(0, 255, 255, 0.6)'}`;
    modalContent.style.border = `2px solid ${uniqueColor || 'cyan'}`;

    // --- NEW CODE: Set CSS variables for modal scrollbar color ---
    modalContent.style.setProperty('--modal-scrollbar-thumb-color', uniqueColor || 'cyan');
    modalContent.style.setProperty('--modal-scrollbar-track-color', 'rgba(31, 31, 31, 0.5)'); // Slightly transparent dark for track
    // --- END NEW CODE ---


    if (entity.settings && entity.settings.length > 0) {
        modalSettingsSection.style.display = 'block';
        modalSettingsList.innerHTML = '';
        entity.settings.sort((a, b) => a.name.localeCompare(b.name)).forEach(setting => {
            const settingItem = document.createElement('div');
            settingItem.className = 'modal-setting-item';
            settingItem.textContent = `${setting.name}: ${setting.value}`;
            modalSettingsList.appendChild(settingItem);
        });
    } else {
        modalSettingsSection.style.display = 'none';
    }

    detailModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

    function closeModal() {
        detailModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event Listeners for modal close
    modalCloseButton.addEventListener('click', closeModal);
    detailModalOverlay.addEventListener('click', (event) => {
        if (event.target === detailModalOverlay) {
            closeModal();
        }
    });

    function renderCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedFilter = combinedFilterSelect.value;

        const filteredEntities = allEntitiesData.filter(entity => {
            const matchesSearch = entity.name.toLowerCase().includes(searchTerm) ||
                entity.desc.toLowerCase().includes(searchTerm) ||
                entity.ability.toLowerCase().includes(searchTerm) ||
                (entity.settings && entity.settings.some(s => s.name.toLowerCase().includes(searchTerm) || s.value.toLowerCase().includes(searchTerm)));

            let matchesFilter = true;
            if (selectedFilter !== "All") {
                if (["Crewmate", "Neutral", "Impostor"].includes(selectedFilter)) { // Team filters
                    matchesFilter = entity.team === selectedFilter;
                } else if (["Crewmate Modifier", "Global Modifier", "Impostor Modifier"].includes(selectedFilter)) { // Modifier team filters
                    matchesFilter = entity.team === selectedFilter;
                }
                else { // Ability types
                    matchesFilter = entity.types.includes(selectedFilter);
                }
            }
            return matchesSearch && matchesFilter;
        });

        roleWikiCardGrid.innerHTML = '';
        if (filteredEntities.length === 0) {
            roleWikiCardGrid.innerHTML = '<p class="col-span-full text-center text-lg text-gray-400 font-[Amatic_SC]">No roles or modifiers found matching your criteria.</p>';
        } else {
            filteredEntities.forEach(entity => {
                roleWikiCardGrid.appendChild(createCard(entity));
            });
        }
    }

    // Event listeners for search and filter (Role Wiki)
    searchInput.addEventListener('input', renderCards);
    combinedFilterSelect.addEventListener('change', renderCards);


    // --- Player Roles Tab Logic ---
    const playerRolesList = document.getElementById('playerRolesList');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const saveRolesBtn = document.getElementById('saveRolesBtn');
    const clearRolesBtn = document.getElementById('clearRolesBtn');

    // This image will be displayed if a specific role logo is not found.
    const fallbackImageUrl = "placeholder.png"; // Your placeholder image

    /**
     * Generates the image URL for a given role name.
     * It expects images to be in a folder named 'Role Icons'
     * next to the HTML file, with names like 'role_name.png'.
     * The function handles case-insensitivity and spaces.
     * @param {string} roleName - The name of the role (e.g., "Altruist", "Impostor").
     * @returns {string} The constructed image URL.
     */
    function getRoleImageUrl(roleName) {
        // Normalize the role name: convert to lowercase, replace spaces with underscores
        const normalizedRole = roleName.toLowerCase().trim().replace(/\s+/g, '_');
        // Construct the path to the image file
        return `./Role Icons/${normalizedRole}.png`; // Ensure correct relative path
    }

    /**
     * Creates and returns a new player entry DOM element.
     * @param {string} playerName - Initial player name.
     * @param {string} role - Initial role.
     * @returns {HTMLElement} The created player entry div.
     */
    // Ensure rgbFloatToHex, roleColors, modifierColors, and getRoleImageUrl are defined globally
// above this function, as they appear to be in your provided script.js.

function createPlayerEntry(playerName = '', role = '') {
    const playerEntryDiv = document.createElement('div');
    playerEntryDiv.className = 'player-entry';

    // This 'uniqueColorInitial' is used for the *initial* HTML structure.
    // It's a fallback and will be immediately overridden by the update function.
    const uniqueColorInitial = roleColors[role] || modifierColors[role] || 'white'; // Default to white if initial role is unknown or empty

    const initialImageUrl = getRoleImageUrl(role);

    playerEntryDiv.innerHTML = `
        <input type="text" placeholder="Player Name" value="${playerName}" class="player-name-input">
        <input type="text" placeholder="Role (e.g., Impostor)" value="${role}" class="role-input" style="color: ${uniqueColorInitial};">
        <div class="role-icon-wrapper">
            <img class="role-icon-small" src="${initialImageUrl}" alt="${role || 'Unknown Role'} Icon"
                 onerror="this.onerror=null;this.src='placeholder.png';">
        </div>
        <button class="remove-player-btn">Remove</button>
    `;

    // Get references to the newly created elements
    const playerNameInput = playerEntryDiv.querySelector('.player-name-input');
    const roleInput = playerEntryDiv.querySelector('.role-input');
    const roleIconImg = playerEntryDiv.querySelector('.role-icon-small');
    const roleIconWrapper = playerEntryDiv.querySelector('.role-icon-wrapper');
    const removeBtn = playerEntryDiv.querySelector('.remove-player-btn');

    /**
     * Updates the role icon, text color, and wrapper styles based on the role input value.
     */
    const updatePlayerRoleIconAndStyles = () => {
        const rawRoleName = roleInput.value.trim(); // Get the current value from the input, trim whitespace

        // Normalize the input to Title Case for accurate lookup in roleColors and modifierColors.
        // Example: "swooper" becomes "Swooper", "button barry" becomes "Button Barry".
        let normalizedRoleName = '';
        if (rawRoleName.length > 0) {
            normalizedRoleName = rawRoleName.split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
        }

        // Get the image URL based on the normalized role name
        const newImageUrl = getRoleImageUrl(normalizedRoleName);

        // Determine the correct color based on the normalized role name
        // Default to cyan (#00ffff) if the role is not found in either map.
        let newUniqueColor = '#00ffff';

        if (roleColors[normalizedRoleName]) {
            newUniqueColor = roleColors[normalizedRoleName];
        } else if (modifierColors[normalizedRoleName]) {
            newUniqueColor = modifierColors[normalizedRoleName];
        }

        // Apply the updated properties to the elements
        roleIconImg.src = newImageUrl;
        roleIconImg.alt = `${normalizedRoleName || 'Unknown Role'} Icon`;
        roleInput.style.color = newUniqueColor;
        roleInput.style.borderColor = newUniqueColor; // <--- ADD OR CHANGE THIS LINE
        roleInput.style.borderBottomColor = newUniqueColor; // <--- ADD THIS LINE FOR UNDERLINE
        roleInput.style.boxShadow = newUniqueColor;
        roleIconWrapper.style.borderColor = newUniqueColor;
      
    };

    // Attach event listeners for dynamic updates and saving
    roleInput.addEventListener('input', () => {
        updatePlayerRoleIconAndStyles(); // Call the update function when the role input changes
        savePlayerRoles(); // Save roles (assuming this function is defined elsewhere)
    });

    playerNameInput.addEventListener('input', savePlayerRoles); // Save when player name changes

    removeBtn.addEventListener('click', async () => {
        playerEntryDiv.remove(); // Remove the player entry from the DOM
        savePlayerRoles(); // Save roles after removal
    });

    // Call the update function immediately after creation to set initial correct styles
    // (especially important if 'role' parameter has a value when called)
    updatePlayerRoleIconAndStyles();

    return playerEntryDiv;
}


    /**
     * Saves all current player role entries to localStorage.
     */
    function savePlayerRoles() {
        const playerEntries = [];
        document.querySelectorAll('#playerRolesList .player-entry').forEach(entry => {
            const playerName = entry.querySelector('.player-name-input').value;
            const role = entry.querySelector('.role-input').value;
            playerEntries.push({
                playerName,
                role
            });
        });
        localStorage.setItem('amongUsCompanionRoles', JSON.stringify(playerEntries));
    }

    /**
     * Loads player role entries from localStorage and populates the list.
     */
    function loadPlayerRoles() {
        playerRolesList.innerHTML = ''; // Clear existing entries before loading
        const savedRoles = localStorage.getItem('amongUsCompanionRoles');
        if (savedRoles) {
            try {
                const roles = JSON.parse(savedRoles);
                if (roles.length > 0) {
                    roles.forEach(player => {
                        playerRolesList.appendChild(createPlayerEntry(player.playerName, player.role));
                    });
                } else {
                    playerRolesList.appendChild(createPlayerEntry()); // Add one empty if none saved
                }
            } catch (e) {
                console.error("Error parsing saved roles:", e);
                localStorage.removeItem('amongUsCompanionRoles'); // Clear corrupt data
                playerRolesList.appendChild(createPlayerEntry()); // Add one fresh empty entry
            }
        } else {
            playerRolesList.appendChild(createPlayerEntry()); // Add one empty if nothing in storage
        }
    }

    // Event Listeners for Player Roles buttons
    addPlayerBtn.addEventListener('click', () => {
        playerRolesList.appendChild(createPlayerEntry());
        playerRolesList.lastElementChild.querySelector('.player-name-input').focus();
        savePlayerRoles();
    });

    saveRolesBtn.addEventListener('click', async () => {
        savePlayerRoles();
        await showMessageBox('Player roles saved locally!');
    });

    clearRolesBtn.addEventListener('click', async () => {
        const confirmed = await showMessageBox('Are you sure you want to clear ALL player roles? This cannot be undone!', true);
        if (confirmed) {
            playerRolesList.innerHTML = ''; // Remove all player entry elements
            localStorage.removeItem('amongUsCompanionRoles'); // Clear from localStorage
            playerRolesList.appendChild(createPlayerEntry()); // Add one fresh empty entry
            await showMessageBox('Player roles cleared!');
        }
    });

    // --- General Notes Tab Logic ---
    const generalNotesTextarea = document.getElementById('generalNotesTextarea');
    const saveGeneralNotesBtn = document.getElementById('saveGeneralNotesBtn');

    function saveGeneralNotes() {
        localStorage.setItem('amongUsCompanionGeneralNotes', generalNotesTextarea.value);
    }

    function loadGeneralNotes() {
        generalNotesTextarea.value = localStorage.getItem('amongUsCompanionGeneralNotes') || '';
    }

    saveGeneralNotesBtn.addEventListener('click', async () => {
        saveGeneralNotes();
        await showMessageBox('General notes saved locally!');
    });


    // --- Tab Switching Logic ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabId) {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
      document.getElementById(`${tabId}-tab`).classList.add('active');

      // Load content specifically when a tab is clicked
      if (tabId === 'wiki') {
        renderCards(); // Re-render wiki cards based on current filters
      } else if (tabId === 'roles') {
        loadPlayerRoles(); // Load player roles
      } else if (tabId === 'notes') {
        loadGeneralNotes(); // Load general notes
      }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            showTab(button.dataset.tab);
        });
    });

    // Initial render based on default active tab
    document.addEventListener('DOMContentLoaded', () => {
        // Set default active tab (Wiki) and render its content
        showTab('wiki');
    });
