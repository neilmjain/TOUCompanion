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
        "Crewmate": { dotColor: '#00ffff', boxBg: 'rgba(0, 255, 255, 0.2)' }, /* Cyan */
        "Impostor": { dotColor: '#ff0000', boxBg: 'rgba(255, 0, 0, 0.2)'}, /* Red */
        "Neutral": { dotColor: 'grey', boxBg: 'rgba(83, 83, 82, 0.2)'}, /* Yellow */
        "Alliance": { dotColor: '#669966', boxBg: 'rgba(102, 153, 102, 0.2)' }, /* Alliance Green */
        // Add modifiers if they need distinct colors:
        "Crewmate Modifier": { dotColor: '#00ffff', boxBg: 'rgba(0, 255, 255, 0.1)', boxShadow: '0 0 5px #00ffff' }, // Slightly less opaque for modifiers
        "Global Modifier": { dotColor: '#9333ea', boxBg: 'rgba(147, 51, 234, 0.1)', boxShadow: '0 0 5px #9333ea' }, /* A purple-ish tone for Global Modifiers */
        "Impostor Modifier": { dotColor: '#ff0000', boxBg: 'rgba(255, 0, 0, 0.1)', boxShadow: '0 0 5px #ff0000' },
        "Crewmate Alliance modifier": { dotColor: '#669966', boxBg: 'rgba(102, 153, 102, 0.1)', boxShadow: '0 0 5px #669966' }
    };

    // Define unique colors for each individual role name, icon outline, and card outline
    // These colors are based on the C# snippet provided.
    const roleColors = {
        "Crewmate": rgbFloatToHex(0.00, 0.75, 1.00), // Palette.CrewmateRoleBlue / Palette.CrewmateBlue
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
        "Transporter": rgbFloatToHex(0.00, 0.93, 1.00),
        "Medium": rgbFloatToHex(0.65, 0.50, 1.00),
        "Mystic": rgbFloatToHex(0.30, 0.60, 0.90),
        "Trapper": rgbFloatToHex(0.65, 0.82, 0.70),
        "Detective": rgbFloatToHex(0.30, 0.30, 1.00),
        "Imitator": rgbFloatToHex(0.70, 0.85, 0.30),
        "Prosecutor": rgbFloatToHex(0.70, 0.50, 0.00),
        "Oracle": rgbFloatToHex(0.75, 0.00, 0.75),
        "Aurial": rgbFloatToHex(0.70, 0.30, 0.60),
        "Politician": rgbFloatToHex(0.40, 0.00, 0.60),
        "Warden": rgbFloatToHex(0.60, 0.00, 1.00),
        "Jailor": rgbFloatToHex(0.65, 0.65, 0.65),
        "Hunter": rgbFloatToHex(0.16, 0.67, 0.53),
        "Tracker": rgbFloatToHex(0.00, 0.60, 0.00),
        "Lookout": rgbFloatToHex(0.20, 1.00, 0.40),
        "Deputy": rgbFloatToHex(1.00, 0.80, 0.00),
        "Plumber": rgbFloatToHex(0.80, 0.40, 0.00),
        "Cleric": rgbFloatToHex(0.00, 1.00, 0.70),
        "Neutral": rgbFloatToHex(0.50, 0.50, 0.50), // Color.gray - generic neutral, may be overridden by specific neutral role colors
        "Jester": rgbFloatToHex(1.00, 0.75, 0.80),
        "Executioner": rgbFloatToHex(0.39, 0.23, 0.12),
        "Glitch": rgbFloatToHex(0.00, 1.00, 0.00), // Color.green
        "Arsonist": rgbFloatToHex(1.00, 0.30, 0.00),
        "Amnesiac": rgbFloatToHex(0.50, 0.70, 1.00),
        "Juggernaut": rgbFloatToHex(0.55, 0.00, 0.30),
        "Survivor": rgbFloatToHex(1.00, 0.90, 0.30),
        "Protector": rgbFloatToHex(0.70, 1.00, 1.00), // New from C#
        "Plaguebearer": rgbFloatToHex(0.90, 1.00, 0.70),
        "Pestilence": rgbFloatToHex(0.30, 0.30, 0.30),
        "Werewolf": rgbFloatToHex(0.66, 0.40, 0.16),
        "Doomsayer": rgbFloatToHex(0.00, 1.00, 0.50),
        "Vampire": rgbFloatToHex(0.64, 0.16, 0.16),
        "Soul Collector": rgbFloatToHex(0.60, 1.00, 0.80),
        "Guardian Angel": rgbFloatToHex(0.70, 1.00, 1.00), // Matches Protector's color
        "Phantom": rgbFloatToHex(0.40, 0.16, 0.38),
        "Mercenary": rgbFloatToHex(0.55, 0.40, 0.60),
        "Impostor": rgbFloatToHex(1.00, 0.00, 0.00), // Palette.ImpostorRed
        "ImpSoft": rgbFloatToHex(0.84, 0.25, 0.26), // New from C#
        "Inquisitor": rgbFloatToHex(0.85, 0.26, 0.57) // Updated from C#
    };

    // Modifiers (Converted from provided list)
    const modifierColors = {
        "Bait": rgbFloatToHex(0.20, 0.70, 0.70),
        "Aftermath": rgbFloatToHex(0.65, 1.00, 0.65),
        "Diseased": rgbFloatToHex(0.50, 0.50, 0.50), // Color.grey
        "Torch": rgbFloatToHex(1.00, 1.00, 0.60),
        "Button Barry": rgbFloatToHex(0.70, 0.20, 0.80), // Updated from C#
        "Flash": rgbFloatToHex(1.00, 0.50, 0.50),
        "Giant": rgbFloatToHex(1.00, 0.70, 0.30),
        "Lover": rgbFloatToHex(1.00, 0.40, 0.80),
        "Sleuth": rgbFloatToHex(0.50, 0.20, 0.20),
        "Tiebreaker": rgbFloatToHex(0.60, 0.90, 0.60),
        "Radar": rgbFloatToHex(1.00, 0.00, 0.50),
        "Multitasker": rgbFloatToHex(1.00, 0.50, 0.30),
        "Frosty": rgbFloatToHex(0.60, 1.00, 1.00),
        "Sixth Sense": rgbFloatToHex(0.85, 1.00, 0.55),
        "Shy": rgbFloatToHex(1.00, 0.70, 0.80),
        "Mini": rgbFloatToHex(0.80, 1.00, 0.90),
        "Camouflaged": rgbFloatToHex(0.50, 0.50, 0.50), // New from C#
        "Satellite": rgbFloatToHex(0.00, 0.60, 0.80),
        "Egotist": rgbFloatToHex(0.40, 0.60, 0.40),
        "Taskmaster": rgbFloatToHex(0.58, 0.84, 0.93),
        "Celebrity": rgbFloatToHex(1.00, 0.60, 0.60),
        "Immovable": rgbFloatToHex(0.90, 0.90, 0.80),
        "Rotting": rgbFloatToHex(0.67, 0.50, 0.41),
        "Noisemaker": rgbFloatToHex(0.91, 0.41, 0.62),
        "Scientist": rgbFloatToHex(0.00, 0.78, 0.41),
        "Operative": rgbFloatToHex(0.60, 0.03, 0.07),
        "Scout": rgbFloatToHex(0.27, 0.38, 0.34),
        "Disperser": rgbFloatToHex(1.00, 0.00, 0.00),
        "Double Shot": rgbFloatToHex(1.00, 0.00, 0.00),
        "Saboteur": rgbFloatToHex(1.00, 0.00, 0.00),
        "Underdog": rgbFloatToHex(1.00, 0.00, 0.00),
        "Telepath": rgbFloatToHex(1.00, 0.00, 0.00),
    };

    // Combined data for roles and modifiers - UPDATED TO USE BASE FILENAMES FOR ICONS
    const allEntitiesData = [
        // Crewmate Roles
        { category: "Role", name: "Aurial", team: "Crewmate", desc: "The Aurial is a Crewmate that can sense when players use an ability nearby. If any player near the Aurial uses a button ability, the Aurial will get an arrow pointing towards where that ability was used.", ability: "Passive Ability", icon: 'Aurial', skillIcon: 'TownOfUs.Resources.CrewButtons.Sense.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Detective", team: "Crewmate", desc: "The Detective has a 2 step ability. The first stage involves inspecting a crime scene. Once a crime scene is inspected they can then examine other players on cooldown to see if that player was at the scene of the crime. Crime scenes spawn at each dead body. They also get a detective report telling them the type of killer if they examine someone’s body.", ability: "Inspect / Examine", icon: 'Detective', skillIcon: 'TownOfUs.Resources.CrewButtons.Inspect.png', types: ["Detection"] },
        { category: "Role", name: "Haunter", team: "Crewmate", desc: "Once a random Crewmate dies they become the Haunter. The Haunter has the ability to run around as a ghost and to do tasks. Once all tasks are finished they reveal the Impostors to all alive non-Impostors. However, if the Haunter is clicked they lose their ability to reveal Impostors and are once again a normal ghost. The Impostors also get a warning shortly before and as the Haunter finishes their tasks.", ability: "Passive Ability", icon: 'Haunter', skillIcon: 'TownOfUs.Resources.CrewButtons.Ghost.png', types: ["Detection", "Utility", "Other"] },
        { category: "Role", name: "Investigator", team: "Crewmate", desc: "The Investigator can see player's footprints throughout the game. Swooper footprints are hidden.", ability: "View Footprints", icon: 'Investigator', skillIcon: 'TownOfUs.Resources.CrewButtons.FootprintButton.png', types: ["Detection"] },
        { category: "Role", name: "Lookout", team: "Crewmate", desc: "The Lookout is a Crewmate that can watch other players during rounds. During meetings they will see all roles who interact with each watched player.", ability: "Watch Player", icon: 'Lookout', skillIcon: 'TownOfUs.Resources.CrewButtons.WatchButton.png', types: ["Detection"] },
        { category: "Role", name: "Mystic", team: "Crewmate", desc: "The Mystic is a Crewmate that gets an alert revealing when someone has died. On top of this, the Mystic briefly gets an arrow pointing in the direction of the body.", ability: "Passive Ability", icon: 'Mystic', skillIcon: 'TownOfUs.Resources.CrewButtons.Passive.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Seer", team: "Crewmate", desc: "The Seer is a Crewmate that can reveal the alliance of other players. Based on settings, the Seer can find out whether a player is a Good or an Evil role. A player's name will change color depending on faction and role.", ability: "Reveal Alliance", icon: 'Seer', skillIcon: 'TownOfUs.Resources.CrewButtons.SeerButton.png', types: ["Detection"] },
        { category: "Role", name: "Snitch", team: "Crewmate", desc: "The Snitch is a Crewmate that can get arrows pointing towards the Impostors, once all their tasks are finished. The names of the Impostors will also show up as red on their screen. However, when they only have a single task left, the Impostors get an arrow pointing towards the Snitch.", ability: "Passive Ability", icon: 'Snitch', skillIcon: 'TownOfUs.Resources.CrewButtons.Passive.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Spy", team: "Crewmate", desc: "The Spy is a Crewmate Investigative role that gains extra information on the admin table. Not only does the Spy see how many people are in a room, but they will also see who is in every room. The Spy also has a toggle for a portable Admin Table with a limited battery charge.", ability: "Admin", icon: 'Spy', skillIcon: 'TownOfUs.Resources.CrewButtons.AdminButton.png', types: ["Detection", "Utility"] },
        { category: "Role", name: "Tracker", team: "Crewmate", desc: "The Tracker is a Crewmate that can track other players by tracking them during a round. Once they track someone, an arrow is continuously pointing to them, which updates in set intervals.", ability: "Track Player", icon: 'Tracker', skillIcon: 'TownOfUs.Resources.CrewButtons.TrackButton.png', types: ["Detection"] },
        { category: "Role", name: "Trapper", team: "Crewmate", desc: "The Trapper is a Crewmate that can place traps around the map. When players enter a trap they trigger the trap. In the following meeting, all players who triggered a trap will have their role displayed to the Trapper. However, this is done so in a random order, not stating who entered the trap, nor what role a specific player is.", ability: "Place Trap", icon: 'Trapper', skillIcon: 'TownOfUs.Resources.CrewButtons.TrapButton.png', types: ["Detection", "Utility"] },
        { category: "Role", name: "Deputy", team: "Crewmate", desc: "The Deputy is a Crewmate that can camp other players. Camped players will alert the Deputy when they are killed. The following meeting the Deputy then can attempt to shoot their killer. If they successfully shoot the killer, they will die, otherwise nothing happens.", ability: "Camp / Shoot", icon: 'Deputy', skillIcon: 'TownOfUs.Resources.CrewButtons.CampButton.png', types: ["Kill", "Detection"] },
        { category: "Role", name: "Hunter", team: "Crewmate", desc: "The Hunter is a Crewmate Killing role with the ability to track players and execute them if they do anything suspicious. Unlike the Sheriff, the Hunter does not die if they kill an innocent player, however the Hunter may only execute players who have given them probable cause.", ability: "Stalk (Kill on Use)", icon: 'Hunter', skillIcon: 'TownOfUs.Resources.CrewButtons.StalkButton.png', types: ["Kill", "Detection"] },
        { category: "Role", name: "Jailor", team: "Crewmate", desc: "The Jailor is a Crewmate that can jail Crewmates. During meetings all players can see when a Crewmate is jailed. When someone is jailed they cannot use any meeting ability and no meeting ability can be used on them. The Jailor may privately communicate with the jailee. If the Jailor then thinks the jailee is bad, they may then execute them. If the Jailor executes incorrectly, they lose the ability to jail.", ability: "Jail / Execute", icon: 'Jailor', skillIcon: 'TownOfUs.Resources.CrewButtons.JailButton.png', types: ["Kill", "Utility"] },
        { category: "Role", name: "Sheriff", team: "Crewmate", desc: "The Sheriff is a Crewmate that has the ability to eliminate the Impostors using their kill button. However, if they kill a Crewmate or a Neutral player they can't kill, they instead die themselves.", ability: "Kill", icon: 'Sheriff', skillIcon: 'TownOfUs.Resources.CrewButtons.SheriffShootButton.png', types: ["Kill"] },
        { category: "Role", name: "Veteran", team: "Crewmate", desc: "The Veteran is a Crewmate that can go on alert. When the Veteran is on alert, anyone, whether Crew, Neutral or Impostor, if they interact with the Veteran, they die.", ability: "Toggle Alert", icon: 'Veteran', skillIcon: 'TownOfUs.Resources.CrewButtons.AlertButton.png', types: ["Kill", "Support"] },
        { category: "Role", name: "Vigilante", team: "Crewmate", desc: "The Vigilante is a Crewmate that can kill during meetings. During meetings, the Vigilante can choose to kill someone by guessing their role, however, if they guess incorrectly, they die instead.", ability: "Guess Role", icon: 'Vigilante', skillIcon: 'TownOfUs.Resources.CrewButtons.Guess.png', types: ["Kill"] },
        { category: "Role", name: "Altruist", team: "Crewmate", desc: "The Altruist is a Crewmate that is capable of reviving dead players. The Altruist may attempt to revive all dead players from that round. When reviving the Altruist may not move and all killers will be pointed towards the Altruist. After a set period of time, all dead player's bodies within the Altruist's range will be resurrected, if the revival isn't interrupted. Once a revival is used, the Altruist, along with all revived players will not be able to button for the remainder of the game.", ability: "Revive", icon: 'Altruist', skillIcon: 'TownOfUs.Resources.CrewButtons.ReviveButton.png', types: ["Support"] },
        { category: "Role", name: "Cleric", team: "Crewmate", desc: "The Cleric is a Crewmate that can barrier or cleanse other players. When a player is barriered they cannot be killed for a set duration. When a player is cleansed all negative effects are removed, however, not all effects are removed instantly, some are instead removed at the beginning of the following meeting.", ability: "Barrier / Cleanse", icon: 'Cleric', skillIcon: 'TownOfUs.Resources.CrewButtons.CleanseButton.png', types: ["Support"] },
        { category: "Role", name: "Medic", team: "Crewmate", desc: "The Medic is a Crewmate that can give any player a shield that will make them immortal until the Medic dies. A Shielded player cannot be killed by anyone, unless by suicide. If the Medic reports a dead body, they can get a report containing clues to the Killer's identity. A report can contain the color type (Darker/Lighter) of the killer if the body is not too old. Colors Red - Darker Blue - Darker Green - Darker Pink - Lighter Orange - Lighter Yellow - Lighter Black - Darker White - Lighter Purple - Darker Brown - Darker Cyan - Lighter Lime - Lighter Maroon - Darker Rose - Lighter Banana - Lighter Gray - Darker Tan - Darker Coral - Lighter Watermelon - Darker Chocolate - Darker Sky Blue - Lighter Beige - Lighter Magenta - Darker Turquoise - Lighter Lilac - Lighter Olive - Darker Azure - Lighter Plum - Darker Jungle - Darker Mint - Lighter Chartreuse - Lighter Macau - Darker Tawny - Darker Gold - Lighter Rainbow - Lighter", ability: "Shield Player", icon: 'Medic', skillIcon: 'TownOfUs.Resources.CrewButtons.MedicButton.png', types: ["Support"] },
        { category: "Role", name: "Oracle", team: "Crewmate", desc: "The Oracle is a Crewmate that can get another player to confess information to them. The Oracle has 2 abilities. The first, confess, makes a player confess saying that one of two players is good and will reveal their alignment when the Oracle dies. The second, bless, makes someone immune to dying during a meeting.", ability: "Confess / Bless", icon: 'Oracle', skillIcon: 'TownOfUs.Resources.CrewButtons.ConfessButton.png', types: ["Detection", "Support"] },
        { category: "Role", name: "Warden", team: "Crewmate", desc: "The Warden is a Crewmate that can fortify other players. Fortified players cannot be interacted with. If someone tries to interact with or assassinate a fortified player, Both the Warden and the interactor receive an alert.", ability: "Fortify Player", icon: 'Warden', skillIcon: 'TownOfUs.Resources.CrewButtons.FortifyButton.png', types: ["Support"] },
        { category: "Role", name: "Engineer", team: "Crewmate", desc: "The Engineer is a Crewmate that can fix sabotages from anywhere on the map. They can use vents to get across the map easily.", ability: "Vent / Fix Sabotage", icon: 'Engineer', skillIcon: 'TownOfUs.Resources.CrewButtons.EngiVentButton.png', types: ["Utility"] },
        { category: "Role", name: "Imitator", team: "Crewmate", desc: "The Imitator is a Crewmate that can mimic dead crewamtes. During meetings the Imitator can select who they are going to imitate the following round from the dead. They can choose to use each dead players as many times as they wish.", ability: "Imitate Role", icon: 'Imitator', skillIcon: 'TownOfUs.Resources.CrewButtons.ImitatorSelect.png', types: ["Utility", "Other"] },
        { category: "Role", name: "Mayor", team: "Crewmate", desc: "Once per game the Mayor can reveal themselves as the Mayor mid-meeting, once done so they gain an additional 2 votes.", ability: "Reveal as Mayor", icon: 'Mayor', skillIcon: 'TownOfUs.Resources.CrewButtons.MayorButton.png', types: ["Utility"] },
        { category: "Role", name: "Medium", team: "Crewmate", desc: "The Medium is a Crewmate that can see ghosts. During each round the Medium has an ability called Mediate. If the Medium uses this ability and no one is dead, nothing will happen. However, if someone is dead, the Medium and the dead player will be able to see each other and communicate from beyond the grave!", ability: "Mediate", icon: 'Medium', skillIcon: 'TownOfUs.Resources.CrewButtons.MediateButton.png', types: ["Utility", "Detection"] },
        { category: "Role", name: "Plumber", team: "Crewmate", desc: "The Plumber is a Crewmate that maintains vent systems. The Plumber can either flush vents, ejecting all players currently in vents, or block a vent, placing a barricade on the vent preventing it's use.", ability: "Flush / Barricade", icon: 'Plumber', skillIcon: 'TownOfUs.Resources.CrewButtons.FlushButton.png', types: ["Utility", "Sabotage"] },
        { category: "Role", name: "Politician", team: "Crewmate", desc: "The Politician is a Crewmate that can campaign to other players. Once half or more of the Crewmates are campaigned to, the Politician can reveal themselves as the new Mayor. If less then half of the Crewmates have been campaigned to the reveal will fail and the Politician will be unable to campaign for 1 round.", ability: "Campaign to Reveal", icon: 'Politician', skillIcon: 'TownOfUs.Resources.CrewButtons.CampaignButton.png', types: ["Utility"] },
        { category: "Role", name: "Prosecutor", team: "Crewmate", desc: "The Prosecutor has 2 abilities, one is the ability for them to see all the votes (non-anonymous voting), the other, once per game during a meeting the Prosecutor can prosecute someone, making all other votes redundant and having whoever the Prosecutor selected exiled that meeting.", ability: "Prosecute", icon: 'Prosecutor', skillIcon: 'TownOfUs.Resources.CrewButtons.ProsecutorButton.png', types: ["Utility", "Detection"] },
        { category: "Role", name: "Swapper", team: "Crewmate", desc: "The Swapper is a Crewmate that can swap the votes on 2 players during a meeting. All the votes for the first player will instead be counted towards the second player and vice versa.", ability: "Swap Players", icon: 'Swapper', skillIcon: 'TownOfUs.Resources.CrewButtons.Swap.png', types: ["Utility"] },
        { category: "Role", name: "Transporter", team: "Crewmate", desc: "The Transporter is a Crewmate that can change the locations of two random players at will. Players who have been transported are alerted with a blue flash on their screen.", ability: "Transport", icon: 'Transporter', skillIcon: 'TownOfUs.Resources.CrewButtons.TransportButton.png', types: ["Utility"] },

        // Neutral Roles
        { category: "Role", name: "Amnesiac", team: "Neutral", desc: "The Amnesiac is a Neutral role with no win condition. They have zero tasks and are essentially roleless. However, they can remember a role by finding a dead player. Once they remember their role, they go on to try win with their new win condition.", ability: "Remember Role", icon: 'Amnesiac', skillIcon: 'TownOfUs.Resources.NeutButtons.RememberButton.png', types: ["Other"] },
        { category: "Role", name: "Guardian Angel", team: "Neutral", desc: "The Guardian Angel is a Neutral role which aligns with the faction of their target. Their job is to protect their target at all costs. If their target loses, they lose.", ability: "Protect Target", icon: 'GuardianAngel', skillIcon: 'TownOfUs.Resources.NeutButtons.ProtectButton.png', types: ["Support"] },
        { category: "Role", name: "Mercenary", team: "Neutral", desc: "The Mercenary is a Neutral role which can guard other players. Guarded players absorb abilities and convert it into currency. This currency can be used to bribe other players. If a bribed player lives and goes onto win the game, the Mercenary does too. They cannot win with Neutral Evils or Lovers.", ability: "Guard / Bribe", icon: 'Mercenary', skillIcon: 'TownOfUs.Resources.NeutButtons.BribeButton.png', types: ["Support"] },
        { category: "Role", name: "Survivor", team: "Neutral", desc: "The Survivor is a Neutral role which can win by simply surviving. However, if Lovers, or a Neutral Evil role wins the game, the Survivor loses.", ability: "No Active Ability", icon: 'Survivor', skillIcon: 'TownOfUs.Resources.NeutButtons.Passive.png', types: ["Other"] },
        { category: "Role", name: "Doomsayer", team: "Neutral", desc: "The Doomsayer is a Neutral role with its own win condition. Their goal is to assassinate 3 players to win. If there are only 2 other people alive, the Doomsayer only needs to assassinate the remainder of the players. They have an additional observe ability that hints towards certain player's roles.", ability: "Observe / Guess", icon: 'Doomsayer', skillIcon: 'TownOfUs.Resources.NeutButtons.ObserveButton.png', types: ["Detection", "Other"] },
        { category: "Role", name: "Executioner", team: "Neutral", desc: "The Executioner is a Neutral role with its own win condition. Their goal is to vote out a player, specified in the beginning of a game. If that player gets voted out, they win the game.", ability: "No Active Ability", icon: 'Executioner', skillIcon: 'TownOfUs.Resources.NeutButtons.Passive.png', types: ["Other"] },
        { category: "Role", name: "Jester", team: "Neutral", desc: "The Jester is a Neutral role with its own win condition. If they are voted out after a meeting, the game finishes and they win. However, the Jester does not win if the Crewmates, Impostors or another Neutral role wins.", ability: "No Active Ability", icon: 'Jester', skillIcon: 'TownOfUs.Resources.NeutButtons.Passive.png', types: ["Other"] },
        { category: "Role", name: "Phantom", team: "Neutral", desc: "The Phantom is a Neutral role with its own win condition. They become half-invisible when they die and has to complete all their tasks without getting caught.", ability: "Passive Ability", icon: 'Phantom', skillIcon: 'TownOfUs.Resources.NeutButtons.Ghost.png', types: ["Other"] },
        { category: "Role", name: "Inquisitor", team: "Neutral", desc: "The Inquisitor is a Neutral Evil role that wins if their targets (Heretics) die. The only information provided is their roles, and it's up to the Inquisitor to identify those players (marked with a dark pink-ish $ to the dead) and get them killed by any means neccesary.", ability: "No Active Ability", icon: 'Inquisitor', skillIcon: 'TownOfUs.Resources.NeutButtons.Passive.png', types: ["Other", "Win Condition"] },
        { category: "Role", name: "Soul Collector", team: "Neutral", desc: "The Soul Collector is a Neutral role with its own win condition. The Soul Collector kills be reaping players, reaped players do not leave behind a dead body, instead they leave a soul. The Soul Collector needs to be the last killer alive to win the game.", ability: "Reap / Collect Souls", icon: 'SoulCollector', skillIcon: 'TownOfUs.Resources.NeutButtons.ReapButton.png', types: ["Kill", "Other"] },
        { category: "Role", name: "Arsonist", team: "Neutral", desc: "The Arsonist is a Neutral role with its own win condition. They have two abilities, one is to douse other players with gasoline. The other is to ignite all doused players near them. The Arsonist needs to be the last killer alive to win the game.", ability: "Douse / Ignite", icon: 'Arsonist', skillIcon: 'TownOfUs.Resources.NeutButtons.DouseButton.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Juggernaut", team: "Neutral", desc: "The Juggernaut is a Neutral role with its own win condition. The Juggernaut's special ability is that their kill cooldown reduces with each kill. This means in theory the Juggernaut can have a 0 second kill cooldown! The Juggernaut needs to be the last killer alive to win the game.", ability: "Kill", icon: 'Juggernaut', skillIcon: 'TownOfUs.Resources.NeutButtons.JuggKillButton.png', types: ["Kill"] },
        { category: "Role", name: "Plaguebearer", team: "Neutral", desc: "The Plaguebearer is a Neutral role with its own win condition, as well as an ability to transform into another role. The Plaguebearer has one ability, which allows them to infect other players. Once infected, the infected player can go and infect other players via interacting with them. Once all players are infected, the Plaguebearer becomes Pestilence.", ability: "Infect", icon: 'Plaguebearer', skillIcon: 'TownOfUs.Resources.NeutButtons.InfectButton.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Pestilence", team: "Neutral", desc: "The Pestilence is a unkillable force which can only be killed by being voted out, even their lover dying won't kill them. The Plaguebearer or Pestilence needs to be the last killer alive to win the game.", ability: "Passive Ability", icon: 'Pestilence', skillIcon: 'TownOfUs.Resources.NeutButtons.Passive.png', types: ["Kill", "Sabotage", "Other"] },
        { category: "Role", name: "Glitch", team: "Neutral", desc: "The Glitch is a Neutral role with its own win condition. The Glitch's aim is to kill everyone and be the last person standing. The Glitch can Hack players, resulting in them being unable to report bodies and use abilities. Hacking prevents the hacked player from doing anything but walk around the map. The Glitch can Mimic someone, which results in them looking exactly like the other person.", ability: "Glitch / Mimic", icon: 'Glitch', skillIcon: 'TownOfUs.Resources.NeutButtons.GlitchKillButton.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Vampire", team: "Neutral", desc: "The Vampire is a Neutral role with its own win condition. The Vampire can convert or kill other players by biting them. If the bitten player was a Crewmate they will turn into a Vampire (unless there are 2 Vampires alive) Else they will kill the bitten player.", ability: "Bite", icon: 'Vampire', skillIcon: 'TownOfUs.Resources.NeutButtons.BiteButton.png', types: ["Kill"] },
        { category: "Role", name: "Werewolf", team: "Neutral", desc: "The Werewolf is a Neutral role with its own win condition. Although the Werewolf has a kill button, they can't use it unless they are Rampaged. Once the Werewolf rampages they gain Impostor vision and the ability to kill. However, unlike most killers their kill cooldown is really short. The Werewolf needs to be the last killer alive to win the game.", ability: "Transform / Rampage", icon: 'Werewolf', skillIcon: 'TownOfUs.Resources.NeutButtons.RampageButton.png', types: ["Kill"] },

        // Impostor Roles
        { category: "Role", name: "Eclipsal", team: "Impostor", desc: "The Eclipsal is an Impostor that can blind other players. Blinded players have no vision and their report buttons do not light up (but can still be used).", ability: "Blind", icon: 'Eclipsal', skillIcon: 'TownOfUs.Resources.ImpButtons.BlindButton.png', types: ["Sabotage"] },
        { category: "Role", name: "Escapist", team: "Impostor", desc: "The Escapist is an Impostor that can teleport to a different location. Once per round the Escapist can Mark a location which they can then escape to later in the round.", ability: "Teleport", icon: 'Escapist', skillIcon: 'TownOfUs.Resources.ImpButtons.RecallButton.png', types: ["Utility"] },
        { category: "Role", name: "Grenadier", team: "Impostor", desc: "The Grenadier is an Impostor that can throw smoke grenades. During the game, the Grenadier has the option to throw down a smoke grenade which blinds Crewmates so they can't see. However, a sabotage and a smoke grenade can not be active at the same time.", ability: "Throw Grenade", icon: 'Grenadier', skillIcon: 'TownOfUs.Resources.ImpButtons.FlashButton.png', types: ["Kill"] },
        { category: "Role", name: "Morphling", team: "Impostor", desc: "The Morphling is an Impostor that can Morph into another player. At the beginning of the game and after every meeting, they can choose someone to Sample. They can then Morph into that person at any time for a limited amount of time.", ability: "Sample / Morph", icon: 'Morphling', skillIcon: 'TownOfUs.Resources.ImpButtons.MorphButton.png', types: ["Utility", "Sabotage"] },
        { category: "Role", name: "Swooper", team: "Impostor", desc: "The Swooper is an Impostor that can temporarily turn invisible.", ability: "Turn Invisible", icon: 'Swooper', skillIcon: 'TownOfUs.Resources.ImpButtons.SwoopButton.png', types: ["Utility"] },
        { category: "Role", name: "Venerer", team: "Impostor", desc: "The Venerer is an Impostor that gains abilities through killing. After their first kill, the Venerer can camouflage themself. After their second kill, the Venerer can sprint. After their third kill, every other player is slowed while their ability is activated. All abilities are activated by the one button and have the same duration.", ability: "Camouflage / Sprint / Freeze", icon: 'Venerer', skillIcon: 'TownOfUs.Resources.ImpButtons.NoAbilityButton.png', types: ["Sabotage", "Utility"] },
        { category: "Role", name: "Bomber", team: "Impostor", desc: "The Bomber is an Impostor who has the ability to plant bombs instead of kill. After a bomb is planted, the bomb will detonate a fixed time period as per settings. Once the bomb detonates it will kill all Crewmates (and Impostors!) inside the radius.", ability: "Plant Bomb", icon: 'Bomber', skillIcon: 'TownOfUs.Resources.ImpButtons.DetonatingButton.png', types: ["Kill", "Sabotage"] },
        { category: "Role", name: "Scavenger", team: "Impostor", desc: "The Scavenger is an Impostor who hunts down prey. With each successful hunt the Scavenger has a shortened kill cooldown. On an incorrect kill the Scavenger has a significantly increased kill cooldown.", ability: "Scavenge / Hunt", icon: 'Scavenger', skillIcon: 'TownOfUs.Resources.ImpButtons.ScavengeButton.png', types: ["Utility", "Sabotage"] },
        { category: "Role", name: "Traitor", team: "Impostor", desc: "If all Impostors die before a certain point in the game, a random Crewmate is selected to become the Traitor. The Traitor has no additional abilities and their job is simply to avenge the dead Impostors. Once this player has turned into the Traitor their alliance sits with the Impostors. The Traitor is offered a choice of up to 3 Impostor roles when they initially change roles.", ability: "No Active Ability", icon: 'Traitor', skillIcon: 'TownOfUs.Resources.ImpButtons.Passive.png', types: ["Other"] },
        { category: "Role", name: "Warlock", team: "Impostor", desc: "The Warlock is an Impostor that can charge up their kill button. Once activated the Warlock can use their kill button infinitely until they run out of charge. However, they do not need to fully charge their kill button to use it.", ability: "Charge Kill", icon: 'Warlock', skillIcon: 'TownOfUs.Resources.ImpButtons.Charge.png', types: ["Sabotage"] },
        { category: "Role", name: "Blackmailer", team: "Impostor", desc: "The Blackmailer is an Impostor that can silence people in meetings. During each round, the Blackmailer can go up to someone and blackmail them. This prevents the blackmailed person from speaking and possibly voting during the next meeting.", ability: "Blackmail", icon: 'Blackmailer', skillIcon: 'TownOfUs.Resources.ImpButtons.BlackmailButton.png', types: ["Sabotage"] },
        { category: "Role", name: "Hypnotist", team: "Impostor", desc: "The Hypnotist is an Impostor that can hypnotize people. Once enough people are hypnotized, the Hypnotist can release Mass Hysteria. With Mass Hysteria released, all hypnotized players see everyone else as either themselves, camouflaged or invisible. Once the Hypnotist dies Mass Hysteria is removed and people can see everyone normally again.", ability: "Hypnotize / Mass Hysteria", icon: 'Hypnotist', skillIcon: 'TownOfUs.Resources.ImpButtons.HypnotiseButton.png', types: ["Sabotage"] },
        { category: "Role", name: "Janitor", team: "Impostor", desc: "The Janitor is an Impostor that can clean up bodies. Both their Kill and Clean ability have a shared cooldown, meaning they have to choose which one they want to use.", ability: "Clean Body", icon: 'Janitor', skillIcon: 'TownOfUs.Resources.ImpButtons.CleanButton.png', types: ["Utility"] },
        { category: "Role", name: "Miner", team: "Impostor", desc: "The Miner is an Impostor that can create new vents. These vents only connect to each other, forming a new passway.", ability: "Place Vent", icon: 'Miner', skillIcon: 'TownOfUs.Resources.ImpButtons.MineButton.png', types: ["Utility"] },
        { category: "Role", name: "Undertaker", team: "Impostor", desc: "The Undertaker is an Impostor that can drag and drop bodies.", ability: "Drag Body", icon: 'Undertaker', skillIcon: 'TownOfUs.Resources.ImpButtons.DragButton.png', types: ["Utility"] },

        // Crewmate Modifiers
        { category: "Modifier", name: "Aftermath", team: "Crewmate Modifier", desc: "Killing the Aftermath forces their killer to use their ability (if they have one and it's not in use).", ability: "Passive Ability", icon: 'Aftermath', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Death Trigger"] },
        { category: "Modifier", name: "Bait", team: "Crewmate Modifier", desc: "Killing the Bait makes the killer auto self-report.", ability: "Passive Ability", icon: 'Bait', skillIcon: 'TownOfUs.Resources.ModifierIcons.BaitButton.png', types: ["Passive", "Death Trigger"] },
        { category: "Modifier", name: "Celebrity", team: "Crewmate Modifier", desc: "The Celebrity announces how, when and where they died the meeting after they die.", ability: "Passive Ability", icon: 'Celebrity', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Death Trigger", "Information"] },
        { category: "Modifier", name: "Diseased", team: "Crewmate Modifier", desc: "Killing the Diseased increases the killer's kill cooldown.", ability: "Passive Ability", icon: 'Diseased', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Death Trigger", "Debuff"] },
        { category: "Modifier", name: "Frosty", team: "Crewmate Modifier", desc: "Killing the Frosty slows the killer for a short duration.", ability: "Passive Ability", icon: 'Frosty', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Death Trigger", "Debuff"] },
        { category: "Modifier", name: "Multitasker", team: "Crewmate Modifier", desc: "The Multitasker's tasks are transparent.", ability: "Passive Ability", icon: 'Multitasker', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Taskmaster", team: "Crewmate Modifier", desc: "The Taskmaster completes a random task on the completion of each meeting.", ability: "Passive Ability", icon: 'Taskmaster', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Torch", team: "Crewmate Modifier", desc: "The Torch's vision doesn't get reduced when the lights are sabotaged.", ability: "Passive Ability", icon: 'Torch', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Utility"] },

        // Crewmate Postmortem Modifiers (NEW)
        { category: "Modifier", name: "Noisemaker", team: "Crewmate Modifier", desc: "After your death, you will show a red body indicator to everyone on the map.", ability: "Show Red Body Indicator", icon: 'Noisemaker', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Postmortem", "Detection"] },
        { category: "Modifier", name: "Operative", team: "Crewmate Modifier", desc: "Use cameras at anytime, anywhere with a limited battery charge.", ability: "Portable Cameras", icon: 'Operative', skillIcon: 'TownOfUs.Resources.ModifierIcons.SecurityButton.png', types: ["Active", "Postmortem", "Utility"] },
        { category: "Modifier", name: "Rotting", team: "Crewmate Modifier", desc: "After a set amount of time, your body will rot away, preventing you from being reported", ability: "Body Rot", icon: 'Rotting', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Postmortem", "Utility"] },
        { category: "Modifier", name: "Scientist", team: "Crewmate Modifier", desc: "Access Vitals anytime, anywhere with a limited battery charge.", ability: "Portable Vitals", icon: 'Scientist', skillIcon: 'TownOfUs.Resources.ModifierIcons.VitalsButton.png', types: ["Active", "Postmortem", "Utility"] },
        { category: "Modifier", name: "Scout", team: "Crewmate Modifier", desc: "While you can see twice as far as a regular Crewmate, your vision falters when lights are off.", ability: "Enhanced Vision", icon: 'Scout', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Postmortem", "Detection"] },


        // Global Modifiers
        { category: "Modifier", name: "Button Barry", team: "Global Modifier", desc: "Button Barry has the ability to call a meeting from anywhere on the map, even during sabotages. They have the same amount of meetings as a regular player.", ability: "Passive Ability", icon: 'ButtonBarry', skillIcon: 'TownOfUs.Resources.ModifierIcons.ButtonBarry.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Flash", team: "Global Modifier", desc: "The Flash travels at a faster speed in comparison to a normal player.", ability: "Passive Ability", icon: 'Flash', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Buff"] },
        { category: "Modifier", name: "Giant", team: "Global Modifier", desc: "The Giant is a gigantic Crewmate, that has a decreased walk speed.", ability: "Passive Ability", icon: 'Giant', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Buff"] },
        { category: "Modifier", name: "Immovable", team: "Global Modifier", desc: "The Immovable cannot be moved by meetings, transports and disperse.", ability: "Passive Ability", icon: 'Immovable', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Defense"] },
        { category: "Modifier", name: "Lovers", team: "Global Modifier", desc: "The Lovers are two players who are linked together. These two players get picked randomly between Crewmates and Impostors. They gain the primary objective to stay alive together. If they are both among the last 3 players, they win. In order to do so, they gain access to a private chat, only visible by them in between meetings. However, they can also win with their respective team, hence why the Lovers do not know the role of the other lover.", ability: "Passive Ability", icon: 'Lover', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Social", "Win Condition"] }, // Updated icon to 'Lover'
        { category: "Modifier", name: "Mini", team: "Global Modifier", desc: "The Mini is a tiny Crewmate.", ability: "Passive Ability", icon: 'Mini', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Debuff"] },
        { category: "Modifier", name: "Radar", team: "Global Modifier", desc: "The Radar is a Crewmate who knows where the closest player is to them.", ability: "Passive Ability", icon: 'Radar', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Detection"] },
        { category: "Modifier", name: "Satellite", team: "Global Modifier", desc: "The Satellite has a 1 time use ability to detect all dead bodies.", ability: "Detect Dead Bodies", icon: 'Satellite', skillIcon: 'TownOfUs.Resources.ModifierIcons.Satellite.png', types: ["Active", "Detection"] },
        { category: "Modifier", name: "Shy", team: "Global Modifier", desc: "The Shy becomes transparent when standing still for a short duration.", ability: "Passive Ability", icon: 'Shy', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Utility"] },
        { category: "Modifier", name: "Sixth Sense", team: "Global Modifier", desc: "The Sixth Sense is a Crewmate who can see who interacts with them.", ability: "Passive Ability", icon: 'SixthSense', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Detection"] },
        { category: "Modifier", name: "Sleuth", team: "Global Modifier", desc: "The Sleuth is a Crewmate who gains knowledge from reporting dead bodies. During meetings the Sleuth can see the roles of all players in which they've reported.", ability: "Passive Ability", icon: 'Sleuth', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Detection"] },
        { category: "Modifier", name: "Tiebreaker", team: "Global Modifier", desc: "If any vote is a draw, the Tiebreaker's vote will go through. If they voted another player, they will get voted out.", ability: "Break Tie Vote", icon: 'Tiebreaker', skillIcon: 'TownOfUs.Resources.ModifierIcons.Tiebreaker.png', types: ["Active", "Utility"] },

        // Crewmate Alliance Modifiers (NEW)
        { category: "Modifier", name: "Egotist", team: "Crewmate Alliance modifier", desc: "As the Egotist, you can only win if Crewmates lose, but you can still win even in death. If no Crewmates remain after a meeting ends, you will leave in victory, but the game will continue. Egotist Snitch and Mayor also reveal themselves as evil to Neutrals and Impostors alike, and they do not get punished when killing Crewmates.", ability: "No Active Ability", icon: 'Egotist', skillIcon: 'TownOfUs.Resources.ModifierIcons.Passive.png', types: ["Passive", "Win Condition", "Information"] },

        // Impostor Modifiers
        { category: "Modifier", name: "Disperser", team: "Impostor Modifier", desc: "The Disperser is an Impostor who has a 1 time use ability to send all players to a random vent. This includes miner vents. Does not appear on Airship or Submerged.", ability: "Disperse Players", icon: 'Disperser', skillIcon: 'TownOfUs.Resources.ImpButtons.DisperseButton.png', types: ["Active", "Sabotage"] },
        { category: "Modifier", name: "Double Shot", team: "Impostor Modifier", desc: "Double Shot is an Impostor who gets an extra life when assassinating. Once they use their life they are indicated with a red flash and can no longer guess the person who they guessed wrong for the remainder of that meeting.", ability: "Passive Ability", icon: 'DoubleShot', skillIcon: 'TownOfUs.Resources.ImpButtons.Passive.png', types: ["Passive", "Kill", "Defense"] },
        { category: "Modifier", name: "Saboteur", team: "Impostor Modifier", desc: "The Saboteur is an Impostor with a passive sabotage cooldown reduction.", ability: "Passive Ability", icon: 'Saboteur', skillIcon: 'TownOfUs.Resources.ImpButtons.Passive.png', types: ["Passive", "Sabotage"] },
        { category: "Modifier", name: "Underdog", team: "Impostor Modifier", desc: "The Underdog is an Impostor with a prolonged kill cooldown. When they are the only remaining Impostor, they will have their kill cooldown shortened.", ability: "Passive Ability", icon: 'Underdog', skillIcon: 'TownOfUs.Resources.ImpButtons.Passive.png', types: ["Passive", "Kill", "Buff"] },

        // Impostor Postmortem Modifiers (NEW)
        { category: "Modifier", name: "Telepath", team: "Impostor Modifier", desc: "Know when your teammate kills (maybe where depending on settings), and depending on other settings, know when and/or where they die.", ability: "Teammate Info", icon: 'Telepath', skillIcon: 'TownOfUs.Resources.ImpButtons.Passive.png', types: ["Passive", "Postmortem", "Information"] },
    ];

    // Define the full content of the 'Roles' document here.
    const rolesDocumentFullText = `
Roles
Crewmate Roles
Aurial
Team: Crewmates
The Aurial is a Crewmate that can sense things in their surrounding Aura. If any player near the Aurial uses a button ability, the Aurial will get an arrow pointing towards where that ability was used.
Game Options

Name ,Description ,Type ,Default 
Aurial,The percentage probability of the Aurial appearing,Percentage,0%
Radiate Colour Range,The range of the Aurial's aura where they see the colour of the ability user,Multiplier,0.5x
Radiate Max Range,The max range of the Aurial's aura where they see ability uses,Multiplier,1.5x
Sense Duration,The duration of the arrow to show an ability use,Time,10s


Detective
Team: Crewmates
The Detective is a Crewmate that can inspect crime scenes and then examine players. The Detective must first find a crime scene and inspect it. During the same or following rounds the Detective can then examine players to see if they were the killer. If the examined player is the killer or were near the crime scene at any point, they will receive a red flash, else the flash will be green.
Game Options

Name ,Description ,Type ,Default 
Detective,The percentage probability of the Detective appearing,Percentage,0%
Examine Cooldown,The cooldown of the Detective's Examine button,Time,25s
Show Detective Reports,Whether the Detective should get information when reporting a body,Toggle,True
Time Where Detective Reports Will Have Role,"If a body has been dead for shorter than this amount, the Detective's report will contain the killer's role",Time,15s
Time Where Detective Reports Will Have Faction,"If a body has been dead for shorter than this amount, the Detective's report will contain the killer's faction",Time,30s


Haunter
Team: Crewmates
The Haunter is a dead Crewmate that can reveal Impostors if they finish all their tasks. Upon finishing all of their tasks, Impostors are revealed to alive crewmates after a meeting is called. However, if the Haunter is clicked they lose their ability to reveal Impostors and are once again a normal ghost.
Game Options

Name ,Description ,Type ,Default 
Haunter,The percentage probability of the Haunter appearing,Percentage,0%
When Haunter Can Be Clicked,The amount of tasks remaining when the Haunter Can Be Clicked,Number,5
Haunter Alert,The amount of tasks remaining when the Impostors are alreted that the Haunter is nearly finished,Number,1
Haunter Reveals Neutral Roles,Whether the Haunter also Reveals Neutral Roles,Toggle,False
Who can Click Haunter,Whether even other Crewmates can click the Haunter,All / Non-Crew / Imps Only,All


Investigator
Team: Crewmates
The Investigator is a Crewmate that can see the footprints of players. Every footprint disappears after a set amount of time.
Game Options

Name ,Description ,Type ,Default Range
Investigator,The percentage probability of the Investigator appearing,Percentage,0%,N/A
Footprint Size,Changes how big footprints are.,Multiplier,4x,1x - 10x
Footprint Interval,Changes how often footprints are created.,Seconds,1s,0.5s - 6s
Footprint Duration,Changes how long footprints are visible for.,Seconds,10s,1s - 15s
Anonymous Footprint,Determines if footprints are color coded based off the player.,Toggle,False,N/A
Show Vent Footprints,Determines if footprints are visible from a player that's in a vent.,Toggle,False,N/A


Lookout
Team: Crewmates
The Lookout is a Crewmate that can watch other players during rounds. During meetings they will see all roles who interact with each watched player.
Game Options

Name ,Description ,Type ,Default 
Lookout,The percentage probability of the Lookout appearing,Percentage,0%
Watch Cooldown,The cooldown on the Lookout's Watch button,Time,10s
Lookout Watches Reset After Each Round,Whether Lookout Watches are removed after each meeting,Toggle,True
Maximum Number Of Players That Can Be Watched,The number of people they can watch,Number,5


Mystic
Team: Crewmates
The Mystic is a Crewmate that gets an alert revealing when someone has died. On top of this, the Mystic briefly gets an arrow pointing in the direction of the body.
Game Options

Name ,Description ,Type ,Default 
Mystic,The percentage probability of the Mystic appearing,Percentage,0%
Arrow Duration,The duration of the arrows pointing to the bodies,Time,0.1s


Seer
Team: Crewmates
The Seer is a Crewmate that can reveal the alliance of other players. Based on settings, the Seer can find out whether a player is a Good or an Evil role. A player's name will change color depending on faction and role.
Game Options

Name ,Description ,Type ,Default 
Seer,The percentage probability of the Seer appearing,Percentage,0%
Seer Cooldown,The Cooldown of the Seer's Reveal button,Time,25s
Crewmate Killing Roles Are Red,Crewmate Killing roles show up as Red,Toggle,False
Neutral Benign Roles Are Red,Neutral Benign roles show up as Red,Toggle,False
Neutral Evil Roles Are Red,Neutral Evil roles show up as Red,Toggle,False
Neutral Killing Roles Are Red,Neutral Killing roles show up as Red,Toggle,True
Traitor does not swap Colours,The Traitor remains their original colour,Toggle,False


Snitch
Team: Crewmates
The Snitch is a Crewmate that can get arrows pointing towards the Impostors, once all their tasks are finished. The names of the Impostors will also show up as red on their screen. However, when they only have a single task left, the Impostors get an arrow pointing towards the Snitch.
Game Options

Name ,Description ,Type ,Default 
Snitch,The percentage probability of the Snitch appearing,Percentage,0%
Snitch Sees Neutral Roles,Whether the Snitch also Reveals Neutral Roles,Toggle,False
Tasks Remaining When Revealed,The number of tasks remaining when the Snitch is revealed to Impostors,Number,1
Snitch Sees Impostors in Meetings,Whether the Snitch sees the Impostor's names red in Meetings,Toggle,True
Snitch Sees Traitor,Whether the Snitch sees the Traitor,Toggle,True


Spy
Team: Crewmates
The Spy is a Crewmate Investigative role that gains extra information on the admin table. Not only does the Spy see how many people are in a room, but they will also see who is in every room. The Spy also has a toggle for a portable Admin Table with a limited battery charge.
Game Options

Name ,Description ,Type ,Default 
Spy,The percentage probability of the Spy appearing,Percentage,0%
Who Sees Dead Bodies On Admin,Which players see dead bodies on the admin map,Nobody / Spy / Everyone But Spy / Everyone,Nobody


Tracker
Team: Crewmates
The Tracker is a Crewmate that can track other players by tracking them during a round. Once they track someone, an arrow is continuously pointing to them, which updates in set intervals.
Game Options

Name ,Description ,Type ,Default 
Tracker,The percentage probability of the Tracker appearing,Percentage,0%
Arrow Update Interval,The time it takes for the arrow to update to the new location of the tracked player,Time,5s
Track Cooldown,The cooldown on the Tracker's track button,Time,10s
Tracker Arrows Reset Each Round,Whether Tracker Arrows are removed after each meeting,Toggle,True
Maximum Number of Tracks,The number of people they can track,Number,5


Trapper
Team: Crewmates
The Trapper is a Crewmate that can place traps around the map. When players enter a trap they trigger the trap. In the following meeting, all players who triggered a trap will have their role displayed to the Trapper. However, this is done so in a random order, not stating who entered the trap, nor what role a specific player is.
Game Options

Name ,Description ,Type ,Default 
Trapper,The percentage probability of the Trapper appearing,Percentage,0%
Min Amount of Time in Trap to Register,How long a player must stay in the trap for it to trigger,Time,1s
Trap Cooldown,The cooldown on the Trapper's trap button,Time,10s
Traps Removed Each Round,Whether the Trapper's traps are removed after each meeting,Toggle,True
Maximum Number of Traps,The number of traps they can place,Number,5
Trap Size,The size of each trap,Factor,0.25x
Minimum Number of Roles required to Trigger Trap,The number of players that must enter the trap for it to be triggered,Number,3


Deputy
Team: Crewmates
The Deputy is a Crewmate that can camp other players. Camped players will alert the Deputy when they are killed. The following meeting the Deputy then can attempt to shoot their killer. If they successfully shoot the killer, they will die, otherwise nothing happens.
Game Options

Name ,Description ,Type ,Default 
Deputy,The percentage probability of the Deputy appearing,Percentage,0%


Hunter
Team: Crewmates
The Hunter is a Crewmate Killing role with the ability to track players and execute them if they do anything suspicious.\ Unlike the Sheriff, the Hunter does not die if they kill an innocent player, however the Hunter may only execute players who have given them probable cause.
Game Options

Name ,Description ,Type ,Default 
Hunter,The percentage probability of the Hunter appearing,Percentage,0%
Hunter Kill Cooldown,The cooldown of the Hunter's Kill button,Number,25s
Hunter Stalk Cooldown,The cooldown of the Hunter's Stalk button,Number,10s
Hunter Stalk Duration,The duration of the Hunter's Stalk,Number,25s
Maximum Stalk Uses,Maximum number of times a Hunter can Stalk,Number,5
Hunter Kills Last Voter If Voted Out,Whether the Hunter kills the last person that votes them if they are voted out,Toggle,False
Hunter Can Report Who They've Killed,Whether the Hunter is able to report their own kills,Toggle,True


Sheriff
Team: Crewmates
The Sheriff is a Crewmate that has the ability to eliminate the Impostors using their kill button. However, if they kill a Crewmate or a Neutral player they can't kill, they instead die themselves.
Game Options

Name ,Description ,Type ,Default 
Sheriff,The percentage probability of the Sheriff appearing,Percentage,0%
Sheriff Miskill Kills Crewmate,Whether the other player is killed if the Sheriff Misfires,Toggle,False
Sheriff Kills Neutral Evil Roles,Whether the Sheriff is able to kill a Neutral Evil Role,Toggle,False
Sheriff Kills Neutral Killing Roles,Whether the Sheriff is able to kill a Neutral Killing Role,Toggle,False
Sheriff Kill Cooldown,The cooldown on the Sheriff's kill button,Time,25s
Sheriff can report who they've killed,Whether the Sheriff is able to report their own kills,Toggle,True


Veteran
Team: Crewmates
The Veteran is a Crewmate that can go on alert. When the Veteran is on alert, anyone, whether crew, neutral or impostor, if they interact with the Veteran, they die.
Game Options

Name ,Description ,Type ,Default 
Veteran,The percentage probability of the Veteran appearing,Percentage,0%
Can Be Killed On Alert,Whether the Veteran dies when someone tries to kill them when they're on alert,Toggle,False
Alert Cooldown,The cooldown on the Veteran's alert button.,Time,5s
Alert Duration,The duration of the alert,Time,25s
Maximum Number of Alerts,The number of times the Veteran can alert throughout the game,Number,3


Vigilante
Team: Crewmates
The Vigilante is a Crewmate that can kill during meetings. During meetings, the Vigilante can choose to kill someone by guessing their role, however, if they guess incorrectly, they die instead.
Game Options

Name ,Description ,Type ,Default 
Vigilante,The percentage probability of the Vigilante appearing,Percentage,0%
Vigilante Kill,The number of kill the Vigilante can do with his ability,Number,1
Vigilante Multiple Kill,Whether the Vigilante can kill more than once per meeting,Toggle,False
Vigilante Guess Neutral Benign,Whether the Vigilante can Guess Neutral Benign roles,Toggle,False
Vigilante Guess Neutral Evil,Whether the Vigilante can Guess Neutral Evil roles,Toggle,False
Vigilante Guess Neutral Killing,Whether the Vigilante can Guess Neutral Killing roles,Toggle,False
Vigilante Guess Impostor Modifiers,Whether the Vigilante can Guess Impostor modifiers,Toggle,False
Vigilante Guess Lovers,Whether the Vigilante can Guess Lovers,Toggle,False


Jailor
Team: Crewmates
The Jailor is a Crewmate that can jail Crewmates. During meetings all players can see when a Crewmate is jailed. When someone is jailed they cannot use any meeting ability and no meeting ability can be used on them. The Jailor may privately communicate with the jailee. If the Jailor then thinks the jailee is bad, they may then execute them. If the Jailor executes incorrectly, they lose the ability to jail.
Game Options

Name ,Description ,Type ,Default 
Jailor,The percentage probability of the Jailor appearing,Percentage,0%
Jail Cooldown,The cooldown on the Jailor's jail button,Time,10s
Maximum Executes,Maximum number of times a Jailor can Execute,Number,3


Politician
Team: Crewmates
The Politician is a Crewmate that can campaign to other players. Once half or more of the crewmates are campaigned to, the Politician can reveal themselves as the new Mayor. If less then half of the crewmates have been campaigned to the reveal will fail and the Politician will be unable to campaign for 1 round.
Game Options

Name ,Description ,Type ,Default 
Politician,The percentage probability of the Politician appearing,Percentage,0%
Campaign Cooldown,The cooldown of the Politician's Campaign button,Time,25s


Prosecutor
Team: Crewmates
The Prosecutor is a Crewmate that can once per game prosecute a player which results in them being exiled that meeting. The Prosecutor can also see votes non-anonymously.
Game Options

Name ,Description ,Type ,Default 
Prosecutor,The percentage probability of the Prosecutor appearing,Percentage,0%
Prosecutor Dies When They Exile A Crewmate,Whether the Prosecutor also gets exiled when they exile a Crewmate,Toggle,False


Swapper
Team: Crewmates
The Swapper is a Crewmate that can swap the votes on 2 players during a meeting. All the votes for the first player will instead be counted towards the second player and vice versa.
Game Options

Name ,Description ,Type ,Default 
Swapper,The percentage probability of the Swapper appearing,Percentage,0%
Swapper Can Button,Whether the Swapper Can Press the Button,Toggle,True


Altruist
Team: Crewmates
The Altruist is a Crewmate that is capable of reviving dead players. The Altruist may attempt to revive all dead players from that round. When reviving the Altruist may not move and all killers will be pointed towards the Altruist. After a set period of time, all dead player's bodies within the Altruist's range will be resurrected, if the revival isn't interrupted. Once a revival is used, the Altruist, along with all revived players will not be able to button for the remainder of the game.
Game Options

Name ,Description ,Type ,Default 
Altruist,The percentage probability of the Altruist appearing,Percentage,0%
Revive Duration,The time it takes for the Altruist to revive all dead bodies,Time,5s
Revive Uses,The number of times the Revive ability can be used,Number,3
Revive Radius,How wide the revive radius is,Multiplier,1x


Cleric
Team: Crewmates
The Cleric is a Crewmate that can barrier or cleanse other players. When a player is barriered they cannot be killed for a set duration. When a player is cleansed all negative effects are removed, however, not all effects are removed instantly, some are instead removed at the beginning of the following meeting.
Game Options

Name ,Description ,Type ,Default 
Cleric,The percentage probability of the Cleric appearing,Percentage,0%
Barrier Cooldown,The cooldown of the Cleric's Barrier and Cleanse buttons,Time,25s
Show Barriered Player,Who should be able to see who is Barriered,Self / Cleric / Self + Cleric,Cleric
Cleric Gets Attack Notification,Whether the Cleric knows when the barriered player is attacked,Toggle,True


Medic
Team: Crewmates
The Medic is a Crewmate that can give any player a shield that will make them immortal until the Medic dies. A Shielded player cannot be killed by anyone, unless by suicide. If the Medic reports a dead body, they can get a report containing clues to the Killer's identity. A report can contain the color type (Darker/Lighter) of the killer if the body is not too old.
Colors
Red - Darker
Blue - Darker
Green - Darker
Pink - Lighter
Orange - Lighter
Yellow - Lighter
Black - Darker
White - Lighter
Purple - Darker
Brown - Darker
Cyan - Lighter
Lime - Lighter
Maroon - Darker
Rose - Lighter
Banana - Lighter
Gray - Darker
Tan - Darker
Coral - Lighter
Watermelon - Darker
Chocolate - Darker
Sky Blue - Lighter
Beige - Lighter
Magenta - Darker
Turquoise - Lighter
Lilac - Lighter
Olive - Darker
Azure - Lighter
Plum - Darker
Jungle - Darker
Mint - Lighter
Chartreuse - Lighter
Macau - Darker
Tawny - Darker
Gold - Lighter
Rainbow - Lighter
Game Options

Name ,Description ,Type ,Default 
Medic,The percentage probability of the Medic appearing,Percentage,0%
Show Shielded Player,Who should be able to see who is Shielded,Self / Medic / Self + Medic,Medic
Who gets murder attempt indicator,Who will receive an indicator when someone tries to Kill them,Medic / Shielded / Nobody,Medic
Shield breaks on murder attempt,Whether the Shield breaks when someone attempts to Kill them,Toggle,False
Show Medic Reports,Whether the Medic should get information when reporting a body,Toggle,True
Time Where Medic Reports Will Have Color Type,"If a body has been dead for shorter than this amount, the Medic's report will have the type of color",Time,15s


Oracle
Team: Crewmates
The Oracle is a Crewmate that can get another player to confess information to them. The Oracle has 2 abilities. The first, confess, makes a player confess saying that one of two players is good and will reveal their alignment when the Oracle dies. The second, bless, makes someone immune to dying during a meeting.
Game Options

Name ,Description ,Type ,Default 
Oracle,The percentage probability of the Oracle appearing,Percentage,0%
Confess Cooldown,The Cooldown of the Oracle's Confess button,Time,10s
Initial Bless Cooldown,The Initial Cooldown of the Oracle's Bless button,Time,10s
Reveal Accuracy,The percentage probability of the Oracle's confessed player telling the truth,Percentage,80%


Warden
Team: Crewmates
The Warden is a Crewmate that can fortify other players. Fortified players cannot be interacted with. If someone tries to interact with or assassinate a fortified player, Both the Warden and the interactor receive an alert.
Game Options

Name ,Description ,Type ,Default 
Warden,The percentage probability of the Warden appearing,Percentage,0%
Show Fortified Player,Who should be able to see who is Fortified,Self / Warden / Self + Warden,Warden


Engineer
Team: Crewmates
The Engineer is a Crewmate that can fix sabotages from anywhere on the map. They can use vents to get across the map easily.
Game Options

Name ,Description ,Type ,Default 
Engineer,The percentage probability of the Engineer appearing,Percentage,0%
Maximum Fixes,The number of times the Engineer can fix a sabotage,Number,5


Imitator
Team: Crewmates
The Imitator is a Crewmate that can mimic dead crewamtes. During meetings the Imitator can select who they are going to imitate the following round from the dead. They can choose to use each dead players as many times as they wish.
Game Options

Name ,Description ,Type ,Default 
Imitator,The percentage probability of the Imitator appearing,Percentage,0%
Imitator Can Become Mayor,Whether the Imitator can permanently become the Mayor,Toggle,True


Medium
Team: Crewmates
The Medium is a Crewmate that can see ghosts. During each round the Medium has an ability called Mediate. If the Medium uses this ability and no one is dead, nothing will happen. However, if someone is dead, the Medium and the dead player will be able to see each other and communicate from beyond the grave!
Game Options

Name ,Description ,Type ,Default 
Medium,The percentage probability of the Medium appearing,Percentage,0%
Mediate Cooldown,The cooldown of the Medium's Mediate button,Time,10s
Reveal Appearance of Mediate Target,"Whether the Ghosts will show as themselves, or camouflaged",Toggle,True
Reveal the Medium to the Mediate Target,Whether the ghosts can see that the Medium is the Medium,Toggle,True
Who is Revealed,Which players are revealed to the Medium,Oldest Dead / Newest Dead / All Dead,Oldest Dead


Plumber
Team: Crewmates
The Plumber is a Crewmate that maintains vent systems. The Plumber can either flush vents, ejecting all players currently in vents, or block a vent, placing a barricade on the vent preventing it's use.
Game Options

Name ,Description ,Type ,Default 
Plumber,The percentage probability of the Plumber appearing,Percentage,0%
Flush Cooldown,The cooldown of the Plumber's Flush and Block buttons,Time,25s
Maximum Barricades,The number of times the Plumber can block a vent,Number,5


Transporter
Team: Crewmates
The Transporter is a Crewmate that can change the locations of two random players at will. Players who have been transported are alerted with a blue flash on their screen.
Game Options

Name ,Description ,Type ,Default 
Transporter,The percentage probability of the Transporter appearing,Percentage,0%
Transport Cooldown,The cooldown of the Transporter's transport ability,Time,25s
Max Uses,The amount of times the Transport ability can be used,Number,5
Transporter can use Vitals,Whether the Transporter has the ability to use Vitals,Toggle,False


Neutral Roles
Amnesiac
Team: Neutral
The Amnesiac is a Neutral role with no win condition. They have zero tasks and are essentially roleless. However, they can remember a role by finding a dead player. Once they remember their role, they go on to try win with their new win condition.
Game Options

Name ,Description ,Type ,Default 
Amnesiac,The percentage probability of the Amnesiac appearing,Percentage,0%
Amnesiac Gets Arrows,Whether the Amnesiac has arrows pointing to dead bodies,Toggle,False
Arrow Appear Delay,The delay of the arrows appearing after the person died,Time,5s


Guardian Angel
Team: Neutral
The Guardian Angel is a Neutral role which aligns with the faction of their target. Their job is to protect their target at all costs. If their target loses, they lose.
Game Options

Name ,Description ,Type ,Default 
Guardian Angel,The percentage probability of the Guardian Angel appearing,Percentage,0%
Protect Cooldown,The cooldown of the Guardian Angel's Protect button,Time,25s
Protect Duration,How long The Guardian Angel's Protect lasts,Time,10s
Max Uses,The amount of times the Protect ability can be used,Number,5
Show Protected Player,Who should be able to see who is Protected,Self / GA / Self + GA,Self
Guardian Angel becomes on Target Dead,Which role the Guardian Angel becomes when their target dies,Crewmate / Amnesiac / Mercenary / Survivor / Jester,Survivor
Target Knows GA Exists,Whether the GA's Target knows they have a GA,Toggle,False
GA Knows Targets Role,Whether the GA knows their target's role,Toggle,False
Odds Of Target Being Evil,The chances of the Guardian Angel's target being evil,Percentage,20%


Mercenary
Team: Neutral
The Mercenary is a Neutral role which can guard other players. Guarded players absorb abilities and convert it into currency. This currency can be used to bribe other players. If a bribed player lives and goes onto win the game, the Mercenary does too. The Mercenary does not need to survive themselves. They cannot win with Neutral Evils or Lovers.
Game Options

Name ,Description ,Type ,Default 
Mercenary,The percentage probability of the Mercenary appearing,Percentage,0%
Guard Cooldown,The cooldown of the Mercenary's Guard button,Time,10s
Max Guards,The maximum amount of Guards active at one time,Number,3
Gold To Bribe,The amount of gold required to bribe a player,Number,3


Survivor
Team: Neutral
The Survivor is a Neutral role which can win by simply surviving. However, if Lovers, or a Neutral Evil role wins the game, the survivor loses.
Game Options

Name ,Description ,Type ,Default 
Survivor,The percentage probability of the Survivor appearing,Percentage,0%
Vest Cooldown,The cooldown of the Survivor's Vest button,Time,25s
Vest Duration,How long The Survivor's Vest lasts,Time,10s
Max Uses,The amount of times the Vest ability can be used,Number,5
Survivor Scatter Mechanic,Whether the Survivor needs to keep moving to avoid dying,Toggle,True
Survivor Movement Timer,How frequently the Survivor needs to move,Time,25s


Doomsayer
Team: Neutral
The Doomsayer is a Neutral role with its own win condition. Their goal is to assassinate 3 players to win. If there are only 2 other people alive, the Doomsayer only needs to assassinate the remainder of the players. They have an additional observe ability that hints towards certain player's roles.
Game Options

Name ,Description ,Type ,Default 
Doomsayer,The percentage probability of the Doomsayer appearing,Percentage,0%
Observe Cooldown,The Cooldown of the Doomsayer's Observe button,Time,10s
Doomsayer Guesses All At Once,Whether the Doomsayer has to guess all 3 roles to win at once,Toggle,True
(Experienced) Doomsayer Can't Observe,The Doomsayer doesn't have the observe feature,Toggle,False
Doomsayer Win Ends Game,Whether Doomsayer winning ends the game,Toggle,True


Executioner
Team: Neutral
The Executioner is a Neutral role with its own win condition. Their goal is to vote out a player, specified in the beginning of a game. If that player gets voted out, they win the game.
Game Options

Name ,Description ,Type ,Default 
Executioner,The percentage probability of the Executioner appearing,Percentage,0%
Executioner becomes on Target Dead,Which role the Executioner becomes when their target dies,Crewmate / Amnesiac / Mercenary / Survivor / Jester,Jester
Executioner Can Button,Whether the Executioner Can Press the Button,Toggle,True
Executioner Win,What happens when the Executioner wins,Ends Game / Nothing / Torments,Ends Game


Jester
Team: Neutral
The Jester is a Neutral role with its own win condition. If they are voted out after a meeting, the game finishes and they win. However, the Jester does not win if the Crewmates, Impostors or another Neutral role wins.
Game Options

Name ,Description ,Type ,Default 
Jester,The percentage probability of the Jester appearing,Percentage,0%
Jester Can Button,Whether the Jester Can Press the Button,Toggle,True
Jester Can Vent,Whether the Jester Can Vent,Toggle,False
Jester Has Impostor Vision,Whether the Jester Has Impostor Vision,Toggle,False
Jester Scatter Mechanic,Whether the Jester needs to keep moving to avoid dying,Toggle,True
Jester Movement Timer,How frequently the Jester needs to move,Time,25s
Jester Win,What happens when the Jester wins,Ends Game / Nothing / Haunts,Ends Game


Phantom
Team: Neutral
The Phantom is a Neutral role with its own win condition. They become half-invisible when they die and has to complete all their tasks without getting caught.
Game Options

Name ,Description ,Type ,Default 
Phantom,The percentage probability of the Phantom appearing,Percentage,0%
When Phantom Can Be Clicked,The amount of tasks remaining when the Phantom Can Be Clicked,Number,5
Phantom Win Ends Game,Whether Phantom winning ends the game,Toggle,False


Arsonist
Team: Neutral
The Arsonist is a Neutral role with its own win condition. They have two abilities, one is to douse other players with gasoline. The other is to ignite all doused players near them. The Arsonist needs to be the last killer alive to win the game.
Game Options

Name ,Description ,Type ,Default 
Arsonist,The percentage probability of the Arsonist appearing,Percentage,0%
Douse Cooldown,The cooldown of the Arsonist's Douse button,Time,25s
Ignite Radius,How wide the ignite radius is,Multiplier,0.25x
Arsonist can Vent,Whether the Arsonist can Vent,Toggle,False


Glitch
Team: Neutral
The Glitch is a Neutral role with its own win condition. The Glitch's aim is to kill everyone and be the last person standing. The Glitch can Hack players, resulting in them being unable to report bodies and use abilities. Hacking prevents the hacked player from doing anything but walk around the map. The Glitch can Mimic someone, which results in them looking exactly like the other person.
Game Options

Name ,Description ,Type ,Default 
The Glitch,The percentage probability of The Glitch appearing,Percentage,0%
Mimic Cooldown,The cooldown of The Glitch's Mimic button,Time,25s
Mimic Duration,How long The Glitch can Mimic a player,Time,10s
Hack Cooldown,The cooldown of The Glitch's Hack button,Time,25s
Hack Duration,How long The Glitch can Hack a player,Time,10s
Glitch Kill Cooldown,The cooldown of the Glitch's Kill button,Time,25s
Glitch can Vent,Whether the Glitch can Vent,Toggle,False


Juggernaut
Team: Neutral
The Juggernaut is a Neutral role with its own win condition. The Juggernaut's special ability is that their kill cooldown reduces with each kill. This means in theory the Juggernaut can have a 0 second kill cooldown! The Juggernaut needs to be the last killer alive to win the game.
Game Options

Name ,Description ,Type ,Default 
Juggernaut,The percentage probability of the Juggernaut appearing,Percentage,0%
Juggernaut Kill Cooldown,The initial cooldown of the Juggernaut's Kill button,Time,25s
Reduced Kill Cooldown Per Kill,The amount of time removed from the Juggernaut's Kill Cooldown Per Kill,Time,5s
Juggernaut can Vent,Whether the Juggernaut can Vent,Toggle,False


Plaguebearer
Team: Neutral
The Plaguebearer is a Neutral role with its own win condition, as well as an ability to transform into another role. The Plaguebearer has one ability, which allows them to infect other players. Once infected, the infected player can go and infect other players via interacting with them. Once all players are infected, the Plaguebearer becomes Pestilence. The Pestilence is a unkillable force which can only be killed by being voted out, even their lover dying won't kill them. The Plaguebearer or Pestilence needs to be the last killer alive to win the game.
Game Options

Name ,Description ,Type ,Default 
Plaguebearer,The percentage probability of the Plaguebearer appearing,Percentage,0%
Infect Cooldown,The cooldown of the Plaguebearer's Infect button,Time,25s
Pestilence Kill Cooldown,The cooldown of the Pestilence's Kill button,Time,25s
Pestilence can Vent,Whether the Pestilence can Vent,Toggle,False


Soul Collector
Team: Neutral
The Soul Collector is a Neutral role with its own win condition. The Soul Collector kills be reaping players, reaped players do not leave behind a dead body, instead they leave a soul. The Soul Collector needs to be the last killer alive to win the game.
Game Options

Name ,Description ,Type ,Default 
Soul Collector,The percentage probability of the Soul Collector appearing,Percentage,0%
Reap Cooldown,The Cooldown of the Soul Collector's Reap button,Time,25s
Soul Collector can Vent,Whether the Soul Collector can Vent,Toggle,False


Vampire
Team: Neutral
The Vampire is a Neutral role with its own win condition. The Vampire can convert or kill other players by biting them. If the bitten player was a Crewmate they will turn into a Vampire (unless there are 2 Vampires alive) Else they will kill the bitten player.
Game Options

Name ,Description ,Type ,Default 
Vampire,The percentage probability of the Vampire appearing,Percentage,0%
Bite Cooldown,The cooldown of the Vampire's Bite button,Time,25s
Vampire Has Impostor Vision,Whether the Vampire Has Impostor Vision,Toggle,False
Vampire Can Vent,Whether the Vampire Can Vent,Toggle,False
New Vampire Can Assassinated,Whether the new Vampire can assassinate,Toggle,False
Maximum Vampires Per Game,The maximum amount of players that can be Vampires,Number,2
Can Convert Neutral Benign Roles,Whether Neutral Benign Roles can be turned into Vampires,Toggle,False
Can Convert Neutral Evil Roles,Whether Neutral Evil Roles can be turned into Vampires,Toggle,False


Werewolf
Team: Neutral
The Werewolf is a Neutral role with its own win condition. Although the Werewolf has a kill button, they can't use it unless they are Rampaged. Once the Werewolf rampages they gain Impostor vision and the ability to kill. However, unlike most killers their kill cooldown is really short. The Werewolf needs to be the last killer alive to win the game.
Game Options

Name ,Description ,Type ,Default 
Werewolf,The percentage probability of the Werewolf appearing,Percentage,0%
Rampage Cooldown,The cooldown of the Werewolf's Rampage button,Time,25s
Rampage Duration,The duration of the Werewolf's Rampage,Time,25s
Rampage Kill Cooldown,The cooldown of the Werewolf's Kill button,Time,10s
Werewolf can Vent when Rampaged,Whether the Werewolf can Vent when Rampaged,Toggle,False


Impostor Roles
Eclipsal
Team: Impostors
The Eclipsal is an Impostor that can blind other players. Blinded players have no vision and their report buttons do not light up (but can still be used).
Game Options

Name ,Description ,Type ,Default 
Eclipsal,The percentage probability of the Eclipsal appearing,Percentage,0%
Blind Cooldown,The cooldown of the Eclipsal's Blind button,Time,25s
Blind Duration,How long the Blind lasts for,Time,25s
Blind Radius,How wide the blind radius is,Multiplier,1x


Escapist
Team: Impostors
The Escapist is an Impostor that can teleport to a different location. Once per round the Escapist can Mark a location which they can then escape to later in the round.
Game Options

Name ,Description ,Type ,Default 
Escapist,The percentage probability of the Escapist appearing,Percentage,0%
Recall Cooldown,The cooldown of the Escapist's Recall button,Time,25s
Escapist can Vent,Whether the Escapist can Vent,Toggle,False


Grenadier
Team: Impostors
The Grenadier is an Impostor that can throw smoke grenades. During the game, the Grenadier has the option to throw down a smoke grenade which blinds crewmates so they can't see. However, a sabotage and a smoke grenade can not be active at the same time.
Game Options

Name ,Description ,Type ,Default 
Grenadier,The percentage probability of the Grenadier appearing,Percentage,0%
Flash Grenade Cooldown,The cooldown of the Grenadier's Flash button,Time,25s
Flash Grenade Duration,How long the Flash Grenade lasts for,Time,10s
Flash Radius,How wide the flash radius is,Multiplier,1x
Grenadier can Vent,Whether the Grenadier can Vent,Toggle,False


Morphling
Team: Impostors
The Morphling is an Impostor that can Morph into another player. At the beginning of the game and after every meeting, they can choose someone to Sample. They can then Morph into that person at any time for a limited amount of time.
Game Options

Name ,Description ,Type ,Default 
Morphling,The percentage probability of the Morphling appearing,Percentage,0%
Morph Cooldown,The cooldown of the Morphling's Morph button,Time,25s
Morph Duration,How long the Morph lasts for,Time,10s
Morphling can Vent,Whether the Morphling can Vent,Toggle,False


Swooper
Team: Impostors
The Swooper is an Impostor that can temporarily turn invisible.
Game Options

Name ,Description ,Type ,Default 
Swooper,The percentage probability of the Swooper appearing,Percentage,0%
Swooper Cooldown,The cooldown of the Swooper's Swoop button,Time,25s
Swooper Duration,How long the Swooping lasts for,Time,10s
Swooper can Vent,Whether the Swooper can Vent,Toggle,False


Venerer
Team: Impostors
The Venerer is an Impostor that gains abilities through killing. After their first kill, the Venerer can camouflage themself. After their second kill, the Venerer can sprint. After their third kill, every other player is slowed while their ability is activated. All abilities are activated by the one button and have the same duration.
Game Options

Name ,Description ,Type ,Default 
Venerer,The percentage probability of the Venerer appearing,Percentage,0%
Ability Cooldown,The cooldown of the Venerer's Ability button,Time,25s
Ability Duration,How long the Venerer's ability lasts for,Time,10s
Sprint Speed,How fast the speed increase of the Venerer is when sprinting,Multiplier,1.25x
Min Freeze Speed,How slow the minimum speed is when the Venerer's ability is active,Multiplier,0.25x
Freeze Radius,How wide the freeze radius is,Multiplier,1x


Bomber
Team: Impostors
The Bomber is an Impostor who has the ability to plant bombs instead of kill. After a bomb is planted, the bomb will detonate a fixed time period as per settings. Once the bomb detonates it will kill all crewmates (and Impostors!) inside the radius.
Game Options

Name ,Description ,Type ,Default 
Bomber,The percentage probability of the Bomber appearing,Percentage,0%
Detonate Delay,The delay of the detonation after bomb has been planted,Time,5s
Max Kills In Detonation,Maximum number of kills in the detonation,Time,5s
Detonate Radius,How wide the detonate radius is,Multiplier,0.25x
Bomber can Vent,Whether the Bomber can Vent,Toggle,False
All Imps See Bomb,Whether all the Impostors see the Bomber's bombs,Toggle,False


Scavenger
Team: Impostors
The Scavenger is an Impostor who hunts down prey. With each successful hunt the Scavenger has a shortened kill cooldown. On an incorrect kill the Scavenger has a significantly increased kill cooldown.
Game Options

Name ,Description ,Type ,Default 
Scavenger,The percentage probability of the Scavenger appearing,Percentage,0%
Scavenge Duration,How long the Scavenger's scavenge lasts for,Time,25s
Scavenge Duration Increase Per Kill,How much time the Scavenge duration increases on a correct kill,Time,10s
Scavenge Kill Cooldown On Correct Kill,The kill cooldown the Scavenger has on a correct kill,Time,10s
Kill Cooldown Multiplier On Incorrect Kill,The increased time the kill cooldown has on an incorrect kill,Multiplier,3x


Traitor
Team: Impostors
If all Impostors die before a certain point in the game, a random crewmate is selected to become the Traitor. The Traitor has no additional abilities and their job is simply to avenge the dead Impostors. Once this player has turned into the Traitor their alliance sits with the Impostors. The Traitor is offered a choice of up to 3 Impostor roles when they initially change roles.
Game Options

Name ,Description ,Type ,Default 
Traitor,The percentage probability of the Traitor appearing,Percentage,0%
Minimum People Alive When Traitor Can Spawn,The minimum number of people alive when a Traitor can spawn,Number,5
Traitor Won't Spawn if Neutral Killing are Alive,Whether the Traitor won't spawn if any Neutral Killing roles are alive,Toggle,False


Warlock
Team: Impostors
The Warlock is an Impostor that can charge up their kill button. Once activated the Warlock can use their kill button infinitely until they run out of charge. However, they do not need to fully charge their kill button to use it.
Game Options

Name ,Description ,Type ,Default 
Warlock,The percentage probability of the Warlock appearing,Percentage,0%
Time It Takes To Fully Charge,The time it takes to fully charge the Warlock's Kill Button,Time,25s
Time It Takes To Use Full Charge,The maximum duration a charge of the Warlock's Kill Button lasts,Time,1s


Blackmailer
Team: Impostors
The Blackmailer is an Impostor that can silence people in meetings. During each round, the Blackmailer can go up to someone and blackmail them. This prevents the blackmailed person from speaking and possibly voting during the next meeting.
Game Options

Name ,Description ,Type ,Default 
Blackmailer,The percentage probability of the Blackmailer appearing,Percentage,0%
Initial Blackmail Cooldown,The initial cooldown of the Blackmailer's Blackmail button,Time,10s
Only Target Sees Blackmail,"If enabled, only the blackmailed player (and the Blackmailer) will see that the player can't speak",Toggle,False
Maximum People Alive Where Blackmailed Can Vote,The maximum number of players alive to allow the blackmailed player to vote,Number,5


Hypnotist
Team: Impostors
The Hypnotist is an Impostor that can hypnotize people. Once enough people are hypnotized, the Hypnotist can release Mass Hysteria. With Mass Hysteria released, all hypnotized players see all other players as either themselves, camouflaged or invisible. Once the Hypnotist dies Mass Hysteria is removed and people can see everyone normally again.
Game Options

Name ,Description ,Type ,Default 
Hypnotist,The percentage probability of the Hypnotist appearing,Percentage,0%
Hypnotize Cooldown,The cooldown of the Hypnotist's Hypnotize button,Time,25s


Janitor
Team: Impostors
The Janitor is an Impostor that can clean up bodies. Both their Kill and Clean ability have a shared cooldown, meaning they have to choose which one they want to use.
Game Options

Name ,Description ,Type ,Default 
Janitor,The percentage probability of the Janitor appearing,Percentage,0%


Miner
Team: Impostors
The Miner is an Impostor that can create new vents. These vents only connect to each other, forming a new passway.
Game Options

Name ,Description ,Type ,Default 
Miner,The percentage probability of the Miner appearing,Percentage,0%
Mine Cooldown,The cooldown of the Miner's Mine button,Time,25s


Undertaker
Team: Impostors
The Undertaker is an Impostor that can drag and drop bodies.
Game Options

Name ,Description ,Type ,Default 
Undertaker,The percentage probability of the Undertaker appearing,Percentage,0%
Undertaker Drag Cooldown,The cooldown of the Undertaker Drag ability,Time,25s
Undertaker Speed While Dragging,How fast the Undertaker moves while dragging a body in comparison to normal,Multiplier,0.75x
Undertaker can Vent,Whether the Undertaker can Vent,Toggle,False
Undertaker can Vent while Dragging,Whether the Undertaker can Vent when they are Dragging a Body,Toggle,False


Modifiers
Modifiers are added on top of players' roles.
Aftermath
Applied to: Crewmates
Killing the Aftermath forces their killer to use their ability (if they have one and it's not in use).
Game Options

Name ,Description ,Type ,Default 
Aftermath,The percentage probability of the Aftermath appearing,Percentage,0%


Bait
Applied to: Crewmates
Killing the Bait makes the killer auto self-report.
Game Options

Name ,Description ,Type ,Default Range
Bait,The percentage probability of the Bait appearing,Percentage,0%,N/A
Bait Minimum Delay,The minimum time the killer of the Bait reports the body,Time,0s,0s - 10s
Bait Maximum Delay,The maximum time the killer of the Bait reports the body,Time,1s,0s - 10s


Celebrity
Applied to: Crewmates
The Celebrity announces how, when and where they died the meeting after they die.
Game Options

Name ,Description ,Type ,Default 
Celebrity,The percentage probability of the Celebrity appearing,Percentage,0%


Diseased
Applied to: Crewmates
Killing the Diseased increases the killer's kill cooldown.
Game Options

Name ,Description ,Type ,Default 
Diseased,The percentage probability of the Diseased appearing,Percentage,0%
Kill Multiplier,How much the Kill Cooldown of the Impostor is increased by,Multiplier,3x


Frosty
Applied to: Crewmates
Killing the Frosty slows the killer for a short duration.
Game Options

Name ,Description ,Type ,Default 
Frosty,The percentage probability of the Frosty appearing,Percentage,0%
Chill Duration,The duration of the chill after killing the Frosty,Time,10s
Chill Start Speed,The start speed of the chill after killing the Frosty,Multiplier,0.75x


Multitasker
Applied to: Crewmates
The Multitasker's tasks are transparent.
Game Options

Name ,Description ,Type ,Default 
Multitasker,The percentage probability of the Multitasker appearing,Percentage,0%


Taskmaster
Applied to: Crewmates
The Taskmaster completes a random task on the completion of each meeting.
Game Options

Name ,Description ,Type ,Default 
Taskmaster,The percentage probability of the Taskmaster appearing,Percentage,0%


Torch
Applied to: Crewmates
The Torch's vision doesn't get reduced when the lights are sabotaged.
Game Options

Name ,Description ,Type ,Default 
Torch,The percentage probability of the Torch appearing,Percentage,0%


Crewmate Postmortem Modifiers
Noisemaker
Applied to: Crewmates
After your death, you will show a red body indicator to everyone on the map.
Game Options

Name ,Description ,Type ,Default 
Noisemaker,The percentage probability of the Noisemaker appearing,Percentage,0%


Operative
Applied to: Crewmates
Use cameras at anytime, anywhere with a limited battery charge.
Game Options

Name ,Description ,Type ,Default 
Operative,The percentage probability of the Operative appearing,Percentage,0%


Rotting
Applied to: Crewmates
After a set amount of time, your body will rot away, preventing you from being reported
Game Options

Name ,Description ,Type ,Default 
Rotting,The percentage probability of the Rotting appearing,Percentage,0%


Scientist
Applied to: Crewmates
Access Vitals anytime, anywhere with a limited battery charge.
Game Options

Name ,Description ,Type ,Default 
Scientist,The percentage probability of the Scientist appearing,Percentage,0%


Scout
Applied to: Crewmates
While you can see twice as far as a regular crewmate, your vision falters when lights are off.
Game Options

Name ,Description ,Type ,Default 
Scout,The percentage probability of the Scout appearing,Percentage,0%


Global Modifiers
Button Barry
Applied to: All
Button Barry has the ability to call a meeting from anywhere on the map, even during sabotages. They have the same amount of meetings as a regular player.
Game Options

Name ,Description ,Type ,Default 
Button Barry,The percentage probability of Button Barry appearing,Percentage,0%


Flash
Applied to: All
The Flash travels at a faster speed in comparison to a normal player.
Game Options

Name ,Description ,Type ,Default 
Flash,The percentage probability of the Flash appearing,Percentage,0%
Speed,How fast the Flash moves in comparison to normal,Multiplier,1.25x


Giant
Applied to: All
The Giant is a gigantic Crewmate, that has a decreased walk speed.
Game Options

Name ,Description ,Type ,Default 
Giant,The percentage probability of the Giant appearing,Percentage,0%
Speed,How fast the Giant moves in comparison to normal,Multiplier,0.75x


Immovable
Applied to: All
The Immovable cannot be moved by meetings, transports and disperse.
Game Options

Name ,Description ,Type ,Default 
Immovable,The percentage probability of the Immovable appearing,Percentage,0%


Lovers
Applied to: All
The Lovers are two players who are linked together. These two players get picked randomly between Crewmates and Impostors. They gain the primary objective to stay alive together. If they are both among the last 3 players, they win. In order to do so, they gain access to a private chat, only visible by them in between meetings. However, they can also win with their respective team, hence why the Lovers do not know the role of the other lover.
Game Options

Name ,Description ,Type ,Default 
Lovers,The percentage probability of the Lovers appearing,Percentage,0%
Both Lovers Die,Whether the other Lover automatically dies if the other does,Toggle,True
Loving Impostor Probability,The chances of one lover being an Impostor,Percentage,20%
Neutral Roles Can Be Lovers,Whether a Lover can be a Neutral Role,Toggle,True
Impostor Lover Can Kill Teammate,Whether an Impostor Lover can kill another Impostor,Toggle,False


Mini
Applied to: All
The Mini is a tiny Crewmate.
Game Options

Name ,Description ,Type ,Default 
Mini,The percentage probability of the Mini appearing,Percentage,0%


Radar
Applied to: All
The Radar is a crewmate who knows where the closest player is to them.
Game Options

Name ,Description ,Type ,Default 
Radar,The percentage probability of the Radar appearing,Percentage,0%


Satellite
Applied to: All
The Satellite has a 1 time use ability to detect all dead bodies.
Game Options

Name ,Description ,Type ,Default 
Satellite,The percentage probability of the Satellite appearing,Percentage,0%
Broadcast Duration,The duration of the broadcast arrows,Time,10s


Shy
Applied to: All
The Shy becomes transparent when standing still for a short duration.
Game Options

Name ,Description ,Type ,Default 
Shy,The percentage probability of the Shy appearing,Percentage,0%
Transparency Delay,The delay until the Shy starts turning transparent,Time,5s
Turn Transparent Duration,The duration of the Shy turning transparent,Time,5s
Final Opacity,The final opacity level of the Shy,Percentage,20%


Sixth Sense
Applied to: All
The Sixth Sense is a crewmate who can see who interacts with them.
Game Options

Name ,Description ,Type ,Default 
Sixth Sense,The percentage probability of the Sixth Sense appearing,Percentage,0%


Sleuth
Applied to: All
The Sleuth is a crewmate who gains knowledge from reporting dead bodies. During meetings the Sleuth can see the roles of all players in which they've reported.
Game Options

Name ,Description ,Type ,Default 
Sleuth,The percentage probability of the Sleuth appearing,Percentage,0%


Tiebreaker
Applied to: All
If any vote is a draw, the Tiebreaker's vote will go through. If they voted another player, they will get voted out.
Game Options

Name ,Description ,Type ,Default 
Tiebreaker,The percentage probability of the Tiebreaker appearing,Percentage,0%


Crewmate Alliance modifier
Egotist
Applied to: Crewmates
As the Egotist, you can only win if Crewmates lose, but you can still win even in death. If no crewmates remain after a meeting ends, you will leave in victory, but the game will continue. Egotist Snitch and Mayor also reveal themselves as evil to neutrals and impostors alike, and they do not get punished when killing crewmates.
Game Options

Name ,Description ,Type ,Default 
Egotist,The percentage probability of the Egotist appearing,Percentage,0%


Impostor Modifiers
Disperser
Applied to: Impostors
The Disperser is an Impostor who has a 1 time use ability to send all players to a random vent. This includes miner vents. Does not appear on Airship or Submerged.
Game Options

Name ,Description ,Type ,Default 
Disperser,The percentage probability of the Disperser appearing,Percentage,0%


Double Shot
Applied to: Impostors
Double Shot is an Impostor who gets an extra life when assassinating. Once they use their life they are indicated with a red flash and can no longer guess the person who they guessed wrong for the remainder of that meeting.
Game Options

Name ,Description ,Type ,Default 
Double Shot,The percentage probability of Double Shot appearing,Percentage,0%


Saboteur
Applied to: Impostors
The Saboteur is an Impostor with a passive sabotage cooldown reduction.
Game Options

Name ,Description ,Type ,Default 
Saboteur,The percentage probability of the Saboteur appearing,Percentage,0%
Reduced Sabotage Bonus,The amount of time removed from the Saboteur's sabotage cooldowns,Time,10s


Underdog
Applied to: Impostors
The Underdog is an Impostor with a prolonged kill cooldown. When they are the only remaining Impostor, they will have their kill cooldown shortened.
Game Options

Name ,Description ,Type ,Default 
Underdog,The percentage probability of the Underdog appearing,Percentage,0%
Kill Cooldown Bonus,The amount of time added or removed from the Underdog's Kill Cooldown,Time,5s
Increased Kill Cooldown,Whether the Underdog's Kill Cooldown is Increased when 2+ Imps are alive,Toggle,True


Impostor Postmortem Modifiers
Telepath
Applied to: Impostors
Know when your teammate kills (maybe where depending on settings), and depending on other settings, know when and/or where they die.
Game Options

Name ,Description ,Type ,Default 
Telepath,The percentage probability of the Telepath appearing,Percentage,0%
`;

// This object will map role/modifier names to their colors for text highlighting
// It's populated dynamically from allEntitiesData to ensure consistency
const entityNamesAndColors = [];
const allValidEntityNamesSet = new Set(); // To quickly check if a parsed name is a real entity

// Populate allValidEntityNamesSet and entityNamesAndColors after allEntitiesData is defined
allEntitiesData.forEach(e => {
    allValidEntityNamesSet.add(e.name);
    if (e.name.startsWith("The ")) { // Handle names like "The Glitch"
        allValidEntityNamesSet.add(e.name.substring(4));
    }
    // Add specific cases for robustness
    if (e.name === "Double Shot") allValidEntityNamesSet.add("Double Shot");
    if (e.name === "Button Barry") allValidEntityNamesSet.add("Button Barry");

    const color = e.category === 'Role' ? roleColors[e.name] : modifierColors[e.name];
    if (color) { // Only add if a specific color exists for the entity
        entityNamesAndColors.push({ name: e.name, color: color });
    }
});


// Filter for colorizing. Keep only specific roles/modifiers, not generic factions.
// The user explicitly stated "dont change the color of teams to team colors in descriptions and ignore crewmate, dont chnage that to blue."
// This means that the words "Crewmate", "Impostor", "Neutral" when used as general faction descriptors in the text should NOT be colored.
// However, specific roles and modifiers (e.g., "Jester", "Sheriff", "Bait", "Flash") *should* be colored with their unique role color.
// We achieve this by filtering out the generic "Crewmate", "Impostor", "Neutral" from the list of entities whose names are colored in descriptions.
const entityNamesForColorizing = entityNamesAndColors.filter(entity => {
    // Exclude generic team names from being colored in descriptions
    const isGenericTeamName = ["Crewmate", "Impostor", "Neutral"].includes(entity.name);
    return !isGenericTeamName;
});

// Sort by length of name in descending order to prevent partial matches (e.g., "Double Shot" before "Shot")
entityNamesForColorizing.sort((a, b) => b.name.length - a.name.length);

/**
 * Replaces occurrences of known role/modifier names in text with colored spans.
 * @param {string} text The input text.
 * @returns {string} The text with role names colored.
 */
function colorizeRoleNamesInText(text) {
    let coloredText = text;
    for (const entity of entityNamesForColorizing) { // Use the filtered list here
        // Use a regular expression with word boundaries to avoid partial matches within words
        // Escape special characters in the entity name for use in regex
        const escapedName = entity.name.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedName}\\b`, 'gi');
        // Only replace if the entity name is not already inside a span with a style attribute
        // This is a simplified check and might not catch all cases of existing HTML
        coloredText = coloredText.replace(regex, (match) => {
            if (match.includes('<span style=')) {
                return match; // Already colored, don't re-wrap
            }
            // Add custom font to the style
            return `<span style="color: ${entity.color}; font-family: 'Amatic SC', cursive; font-weight: 700;">${match}</span>`;
        });
    }
    return coloredText;
}


// Function to parse the roles text and extract options
function parseRolesOptions(rolesText) {
    const lines = rolesText.split('\n').map(line => line.trim()).filter(line => line.length > 0); // Filter empty lines
    const optionsByEntity = {};
    let currentEntityName = null;
    let inOptionsBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check if the line is a major section header or starts a new entity block
        const isMajorHeader = line.startsWith("Roles") ||
                               line.startsWith("Crewmate Roles") ||
                               line.startsWith("Neutral Roles") ||
                               line.startsWith("Impostor Roles") ||
                               line.startsWith("Modifiers") ||
                               line.startsWith("Crewmate Postmortem Modifiers") ||
                               line.startsWith("Global Modifiers") ||
                               line.startsWith("Crewmate Alliance modifier") || // Added new modifier section
                               line.startsWith("Impostor Postmortem Modifiers");

        // Attempt to find a role/modifier name.
        // It must be at the start of a line and not a general header.
        let potentialEntityName = null;
        const entityHeaderMatch = line.match(/^([A-Za-z\s-]+?)(?:\s*|\s*Team:|\s*Applied to:.*)?$/i);
        if (entityHeaderMatch) {
            let extractedName = entityHeaderMatch[1].trim();
            if (extractedName.startsWith("The ")) { // Handle "The Glitch"
                extractedName = extractedName.substring(4);
            }
            // Check if this extracted name is a known entity name using the pre-calculated set
            if (allValidEntityNamesSet.has(extractedName)) {
                potentialEntityName = extractedName;
            }
        }

        // If we found a new potential entity name and it's not just a general section header
        // and it's not the "Colors" header inside Medic description.
        // Also, add a length check to avoid misinterpreting long descriptions as entity names.
        const isMedicColorsHeader = line.startsWith("Colors") && currentEntityName === "Medic";

        if (potentialEntityName && !isMajorHeader && !isMedicColorsHeader && line.length < 50 &&
            // Ensure it's not a description line that happens to match a name
            !(i > 0 && lines[i-1].includes("Description ,Type ,Default"))) {
            currentEntityName = potentialEntityName;
            inOptionsBlock = false; // Reset, as a new entity means options for previous one are done
            if (!optionsByEntity[currentEntityName]) {
                optionsByEntity[currentEntityName] = [];
            }
            continue; // Move to next line after identifying a new entity
        }

        // Detect start of options section
        if ((line === "Game Options" || line === "Options") && currentEntityName) {
            // Check for the header line right after "Game Options"
            if (i + 1 < lines.length && lines[i+1].startsWith("Name ,Description ,Type ,Default")) {
                inOptionsBlock = true;
                i++; // Skip the header line itself
                continue; // Move to next line
            }
        }

        // If we are in an options block for a known entity
        if (inOptionsBlock && currentEntityName) {
            const optionLine = lines[i];
            // Check if this line signals the end of the current options block, e.g., a blank line, new role, or new section
            if (optionLine.trim() === "" || isMajorHeader || potentialEntityName) {
                inOptionsBlock = false; // End the current options block
                currentEntityName = null; // Clear current entity context to prevent assigning options to the wrong role
                if (potentialEntityName) {
                    i--; // If it's a new entity, re-process this line in the next iteration
                }
                continue; // Move to next line
            }

            // Parse the option line
            const parts = optionLine.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (parts.length >= 4) {
                const optionName = parts[0].trim();
                const optionDescription = parts[1].trim().replace(/^"|"$/g, '');
                const optionType = parts[2].trim();
                const optionDefault = parts[3].trim();
                const optionRange = parts.length > 4 ? parts[4].trim() : 'N/A';

                if (optionsByEntity[currentEntityName]) {
                    optionsByEntity[currentEntityName].push({
                        name: optionName,
                        description: optionDescription,
                        type: optionType,
                        default: optionDefault,
                        range: optionRange
                    });
                }
            }
        }
    }
    return optionsByEntity;
}

// Call the parsing and assignment function after allEntitiesData is defined
const parsedOptions = parseRolesOptions(rolesDocumentFullText);
allEntitiesData.forEach(entity => {
    const entityOptions = parsedOptions[entity.name];
    if (entityOptions) {
        entity.options = entityOptions;
    } else {
        entity.options = []; // Ensure it's an empty array if no options found
    }
});


    const roleWikiCardGrid = document.getElementById('card-grid');
    const searchInput = document.getElementById('search-input');
    const combinedFilterSelect = document.getElementById('combined-filter-select');

    /**
     * Returns the path to the role icon image based on the role name.
     * Assumes format: Role Icons/[RoleName].png
     * @param {string} roleName - The name of the role (e.g., "Prosecutor", "Glitch").
     * @returns {string} The image URL.
     */
    function getRoleImageUrl(roleName) {
        if (!roleName) {
            return 'placeholder.png'; // Fallback for empty role name
        }
        // Construct the path for specific role icons
        const path = `Role Icons/TownOfUs.Resources.RoleIcons.${roleName}.png`;
        return path; 
    }


    /**
     * Returns the path to the modifier icon image based on the modifier name.
     * Assumes format: TownOfUs.Resources.ModifierIcons.[ModifierName].png
     * @param {string} modifierName - The name of the modifier (e.g., "Bait", "ButtonBarry").
     * @returns {string} The image URL.
     */
    function getModifierImageUrl(modifierName) {
        if (!modifierName) {
            return 'placeholder.png';
        }
        const path = `Role Icons/TownOfUs.Resources.ModifierIcons.${modifierName}.png`;
        return path;
    }


    /**
     * Returns the path to the ability icon image based on the skill icon name.
     * This function now assumes all ability icons follow the TownOfUs.Resources format,
     * checking specific button folders first, then a generic AbilityIcons folder.
     * @param {string} skillIconName - The filename of the skill icon (e.g., "BarricadeButton.png", "Passive.png").
     * @returns {string} The full image URL.
     */
    function getAbilityImageUrl(skillIconName) {
        if (!skillIconName) {
            return 'placeholder.png';
        }
        // All ability icons are now assumed to be directly in the "Abilities/" folder.
        const path = `Abilities/${skillIconName}`;
        return path;
    }


    function createCard(entity) {
        const card = document.createElement('div');
        card.className = `role-card`;

        // Prioritize specific role/modifier color
        const uniqueColor = roleColors[entity.name] || modifierColors[entity.name] || '#7e22ce'; // Default to a neutral purple

        const glowColor = uniqueColor; // Use the uniqueColor for consistent glow

        card.style.boxShadow = `0 0 15px ${glowColor}`;
        card.style.setProperty('--card-scrollbar-thumb-color', uniqueColor);
        card.style.setProperty('--card-scrollbar-track-color', 'rgba(31, 31, 31, 0.5)');

        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = `0 0 20px ${uniqueColor + '90'}`;
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = `0 0 15px ${glowColor}`;
        });

        card.addEventListener('click', () => openModal(entity));

        const teamKey = entity.team.split(' ')[0];
        const teamStyle = teamColors[teamKey] || teamColors[entity.team] || { dotColor: 'cyan', boxBg: 'rgba(0, 255, 255, 0.2)', boxShadow: '0 0 8px #00ffff' };

        // Determine the correct image URL for the main icon based on category
        const mainIconPath = entity.category === 'Role' ? getRoleImageUrl(entity.icon) : getModifierImageUrl(entity.icon);
        // Determine the correct image URL for the ability icon
        const abilityIconPath = getAbilityImageUrl(entity.skillIcon);

        // Colorize the description text
        const coloredDescription = colorizeRoleNamesInText(entity.desc);

        card.innerHTML = `
            <div class="role-card-header">
              <img src="${mainIconPath}" alt="${entity.name} Icon" class="${entity.category === 'Role' ? 'role-icon' : 'modifier-icon'} mr-4"
                   onerror="this.onerror=null;this.src='placeholder.png';"
                   style="filter: drop-shadow(0 0 6px ${uniqueColor});">
              <div class="text-container">
                <h2 style="color: ${uniqueColor};">${entity.name.toUpperCase()}</h2>
                <span class="team-display-box" style="
                    background-color: ${teamStyle.boxBg};
                    box-shadow: ${teamStyle.boxShadow};
                    color: ${teamStyle.dotColor};
                    border: 1px solid ${teamStyle.dotColor};
                ">
                    TEAM: ${entity.team.toUpperCase()}
                </span>
              </div>
            </div>
            <div class="description-abilities-settings">
                <p class="description-text">
                  ${coloredDescription}
                </p>
                <div class="abilities-section">
                  <h3 class="text-cyan-400">Abilities</h3>
                  <div class="flex items-center">
                    <img src="${abilityIconPath}" alt="${entity.ability} Icon" class="ability-icon"
                         onerror="this.onerror=null;this.src='placeholder.png';"
                         style="filter: drop-shadow(0 0 6px ${uniqueColor});">
                    <span>${entity.ability}</span>
                  </div>
                </div>
            </div>
        `;

        const descriptionTextElement = card.querySelector('.description-text');
        if (descriptionTextElement) {
            descriptionTextElement.style.borderLeftColor = uniqueColor;
        }

        return card;
    }


    const playerRolesList = document.getElementById('playerRolesList');
    const addPlayerBtn = document.getElementById('addPlayerBtn');
    const saveRolesBtn = document.getElementById('saveRolesBtn');
    const clearRolesBtn = document.getElementById('clearRolesBtn');


    /**
     * Creates and returns a new player entry DOM element.
     * @param {string} playerName - Initial player name.
     * @param {string} role - Initial role.
     * @returns {HTMLElement} The created player entry div.
     */
    function createPlayerEntry(playerName = '', role = '') {
        const playerEntryDiv = document.createElement('div');
        playerEntryDiv.className = 'player-entry';

        // This 'uniqueColorInitial' is used for the *initial* HTML structure.
        // It's a fallback and will be immediately overridden by the update function.
        const uniqueColorInitial = roleColors[role] || modifierColors[role] || 'white'; // Default to white if initial role is unknown or empty

        // Use the new getRoleImageUrl for the initial icon
        // This will return the path based on formatted name, or placeholder if role is empty
        const initialImageUrl = (roleColors[role] || modifierColors[role]) ? getRoleImageUrl(role) : 'placeholder.png';


        playerEntryDiv.innerHTML = `
            <input type="text" placeholder="Player Name" value="${playerName}" class="player-name-input">
            <input type="text" placeholder="Role (e.g., Impostor)" value="${role}" class="role-input" style="color: ${uniqueColorInitial};">
                <img class="role-icon-small" src="${initialImageUrl}" alt="${role || 'Unknown Role'} Icon" onerror="this.onerror=null;this.src='placeholder.png';">
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
        /**
         * Updates the role icon, text color, and overall entry styles based on the role input value.
         */
        /**
     * Updates the role icon, text color, and overall entry styles based on the role input value.
     */
   const updatePlayerRoleIconAndStyles = async () => {
        const rawRoleName = roleInput.value.trim();
        let entityForDisplay = null;
        let displayRoleName = rawRoleName;

        console.log("--- Debugging updatePlayerRoleIconAndStyles ---");
        console.log("rawRoleName (user input):", rawRoleName);

        // Try to find an exact match by name
        entityForDisplay = allEntitiesData.find(entity =>
            entity.name.toLowerCase() === rawRoleName.toLowerCase()
        );

        // If no exact match by name, try matching by icon filename (e.g., if user types "Guardian Angel", icon "GuardianAngel")
        if (!entityForDisplay && rawRoleName) {
            entityForDisplay = allEntitiesData.find(entity =>
                entity.icon && entity.icon.toLowerCase() === rawRoleName.toLowerCase().replace(/\s/g, '')
            );
            if (entityForDisplay) {
                displayRoleName = entityForDisplay.name; // Use the official name from data for consistent color lookup
            }
        }

        console.log("entityForDisplay (found object):", entityForDisplay);
        console.log("displayRoleName (for color lookup):", displayRoleName);

        let newUniqueColor = '#7e22ce'; // Default to a neutral purple for unrecognized roles
        let newIconFilename = 'placeholder.png'; // Default icon path

        if (entityForDisplay) {
            // Priority 1: Check specific roleColors
             // Priority 1: Check specific roleColors
            if (roleColors[entityForDisplay.name]) { // <<-- REPLACE 'displayRoleName' with 'entityForDisplay.name'
                newUniqueColor = roleColors[entityForDisplay.name];
                console.log(`Found color in roleColors for '${entityForDisplay.name}':`, newUniqueColor);
            }
            // Priority 2: Check specific modifierColors
            else if (modifierColors[entityForDisplay.name]) { // <<-- REPLACE 'displayRoleName' with 'entityForDisplay.name'
                newUniqueColor = modifierColors[entityForDisplay.name];
                console.log(`Found color in modifierColors for '${entityForDisplay.name}':`, newUniqueColor);
            }
            // Priority 3: Fallback to general team color if no specific role/modifier color
            else {
                const teamColorInfo = teamColors[entityForDisplay.team];
                if (teamColorInfo) {
                    newUniqueColor = teamColorInfo.dotColor;
                    console.log(`Falling back to team color for '${displayRoleName}' (${entityForDisplay.team}):`, newUniqueColor);
                }
            }

            // Determine icon path based on the found entity's icon property and category
            if (entityForDisplay.category === 'Role') {
                newIconFilename = getRoleImageUrl(entityForDisplay.icon);
            } else if (entityForDisplay.category === 'Modifier') {
                newIconFilename = getModifierImageUrl(entityForDisplay.icon);
            }
        }

        console.log("Final newUniqueColor:", newUniqueColor);

        // ... (rest of your updatePlayerRoleIconAndStyles function remains unchanged) ...
        // Apply the updated properties to the elements
        roleIconImg.src = newIconFilename;
        // ... (rest of your updatePlayerRoleIconAndStyles function) ...
    
        roleIconImg.alt = `${displayRoleName || 'Unknown Role'} Icon`;
        
        // Apply glow directly to the icon image
        // Increased blur and spread for better visibility of glow
        roleIconImg.style.dropShadow = `0 0 10px ${newUniqueColor}, 0 0 25px ${newUniqueColor}66`;
        roleIconImg.style.transition = 'box-shadow 0.3s ease-in-out'; // Smooth transition for glow
        
        // Apply color to the role input text and bottom border
        roleInput.style.color = newUniqueColor;
        roleInput.style.borderBottomColor = newUniqueColor;

        // Apply color to the player entry div's background and border
        playerEntryDiv.style.borderColor = newUniqueColor;
        // Increased background opacity for better visibility
        playerEntryDiv.style.backgroundColor = `${newUniqueColor}10`; // Increased opacity to 27%
        // Increased shadow spread for better visibility
        playerEntryDiv.style.filter = `drop-shadow(0 0 6px ${newUniqueColor})`; // More pronounced shadow for the whole card

        // Update hover effects for the player entry div to make them distinct
        playerEntryDiv.onmouseenter = () => {
            playerEntryDiv.style.boxShadow = `0 0 30px ${newUniqueColor}AA, 0 0 40px ${newUniqueColor}88`; // Brighter, larger shadow on hover
            playerEntryDiv.style.transform = 'translateY(-3px)'; // Subtle lift
            playerEntryDiv.style.transition = 'box-shadow 0.2s ease-out, transform 0.2s ease-out';
        };
        playerEntryDiv.onmouseleave = () => {
            playerEntryDiv.style.boxShadow = `0 0 20px ${newUniqueColor}80`; // Back to normal shadow
            playerEntryDiv.style.transform = 'translateY(0)';
        };

        // If no entity is found (empty input or unrecognized role), clear styles
        if (!entityForDisplay) {
            roleIconImg.style.boxShadow = ''; // Remove glow
            playerEntryDiv.style.backgroundColor = ''; // Clear background
            playerEntryDiv.style.borderColor = ''; // Clear border
            playerEntryDiv.style.boxShadow = ''; // Clear card shadow
            playerEntryDiv.onmouseenter = null; // Remove hover effects
            playerEntryDiv.onmouseleave = null;
            roleInput.style.color = ''; // Reset input text color
            roleInput.style.borderBottomColor = ''; // Reset input border color
        }
    };

        // Attach event listeners and call immediately to set initial styles
        roleInput.addEventListener('input', () => {
            updatePlayerRoleIconAndStyles();
            savePlayerRoles();
        });

        playerNameInput.addEventListener('input', savePlayerRoles);

        removeBtn.addEventListener('click', async () => {
            const confirmed = await showMessageBox(`Are you sure you want to remove ${playerNameInput.value || 'this player'}?`, true);
            if (confirmed) {
                playerEntryDiv.remove();
                savePlayerRoles();
                await showMessageBox('Player removed.');
            } else {
                await showMessageBox('Removal cancelled.');
            }
        });

        // Call the update function immediately after creation to set initial correct styles
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

    function closeModal() {
        detailModalOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event Listeners for modal close
    const modalCloseButton = document.getElementById('modal-close-button');
    const detailModalOverlay = document.getElementById('detail-modal-overlay');
    const modalName = document.getElementById('modal-name');
    const modalTeam = document.getElementById('modal-team');
    const modalDescription = document.getElementById('modal-description');
    const modalIcon = document.getElementById('modal-icon');
    const modalAbilityIcon = document.getElementById('modal-ability-icon');
    const modalAbilityName = document.getElementById('modal-ability-name');
    const modalContent = document.getElementById('detail-modal-content');
    const modalOptionsSection = document.getElementById('modal-settings-section'); // Renamed from modal-settings-section
    const modalOptionsList = document.getElementById('modal-settings-list'); // Renamed from modal-settings-list

    /**
     * Opens the detailed modal for a given entity (role or modifier).
     * Populates the modal with the entity's data, including main icon,
     * ability icon, description, and options.
     * @param {object} entity - The entity object from allEntitiesData.
     */
    function openModal(entity) {
        modalName.textContent = entity.name;
        
        // Set colors based on entity.name for modal
        const uniqueColor = roleColors[entity.name] || modifierColors[entity.name] || '#7e22ce'; // Default to a neutral purple
        modalName.style.color = uniqueColor; // Apply color to name
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
        // Colorize the description text for the modal
        modalDescription.innerHTML = colorizeRoleNamesInText(entity.desc);
        modalDescription.style.borderLeftColor = uniqueColor;


        // Set icon for main entity
        const mainIconPath = entity.category === 'Role' ? getRoleImageUrl(entity.icon) : getModifierImageUrl(entity.icon);
        modalIcon.src = mainIconPath;
        modalIcon.alt = `${entity.name} Icon`;
        // Apply glow to the modal icon
        modalIcon.style.filter = `drop-shadow(0 0 10px ${uniqueColor})`;


        // Set ability icon and name
        const abilityIconPath = getAbilityImageUrl(entity.skillIcon);
        modalAbilityIcon.src = abilityIconPath;
        modalAbilityIcon.alt = `${entity.ability} Icon`;
        // Apply glow to the modal ability icon
        modalAbilityIcon.style.filter = `drop-shadow(0 0 6px ${uniqueColor})`;
        modalAbilityName.textContent = entity.ability;

        // Populate options
        modalOptionsList.innerHTML = ''; // Clear previous options
        if (entity.options && entity.options.length > 0) {
            modalOptionsSection.style.display = 'block'; // Show the options section
            entity.options.sort((a, b) => a.name.localeCompare(b.name)).forEach(option => {
                const li = document.createElement('li');
                // Format the option display: Name: Default (Type) [Range]
                li.textContent = `${option.name}: ${option.default} (${option.type})${option.range && option.range !== 'N/A' ? ` [${option.range}]` : ''}`;
                modalOptionsList.appendChild(li);
            });
        } else {
            modalOptionsSection.style.display = 'none'; // Hide if no options
        }

        // Apply dynamic styles to the modal content box itself
        modalContent.style.boxShadow = `0 0 20px ${uniqueColor + '60'}`;
        modalContent.style.border = `2px solid ${uniqueColor}`;


        // Show the modal
        detailModalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }

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
                (entity.options && entity.options.some(opt => 
                    opt.name.toLowerCase().includes(searchTerm) || 
                    opt.description.toLowerCase().includes(searchTerm)
                ));


            let matchesFilter = true;
            if (selectedFilter !== "All") {
                if (["Crewmate", "Neutral", "Impostor", "Alliance"].includes(selectedFilter)) { // Team filters including Alliance
                    matchesFilter = entity.team.includes(selectedFilter);
                } else if (["Crewmate Modifier", "Global Modifier", "Impostor Modifier", "Crewmate Alliance modifier"].includes(selectedFilter)) { // Modifier team filters including new Alliance modifier
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
