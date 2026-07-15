// /js/config.js

const PROFILES = {
    under: {
        name: 'under',
        group: 'Consortia',
        image: '/assets/under.png',
        music: '/assets/tripsyelakeramor.mp3',
        titleAnimation: ['u','un','und','unde','under','unde','und','un'],
        buttons: [
            { icon: 'discord', label: '@scamism' },
            { icon: 'telegram', label: '@fraudista' },
            { icon: 'gmail', label: 'underwear@onionmail[.]org' },
            { icon: 'gmail', label: 'underloves@nigge[.]rs' },
            { icon: 'gmail', label: 'under@безспама[.]com' }
        ]
    },
    pulse: {
        name: 'pulse',
        group: 'Consortia',
        image: '/assets/pulse.png',
        music: '/assets/pulse_track.mp3',
        titleAnimation: ['p','pu','pul','puls','pulse','puls','pul','pu'],
        buttons: [
            { icon: 'discord', label: '@pulse_discord' },
            { icon: 'telegram', label: '@pulse_tg' },
            { icon: 'gmail', label: 'pulse@onionmail[.]org' }
        ]
    },
    tsar: {
        name: 'tsar',
        group: 'Primera',
        image: '/assets/tsar.png',
        music: '/assets/tsar_track.mp3',
        titleAnimation: ['t','ts','tsa','tsar','tsa','ts','t'],
        buttons: [
            { icon: 'discord', label: '@tsar_discord' },
            { icon: 'telegram', label: '@tsar_tg' },
            { icon: 'gmail', label: 'tsar@onionmail[.]org' }
        ]
    }
    // Add more profiles as needed
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROFILES;
}
