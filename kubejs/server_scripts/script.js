// priority: 0

console.info('Hello, World! (You will see this line every time server resources reload)')

// In the ancient order.
const wool_colours = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black']
// Legendary instead of mythic because Iron's Spellbooks inks.
const rarities = ['common', 'uncommon', 'rare', 'epic', 'legendary']

ServerEvents.recipes(event => {
	// #region Functions
	// Because all of these use event, it doesn't make much sense to move it out of this block.
	// Unless there's some JS optimisation thing I don't know about...

	// Comes up more often than you think.
	function SurroundXInYToMakeZ (inner, outer, result)
	{
		event.shaped(result,
			[
				'OOO',
				'OIO',
				'OOO'
			],
			{
				O: outer,
				I: inner
			}
		)
	}

	// Add a quick way to swap between two very similar items.
	function AddReflexive(input1, input2)
	{
		event.shapeless(input1, [input2])
		event.shapeless(input2, [input1])
	}

	function ReplaceIngotInToolsWithPlate(namespace, material, toolClassOverride)
	{
		// https://stackoverflow.com/a/5515349/24345903
		if (!toolClassOverride)
		{
			// Golden needs special handling.
			// In all other cases, just use "material".
			toolClassOverride = material;
		}

		event.remove({id: `${namespace}:${toolClassOverride}_sword`});
		event.shaped(`${namespace}:${toolClassOverride}_sword`,
			[
				'P',
				'P',
				'S'
			],
			{
				P: `#forge:plates/${material}`,
				S: '#balm:wooden_rods'
			}
		);
		
		event.remove({id: `${namespace}:${toolClassOverride}_shovel`});
		event.shaped(`${namespace}:${toolClassOverride}_shovel`,
			[
				'P',
				'S',
				'S'
			],
			{
				P: `#forge:plates/${material}`,
				S: '#balm:wooden_rods'
			}
		);

		event.remove({id: `${namespace}:${toolClassOverride}_pickaxe`});
		event.shaped(`${namespace}:${toolClassOverride}_pickaxe`,
			[
				'PPP',
				' S ',
				' S '
			],
			{
				P: `#forge:plates/${material}`,
				S: '#balm:wooden_rods'
			}
		);

		event.remove({id: `${namespace}:${toolClassOverride}_axe`});
		event.shaped(`${namespace}:${toolClassOverride}_axe`,
			[
				'PP',
				'PS',
				' S'
			],
			{
				P: `#forge:plates/${material}`,
				S: '#balm:wooden_rods'
			}
		);

		event.remove({id: `${namespace}:${toolClassOverride}_hoe`});
		event.shaped(`${namespace}:${toolClassOverride}_hoe`,
			[
				'PP',
				' S',
				' S'
			],
			{
				P: `#forge:plates/${material}`,
				S: '#balm:wooden_rods'
			}
		);
	}

	// #endregion

	// -----------------------------------------------------
	// Early story/game - first night type stuff.
	// First stage of the game, before the player gets iron.
	// #region EARLY STORY

	// Wood tools are pretty useless given the amount of alternatives you have to craft stone tools.
	// It's also a "oh shit we're playing modded" moment that forces them out of autopilot.
	event.remove({id: 'minecraft:wooden_axe'})
	event.remove({id: 'minecraft:wooden_hoe'})
	event.remove({id: 'minecraft:wooden_pickaxe'})
	event.remove({id: 'minecraft:wooden_shovel'})
	event.remove({id: 'minecraft:wooden_sword'})

	// Also, force the player to use some sort of machinery to get metal tools.
	// If they want to bypass it by exploring, power to them.
	ReplaceIngotInToolsWithPlate("minecraft", "gold", "golden");
	ReplaceIngotInToolsWithPlate("minecraft", "iron");
	ReplaceIngotInToolsWithPlate("iceandfire", "silver");
	ReplaceIngotInToolsWithPlate("iceandfire", "copper");

	// Rotten Flesh to Leather
	event.smelting('minecraft:leather', 'minecraft:rotten_flesh')
	event.smoking('minecraft:leather', 'minecraft:rotten_flesh')
	event.campfireCooking('minecraft:leather', 'minecraft:rotten_flesh')
	
	// Add some uses for commonly dropped stuff
	// Also heads are so common now that I don't mind how easy it is to make these.
	event.shapeless('minecraft:paper', ['gravestone:obituary'])
	event.shapeless('minecraft:zombie_head', ['minecraft:player_head'])
	event.smelting('minecraft:skeleton_skull', 'minecraft:player_head')
	
	// Unify ashes.
	event.remove({id: 'immersive_weathering:ash_layer_block'})
	event.shapeless('immersive_weathering:ash_layer_block', ['immersive_weathering:soot', 'immersive_weathering:soot'])
	event.shapeless('6x immersive_weathering:ash_layer_block', ['#gfz:ash_block', '#gfz:ash_block', '#gfz:ash_block'])
	
	// Pebble crafting recipe
	event.shapeless('4x twigs:pebble', ['#forge:cobblestone'])

	event.replaceInput(
		{output: 'supplementaries:soap'},
		'minecraft:porkchop',
		'#immersive_weathering:wax'
	)
	event.replaceInput(
		{output: 'iceandfire:earplugs'},
		'#minecraft:planks',
		'#immersive_weathering:wax'
	)

	// #endregion

	// -----------------------------------------------------
	// Mid story/midgame.
	// The player now has access to iron and Create machines.
	// They're probably exploring the world, taking out dungeons and Mowzie's bosses.
	// #region MID STORY

	event.recipes.createMixing('minecraft:slime_ball', [
		'crittersandcompanions:sea_bunny_slime_block'
	])

	const grindableMetals = new Map([
		['silver', 'white'],
		['copper', 'blue'],
		['lead', 'black'],
		['iron', 'red'],
		['nickel', 'green'],
		['gold', 'brown'],
		['tin', 'gray'],
		['constantan', 'green'],
		['invar', 'cyan'],
		['enderium', 'purple'],
		['lumium', 'yellow'],
		['signalum', 'purple'],
		['bronze', 'blue'],
		['electrum', 'yellow'],
	]);

	grindableMetals.forEach((dyeColor, metal) =>
	{
		event.recipes.createMilling(`thermal:${metal}_dust`, [`#forge:ingots/${metal}`])
		event.recipes.createMilling(`thermal:${metal}_dust`, [`#forge:plates/${metal}`])
		event.shapeless(`minecraft:${dyeColor}_dye`, [`#forge:dusts/${metal}`])
	})

	// #region Update Aquatic/Upgrade Aquatic
	event.remove({output: 'minecraft:conduit'})
	event.shaped
	(
		'minecraft:conduit',
		[
			'SSS',
			'SHS',
			'SSS'
		],
		{
			S: '#gfz:shell',
			H: 'minecraft:heart_of_the_sea'
		}
	)
	event.remove({id: 'upgrade_aquatic:trident'})
	event.remove({id: 'apotheosis:inert_trident'})
	event.remove({id: 'upgrade_aquatic:prismarine_rod'})
	event.shaped
	(
		'upgrade_aquatic:prismarine_rod',
		[
			'P',
			'P'
		],
		{
			P: '#gfz:prismarine_shard'
		}
	)
	event.shaped
	(
		'apotheosis:inert_trident',
		[
			'SSS',
			' R ',
			' R '
		],
		{
			S: '#gfz:shell',
			R: 'upgrade_aquatic:prismarine_rod'
		}
	)
	event.shaped
	(
		'apotheosis:inert_trident',
		[
			'SSS',
			' R ',
			' R '
		],
		{
			S: 'upgrade_aquatic:thrasher_tooth',
			R: 'upgrade_aquatic:prismarine_rod'
		}
	)
	// #endregion

	event.remove({id: 'savage_and_ravage:gloomy_tiles'})
	event.shaped(
		'8x savage_and_ravage:gloomy_tiles',
		[
			'BBB',
			'BSB',
			'BBB'
		],
		{
			B: '#minecraft:stone_bricks',
			S: '#gfz:spooky'
		}
	)
	
	event.recipes.createPressing('createaddition:zinc_sheet', ['#forge:ingots/zinc'])

	//#region nickel
		event.remove({id: 'savage_and_ravage:blast_proof_plating'})
		event.shapeless('savage_and_ravage:blast_proof_plating', 
		[
			'#forge:obsidian', '#forge:obsidian',
			'#forge:ingots/nickel', '#forge:ingots/nickel', '#forge:ingots/nickel'
		])
		event.shapeless('savage_and_ravage:blast_proof_plating', 
		[
			'savage_and_ravage:creeper_spores', 'savage_and_ravage:creeper_spores', 'savage_and_ravage:creeper_spores', 
			'#forge:ingots/nickel', '#forge:ingots/nickel'
		])
	
		event.shaped(
			'minecraft:clock', 
			[
				'I',
				'R',
				'I'
			], {
				I: '#forge:ingots/invar',
				R: '#forge:dusts/redstone'
			}
		)
		event.shaped(
			'minecraft:compass', 
			[
				'IRI'
			], {
				I: '#forge:ingots/invar',
				R: '#forge:dusts/redstone'
			}
		)
		event.shapeless(
			'sereneseasons:calendar',
			[
				'minecraft:paper', '#forge:ingots/invar'
			]
		)
	
		event.remove({id: 'explorerscompass:explorers_compass'})
		event.remove({id: 'naturescompass:natures_compass'})
		event.shaped(
			'thermal:invar_gear',
			[
				'NIN',
				'IRI',
				'NIN'
			], {
				I: '#forge:ingots/invar',
				N: '#forge:nuggets/invar',
				R: '#forge:dusts/redstone'
			}
		)
	
		event.shapeless(
			'explorerscompass:explorerscompass',
			[
				'minecraft:spawner',
				'minecraft:nether_bricks',
				'minecraft:ender_eye',
				'#forge:gears/invar',
				'minecraft:compass',
				'#forge:gears/invar',
				'minecraft:sea_lantern',
				'minecraft:gilded_blackstone',
				'minecraft:end_rod'
			]
		)
		event.shapeless(
			'naturescompass:naturescompass',
			[
				'createaddition:biomass', 'createaddition:biomass', 'createaddition:biomass',
				'#forge:gears/invar',
				'minecraft:compass',
				'#forge:gears/invar',
				'createaddition:biomass', 'createaddition:biomass', 'createaddition:biomass'
			]
		)
	
		event.remove({output: 'create:electron_tube'})
		event.shaped(
			'2x create:electron_tube',
			[
				'R',
				'C'
			],
			{
				R: 'create:polished_rose_quartz',
				C: '#forge:plates/constantan'
			}
		)
	
	//#endregion

	// You should be able to get to the nether without mods, but it'll be longer and less worth it.
	event.remove({id: 'minecraft:flint_and_steel'})
	// having it pre-damaged seems neat
	event.shapeless(Item.of('minecraft:flint_and_steel', "{Damage:32,RepairCost:0,display:{Name:'{\"text\":\"Flint and Iron\"}'}}"), ['#forge:rods/iron', 'minecraft:flint'])
	event.shapeless('minecraft:flint_and_steel', ['#forge:rods/steel', 'minecraft:flint'])

	// #endregion
	
	// -----------------------------------------------------
	// Lategame/latestory/predragon
	// The player now has access to the Aether and Forge Energy.
	// They probably have some good spells and equipment, and a decent base.
	// #region LATE STORY

	// Basically force the player to either start on Forge Energy or have a working blaze burner setup.
	event.remove({id: 'minecraft:netherite_ingot'})
	event.recipes.createMixing('minecraft:netherite_ingot', [
		'minecraft:netherite_scrap',
		'minecraft:netherite_scrap',
		'minecraft:netherite_scrap',
		'minecraft:netherite_scrap',
		'#forge:ingots/gold',
		'#forge:ingots/gold',
		'#forge:ingots/gold',
		'#forge:ingots/gold'
	]).superheated()

	let dragonscales = ['red', 'green', 'bronze', 'gray', 'blue', 'white', 'sapphire', 'silver', 'electric', 'amythest', 'copper', 'black']
	dragonscales.forEach((color, index) => {
		event.remove({output: `iceandfire:armor_${color}_helmet`})
		event.shaped(`iceandfire:armor_${color}_helmet`, [
			'SSS',
			'SNS'
		], {
			S: `iceandfire:dragonscales_${color}`,
			N: 'minecraft:netherite_ingot'
		})

		event.remove({output: `iceandfire:armor_${color}_chestplate`})
		event.shaped(`iceandfire:armor_${color}_chestplate`, [
			'SNS',
			'SSS',
			'SSS'
		], {
			S: `iceandfire:dragonscales_${color}`,
			N: 'minecraft:netherite_ingot'
		})

		event.remove({output: `iceandfire:armor_${color}_leggings`})
		event.shaped(`iceandfire:armor_${color}_leggings`, [
			'SSS',
			'SNS',
			'S S'
		], {
			S: `iceandfire:dragonscales_${color}`,
			N: 'minecraft:netherite_ingot'
		})

		event.remove({output: `iceandfire:armor_${color}_boots`})
		event.shaped(`iceandfire:armor_${color}_boots`, [
			'SNS',
			'S S'
		], {
			S: `iceandfire:dragonscales_${color}`,
			N: 'minecraft:netherite_ingot'
		})
	})

	event.remove({id: 'farmersdelight:skillet'})
	event.remove({id: 'farmersdelight:cooking_pot'})
	event.shaped('farmersdelight:skillet',
		[
			' II',
			' II',
			'C  '
		],
		{
			I: '#gfz:upgraded_iron',
			C: '#supplementaries:throwable_bricks'
		}
	)

	event.shaped('farmersdelight:cooking_pot',
		[
			'CSC',
			'IBI',
			'III'
		],
		{
			I: '#gfz:upgraded_iron',
			C: '#supplementaries:throwable_bricks',
			S: '#forge:rods/wooden',
			B: 'minecraft:water_bucket'
		}

	).replaceIngredient('minecraft:water_bucket', 'minecraft:bucket')

	// #endregion
	
	// -----------------------------------------------------
	// Poststory/postgame
	// The player has killed the Ender Dragon
	// The player now is ready to start some big builds.
	// #region POST STORY

	//#region Upgraded Netherite
	event.remove({id: 'upgradednetherite:gold_essence'})
	event.recipes.createMixing('upgradednetherite:gold_essence',
	[
		'minecraft:dragon_breath',
		'#forge:ingots/gold',
		'#gfz:rabbit_foot'
	]).superheated()

	event.remove({id: 'upgradednetherite:fire_essence'})
	event.recipes.createMixing('upgradednetherite:fire_essence',
	[
		'minecraft:dragon_breath',
		'iceandfire:fire_stew'
	])

	event.remove({id: 'upgradednetherite:ender_essence'})
	event.recipes.createMixing('upgradednetherite:ender_essence', 
	[
		'minecraft:dragon_breath',
		'#forge:ingots/enderium'
	]).superheated()
	

	event.remove({id: 'upgradednetherite:water_essence'})
	event.recipes.createMixing('upgradednetherite:water_essence',
	[
		'minecraft:dragon_breath',
		'iceandfire:frost_stew'
	]).superheated()

	event.remove({id: 'upgradednetherite:wither_essence'})
	event.recipes.createMixing('upgradednetherite:wither_essence',
	[
		'minecraft:dragon_breath',
		'minecraft:wither_skeleton_skull'
	]).superheated()
	event.recipes.createMixing('upgradednetherite:wither_essence',
	[
		'minecraft:dragon_breath',
		'#forge:bones/wither',
		'#forge:bones/wither',
		'#forge:bones/wither',
		'#forge:bones/wither'
	]).superheated()

	event.remove({id: 'upgradednetherite:poison_essence'})
	event.recipes.createMixing('upgradednetherite:poison_essence',
	[
		'minecraft:dragon_breath',
		'#gfz:spider_egg'
	]).superheated()

	event.remove({id: 'upgradednetherite:phantom_essence'})
	event.recipes.createMixing('upgradednetherite:phantom_essence',
	[
		'minecraft:dragon_breath',
		'minecraft:phantom_membrane',
		'iceandfire:ghost_ingot'
	]).superheated()

	event.remove({id: 'upgradednetherite:feather_essence'})
	event.recipes.createMixing('upgradednetherite:feather_essence',
	[
		'minecraft:dragon_breath',
		'#forge:ingots/nickel',
		'supplementaries:feather_block'
	]).superheated()

	event.remove({id: 'upgradednetherite:corrupt_essence'})
	event.recipes.createMixing('2x upgradednetherite:corrupt_essence',
	[
		'minecraft:dragon_breath',
		'rottencreatures:corrupted_wart',
		'rottencreatures:magma_rotten_flesh',
		'minecraft:ghast_tear',
		'#forge:heart'
	])
	//#endregion

	event.remove({output: 'waystones:warp_stone'})
	event.shaped(
		'waystones:warp_stone',
		[
			'CEC',
			'EGE',
			'CEC'
		], {
			C: 'minecraft:popped_chorus_fruit',
			E: '#forge:ingots/enderium',
			G: '#forge:gems/amethyst'
		}
	)

	// #endregion


	// Below is unsorted, hopefully I get to it eventually.

	//#region Apotheosis Materials
	event.shapeless('2x apotheosis:common_material', ['apotheosis:uncommon_material'])
	event.shapeless('2x apotheosis:uncommon_material', ['apotheosis:rare_material'])
	event.shapeless('2x apotheosis:rare_material', ['apotheosis:epic_material'])
	event.shapeless('2x apotheosis:epic_material', ['apotheosis:mythic_material'])

	event.recipes.createCrushing('apotheosis:gem_dust', ['apotheosis:gem'])
	event.recipes.createMilling('apotheosis:gem_dust', ['apotheosis:gem'])
	//#endregion
	//#region Iron's Spellbooks Inks

	// Create Wizardry does a lot, but I don't like their ink recipes.
	rarities.forEach((rarity, index) =>
	{
		event.remove({id: `create_wizardry:${rarity}_ink_recipe`})
		event.remove({id: `create_wizardry:${rarity}_ink_liquid_recipe_alt`})
		event.remove({id: `create_wizardry:${rarity}_ink_liquid_recipe`})
		event.remove({id: `create_wizardry:create_ec_${rarity}_ink_recipe`})

		// lol, lmao
		event.recipes.thermal.bottler(`irons_spellbooks:${rarity}_ink`,
			[
				'minecraft:glass_bottle',
				(Fluid.of(`create_wizardry:${rarity}_ink`, 250))
			]
		)

		// There's no "-1 material" so skip over common mats to handle later.
		// Also this is how you do continue statements in this context, apparently.
		if (index < 1) return;

		event.recipes.createMixing
		(
			(Fluid.of(`create_wizardry:${rarity}_ink`, 250)),
			[
				(Fluid.of(`create_wizardry:${rarities[index-1]}_ink`, 1000)),
				`#gfz:${rarity}_material`
			]
		)
		// Mythic/Legendary naming difference throws a spanner in the works.
		if (index < 4)
		{
			event.recipes.createMixing
			(
				`apotheosis:${rarity}_material`,
				[
					(Fluid.of(`create_wizardry:${rarity}_ink`, 1000)),
					`#gfz:${rarities[index-1]}_material`
				]
			).heated()
		}
	})
	// Needs different handling (again, naming differences), so I'll take the opportunity to make that worth something.
	event.recipes.createMixing
	(
		'apotheosis:mythic_material',
		[
			(Fluid.of(`create_wizardry:legendary_ink`, 1000)),
			'#gfz:epic_material',
			'minecraft:popped_chorus_fruit'
		]
	).superheated()
	// Now that that's out of the way; integration with create enchantment industry
	event.recipes.createMixing
	(
		(Fluid.of('create_wizardry:common_ink', 250)),
		[
			(Fluid.of(`create_enchantment_industry:ink`, 1000)),
			`#gfz:common_material`
		]
	)
	event.recipes.createMixing
	(
		'apotheosis:common_material',
		[
			(Fluid.of(`create_enchantment_industry:ink`, 1000)),
			'#forge:nuggets'
		]
	)
	//#endregion

	event.remove({output: 'iceandfire:dragon_flute'})
	event.remove({output: 'iceandfire:siren_flute'})

	event.shaped(
		'iceandfire:dragon_flute', [
			' BB',
			'BFB',
			'MB '
		], {
			B: 'iceandfire:dragonbone',
			F: 'supplementaries:flute',
			M: '#forge:ingots/iron'
		}
	)
	event.shaped(
		'iceandfire:siren_flute', [
			' BB',
			'BFB',
			'MB '
		], {
			B: 'iceandfire:shiny_scales',
			F: 'supplementaries:flute',
			M: 'iceandfire:siren_tear'
		}
	)

	// if this worked it would balance biodiesel.
	// fluid recipes scare me.
	/* event.remove({id: 'createdieselgenerators:mixing/biodiesel'})
	event.recipes.createMixing(
		Fluid.of('createdieselgenerators:biodiesel', 200),
		[
			Fluid.of('#forge:plantoil', 100),
			Fluid.of('#forge:ethanol', 100),
			'create:cinder_flour'
		]
	) */

	//#region pixie war crimes
	event.shapeless(
		'iceandfire:pixie_dust',
		[
			'#gfz:pixie_jar',
			'ends_delight:chorus_fruit_wine'
		]
	).keepIngredient('#gfz:pixie_jar')
	.replaceIngredient('ends_delight:chorus_fruit_wine', 'minecraft:glass_bottle')
	event.shapeless(
		'2x iceandfire:pixie_dust',
		[
			'#gfz:pixie_jar',
			'createdieselgenerators:ethanol_bucket'
		]
	).keepIngredient('#gfz:pixie_jar')
	.replaceIngredient('createdieselgenerators:ethanol_bucket', 'minecraft:bucket')
	event.shapeless(
		Item.of('minecraft:sea_pickle', "{display:{Name:'{\"text\":\"Sonk Ponkle\"}'}}"),
		[
			'#gfz:pixie_jar',
			'#forge:gems'
		]
	).keepIngredient('#gfz:pixie_jar')

	function makePixieHovel (output, coreMaterial)
	{
		event.shapeless(output, [
			coreMaterial,
			'iceandfire:pixie_dust'
		])
	}
	makePixieHovel('iceandfire:pixie_house_oak', '#minecraft:oak_logs')
	makePixieHovel('iceandfire:pixie_house_birch', '#minecraft:birch_logs')
	makePixieHovel('iceandfire:pixie_house_spruce', '#minecraft:spruce_logs')
	makePixieHovel('iceandfire:pixie_house_dark_oak', '#minecraft:dark_oak_logs')
	makePixieHovel('iceandfire:pixie_house_mushroom_brown', '#enhanced_mushrooms:brown_mushroom_stems')
	makePixieHovel('iceandfire:pixie_house_mushroom_red', '#enhanced_mushrooms:red_mushroom_stems')
	//#endregion

	//#region dirt integration
	event.recipes.createSplashing(
		'minecraft:clay_ball',
		[
			'immersive_weathering:silt'
		]
	)
	event.recipes.createMilling(
		'infernalexp:silt',
		[
			'#chipped:basalt'
		]
	)

	event.smelting('minecraft:dirt', 'immersive_weathering:permafrost')
	event.smoking('minecraft:dirt', 'immersive_weathering:permafrost')
	event.campfireCooking('minecraft:dirt', 'immersive_weathering:permafrost')

	//#endregion

	let corundums = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white', 'black']
	corundums.forEach((colour) => 
	{
		event.recipes.createCrushing
		(
			`4x quark:${colour}_corundum_cluster`, 
			[
				`quark:${colour}_corundum`
			]
		)

		event.recipes.createCompacting
		(
			`quark:${colour}_corundum`,
			[
				`4x quark:${colour}_corundum_cluster`
			]
		)
	})

	event.remove({output: 'thermal:gunpowder_block'})

	event.remove({id: 'rottencreatures:tnt_barrel'})
	event.shaped(
		'rottencreatures:tnt_barrel',
		[
			'PSP',
			'PTP',
			'PSP'
		], {
			P: '#minecraft:planks',
			S: '#minecraft:wooden_slabs',
			T: 'minecraft:tnt'
		}
	)
	event.shapeless('rottencreatures:tnt_barrel', ['#forge:barrels', 'minecraft:tnt'])

	event.remove({output: 'upgrade_aquatic:bedroll'})
	wool_colours.forEach((colour => {
		event.remove({output: `valhelsia_structures:${colour}_sleeping_bag`})
		event.remove({id: `minecraft:${colour}_bed`})
		event.shaped(
			`valhelsia_structures:${colour}_sleeping_bag`,
			[
				'WWW',
				'LLL',
				'N N'
			],
			{
				W: `minecraft:${colour}_carpet`,
				L: '#forge:leather',
				N: '#forge:nuggets/iron'
			}
		)
		event.shapeless(
			`valhelsia_structures:${colour}_sleeping_bag`,
			[`upgrade_aquatic:${colour}_bedroll`]
		)
		event.shapeless(
			`upgrade_aquatic:${colour}_bedroll`,
			[`valhelsia_structures:${colour}_sleeping_bag`]
		)
		event.shapeless(
			`valhelsia_structures:${colour}_sleeping_bag`,
			[
				'#valhelsia_structures:sleeping_bags',
				`#forge:dyes/${colour}`
			]
		)
		event.shaped(
			`minecraft:${colour}_bed`,
			[
				' S ',
				'FOF'
			],
			{
				S: `valhelsia_structures:${colour}_sleeping_bag`,
				F: '#minecraft:fences',
				O: 'minecraft:crying_obsidian'
			}
		)
	}))

	// Ender Anchor Fixes
	event.remove({output: 'unusualend:ender_respawn_altar'})
	event.remove({output: 'end_respawn_anchor:end_respawn_anchor'})
	event.shaped(
		'end_respawn_anchor:end_respawn_anchor',
		[
			'SOS',
			'III',
			'SOS'
		],
		{
			S: '#forge:end_stones',
			O: 'minecraft:crying_obsidian',
			I: 'minecraft:ender_eye'
		}
	)

	//#region Storage progression
	event.replaceInput(
		{output: 'quark:crate'},
		'#forge:ingots/iron',
		'#forge:plates/iron'
	)

	event.replaceInput(
		{output: 'thermal:satchel'},
		'#forge:ingots/tin',
		'#forge:plates/tin'
	)

	event.remove({id: 'supplementaries:sack'})
	event.shaped(
		'supplementaries:sack',
		[
			'FSF',
			'F F',
			'FTF'
		],
		{
			F: '#forge:fiber',
			S: '#forge:string',
			T: '#forge:plates/tin'
		}
	)

	event.remove({output:'quark:backpack'})
	event.shaped(
		'quark:backpack',
		[
			'LTL',
			'WRW',
			'LWL'
		],
		{
			L: '#forge:leather',
			R: 'quark:ravager_hide',
			W: '#thermal:rockwool',
			T: '#forge:plates/tin'
		}
	)
	event.remove({id: 'minecraft:shulker_box'})
	event.shapeless('minecraft:shulker_box', ['minecraft:shulker_shell', '#forge:plates/tin', 'minecraft:shulker_shell'])

	event.remove({id: 'create:crafting/curiosities/brown_toolbox'})
	event.shaped('create:brown_toolbox',
		[
			'CBG',
			'TLG'
		],
		{
			L: '#forge:leather',
			C: 'create:cogwheel',
			T: '#forge:plates/tin',
			G: '#forge:plates/gold',
			B: '#balm:wooden_chests'
		}
	)

	event.remove({id: 'refinedstorage:raw_basic_processor'})
	event.shaped('2x refinedstorage:raw_basic_processor',
		[
			' I ',
			'BQB',
			' S '
		],
		{
			I: '#forge:dusts/iron',
			B: 'refinedstorage:processor_binding',
			Q: 'create:polished_rose_quartz',
			S: '#forge:silicon'
		}
	)

	event.remove({id: 'refinedstorage:raw_improved_processor'})
	event.remove({id: 'refinedstorage:improved_processor'})
	event.recipes.createMixing('refinedstorage:raw_improved_processor',
		[
			'refinedstorage:raw_basic_processor',
			'#forge:dusts/gold',
			'#forge:dusts/constantan'
		]
	).heated()
	event.recipes.thermal.crystallizer('refinedstorage:improved_processor', [(Fluid.of('minecraft:water', 250)), 'refinedstorage:raw_improved_processor'])

	event.remove({id: 'refinedstorage:raw_advanced_processor'})
	event.remove({id: 'refinedstorage:advanced_processor'})
	event.recipes.shapeless('refinedstorage:raw_advanced_processor', ['#forge:ingots/enderium', 'refinedstorage:processor_binding', 'refinedstorage:raw_improved_processor'])
	event.recipes.thermal.crystallizer('refinedstorage:advanced_processor', [(Fluid.of('thermal:glowstone', 250)), 'refinedstorage:raw_advanced_processor'])

	event.remove({id: 'refinedstorage:controller'})
	event.recipes.createMechanicalCrafting('refinedstorage:controller',
	[
		'RRWRR',
		'RPMPR',
		'WMCMW',
		'RPMPR',
		'RRWRR'
	], {
		C: '#gfz:machine_core',
		R: '#forge:ingots/cast_iron',
		P: 'refinedstorage:advanced_processor',
		M: 'quark:myalite_crystal',
		W: 'refinedstorage:cable'
	})

	let storagemetals = ['iron', 'gold', 'diamond', 'obsidian', 'netherite']
	storagemetals.forEach((metal => {
		event.remove({output: `expandedstorage:${metal}_chest`})
		event.remove({output: `expandedstorage:old_${metal}_chest`})
		event.remove({output: `expandedstorage:${metal}_barrel`})
	}))

	let conversionkits =
	[
		'expandedstorage:wood_to_copper_conversion_kit', 'expandedstorage:wood_to_iron_conversion_kit', 'expandedstorage:wood_to_gold_conversion_kit', 'expandedstorage:wood_to_diamond_conversion_kit', 'expandedstorage:wood_to_obsidian_conversion_kit', 'expandedstorage:wood_to_netherite_conversion_kit',
		'expandedstorage:copper_to_iron_conversion_kit', 'expandedstorage:copper_to_gold_conversion_kit', 'expandedstorage:copper_to_diamond_conversion_kit', 'expandedstorage:copper_to_obsidian_conversion_kit', 'expandedstorage:copper_to_netherite_conversion_kit',
		'expandedstorage:iron_to_gold_conversion_kit', 'expandedstorage:iron_to_diamond_conversion_kit', 'expandedstorage:iron_to_obsidian_conversion_kit', 'expandedstorage:iron_to_netherite_conversion_kit',
		'expandedstorage:gold_to_diamond_conversion_kit', 'expandedstorage:gold_to_obsidian_conversion_kit', 'expandedstorage:gold_to_netherite_conversion_kit',
		'expandedstorage:diamond_to_obsidian_conversion_kit', 'expandedstorage:diamond_to_netherite_conversion_kit',
		'expandedstorage:obsidian_to_netherite_conversion_kit'
	]
	conversionkits.forEach((kit => {
		event.remove({output: kit})
	}))

	// Old
	event.shapeless('expandedstorage:old_wood_chest', ['#forge:chests/wooden'])
	event.shapeless('minecraft:chest', ['expandedstorage:old_wood_chest'])
	
	// Iron
	SurroundXInYToMakeZ('#forge:chests/wooden', '#forge:plates/iron', 'expandedstorage:iron_chest')
	SurroundXInYToMakeZ('expandedstorage:old_wood_chest', '#forge:plates/iron', 'expandedstorage:old_iron_chest')
	SurroundXInYToMakeZ('#forge:barrels/wooden', '#forge:plates/iron', 'expandedstorage:iron_barrel')
	AddReflexive('expandedstorage:iron_chest', 'expandedstorage:old_iron_chest')

	// Gold
	SurroundXInYToMakeZ('expandedstorage:iron_chest', '#forge:plates/gold', 'expandedstorage:gold_chest')
	SurroundXInYToMakeZ('expandedstorage:old_iron_chest', '#forge:plates/gold', 'expandedstorage:old_gold_chest')
	SurroundXInYToMakeZ('expandedstorage:iron_barrel', '#forge:plates/gold', 'expandedstorage:gold_barrel')
	AddReflexive('expandedstorage:gold_chest', 'expandedstorage:old_gold_chest')

	// Diamond
	SurroundXInYToMakeZ('expandedstorage:gold_chest', '#forge:dusts/diamond', 'expandedstorage:diamond_chest')
	SurroundXInYToMakeZ('expandedstorage:old_gold_chest', '#forge:dusts/diamond', 'expandedstorage:old_diamond_chest')
	SurroundXInYToMakeZ('expandedstorage:gold_barrel', '#forge:dusts/diamond', 'expandedstorage:diamond_barrel')
	AddReflexive('expandedstorage:diamond_chest', 'expandedstorage:old_diamond_chest')

	// Drawers
	event.replaceInput(
		{output: 'storagedrawers:compacting_drawers_3'},
		'minecraft:iron_ingot',
		'refinedstorage:basic_processor'
	)
	event.replaceInput(
		{output: 'storagedrawers:controller_slave'},
		'minecraft:gold_ingot',
		'refinedstorage:improved_processor'
	)
	event.replaceInput(
		{output: 'storagedrawers:controller'},
		'minecraft:diamond',
		'refinedstorage:advanced_processor'
	)
	event.remove('storagedrawers:upgrade_template')
	event.shapeless('5x storagedrawers:upgrade_template', ['create:andesite_casing', 'refinedstorage:basic_processor'])

	// #endregion

	// #region Spud's Revised Recipies
	// https://modrinth.com/datapack/spuds-revised-recipes
	event.remove({id: 'minecraft:lodestone'})
	event.shaped('minecraft:lodestone',
		[
			' S ',
			'SCS',
			' S '
		],
		{
			S: 'minecraft:chiseled_stone_bricks',
			C: '#forge:storage_blocks/copper'
		}
	)
	event.remove({id: 'apotheosis:sigil_of_socketing'})
	event.shaped('apotheosis:sigil_of_socketing',
		[
			'DBD',
			'DND',
			'DAD'
		],
		{
			D: 'apotheosis:gem_dust',
			B: 'minecraft:dragon_breath',
			N: '#forge:ingots/netherite',
			A: '#forge:gems/amethyst'
		}
	)

	event.remove({id: 'minecraft:rail'})
	event.remove({id: 'minecraft:powered_rail'})
	event.remove({id: 'minecraft:detector_rail'})
	event.remove({id: 'minecraft:activator_rail'})
	event.shaped('16x minecraft:rail',
		[
			'I I',
			'ISI',
			'I I'
		],
		{
			I: '#forge:nuggets/iron',
			S: '#forge:rods/wooden'
		}
	)
	event.shaped('48x minecraft:rail',
		[
			' S ',
			'ISI',
			' S '
		],
		{
			I: '#forge:ingots/iron',
			S: '#forge:rods/wooden'
		}
	)
	event.shapeless('minecraft:powered_rail',
		[
			'minecraft:rail',
			'#forge:nuggets/gold',
			'#forge:dusts/redstone'
		]
	)
	event.shapeless('minecraft:detector_rail',
		[
			'minecraft:rail',
			'minecraft:stone_pressure_plate',
			'#forge:dusts/redstone'
		]
	)
	event.shapeless('minecraft:activator_rail',
		[
			'minecraft:rail',
			'minecraft:redstone_torch'
		]
	)
	event.shapeless('minecraft:activator_rail',
		[
			'minecraft:rail',
			'#forge:rods/wooden',
			'#forge:dusts/redstone'
		]
	)

	event.remove('minecraft:chain')
	event.shapeless('4x minecraft:chain',
		[
			'#forge:nuggets/iron',
			'#forge:ingots/iron',
			'#forge:nuggets/iron'
		]
	)
	event.shapeless('12x minecraft:chain',
		[
			'#forge:nuggets/iron',
			'#forge:ingots/iron',
			'#forge:nuggets/iron',
			'#forge:nuggets/iron',
			'#forge:ingots/iron',
			'#forge:nuggets/iron',
			'#forge:nuggets/iron',
			'#forge:ingots/iron',
			'#forge:nuggets/iron'
		]
	)
	// #endregion

	event.remove({id: 'quark:building/crafting/rope'})
	event.shapeless('quark:rope', ['#supplementaries:ropes'])
	event.shapeless('farmersdelight:rope', ['#supplementaries:ropes'])
	event.shapeless('supplementaries:rope', ['#supplementaries:ropes'])
	event.remove({id:'create:crafting/kinetics/rope_pulley'})
	event.shaped('create:rope_pulley', 
		[
			' A ',
			'RRR',
			' I '
		],
		{
			A: 'create:andesite_casing',
			R: '#supplementaries:ropes',
			I: '#forge:plates/iron'
		}
	)

	// #region Thermal Expansion Integration

	// Make gears sane
	let gearMetals = ['tin', 'lead', 'silver', 'nickel', 'bronze', 'electrum', 'invar', 'constantan', 'iron', 'gold', 'copper', 'netherite', 'lapis', 'diamond', 'emerald', 'quartz', 'signalum', 'lumium', 'enderium']
	gearMetals.forEach((metal => {
		event.remove({output: `#forge:gears/${metal}`})
		event.shaped(`#forge:gears/${metal}`,
			[
				' N ',
				'NAN',
				' N '
			],
			{
				N: `#forge:nuggets/${metal}`,
				A: 'create:andesite_alloy'
			}
		)
	}))

	// Unify sawmills
	event.remove({output: 'thermal:saw_blade'})
	event.shaped('thermal:saw_blade',
		[
			'II ',
			'ICI',
			' II'
		],
		{
			I: '#forge:plates/iron',
			C: '#forge:gears/copper'
		}
	)
	event.remove({output: 'create:mechanical_saw'})
	event.shapeless('create:mechanical_saw', ['create:andesite_casing', 'thermal:saw_blade'])

	// Make thermal machines harder to get
	event.remove({output: 'thermal:rf_coil'})
	event.remove({output: 'thermal:redstone_servo'})
	event.shapeless('thermal:rf_coil', ['#forge:dusts/redstone', '#forge:rods/gold', '#forge:dusts/redstone'])
	event.shapeless('thermal:redstone_servo', ['#forge:dusts/redstone', '#forge:rods/iron', '#forge:dusts/redstone'])
	event.remove({output: 'thermal:machine_frame'})
	event.remove({output: 'refinedstorage:machine_casing'})
	event.shaped('thermal:machine_frame',
		[
			'QGQ',
			'GCG',
			'RGR'
		], {
			Q: 'refinedstorage:quartz_enriched_iron',
			G: '#forge:glass',
			C: '#forge:gears/tin',
			R: '#gfz:upgraded_iron'
		}
	)
	event.shaped('2x thermal:machine_frame',
		[
			'QGQ',
			'GCG',
			'RGR'
		], {
			Q: 'refinedstorage:quartz_enriched_iron',
			G: '#forge:glass',
			C: '#forge:gears/constantan',
			R: '#gfz:upgraded_iron'
		}
	)
	AddReflexive('thermal:machine_frame', 'refinedstorage:machine_casing')

	// Integrate recipies
	event.remove({output: 'create:gantry_carriage'})
	event.shaped('create:gantry_carriage',
		[
			'C',
			'S',
			'G'
		], {
			C: 'create:andesite_casing',
			S: 'thermal:redstone_servo',
			G: 'create:cogwheel'
		}
	)

	event.remove({id: 'thermal:fire_charge/lumium_ingot_4'})
	event.remove({id: 'thermal:fire_charge/enderium_ingot_2'})
	event.remove({id: 'thermal:fire_charge/constantan_ingot_2'})
	event.remove({id: 'thermal:fire_charge/bronze_ingot_4'})
	event.remove({id: 'thermal:fire_charge/signalum_ingot_4'})
	event.remove({id: 'thermal:fire_charge/invar_ingot_3'})

	// #endregion

	// #region Progression pacing changes.
	// nether first.

	// dunno a better way to get eyes of ender without allowing people to skip chunks of progression
	event.remove({output: 'minecraft:ender_eye'})
	event.recipes.thermal.crystallizer
	(
		(
			Item.of
			(
				'kubejs:slumbering_eye',
				"{display:{Lore:['[\"\",{\"text\":\"It\\'s cold.\",\"color\":\"#5454FC\"}]'],Name:'[\"\",{\"text\":\"Slumbering Eye\",\"italic\":false,\"color\":\"#5454FC\"}]'},\"quark:RuneAttached\":1b,\"quark:RuneColor\":{Count:1b,id:\"quark:blue_rune\"}}"
			).enchant('unusualend:everlasting', 1)
		),
		[
			(Fluid.of('thermal:ender', 250)),
			'#gfz:rare_material'
		]
	)
	event.recipes.createMixing
	(
		(
			Item.of
			(
				'minecraft:ender_eye',
				"{display:{Lore:['[\"\",{\"text\":\"You feel it pull towards... home.\"}]'],Name:'[\"\",{\"text\":\"Eye of Ender\",\"italic\":false}]'},\"quark:RuneAttached\":1b,\"quark:RuneColor\":{Count:1b,id:\"quark:light_gray_rune\"}}"
			).enchant('unusualend:everlasting', 1)
		),
		[
			'kubejs:slumbering_eye',
			'minecraft:blaze_powder'
		]
	).superheated()
	event.recipes.thermal.centrifuge(['minecraft:ender_pearl', 'minecraft:blaze_powder'], 'minecraft:ender_eye')
	// #endregion

	event.recipes.createCutting('4x create:shaft', ['#forge:rods/andesite'])

    // #region progression nudges
	// Angel ring time
	event.remove({output: 'angelring:diamond_ring'})
	event.remove({output: 'angelring:angel_ring'})
	event.remove({output: 'angelring:energetic_angel_ring'})
	event.remove({output: 'angelring:leadstone_angel_ring'})
	event.remove({output: 'angelring:hardened_angel_ring'})
	event.remove({output: 'angelring:reinforced_angel_ring'})
	event.remove({output: 'angelring:resonant_angel_ring'})

	event.remove({output: 'irons_spellbooks:divine_pearl'})
	event.shapeless('irons_spellbooks:divine_pearl', ['#forge:ingots/electrum', '#forge:gems/amethyst'])

	event.shaped
	(
		(
			Item.of
			(
				'angelring:angel_ring',
				"{display:{Lore:['[\"\",{\"text\":\"It hums with the power of divinity.\",\"color\":\"#ea6f14\"}]'],Name:'[\"\",{\"text\":\"Angel Ring\",\"italic\":false,\"color\":\"#ea6f14\"}]'},\"quark:RuneAttached\":1b,\"quark:RuneColor\":{Count:1b,id:\"quark:orange_rune\"}}"
			).enchant('unusualend:everlasting', 1)
		),
		[
			' V ',
			'DBD',
			' G '
		],
		{
			V: 'alexsmobs:void_worm_eye',
			B: 'unusualend:bottled_shulker_bullet',
			D: 'irons_spellbooks:divine_pearl',
			G: 'apotheosis:mythic_material'
		}
	)

	// Storage drawers keys
	event.remove({output: 'storagedrawers:drawer_key'})
	event.shaped
	(
		'storagedrawers:drawer_key',
		[
			'NR',
			' R',
			' T'
		],
		{
			N: '#forge:nuggets/gold',
			R: '#forge:rods/gold',
			T: 'storagedrawers:upgrade_template'
		}
	)
	event.shaped
	(
		'2x storagedrawers:drawer_key',
		[
			'NR',
			' R',
			' T'
		],
		{
			N: '#forge:nuggets/brass',
			R: '#forge:rods/brass',
			T: 'storagedrawers:upgrade_template'
		}
	)

	// Apoth progression
	event.shaped
	(
		'apotheosis:simple_reforging_table',
		[
			'PSP',
			'GDG',
			'OOO'
		],
		{
			G: 'apotheosis:gem_dust',
			P: '#forge:plates/iron',
			D: 'minecraft:diamond',
			S: 'minecraft:smooth_stone',
			O: 'minecraft:obsidian'
		}
	)

	// Cheaper anvils
	event.shaped
	(
		'minecraft:anvil',
		[
			'IBI',
			' B '
		],
		{
			I: '#forge:ingots/cast_iron',
			B: 'createbigcannons:cast_iron_block'
		}
	)

	event.shaped
	(
		'minecraft:anvil',
		[
			'IBI',
			'NIN'
		],
		{
			I: '#forge:ingots/steel',
			B: '#forge:storage_blocks/steel',
		    N: '#forge:nuggets/steel'
		}
	)

	// #endregion

	event.remove({id: "irons_spellbooks:poisonous_potato"})
	SurroundXInYToMakeZ('#irons_spellbooks:nature_focus', 'minecraft:potato', '4x minecraft:poisonous_potato')
	SurroundXInYToMakeZ('#irons_spellbooks:nature_focus', 'farmersdelight:tomato', '4x farmersdelight:rotten_tomato')
	SurroundXInYToMakeZ('#irons_spellbooks:nature_focus', 'vinery:cherry', '4x vinery:rotten_cherry')
})

