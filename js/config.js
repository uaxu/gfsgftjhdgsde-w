// ============================================
// WHBF — Grouped Profile Config
// Edit here only. Index auto-renders in GROUP_ORDER order.
// To add someone: drop an entry under the right group.
// To reorder groups: change GROUP_ORDER. To reorder people: move the block.
// ============================================

const GROUP_ORDER = ["Consortia", "Primera", "Sancta", "Fidelis"];

const GROUPED_PROFILES = {

    // ── Consortia ──
    Consortia: {
        under: {
            name: 'under',
            image: '/assets/under.gif',
            music: '/assets/tripsyelakeramor.mp3',
            titleAnimation: ['u','un','und','unde','under','unde','und','un'],
            buttons: [
                { icon: 'discord', label: '@scamism' },
                { icon: 'telegram', label: '@bifana' },
                { icon: 'gmail', label: 'underwear@onionmail[.]org' },
                { icon: 'gmail', label: 'underloves@nigge[.]rs' },
                { icon: 'gmail', label: 'under@безспама[.]com' }
            ]
        },
        pulse: {
            name: 'pulse',
            image: '/assets/pulse.png',
            music: '/assets/pulse.mp3',
            titleAnimation: ['p','pu','pul','puls','pulse','puls','pul','pu'],
            buttons: [
                { icon: 'discord', label: '@gov.pt' },
                { icon: 'litecoin', label: 'LQdrXtBAKmgMMkCw2QUcPawtPpyHk6CA1h' },
                { icon: 'roblox', label: 'https://www.roblox.com/users/892459/profile' }
            ]
        }
    },

    // ── Primera ──
    Primera: {
        tsar: {
            name: 'tsar',
            image: '/assets/tsar.png',
            music: '/assets/tsar.mp3',
            titleAnimation: ['t','ts','tsa','tsar','tsa','ts'],
            buttons: [
                { icon: 'roblox', label: 'https://roblox.com/users/7189303677/profile' },
                { icon: 'instagram', label: 'https://instagram.com/upptsar/' }
            ]
        },
        cia: {
            name: 'cia',
            image: '/assets/cia.jpg',
            music: '/assets/cia.mp3',
            titleAnimation: ['c','ci','cia','ci'],
            buttons: [{ icon: 'discord', label: '@opsectracker' }]
        },
        hxart: {
            name: 'hxart',
            image: '/assets/hxart.png',
            music: '/assets/hxart.mp3',
            titleAnimation: ['h','hx','hxa','hxar','hxart','hxar','hxa','hx'],
            buttons: []
        },
        meo: {
            name: 'MEO',
            image: '/assets/meo.png',
            music: '/assets/jamorant.mp3',
            titleAnimation: ['m','me','meo','me'],
            buttons: [
                { icon: 'roblox', label: 'https://roblox.com/users/1555469161/profile/' },
                { icon: 'discord', label: '@meo.pt' }
            ]
        }
    },

    // ── Sancta ──
    Sancta: {
        zarro: {
            name: 'zarro',
            image: '/assets/zarro.png',
            music: '/assets/zarro.mp3',
            titleAnimation: ['z','za','zar','zarr','zarro','zarr','zar','za'],
            buttons: []
        },
        rootz: {
            name: 'rootz',
            image: '/assets/rootz.gif',
            music: '/assets/selling-dreams.mp3',
            titleAnimation: ['r','ro','roo','root','rootz','root','roo','ro'],
            buttons: [
                { icon: 'roblox', label: 'https://roblox.com/users/66834927/profile' },
                { icon: 'onlyfans', label: 'https://whbf.cc/discord' }
            ]
        },
        kernel: {
            name: 'kernel',
            image: '/assets/kernel.png',
            music: '/assets/kernel.mp3',
            titleAnimation: ['k','ke','ker','kern','kerne','kernel','kerne','kern','ker','ke'],
            buttons: [
                { icon: 'telegram', label: 'https://t.me/webpenetrated' },
                { icon: 'github', label: 'https://github.com/kernelxyz' }
            ]
        },
        nyx: {
            name: 'nyx',
            image: '/assets/nyx.png',
            music: '/assets/nyx.mp3',
            titleAnimation: ['n','ny','nyx','ny'],
            buttons: [{ icon: 'discord', label: '@nychiix' }]
        },
        sig: {
            name: 'sig',
            image: '/assets/sig.png',
            titleAnimation: ['s','si','sig','si'],
            buttons: []
        },
        cae: {
            name: 'cae',
            image: '/assets/catcae.webp',
            music: '/assets/loudandclear.mp3',
            titleAnimation: ['c','ca','cae','ca'],
            buttons: [
                { icon: '/assets/lightercae.webp', label: 'https://roblox.com/users/682719517/profile' },
                { icon: '/assets/skullcae.png', label: 'https://spacehey.com/seraphsghoul' }
            ]
        },
        ivan: {
            name: 'ivan',
            image: '/assets/ivan.png',
            music: '/assets/trustmeproud.mp3',
            titleAnimation: ['i','iv','iva','ivan','iva','iv'],
            buttons: [
                { icon: 'discord', label: '@mjds' },
                { icon: 'solana', label: '92bfwZU97vDp8tu2Aq2UdteeUvbR8WuMkZ12x67wNLku' },
                { icon: 'ethereum', label: '0x8a7943ef5945f7BA84586c456390F6cCE9d8b139' },
                { icon: 'bitcoin', label: 'bc1qhkgzanasmxdu22jp0c48t693sgnsk7xpwf0auc' },
                { icon: 'polygon', label: '0x9495843027c180C68c9F0bf2B42112806f86D94C' }
            ]
        },
        world: {
            name: 'world',
            image: '/assets/world.png',
            titleAnimation: ['w','wo','wor','worl','world','worl','wor','wo'],
            buttons: []
        },
        zenya: {
            name: 'zenya',
            image: '/assets/zenya.png',
            music: '/assets/boundaryreceptor.mp3',
            titleAnimation: ['z','ze','zen','zeny','zenya','zeny','zen','ze'],
            buttons: [
                { icon: 'roblox', label: 'https://roblox.com/users/1642616782/profile' },
                { icon: 'namemc', label: 'https://namemc.com/profile/unmortful.1' },
                { icon: 'steam', label: 'https://steamcommunity.com/id/unmortful' },
                { icon: 'discord', label: 'https://discord.com/users/308653982622941184' },
                { icon: 'pinterest', label: 'https://pinterest.com/unmortful/' }
            ]
        },
        persistive: {
            name: 'persistive',
            image: '/assets/9npm.jpg',
            music: '/assets/9npm.mp3',
            titleAnimation: ['p','pe','per','pers','persi','persis','persist','persisti','persistiv','persisitive','persistiv','persisti','persist','persis','persi','pers','per','pe'],
            buttons: [
                { icon: 'discord', label: '@persistive' },
                { icon: 'instagram', label: 'https://instagram.com/b5ive.otf/' },
                { icon: 'snapchat', label: 'https://www.snapchat.com/@brunex.cc' }
            ]
        },
        lxrpz: {
            name: 'lxrpz',
            image: '/assets/lxrpz.png',
            music: '/assets/lxrpz.mp3',
            titleAnimation: ['l','lx','lxr','lxrp','lxrpz','lxrp','lxr','lx'],
            buttons: [
                { icon: 'discord', label: '2lxprz' },
                { icon: 'telegram', label: 'https://t.me/fourciuy' }
            ]
        }
    },

    // ── Fidelis ──
    Fidelis: {
        zero: {
            name: 'zero',
            image: '/assets/zero.png',
            music: '/assets/zero.mp3',
            titleAnimation: ['z','ze','zer','zero','zer','ze'],
            buttons: [
                { icon: 'roblox', label: 'https://roblox.com/users/8524145/profile' },
                { icon: 'github', label: 'https://github.com/luciferinprod' }
            ]
        },
        lemes: {
            name: 'lemes',
            image: '/assets/lemes.png',
            music: '/assets/lemes.mp3',
            titleAnimation: ['l','le','lem','leme','lemes','leme','lem','le'],
            buttons: [
                { icon: 'discord', label: '@lemes.bfe' },
                { icon: 'roblox', label: 'https://roblox.com/users/3229992738/profile' },
                { icon: 'spotify', label: 'https://open.spotify.com/user/31gfslrtsaajnzxkycm354g5zjnm' }
            ]
        },
        folques: {
            name: 'folques',
            image: '/assets/folques.jpg',
            music: '/assets/folques.mp3',
            titleAnimation: ['f','fo','fol','folq','folqu','folque','folques','folque','folqu','folq','fol','fo'],
            buttons: [
                { icon: 'roblox', label: 'https://roblox.com/users/4743683224/profile' },
                { icon: 'spotify', label: 'https://open.spotify.com/user/solh3fbz555oq6bsaq5aq07ta' }
            ]
        }
    }
};

// ── Build flat PROFILES for router.js / profileConfig.js ──
// Keeps insertion order = GROUP_ORDER + object order inside each group
const PROFILES = {};
GROUP_ORDER.forEach(function (g) {
    var members = GROUPED_PROFILES[g] || {};
    Object.keys(members).forEach(function (id) {
        var p = members[id];
        // ensure group field matches its bucket
        p.group = g;
        PROFILES[id] = p;
    });
});

// ── Optional: information links (not profiles) — rendered after groups ──
const INFORMATION_LINKS = [
    { href: "https://discord.gg/FqSRRbEMGc", label: "WHBF Discord", sub: "Discord Server", img: "/assets/whbf.png" },
    { href: "https://t.me/whbfcc", label: "WHBF Telegram", sub: "Telegram Channel", img: "/assets/whbf.png" },
    { href: "https://www.roblox.com/communities/703659855/WHBF#!/about", label: "WHBF Roblox", sub: "Roblox Group", img: "/assets/whbf.png" }
];
