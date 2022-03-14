var CACHE_NAME = "pokeidler"
var CACHE = {}
CACHE.fetch = async (request) => {
    if (!CACHE.cache) {
        return fetch(request)
    }
    //return await CACHE.cache.add(request)
    return fetch(request)
}
async function initCache() {
    return (async () => {
        if ('caches' in window) {
            console.log("Opening cache…")
            const cache = await caches.open(CACHE_NAME)
            CACHE.cache = cache
            console.log("Opened cache successfully.")
        }
        console.log("WARNING: caching not supported!!")
    })()
}

document.addEventListener('contextmenu', event => event.preventDefault());

const IMG_LOGO = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
const IMG_RENAME = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/key-to-room-1.png"
const IMG_RELEASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/destiny-knot.png"

const PAGES = [
    { name: "team", title: "Party", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rare-candy.png" },
    { name: "gym", title: "Gym", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/lucky-punch.png" },
    { name: "map", title: "Map", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/old-sea-map.png" },
    { name: "allsprites", title: "All Sprites", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ghost-memory.png" },
    { name: "settings", title: "Settings", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/scanner.png" },
]

const ALL_SPRITES = [
    "ability-capsule.png", "ability-urge.png", "abomasite.png", "absolite.png", "absorb-bulb.png", "acro-bike.png", "adamant-orb.png", "adrenaline-orb.png", "adventure-rules.png", "aerodactylite.png", "aggronite.png", "aguav-berry.png", "air-balloon.png", "air-mail.png", "alakazite.png", "aloraichium-z--bag.png", "aloraichium-z--held.png", "altarianite.png", "amaze-mulch.png", "ampharosite.png", "amulet-coin.png", "antidote.png", "apicot-berry.png", "apricorn-box.png", "aqua-suit.png", "armor-fossil.png", "aspear-berry.png", "assault-vest.png", "audinite.png", "auroraticket.png", "awakening.png", "azure-flute.png", "babiri-berry.png", "balm-mushroom.png", "banettite.png", "basement-key--goldenrod.png", "basement-key--new-mauville.png", "basement-key.png", "bead-mail.png", "beast-ball.png", "beedrillite.png", "belue-berry.png", "berry-juice.png", "berry-pots.png", "berry-pouch.png", "bicycle-turquoise.png", "bicycle-yellow.png", "bicycle.png", "big-malasada.png", "big-mushroom.png", "big-nugget.png", "big-pearl.png", "big-root.png", "bike--green.png", "bike--yellow.png", "bike-voucher.png", "binding-band.png", "black-apricorn.png", "black-belt.png", "black-flute.png", "black-glasses.png", "black-sludge.png", "blastoisinite.png", "blazikenite.png", "bloom-mail.png", "blue-apricorn.png", "blue-card.png", "blue-flute.png", "blue-orb.png", "blue-petal.png", "blue-scarf.png", "blue-shard.png", "bluk-berry.png", "boost-mulch.png", "bottle-cap.png", "brick-mail.png", "bridge-mail-d.png", "bridge-mail-m.png", "bridge-mail-s.png", "bridge-mail-t.png", "bridge-mail-v.png", "bright-powder.png", "bubble-mail.png", "bug-gem.png", "bug-memory.png", "buginium-z--bag.png", "buginium-z--held.png", "burn-drive.png", "burn-heal.png", "calcium.png", "cameruptite.png", "carbos.png", "card-key.png", "casteliacone.png", "cell-battery.png", "charcoal.png", "charizardite-x.png", "charizardite-y.png", "charti-berry.png", "cheri-berry.png", "cherish-ball.png", "chesto-berry.png", "chilan-berry.png", "chill-drive.png", "choice-band.png", "choice-scarf.png", "choice-specs.png", "chople-berry.png", "claw-fossil.png", "cleanse-tag.png", "clear-bell.png", "clever-wing.png", "coba-berry.png", "coin-case.png", "colbur-berry.png", "colress-machine.png", "comet-shard.png", "common-stone.png", "contest-costume--dress.png", "contest-costume--jacket.png", "contest-pass.png", "cornn-berry.png", "coupon-1.png", "coupon-2.png", "coupon-3.png", "cover-fossil.png", "custap-berry.png", "damp-mulch.png", "damp-rock.png", "dark-gem.png", "dark-memory.png", "dark-stone.png", "darkinium-z--bag.png", "darkinium-z--held.png", "data-card-01.png", "data-card-02.png", "data-card-03.png", "data-card-04.png", "data-card-05.png", "data-card-06.png", "data-card-07.png", "data-card-08.png", "data-card-09.png", "data-card-10.png", "data-card-11.png", "data-card-12.png", "data-card-13.png", "data-card-14.png", "data-card-15.png", "data-card-16.png", "data-card-17.png", "data-card-18.png", "data-card-19.png", "data-card-20.png", "data-card-21.png", "data-card-22.png", "data-card-23.png", "data-card-24.png", "data-card-25.png", "data-card-26.png", "data-card-27.png", "data-card.png", "dawn-stone.png", "decidium-z--bag.png", "decidium-z--held.png", "deep-sea-scale.png", "deep-sea-tooth.png", "destiny-knot.png", "devon-goods.png", "devon-parts.png", "devon-scope.png", "devon-scuba-gear.png", "diancite.png", "dire-hit-2.png", "dire-hit-3.png", "dire-hit.png", "discount-coupon.png", "dive-ball.png", "dna-splicers--merge.png", "dna-splicers--split.png", "dna-splicers.png", "dome-fossil.png", "douse-drive.png", "dowsing-machine.png", "draco-plate.png", "dragon-fang.png", "dragon-gem.png", "dragon-memory.png", "dragon-scale.png", "dragon-skull.png", "dragonium-z--bag.png", "dragonium-z--held.png", "dread-plate.png", "dream-ball.png", "dream-mail.png", "dropped-item--red.png", "dropped-item--yellow.png", "dropped-item-red.png", "dropped-item-yellow.png", "dropped-item.png", "dubious-disc.png", "durin-berry.png", "dusk-ball.png", "dusk-stone.png", "earth-plate.png", "eevium-z--bag.png", "eevium-z--held.png", "eject-button.png", "electirizer.png", "electric-gem.png", "electric-memory.png", "electric-seed.png", "electrium-z--bag.png", "electrium-z--held.png", "elevator-key.png", "elixir.png", "energy-powder.png", "energy-root.png", "enigma-berry.png", "enigma-stone.png", "enigmatic-card.png", "eon-flute.png", "eon-ticket.png", "escape-rope.png", "ether.png", "everstone.png", "eviolite.png", "exp-share.png", "expert-belt.png", "explorer-kit.png", "fab-mail.png", "fairium-z--bag.png", "fairium-z--held.png", "fairy-gem.png", "fairy-memory.png", "fame-checker.png", "fashion-case.png", "fast-ball.png", "favored-mail.png", "festival-ticket.png", "fighting-gem.png", "fighting-memory.png", "fightinium-z--bag.png", "fightinium-z--held.png", "figy-berry.png", "fire-gem.png", "fire-memory.png", "fire-stone.png", "firium-z--bag.png", "firium-z--held.png", "fishing-rod.png", "fist-plate.png", "flame-mail.png", "flame-orb.png", "flame-plate.png", "float-stone.png", "fluffy-tail.png", "flying-gem.png", "flying-memory.png", "flyinium-z--bag.png", "flyinium-z--held.png", "focus-band.png", "focus-sash.png", "forage-bag.png", "fresh-water.png", "friend-ball.png", "full-heal.png", "full-incense.png", "full-restore.png", "galactic-key.png", "galladite.png", "ganlon-berry.png", "garchompite.png", "gardevoirite.png", "gb-sounds.png", "gengarite.png", "genius-wing.png", "ghost-gem.png", "ghost-memory.png", "ghostium-z--bag.png", "ghostium-z--held.png", "glalitite.png", "glitter-mail.png", "go-goggles.png", "god-stone.png", "gold-bottle-cap.png", "gold-teeth.png", "good-rod.png", "gooey-mulch.png", "gracidea.png", "gram-1.png", "gram-2.png", "gram-3.png", "grass-gem.png", "grass-mail.png", "grass-memory.png", "grassium-z--bag.png", "grassium-z--held.png", "grassy-seed.png", "great-ball.png", "green-apricorn.png", "green-petal.png", "green-scarf.png", "green-shard.png", "greet-mail.png", "grepa-berry.png", "grip-claw.png", "griseous-orb.png", "ground-gem.png", "ground-memory.png", "groundium-z--bag.png", "groundium-z--held.png", "growth-mulch.png", "grubby-hanky.png", "guard-spec.png", "gyaradosite.png", "haban-berry.png", "harbor-mail.png", "hard-stone.png", "heal-ball.png", "heal-powder.png", "health-wing.png", "heart-mail.png", "heart-scale.png", "heat-rock.png", "heavy-ball.png", "helix-fossil.png", "heracronite.png", "hm-fighting.png", "hm-flying.png", "hm-normal.png", "hm-water.png", "hm01.png", "hm02.png", "hm03.png", "hm04.png", "hm05.png", "hm06.png", "hm07.png", "holo-caster--green.png", "holo-caster--red.png", "holo-caster-green.png", "holo-caster-red.png", "holo-caster.png", "hondew-berry.png", "honey.png", "honor-of-kalos.png", "houndoominite.png", "hp-up.png", "hyper-potion.png", "iapapa-berry.png", "ice-gem.png", "ice-heal.png", "ice-memory.png", "ice-stone.png", "icicle-plate.png", "icium-z--bag.png", "icium-z--held.png", "icy-rock.png", "ilimas-normalium-z.png", "incinium-z--bag.png", "incinium-z--held.png", "inquiry-mail.png", "insect-plate.png", "intriguing-stone.png", "iron-ball.png", "iron-plate.png", "iron.png", "item-drop.png", "item-urge.png", "jaboca-berry.png", "jade-orb.png", "jaw-fossil.png", "journal.png", "kangaskhanite.png", "kasib-berry.png", "kebia-berry.png", "kee-berry.png", "kelpsy-berry.png", "key-stone.png", "key-to-room-1.png", "key-to-room-2.png", "key-to-room-4.png", "key-to-room-6.png", "kings-rock.png", "kommonium-z--bag.png", "kommonium-z--held.png", "lagging-tail.png", "lansat-berry.png", "latiasite.png", "latiosite.png", "lava-cookie.png", "lax-incense.png", "leaf-stone.png", "left-poke-ball.png", "leftovers.png", "lemonade.png", "lens-case.png", "leppa-berry.png", "letter.png", "level-ball.png", "liberty-pass.png", "liechi-berry.png", "life-orb.png", "lift-key.png", "light-ball.png", "light-clay.png", "light-stone.png", "like-mail.png", "lock-capsule.png", "looker-ticket.png", "loot-sack.png", "lopunnite.png", "lost-item.png", "love-ball.png", "lucarionite.png", "luck-incense.png", "lucky-egg.png", "lucky-punch.png", "lum-berry.png", "luminous-moss.png", "lumiose-galette.png", "lunalium-z--bag.png", "lunalium-z--held.png", "lunar-wing.png", "lure-ball.png", "lustrous-orb.png", "luxury-ball.png", "lycanium-z--bag.png", "lycanium-z--held.png", "mach-bike.png", "machine-part.png", "macho-brace.png", "magma-emblem.png", "magma-stone.png", "magma-suit.png", "magmarizer.png", "magnet.png", "mago-berry.png", "magost-berry.png", "makeup-bag.png", "manectite.png", "maranga-berry.png", "marshadium-z--bag.png", "marshadium-z--held.png", "master-ball.png", "mawilite.png", "max-elixir.png", "max-ether.png", "max-potion.png", "max-repel.png", "max-revive.png", "meadow-plate.png", "mech-mail.png", "medal-box.png", "medichamite.png", "mega-anchor.png", "mega-anklet.png", "mega-bracelet.png", "mega-charm.png", "mega-cuff.png", "mega-glasses.png", "mega-glove.png", "mega-pendant.png", "mega-ring.png", "mega-stickpin.png", "mega-tiara.png", "member-card.png", "mental-herb.png", "metagrossite.png", "metal-coat.png", "metal-powder.png", "meteorite--2.png", "meteorite--3.png", "meteorite--4.png", "meteorite-shard.png", "meteorite.png", "metronome.png", "mewnium-z--bag.png", "mewnium-z--held.png", "mewtwonite-x.png", "mewtwonite-y.png", "micle-berry.png", "mimikium-z--bag.png", "mimikium-z--held.png", "mind-plate.png", "miracle-seed.png", "misty-seed.png", "moomoo-milk.png", "moon-ball.png", "moon-flute.png", "moon-stone.png", "mosaic-mail.png", "muscle-band.png", "muscle-wing.png", "mystery-egg.png", "mystic-water.png", "mysticticket.png", "n-lunarizer--merge.png", "n-lunarizer--split.png", "n-solarizer--merge.png", "n-solarizer--split.png", "nanab-berry.png", "nest-ball.png", "net-ball.png", "never-melt-ice.png", "nomel-berry.png", "normal-gem.png", "normalium-z--bag.png", "normalium-z--held.png", "nugget.png", "oaks-letter.png", "oaks-parcel.png", "occa-berry.png", "odd-incense.png", "odd-keystone.png", "old-amber.png", "old-charm.png", "old-gateau.png", "old-rod.png", "old-sea-map.png", "oran-berry.png", "orange-mail.png", "orange-petal.png", "oval-charm.png", "oval-stone.png", "pair-of-tickets.png", "pal-pad.png", "pamtre-berry.png", "paralyze-heal.png", "parcel.png", "park-ball.png", "pass-orb.png", "pass.png", "passho-berry.png", "payapa-berry.png", "pearl-string.png", "pearl.png", "pecha-berry.png", "permit.png", "persim-berry.png", "petaya-berry.png", "photo-album.png", "pidgeotite.png", "pikanium-z--bag.png", "pikanium-z--held.png", "pikashunium-z--bag.png", "pikashunium-z--held.png", "pinap-berry.png", "pink-apricorn.png", "pink-nectar.png", "pink-petal.png", "pink-scarf.png", "pinsirite.png", "pixie-plate.png", "plasma-card.png", "plume-fossil.png", "poffin-case.png", "point-card.png", "poison-barb.png", "poison-gem.png", "poison-memory.png", "poisonium-z--bag.png", "poisonium-z--held.png", "poke-ball.png", "poke-doll.png", "poke-flute.png", "poke-radar.png", "poke-toy.png", "pokeblock-case.png", "pokeblock-kit.png", "pomeg-berry.png", "potion.png", "powder-jar.png", "power-anklet.png", "power-band.png", "power-belt.png", "power-bracer.png", "power-herb.png", "power-lens.png", "power-plant-pass.png", "power-weight.png", "pp-max.png", "pp-up.png", "premier-ball.png", "pretty-wing.png", "primarium-z--bag.png", "primarium-z--held.png", "prism-scale.png", "prison-bottle.png", "professors-mask.png", "profs-letter.png", "prop-case.png", "protective-pads.png", "protector.png", "protein.png", "psychic-gem.png", "psychic-memory.png", "psychic-seed.png", "psychium-z--bag.png", "psychium-z--held.png", "pure-incense.png", "purple-nectar.png", "purple-petal.png", "qualot-berry.png", "quick-ball.png", "quick-claw.png", "quick-powder.png", "rabuta-berry.png", "rage-candy-bar.png", "rainbow-flower.png", "rainbow-pass.png", "rainbow-wing.png", "rare-bone.png", "rare-candy.png", "rawst-berry.png", "razor-claw.png", "razor-fang.png", "razz-berry.png", "reaper-cloth.png", "red-apricorn.png", "red-card.png", "red-chain.png", "red-flute.png", "red-nectar.png", "red-orb.png", "red-petal.png", "red-scale.png", "red-scarf.png", "red-shard.png", "relic-band.png", "relic-copper.png", "relic-crown.png", "relic-gold.png", "relic-silver.png", "relic-statue.png", "relic-vase.png", "repeat-ball.png", "repel.png", "reply-mail.png", "reset-urge.png", "resist-wing.png", "retro-mail.png", "reveal-glass.png", "revival-herb.png", "revive.png", "rich-mulch.png", "ride-pager.png", "rindo-berry.png", "ring-target.png", "rm-1-key.png", "rm-2-key.png", "rm-4-key.png", "rm-6-key.png", "rock-gem.png", "rock-incense.png", "rock-memory.png", "rockium-z--bag.png", "rockium-z--held.png", "rocky-helmet.png", "roller-skates.png", "root-fossil.png", "rose-incense.png", "roseli-berry.png", "roto-bargain.png", "roto-boost.png", "roto-catch.png", "roto-encounter.png", "roto-exp-points.png", "roto-friendship.png", "roto-hatch.png", "roto-hp-restore.png", "roto-pp-restore.png", "roto-prize-money.png", "roto-stealth.png", "rowap-berry.png", "rsvp-mail.png", "ruby.png", "rule-book.png", "sablenite.png", "sachet.png", "sacred-ash.png", "safari-ball.png", "safety-goggles.png", "sail-fossil.png", "salac-berry.png", "salamencite.png", "sapphire.png", "scanner.png", "sceptilite.png", "scizorite.png", "scope-lens.png", "sea-incense.png", "seal-bag.png", "seal-case.png", "secret-key.png", "secret-potion.png", "shadow-mail.png", "shalour-sable.png", "sharp-beak.png", "sharpedonite.png", "shed-shell.png", "shell-bell.png", "shiny-charm.png", "shiny-stone.png", "shoal-salt.png", "shoal-shell.png", "shock-drive.png", "shuca-berry.png", "silk-scarf.png", "silph-scope.png", "silver-powder.png", "silver-wing.png", "sitrus-berry.png", "skull-fossil.png", "sky-plate.png", "slowbronite.png", "slowpoke-tail.png", "smoke-ball.png", "smooth-rock.png", "snorlium-z--bag.png", "snorlium-z--held.png", "snow-mail.png", "snowball.png", "soda-pop.png", "soft-sand.png", "solganium-z--bag.png", "solganium-z--held.png", "soot-sack.png", "soothe-bell.png", "soul-dew.png", "space-mail.png", "sparkling-stone.png", "spell-tag.png", "spelon-berry.png", "splash-plate.png", "spooky-plate.png", "sport-ball.png", "sprayduck.png", "sprinklotad.png", "squirt-bottle.png", "ss-ticket--hoenn.png", "ss-ticket.png", "stable-mulch.png", "star-piece.png", "stardust.png", "starf-berry.png", "steel-gem.png", "steel-mail.png", "steel-memory.png", "steelium-z--bag.png", "steelium-z--held.png", "steelixite.png", "stick.png", "sticky-barb.png", "stone-plate.png", "storage-key--galactic-warehouse.png", "storage-key--sea-mauville.png", "storage-key.png", "strange-souvenir.png", "suite-key.png", "sun-flute.png", "sun-stone.png", "super-potion.png", "super-repel.png", "super-rod.png", "surge-badge.png", "surprise-mulch.png", "swampertite.png", "sweet-heart.png", "swift-wing.png", "tamato-berry.png", "tanga-berry.png", "tapunium-z--bag.png", "tapunium-z--held.png", "tea.png", "teachy-tv.png", "terrain-extender.png", "thanks-mail.png", "thick-club.png", "thunder-stone.png", "tidal-bell.png", "timer-ball.png", "tiny-mushroom.png", "tm-bug.png", "tm-case.png", "tm-dark.png", "tm-dragon.png", "tm-electric.png", "tm-fairy.png", "tm-fighting.png", "tm-fire.png", "tm-flying.png", "tm-ghost.png", "tm-grass.png", "tm-ground.png", "tm-ice.png", "tm-normal.png", "tm-poison.png", "tm-psychic.png", "tm-rock.png", "tm-steel.png", "tm-water.png", "tmv-pass.png", "town-map.png", "toxic-orb.png", "toxic-plate.png", "travel-trunk-gold.png", "travel-trunk-silver.png", "travel-trunk.png", "tri-pass.png", "tropic-mail.png", "tunnel-mail.png", "twisted-spoon.png", "tyranitarite.png", "ultra-ball.png", "ultranecrozium-z--bag.png", "ultranecrozium-z--held.png", "unknown.png", "unown-report.png", "up-grade.png", "venusaurite.png", "vs-recorder.png", "vs-seeker.png", "wacan-berry.png", "wailmer-pail.png", "water-gem.png", "water-memory.png", "water-stone.png", "waterium-z--bag.png", "waterium-z--held.png", "watmel-berry.png", "wave-incense.png", "wave-mail.png", "weakness-policy.png", "wepear-berry.png", "whipped-dream.png", "white-apricorn.png", "white-flute.png", "white-herb.png", "wide-lens.png", "wiki-berry.png", "wise-glasses.png", "wood-mail.png", "works-key.png", "x-accuracy-2.png", "x-accuracy-3.png", "x-accuracy-6.png", "x-accuracy.png", "x-attack-2.png", "x-attack-3.png", "x-attack-6.png", "x-attack.png", "x-defense-2.png", "x-defense-3.png", "x-defense-6.png", "x-defense.png", "x-sp-atk-2.png", "x-sp-atk-3.png", "x-sp-atk-6.png", "x-sp-atk.png", "x-sp-def-2.png", "x-sp-def-3.png", "x-sp-def-6.png", "x-sp-def.png", "x-speed-2.png", "x-speed-3.png", "x-speed-6.png", "x-speed.png", "xtranceiver--red.png", "xtranceiver--yellow.png", "xtransceiver-red.png", "xtransceiver-yellow.png", "xtransceiver.png", "yache-berry.png", "yellow-apricorn.png", "yellow-flute.png", "yellow-nectar.png", "yellow-petal.png", "yellow-scarf.png", "yellow-shard.png", "z-power-ring.png", "z-ring.png", "zap-plate.png", "zinc.png", "zoom-lens.png", "zygarde-cube.png"
]

const REGIONS = [
    // kanto
    new Region(1816, 1660, 32, 32, "pallet-town"),
    new Region(1816, 1565, 32, 32, "viridian-city"),
    new Region(1816, 1403, 32, 32, "pewter-city"),
    new Region(2168, 1469, 64, 64, "saffron-city"),
    new Region(2168, 1596, 32, 32, "vermilion-city"),
    new Region(2016, 1499, 64, 32, "celadon-city"),
    new Region(2264, 1500, 33, 32, "lavender-town"),
    new Region(2072, 1723, 32, 32, "fuchsia-city"),
    new Region(2104, 1340, 64, 64, "cerulean-city"),
    new Region(1816, 1787, 32, 32, "cinnabar-island"),
    new Region(1816, 1438, 32, 49, "viridian-forest"),
    new Region(1976, 1372, 32, 32, "mt-moon"),
    new Region(2264, 1405, 32, 32, "rock-tunnel"),
    new Region(1816, 1600, 32, 55, "kanto-route-1"),
    new Region(1816, 1490, 32, 72, "kanto-route-2"),
    new Region(1850, 1405, 157, 32, "kanto-route-3"),
    new Region(2010, 1373, 93, 32, "kanto-route-4"),
    new Region(2169, 1404, 32, 64, "kanto-route-5"),
    new Region(2168, 1533, 32, 64, "kanto-route-6"),
    new Region(2082, 1499, 84, 32, "kanto-route-7"),
    new Region(2233, 1501, 32, 32, "kanto-route-8"),
    new Region(2212, 1373, 84, 32, "kanto-route-9"),
    new Region(2264, 1437, 32, 64, "kanto-route-10"),
    new Region(2201, 1597, 66, 32, "kanto-route-11"),
    // new Region(, "kanto-route-12"),
    // new Region(, "kanto-route-13"),
    // new Region(, "kanto-route-14"),
    // new Region(, "kanto-route-15"),
    // new Region(, "kanto-route-16"),
    // new Region(, "kanto-route-17"),
    // new Region(, "kanto-route-18"),
    // new Region(, "kanto-route-19"),
    // new Region(, "kanto-route-20"),
    // new Region(, "kanto-route-21"),
    // new Region(, "kanto-route-22"),
    // new Region(, "kanto-route-23"),
    new Region(2137, 1309, 32, 32, "kanto-route-24"),
    new Region(2172, 1309, 59, 31, "kanto-route-25"),
    // new Region(0, 0, 0, 0, ""),
    new Region(1787, 1565, 25, 30, "kanto-route-22"),
    // johto
    new Region(1272, 1404, 64, 64, "ecruteak-city"),
]
REGIONS.forEach(r => r.load())

var DATA = new Data()

const DropdownButton = ({ text, options, style }) => {
    return (
        <div className="dropdown btn-primary">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={style}>{text}</button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {options.map(
                    (option) => <a className="dropdown-item" href="#"
                        onClick={(e) => { option.onClick(); e.preventDefault() }}>{cap(option.text)}</a>
                )}
            </div>
        </div>
    )
}

const Alert = ({ alertMessage, setAlertMessage }) => {
    return alertMessage && <div className="alert alert-dark alert-dismissible fade show" role="alert">
        {alertMessage}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage(null)}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
}

const HealthBar = ({ text, hoverText, size, frontColor, backColor, style }) => {
    const [isHovered, setIsHovered] = React.useState(false)
    return (<div
        className="HealthBar"
        style={{ "background-color": backColor, ...style }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <div className="text">{isHovered ? hoverText : text}</div>
        {size > 0 && <div className="bar" style={{ "background-color": frontColor, height: 1000, width: size + "%" }}>&nbsp;</div>}
    </div>
    )
}

const ModalView = ({ modal }) => {
    const [payload, setPayload] = React.useState(modal.initialPayload)
    return (
        <div className="RenameModal">
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title">{modal.title}</h5>
                        <button type="button" className="close" aria-label="Close" onClick={modal.close}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{modal.message}</p>
                        {modal.content && new modal.content({ payload, setPayload })}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => modal.save(payload)}>{modal.saveText}</button>
                        <button type="button" className="btn btn-secondary" onClick={() => modal.close(payload)}>Cancel</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

const TeamView = ({ team, setAlertMessage }) => {

    const [heldPokemon, setHeldPokemon] = React.useState(null)
    const [modal, setModal] = React.useState(null)

    function swapHeldPokemon(e, i, swap) {
        if (swap) {
            if (heldPokemon) {
                let temp = team[i]
                team[i] = team[heldPokemon.i]
                team[heldPokemon.i] = temp
                clearHelpPokemon()
            }
        } else {
            setHeldPokemon({ i, imgSrc: team[i].getImageSrc() })
            setTimeout(() => {
                $('#HeldPokemon').css("left", (e.clientX - 100) + "px")
                $('#HeldPokemon').css("top", (e.clientY - 100) + "px")
                $('#HeldPokemon').css("z-index", "10")
            }, 0)
        }
    }

    function clearHelpPokemon() {
        setHeldPokemon(null)
        $('#HeldPokemon').css("left", "-1000px")
        $('#HeldPokemon').css("top", "-1000px")
    }

    function onMouseMove(e) {
        if (e && heldPokemon) {
            $('#HeldPokemon').css("left", (e.clientX - 100) + "px")
            $('#HeldPokemon').css("top", (e.clientY - 100) + "px")
            $('#HeldPokemon').css("z-index", "10")
        }
    }

    // ACTUAL TEAM VIEW COMPONENT
    return (<div className="TeamView" onMouseMove={onMouseMove} onMouseUp={clearHelpPokemon}>
        {modal && <ModalView modal={modal} />}
        <header><h1>Party</h1></header>
        <div className="container">
            <div className="card-deck"> {
                <>
                    {heldPokemon && <img id="HeldPokemon" src={heldPokemon.imgSrc} width={192} height={192} />}
                    {team && team.map((pokemon, i) =>
                        <PokemonView pokemon={pokemon} i={i} heldPokemon={heldPokemon} swapHeldPokemon={swapHeldPokemon} setModal={setModal} setAlertMessage={setAlertMessage} />)}
                </>
            }</div>
        </div>
    </div >)
}

const PokemonView = ({ pokemon, i, heldPokemon, swapHeldPokemon, setModal, setAlertMessage }) => {

    const [tab, setTab] = React.useState(1)
    const [hovered, setHovered] = React.useState(false)
    const setCurrTab = (i) => (e) => { setTab(i); e.preventDefault() }

    function rename(e) {
        setModal({
            title: <><img src={IMG_RENAME} />&nbsp;Rename Pokemon</>,
            message: "Choose a new name for your pokemon",
            saveText: "Save",
            initialPayload: pokemon.name,
            content: ({ payload, setPayload }) => {
                const [text, setText] = React.useState(false)
                const searchInput = React.useRef(null)
                React.useEffect(() => {
                    searchInput.current.focus();
                }, [])
                return <input ref={searchInput} className="form-control mr-sm-2" type="search" placeholder="New Name" aria-label="Name" onChange={e => setPayload(e.target.value.substring(0, 10))} value={payload} ></input>
            },
            save: (payload) => { if (payload) { pokemon.name = payload }; setModal(null) },
            close: (payload) => setModal(null)
        })
    }

    function release(e) {
        setModal({
            title: <><img src={IMG_RELEASE} />&nbsp;Release Pokemon</>,
            message: "Are you sure you want to release your pokemon?",
            saveText: "Yes",
            initialPayload: null,
            save: () => { DATA.releasePokemon(pokemon); setModal(null) },
            close: () => setModal(null)
        })
    }

    function sendToGym(e) {
        let n = DATA.team.filter(x => x.isInGym).length
        let slots = DATA.gymSlots
        if (pokemon.isInGym) {
            pokemon.isInGym = false
            DATA.update()
        } else {
            if (n < slots) {
                pokemon.isInGym = true
                DATA.update()
            } else {
                setAlertMessage(`Gym is already full! ${n}/${slots}`)
            }
        }
    }

    if (!pokemon.loaded)
        return <div className="card mb-4 PokemonView" style={{ color: "black", color: "black" }}>Loading...</div>
    return <>
        <div className="PokemonView card mb-4">
            {hovered
                ? <img className="card-img-top img-fluid"
                    src={pokemon.getImageSrc(true)} alt={pokemon.name}
                    width="192px" height="192px"
                    onMouseOut={() => setHovered(false)}
                    onMouseDown={(e) => { swapHeldPokemon(e, i, heldPokemon); e.preventDefault }}
                    onMouseUp={(e) => swapHeldPokemon(e, i, true)}
                    onDragStart={(e) => { e.preventDefault(); return false }} />
                : <img className="card-img-top img-fluid"
                    src={pokemon.getImageSrc()} alt={pokemon.getTitle()}
                    width="192px" height="192px"
                    onMouseOver={() => setHovered(true)} />
            }
            <div className="card-body">
                <h4 className="card-title">{pokemon.getTitle()}</h4>
                <h5 className="card-title">{'Level: ' + pokemon.level}&nbsp;&nbsp;&nbsp;&nbsp;{pokemon.isInGym ? " (in Gym)" : ""}</h5>
                <div style={{ height: "80px" }}>
                    { /* pokemon.species.flavor_text_entries.map((entry) => <span>{entry.flavor_text}</span>) */}
                    {tab == 1 &&
                        <p className="card-text">
                            <PokemonBarsView pokemon={pokemon} />
                        </p>
                    }
                    {tab == 2 &&
                        <div className="card-text scroller" style={{ height: "80px", overflowY: "scroll" }} >
                            {pokemon.getMoves().map(move => {
                                const stats = pokemon.getMoveStats(move)
                                return <div style={{ margin: 0, padding: 0, color: "#000", fontSize: 20 }}>{`${stats.name} (${stats.mastery}%)`}</div>
                            }
                            )}
                        </div>
                    }
                    {tab == 3 &&
                        <p className="card-text">
                            {pokemon.getFlavorText()}
                        </p>
                    }
                </div>
                <a href="#" className="btn btn-primary tab" onClick={setCurrTab(1)}>Stats</a>
                <a href="#" className="btn btn-primary tab" onClick={setCurrTab(2)}>Moves</a>
                <a href="#" className="btn btn-primary tab" onClick={setCurrTab(3)}>Descr</a>
                <DropdownButton text="opts" options={[
                    { text: pokemon.isInGym ? "Remove to Gym" : "Send to Gym", onClick: sendToGym },
                    { text: "Rename", onClick: rename },
                    { text: "Release", onClick: release },
                ]} />
            </div>
        </div>
    </>
}

const PokemonBarsView = ({ pokemon }) => {
    const xp = parseInt((100 * pokemon.xp / pokemon.maxXp), 10)
    const hp = parseInt((100 * pokemon.health / pokemon.maxHealth), 10)
    const en = parseInt((100 * pokemon.energy / pokemon.maxEnergy), 10)
    return (<>
        <HealthBar
            text="Experience" hoverText={`${pokemon.xp} / ${pokemon.maxXp}`}
            size={xp} frontColor="#2253f5" backColor="#152457"
            style={{ margin: "0 0 8px 0" }}
        />
        <HealthBar
            text="Health" hoverText={`${pokemon.health} / ${pokemon.maxHealth}`}
            size={hp} frontColor="#0b7824" backColor="#0a4016"
            style={{ margin: "0 0 8px 0" }}
        />
        <HealthBar
            text="Energy" hoverText={`${pokemon.energy} / ${pokemon.maxEnergy}`}
            size={en} frontColor="#e0a000" backColor="#856404"
        />
    </>)
}

const AllSpritesView = () => {

    const filters = [
        { name: "Badges", matches: ['badge'], imgs: [] },
        { name: "Balls", matches: ['ball'], imgs: [] },
        { name: "Berries", matches: ['berry', 'corn'], imgs: [] },
        { name: "Keys", matches: ['key'], imgs: [] },
        { name: "Mails", matches: ['mail'], imgs: [] },
        { name: "Drives", matches: ['drive'], imgs: [] },
        { name: "Plates", matches: ['plate'], imgs: [] },
        { name: "Minerals", matches: ['orb', 'pearl', 'nugget', 'gem', 'stone', 'salt', 'powder'], imgs: [] },
        { name: "Cards, Passes and Tickets", matches: ['card', 'pass', 'ticket', 'gram', 'letter'], imgs: [] },
        { name: "Relics", matches: ['relic'], imgs: [] },
        { name: "Bikes", matches: ['bike', 'bicycle'], imgs: [] },
        { name: "Fossils", matches: ['fossil'], imgs: [] },
        { name: "ites", matches: ['ite.', 'ite--2.'], imgs: [] },
        { name: "Xs Zs and Ups", matches: ['x-', '-z', '-up'], imgs: [] },
        { name: "Roto", matches: ['roto-'], imgs: [] },
        { name: "HMs & TMs", matches: ['hm', 'tm', 'memory'], imgs: [] },
        { name: "Incenses", matches: ['incense'], imgs: [] },
    ]
    const rest = []
    ALL_SPRITES.forEach(sprite => {
        let isOnFilter = false
        filters.forEach(filter => {
            if (includesAny(sprite, filter.matches)) {
                filter.imgs.push(sprite)
                isOnFilter = true
            }
        });
        if (!isOnFilter)
            rest.push(sprite)
    });
    rest.sort((a, b) => a[0] - b[0])

    return (<div className="AllSpritesView">
        <header><h1>All Sprites</h1></header>
        <div className="container">
            {rest.map((sprite) =>
                <img width="60px" title={sprite} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + sprite} />
            )}
            {filters.map((filter) => <>
                <hr />
                <h3>{filter.name}</h3>
                {filter.imgs.map(sprite =>
                    <img width="60px" title={sprite} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/" + sprite} />
                )}
            </>
            )}
        </div>
    </div>
    )
}

const SettingsView = ({ }) => {
    return (
        <div className="AllSpritesView">
            <header><h1>Settings</h1></header>
            <div class="container">
                <button type="button" className="btn btn-primary" onClick={() => {
                    DATA.write()
                    DATA.update()
                }}>Save Game Data</button>
                <button type="button" className="btn btn-primary" onClick={() => {
                    DATA.unwrite(); window.location.reload()
                }}>Reset Game Data</button>
            </div>
        </div >
    )
}

const GymView = ({ team, gymSlots, setAlertMessage }) => {

    const [modal, setModal] = React.useState(null)
    const filledSlots = team.filter(x => x.isInGym).length

    return (<div className="GymView" >
        {modal && <ModalView modal={modal} />}
        <header><h1>Gym {filledSlots}/{gymSlots}</h1></header>
        <div className="container">
            <div className="card-deck">{
                team && team.map((pokemon, i) => <GymSlotView pokemon={pokemon} setAlertMessage={setAlertMessage} />)
            }</div>
        </div>
    </div>
    )
}

const GymSlotView = ({ pokemon, setAlertMessage }) => {

    const [trainTimer, setTrainTimer] = React.useState(0)

    function startTrainTimer(e) {
        if (trainTimer != 0 || !pokemon.canTrain()) return
        setTrainTimer(1)

        const interval = setInterval(() => {
            setTrainTimer((trainTimer) => {
                if (trainTimer >= 100) {
                    clearInterval(interval)
                    pokemon.train()
                    return 0;
                }
                return trainTimer + 1
            })
        }, pokemon.getCurrentMoveStats().time);
        e.preventDefault()
    }

    const currentMoveStats = pokemon.getCurrentMoveStats()
    return (
        <div className="GymSlotView">
            <div className="card">
                <div className="d-flex align-items-start">

                    <img width="192px" alt={pokemon.getTitle()} src={pokemon.getImageSrc()} style={{ margin: "auto 0" }} />

                    <div>
                        <h4 className="card-title">{pokemon.getTitle()}</h4>
                        <h5 className="card-title">{'Level: ' + pokemon.level}&nbsp;&nbsp;&nbsp;&nbsp;{pokemon.isInGym ? " (in Gym)" : ""}</h5>
                        <div className="card-body" style={{ padding: "auto" }}>
                            <div style={{ marginBottom: 10 }}>
                                <p className="card-text">
                                    <PokemonBarsView pokemon={pokemon} />
                                </p>
                            </div>
                            <div className="d-flex align-items-start" style={{ fontSize: 20, marginBottom: 10 }}>
                                <div className="d-flex align-items-start" style={{ width: 300, color: "black" }}>
                                    <div style={{ margin: "auto auto auto 0" }}>Energy: {currentMoveStats.energy}</div>
                                    <div style={{ margin: "auto auto auto 0" }}>Time: {currentMoveStats.time}</div>
                                    <div style={{ margin: "auto auto auto 0" }}>XP: {currentMoveStats.xp}</div>
                                </div>
                                <div style={{ textAlign: "right" }}>
                                    <DropdownButton
                                        style={{ width: 160 }}
                                        text={currentMoveStats.name ? "Train " + currentMoveStats.name + " (" + currentMoveStats.mastery + "%)" : "Basic Traning"}
                                        options={[
                                            { text: "Basic Training", onClick: () => pokemon.setCurrentMove(null) },
                                            ...(
                                                pokemon.getMoves().map((move) => {
                                                    const stats = pokemon.getMoveStats(move)
                                                    if (!stats.name)
                                                        return {
                                                            text: "Basic Trainng",
                                                            onClick: () => pokemon.setCurrentMove(null)
                                                        }
                                                    return {
                                                        text: "Train " + stats.name + " (" + stats.mastery + "%)",
                                                        onClick: () => { pokemon.setCurrentMove(move.name) }
                                                    }
                                                })
                                            )
                                        ]}
                                    />
                                </div>
                            </div>
                            <div className="d-flex align-items-start">
                                <button href="#" className="btn btn-primary" onClick={startTrainTimer}>Train</button>
                                <div className="col" style={{ height: "24px", paddingRight: 0 }}>
                                    <HealthBar style={{ height: "100%" }} size={trainTimer} frontColor="#555555" backColor="transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

const MapView = ({ team, regions }) => {

    const [modal, setModal] = React.useState(null)
    const [selectedRegion, setSelectedRegion] = React.useState(0)

    return (<div className="MapView" >
        {modal && <ModalView modal={modal} />}
        <header><h1>Map</h1></header>
        <div className="container">
            {regions && regions.map((selectedRegion) =>
                <button type="button" className="btn btn-primary"><h1>{cap(region)}</h1></button>
            )}
            <RegionMapView region={selectedRegion} />
        </div>
    </div >
    )
}

var mapMousePoll = false,
    mapMousePoll2 = false,
    mapPos = { x: -1740, y: -1390 },
    imgSize = { w: 999, h: 936 },
    canvasSize = { w: 500, h: 500 },
    mapZoom = 4,
    mapMoved = false

var mx = 0, my = 0
var ssmx = 0, ssmy = 0
var rmx = 0, rmy = 0

const RegionMapView = ({ }) => {

    const canvas = React.useRef(null);
    const [mapHoveredRegion, setMapHoveredRegion] = React.useState(null)
    const [currentRegion, setCurrentRegion] = React.useState(REGIONS[0])

    function onMouseDown(e) {
        e.preventDefault()

        if (e.button == 0) {
            mapMousePoll = true
            mapMoved = false
        }

        if (e.button == 2) {
            mapMousePoll2 = true;
            [ssmx, ssmy] = (() => {
                let [a, b] = getMousePos(e)
                return [a - mapPos.x, b - mapPos.y]
            })()
        }
    }

    function onMouseUp(e) {
        e.preventDefault()

        if (e.button == 0) {
            mapMousePoll = false
            if (!mapMoved && mapHoveredRegion) {
                setCurrentRegion(mapHoveredRegion)
            }
        }

        if (e.button == 2) {
            mapMousePoll2 = false;
            let [ss2mx, ss2my] = (() => {
                let [a, b] = getMousePos(e)
                return [a - mapPos.x, b - mapPos.y]
            })()

            console.log(`${ssmx}, ${ssmy}, ${ss2mx - ssmx}, ${ss2my - ssmy}`)
        }
    }

    function onMouseMove(e) {

        [mx, my] = getMousePos(e)
        let [mapMx, mapMy] = [mx - mapPos.x, my - mapPos.y]

        let hoveringRegion = false
        REGIONS.forEach(r => {
            if (mapMx > r.x && mapMy > r.y && mapMx < r.x + r.w && mapMy < r.y + r.h) {
                if (r != mapHoveredRegion) {
                    setMapHoveredRegion(r)
                }
                hoveringRegion = true
            }
        });

        if (!hoveringRegion)
            setMapHoveredRegion(null)

        if (mapMousePoll) {
            if (Math.abs(e.movementX) > 1 || Math.abs(e.movementY) > 1)
                mapMoved = true
            mapPos.x = Math.min(0, Math.max(-imgSize.w * mapZoom + canvasSize.w, mapPos.x + e.movementX))
            mapPos.y = Math.min(0, Math.max(-imgSize.h * mapZoom + canvasSize.h, mapPos.y + e.movementY))
            repaint()
        }

        if (mapMousePoll2) {
            repaint()
        }
    }

    function repaint() {
        if (!canvas || !canvas.current) return
        const canvasEle = canvas.current;
        const ctx = canvasEle.getContext("2d");
        ctx.imageSmoothingEnabled = false

        ctx.drawImage(document.getElementById("imgMap"),
            mapPos.x, mapPos.y, imgSize.w * mapZoom, imgSize.h * mapZoom);

        if (mapHoveredRegion) {
            ctx.fillStyle = "#FFFFFF77";
            ctx.strokeStyle = "#FFFFFF77";
            ctx.lineWidth = 3;
            ctx.beginPath();
            const xx = mapHoveredRegion.x + mapPos.x, yy = mapHoveredRegion.y + mapPos.y
            ctx.rect(xx, yy, mapHoveredRegion.w, mapHoveredRegion.h);
            ctx.fill();
            ctx.stroke();
        }

        if (mapMousePoll2) {
            ctx.fillStyle = "#FFFFFF77";
            ctx.strokeStyle = "#FFFFFF77";
            ctx.lineWidth = 3;
            ctx.beginPath();
            const xx = ssmx + mapPos.x, yy = ssmy + mapPos.y
            ctx.rect(xx, yy, mx - xx, my - yy);
            ctx.fill();
            ctx.stroke();
        }

        ctx.drawImage(document.getElementById("imgPlayer"),
            currentRegion.x + mapPos.x - 15, currentRegion.y + mapPos.y - 32, 64, 64);
    }

    if (currentRegion.loaded)
        repaint()

    return <div className="RegionMapView" >

        <div className="d-flex align-items-start">
            <div className="col" >
                <div className="MapHoverViewWrapper">
                    {mapHoveredRegion && <MapHoverView region={mapHoveredRegion} />}
                    <canvas ref={canvas} id="mapCanvas" width={canvasSize.w} height={canvasSize.h} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} />
                </div>
                <img id="imgMap" src="map.png" style={{ display: "none" }} />
                <img id="imgPlayer" src="player.png" style={{ display: "none" }} />
            </div>
            <div className="col" >
                {currentRegion && currentRegion.getEncounters().filter(x => x.version_details.find(x => x.encounter_details.find(x => x.method.name == 'walk')))
                    .map(enc => <EncounterView encounter={enc} />)}
            </div>
        </div>
    </div>
}

var temp = false
const EncounterView = ({ encounter }) => {
    const seen = DATA.seen[encounter.pokemon.name]
    if (temp !== undefined)
        temp = console.log(encounter)
    return (
        <div className={"EncounterView" + (seen ? "" : " sil")} style={{ width: "192px", height: "192px" }}>
            <img className={seen ? "" : " sil"} src={encounter.pokemon.sprites.front_default} width={192} />
            <p>{seen ? encounter.pokemon.name : "??????"}</p>
        </div >
    )
}

const MapHoverView = ({ region }) => {
    return (
        <div className="MapHoverView" style={{ left: region.x + mapPos.x + 16, top: region.y + mapPos.y - 16 }}>
            {region.getTitle() || "Loading…"}

        </div >
    )
}

const App = () => {

    const [updater, setUpdater] = React.useState(0)
    const [sidebarActive, setSidebarActive] = React.useState()
    const [selectedPage, setSelectedPage] = React.useState(PAGES[2])
    const [searchValue, setSearchValue] = React.useState("")
    const [alertMessage, setAlertMessage] = React.useState(null)

    DATA.update = () => { setUpdater(updater + 1) }
    const data = DATA

    React.useEffect(() => {
        DATA.read().then(DATA.update)
    }, [])

    async function addToParty(e) {
        e.preventDefault()
        try {
            let pokemon = new Pokemon(searchValue.toLowerCase())
            await pokemon.load()
            DATA.team.push(pokemon)
            DATA.update()
        } catch (e) {
            setAlertMessage(`Could not find pokemon "${searchValue}"`);
            console.log(e)
        }
    }

    return (<div className="App">

        {<Alert alertMessage={alertMessage} setAlertMessage={setAlertMessage} />}

        <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar" className={sidebarActive ? "active" : ""} >
                <div className="custom-menu">
                    {<button type="button" id="sidebarCollapse" style={{ marginLeft: sidebarActive ? "100px !important" : "0" }} onClick={() => setSidebarActive(!sidebarActive)}>{!sidebarActive ? "→" : "←"}</button>}
                </div>
                <div className="img bg-wrap text-center py-4">
                    <div className="user-logo">
                        <h3><img width="60px" src={IMG_LOGO} /> Pokemon Idler<img width="60px" src={IMG_LOGO} /></h3>
                    </div>
                </div>
                <ul className="list-unstyled components">
                    {PAGES.map((thisPage) => {
                        return < li className={selectedPage.name == thisPage.name ? "active" : ""} onClick={() => setSelectedPage(thisPage)}>
                            <a><img width="60px" src={thisPage.img} />{thisPage.title}</a>
                        </li>
                    }
                    )}
                </ul>
                <div style={{ padding: "0 0 0 10px" }} >
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={e => setSearchValue(e.target.value)} />
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={addToParty}>Add</button>
                    </form>
                </div>
            </nav>

            <div id="content" className2="p-6 p-md-6 pt-6">
                {selectedPage.name == "team" && <TeamView team={data.team} setAlertMessage={setAlertMessage} />}
                {selectedPage.name == "gym" && <GymView team={data.team.filter(x => x.isInGym)} setAlertMessage={setAlertMessage} gymSlots={DATA.gymSlots} />}
                {selectedPage.name == "map" && <MapView team={data.team} regions={data.regions} />}
                {selectedPage.name == "allsprites" && <AllSpritesView />}
                {selectedPage.name == "settings" && <SettingsView />}
            </div>
        </div>
    </div >)
}