ServerEvents.tags('block', event => {
	event.get('blockrunner:quick_blocks').add('infernalexp:crimson_nylium_path')
	event.get('blockrunner:quick_blocks').add('infernalexp:warped_nylium_path')
	event.get('blockrunner:quick_blocks').add('infernalexp:soul_soil_path')
	event.get('blockrunner:quick_blocks').add('rechiseled:stone_path')
	event.get('blockrunner:quick_blocks').add('rechiseled:stone_path_connecting')
	event.get('blockrunner:quick_blocks').add('atmospheric:crustose_path')

	event.get('blockrunner:slightly_quick_blocks').add('iceandfire:chared_dirt_path')
	event.get('blockrunner:slightly_quick_blocks').add('iceandfire:frozen_dirt_path')
	event.get('blockrunner:slightly_quick_blocks').add('iceandfire:crackled_dirt_path')
})

ServerEvents.tags('item', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')

	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')

	event.get('forge:ash').add('immersive_weathering:ash_layer_block')

	event.get('gfz:ash_block').add('iceandfire:ash')
	event.get('gfz:ash_block').add('immersive_weathering:ash_block')

	event.get('quark:stone_tool_materials').add('create_dd:gabbro')

	event.get('gfz:rabbit_foot').add('minecraft:rabbit_foot')
	event.get('gfz:rabbit_foot').add('apotheosis:lucky_foot')

	event.get('gfz:spooky').add('iceandfire:ectoplasm')
	event.get('gfz:spooky').add('minecraft:phantom_membrane')

	event.get('gfz:spider_egg').add('minecraft:spider_spawn_egg')
	event.get('gfz:spider_egg').add('minecraft:cave_spider_spawn_egg')
	event.get('gfz:spider_egg').add('neapolitan:plantain_spider_spawn_egg')

	event.get('gfz:small_ice').add('minecraft:snowball')
	event.get('gfz:small_ice').add('neapolitan:ice_cubes')

	event.get('gfz:pixie_jar').add('iceandfire:pixie_jar_0')
	event.get('gfz:pixie_jar').add('iceandfire:pixie_jar_1')
	event.get('gfz:pixie_jar').add('iceandfire:pixie_jar_2')
	event.get('gfz:pixie_jar').add('iceandfire:pixie_jar_3')
	event.get('gfz:pixie_jar').add('iceandfire:pixie_jar_4')

	event.get('gfz:machine_core').add('thermal:machine_frame')
	event.get('gfz:machine_core').add('refinedstorage:machine_casing')

	event.get('irons_spellbooks:blood_focus').add('alexsmobs:blood_sac')
	event.get('irons_spellbooks:blood_focus').add('alexsmobs:mosquito_proboscis')
	event.get('irons_spellbooks:ice_focus').add('thermal:blizz_rod')
	event.get('irons_spellbooks:lightning_focus').add('thermal:blitz_rod')
	event.get('irons_spellbooks:nature_focus').add('farmersdelight:rotten_tomato')
	event.get('irons_spellbooks:nature_focus').add('vinery:rotten_cherry')
	event.get('irons_spellbooks:nature_focus').add('thermal:basalz_rod')

	event.get('gfz:shell').add('twigs:bronzed_seashell')
	event.get('gfz:shell').add('twigs:opaline_seashell')
	event.get('gfz:shell').add('twigs:roseate_seashell')
	event.get('gfz:shell').add('twigs:tangerine_seashell')
	event.get('gfz:shell').add('minecraft:nautilus_shell')

	event.get('gfz:prismarine_shard').add('minecraft:prismarine_shard')
	event.get('gfz:prismarine_shard').add('philipsruins:frozen_prismarine_shard')

	event.get('gfz:common_material').add('apotheosis:common_material')
	event.get('gfz:uncommon_material').add('apotheosis:uncommon_material')
	event.get('gfz:rare_material').add('apotheosis:rare_material')
	event.get('gfz:epic_material').add('apotheosis:epic_material')
	// ffs why is this the only place where Apoth and Iron's differs.
	event.get('gfz:legendary_material').add('apotheosis:mythic_material')

	event.get('quark:stone_tool_materials').add('twigs:rocky_dirt')
	event.get('quark:stone_tool_materials').add('twigs:pebble')
	event.get('philipsruins:bone_chunk').add('twigs:pebble')

	event.get('gfz:upgraded_iron').add('createbigcannons:cast_iron_ingot')
	event.get('gfz:upgraded_iron').add('thermal:steel_ingot')
})

ServerEvents.entityLootTables(event => {
	// These are set here instead of via LootJS because this adds them to JEI.
	// If I move the modpack to a later MC version, not as much of a problem.

	event.modifyEntity('rottencreatures:frostbitten', table => {
		table.addPool(pool => {
			pool.addItem('iceandfire:dread_key').randomChance(0.01)
		})
		table.addPool(pool => {
			pool.addItem('thermal:silver_nugget').randomChance(0.2)
		})
	})

	event.modifyEntity('minecraft:zombie', table => {
		table.addPool(pool => {
			pool.rolls = [0, 2]
			pool.addItem('minecraft:feather', 10, [0, 2])
			pool.addItem('minecraft:iron_nugget', 2, [0, 1])
			pool.addItem('apotheosis:common_material', 3, [0, 1])
			pool.addItem('quark:clear_shard', 3, [0, 4])
			pool.addItem('quark:dirty_shard', 3, [0, 4])
			pool.addItem('minecraft:stick', 10, [0, 1])
			pool.addItem('minecraft:emerald', 1, [0, 1])
		})
	})

	event.modifyEntity('minecraft:husk', table => {
		table.addPool(pool => 
		{
			pool.rolls = [0, 2]
			pool.addItem('minecraft:sand', 2, [1, 2])
			pool.addItem('minecraft:red_sand', 2, [1, 2])
			pool.addItem('apotheosis:common_material', 1, [0, 1])
		})
	})

	event.modifyEntity('minecraft:skeleton', table => {
		table.addPool(pool => {
			pool.addItem('thermal:tin_nugget').randomChance(0.2)
		})
	})

	event.modifyEntity('minecraft:drowned', table => {
		table.addPool(pool => {
			pool.rolls = [0, 2]
			pool.addItem('create:copper_nugget', 1, [0, 2])
			pool.addItem('twigs:bronzed_seashell', 1, [0, 1])
			pool.addItem('twigs:opaline_seashell', 1, [0, 1])
			pool.addItem('twigs:roseate_seashell', 1, [0, 1])
			pool.addItem('twigs:tangerine_seashell', 1, [0, 1])
			pool.addItem('upgrade_aquatic:driftwood_log', 1, [0, 1])
			pool.addItem('minecraft:leather', 1, 1)
			pool.addItem('minecraft:stick', 1, 1)
		})
	})

	event.modifyEntity('rottencreatures:swampy', table => {
		table.addPool(pool => {
			pool.addItem('thermal:lead_nugget').randomChance(0.2)
		})
	})

	event.modifyEntity('minecraft:zoglin', table => {
		table.addPool(pool => {
			pool.addItem('infernalexp:raw_hogchop').randomChance(0.9)
		})
	})

	event.modifyEntity('irons_spellbooks:citadel_keeper', table => {
		table.addPool(pool => {
			pool.rolls = [0, 2]
			pool.addItem('apotheosis:common_material', 8, [0, 2])
			pool.addItem('apotheosis:uncommon_material', 4, [0, 2])
			pool.addItem('apotheosis:rare_material', 1, [0, 2])
		})
	})
})
