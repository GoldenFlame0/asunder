// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

let wool_colours = ['white', 'orange', 'magenta', 'light_blue', 'yellow', 'lime', 'pink', 'gray', 'light_gray', 'cyan', 'purple', 'blue', 'brown', 'green', 'red', 'black']

onEvent('recipes', event => {
	// Rotten Flesh to Leather
	event.smelting('minecraft:leather', 'minecraft:rotten_flesh')
	event.smoking('minecraft:leather', 'minecraft:rotten_flesh')
	event.campfireCooking('minecraft:leather', 'minecraft:rotten_flesh')

	event.remove({id: 'immersive_weathering:ash_layer_block'})
	event.shapeless('immersive_weathering:ash_layer_block', ['immersive_weathering:soot', 'immersive_weathering:soot'])
	event.shapeless('6x immersive_weathering:ash_layer_block', ['#gfz:ash_block', '#gfz:ash_block', '#gfz:ash_block'])
	
	//#region Removing unused stuff
	event.remove({output: '#forge:gears'})
	event.remove({output: 'thermal:upgrade_augment_1'})
	event.remove({output: 'thermal:upgrade_augment_2'})
	event.remove({output: 'thermal:upgrade_augment_3'})
	event.remove({output: 'thermal:signalum_ingot'})
	event.remove({output: 'thermal:fluid_tank_augment'})
	event.remove({id: 'createaddition:mixing/bioethanol'})
	//#endregion

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

	//#region Netherite Forging
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

	event.remove({id: 'upgradednetherite:gold_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:gold_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'#forge:ingots/gold',
		'#gfz:rabbit_foot'
	]).superheated()

	event.remove({id: 'upgradednetherite:fire_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:fire_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'create_dd:blaze_gold'
	])

	event.remove({id: 'upgradednetherite:ender_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:ender_upgraded_netherite_ingot', 
	[
		'minecraft:netherite_ingot',
		'#forge:ingots/enderium'
	]).superheated()
	event.remove({output:'thermal:enderium_dust'})
	event.remove({output:'thermal:ender_pearl_dust'})
	event.recipes.createMixing('2x thermal:enderium_ingot', 
	[
		'#forge:ingots/lead',
		'#forge:ingots/lead',
		'#forge:dusts/diamond',
		'#forge:ender_pearls',
		'#forge:ender_pearls'
	]).heated()

	event.remove({id: 'upgradednetherite:water_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:water_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'iceandfire:frost_stew'
	]).superheated()

	event.remove({id: 'upgradednetherite:wither_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:wither_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'minecraft:wither_skeleton_skull'
	]).superheated()
	event.recipes.createMixing('upgradednetherite:wither_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'#forge:bones/wither',
		'#forge:bones/wither',
		'#forge:bones/wither',
		'#forge:bones/wither'
	]).superheated()

	event.remove({id: 'upgradednetherite:poison_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:poison_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'#gfz:spider_egg'
	]).superheated()

	event.remove({id: 'upgradednetherite:phantom_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:phantom_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'minecraft:phantom_membrane',
		'iceandfire:ghost_ingot'
	]).superheated()

	event.remove({id: 'upgradednetherite:feather_upgraded_netherite_ingot'})
	event.recipes.createMixing('upgradednetherite:feather_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'#forge:ingots/nickel',
		'supplementaries:feather_block'
	]).superheated()

	event.remove({id: 'upgradednetherite:corrupt_upgraded_netherite_ingot'})
	event.recipes.createMixing('2x upgradednetherite:corrupt_upgraded_netherite_ingot',
	[
		'minecraft:netherite_ingot',
		'rottencreatures:corrupted_wart',
		'rottencreatures:magma_rotten_flesh',
		'minecraft:ghast_tear',
		'#forge:heart'
	])
	//#endregion
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

	let metalcolors = ['white', 'blue', 'black', 'red', 'green', 'brown', 'gray']
	let dustyMetals = ['silver', 'copper', 'lead', 'iron', 'nickel', 'gold', 'tin']
	dustyMetals.forEach((metal, index) =>
	{
		event.recipes.createMilling(`thermal:${metal}_dust`, [`#forge:ingots/${metal}`])
		event.shapeless(`minecraft:${metalcolors[index]}_dye`, [`#forge:dusts/${metal}`])
	})

	//#region Apotheosis Materials
	event.shapeless('2x apotheosis:common_material', ['apotheosis:uncommon_material'])
	event.shapeless('2x apotheosis:uncommon_material', ['apotheosis:rare_material'])
	event.shapeless('2x apotheosis:rare_material', ['apotheosis:epic_material'])
	event.shapeless('2x apotheosis:epic_material', ['apotheosis:mythic_material'])

	event.recipes.createCrushing('apotheosis:gem_dust', ['apotheosis:gem'])
	event.recipes.createMilling('apotheosis:gem_dust', ['apotheosis:gem'])
	//#endregion

	event.recipes.createMixing('1x create_dd:bronze_ingot',
	[
		'2x #forge:ingots/bronze',
		'4x #forge:nuggets/zinc'
	]).superheated()

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

	event.remove({output: 'createaddition:capacitor'})
	event.shapeless('createaddition:capacitor', [])

	event.shaped(
		'2x create:electron_tube',
		[
			'R',
			'C'
		],
		{
			R: 'create:polished_rose_quartz',
			C: '#forge:ingots/constantan'
		}
	)

	//#endregion

	//#region neapolitan and create dd
	event.remove({id: 'create_dd:mixing/cream'})
	event.recipes.createMixing(
		Fluid.of('create_dd:cream', 250),
		[
			Fluid.of('create_dd:condense_milk', 250),
			'8x #gfz:small_ice'
		]
	)

	function fixIceCream(icecream, keyIngredient)
	{
		event.remove({output: icecream})
		event.shapeless(
			icecream,
			[
				'minecraft:bowl',
				keyIngredient,
				'create_dd:cream_bucket'
			]
		).replaceIngredient('create_dd:cream_bucket', 'minecraft:bucket')
	}
	fixIceCream('neapolitan:chocolate_ice_cream', '#supplementaries:chocolate_bars')
	fixIceCream('neapolitan:strawberry_ice_cream', '#forge:fruits/strawberry')
	fixIceCream('neapolitan:vanilla_ice_cream', 'neapolitan:dried_vanilla_pods')
	fixIceCream('neapolitan:banana_ice_cream', '#forge:fruits/banana')
	fixIceCream('neapolitan:mint_ice_cream', 'neapolitan:mint_leaves')
	fixIceCream('neapolitan:adzuki_ice_cream', 'neapolitan:roasted_adzuki_beans')
	fixIceCream('respiteful:green_tea_ice_cream', 'farmersrespite:green_tea_leaves')
	fixIceCream('respiteful:yellow_tea_ice_cream', 'farmersrespite:yellow_tea_leaves')
	fixIceCream('respiteful:black_tea_ice_cream', 'farmersrespite:black_tea_leaves')
	fixIceCream('respiteful:coffee_ice_cream', 'farmersrespite:coffee_beans')

	event.remove({output: 'neapolitan:neapolitan_ice_cream'})
	event.shapeless(
		'neapolitan:neapolitan_ice_cream',
		[
			'neapolitan:vanilla_ice_cream',
			'#supplementaries:chocolate_bars',
			'#forge:fruits/strawberry'
		]
	)
	event.shapeless(
		'neapolitan:neapolitan_ice_cream',
		[
			'neapolitan:chocolate_ice_cream',
			'#forge:fruits/strawberry',
			'neapolitan:dried_vanilla_pods'
		]
	)
	event.shapeless(
		'neapolitan:neapolitan_ice_cream',
		[
			'neapolitan:strawberry_ice_cream',
			'neapolitan:dried_vanilla_pods',
			'#supplementaries:chocolate_bars'
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

	event.remove({output: 'create_dd:spectral_ruby'})
	event.recipes.createMixing(
		'create_dd:spectral_ruby',
		[
			'#quark:corundum', '#quark:corundum', '#quark:corundum',
			'#quark:corundum', '#forge:dusts/glowstone', '#quark:corundum',
			'#quark:corundum', '#quark:corundum', '#quark:corundum'
		]
	).heated()

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
				W: `minecraft:${colour}_wool`,
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

	// Storage progresion
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
	
	event.replaceInput(
		{output: 'refinedstorage:raw_advanced_processor'},
		'minecraft:diamond',
		'#forge:ingots/enderium'
	)
	event.remove({id: 'refinedstorage:controller'})
	event.recipes.createMechanicalCrafting('refinedstorage:controller',
	[
		'RRWRR',
		'RPMPR',
		'WMCMW',
		'RPMPR',
		'RRWRR'
	], {
		C: 'refinedstorage:machine_casing',
		R: '#forge:ingots/industrial_iron',
		P: 'refinedstorage:advanced_processor',
		M: 'quark:myalite_crystal',
		W: 'refinedstorage:cable'
	})
})

onEvent('block.tags', event => {
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

onEvent('item.tags', event => {
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
})

onEvent('entity.loot_tables', event => {
	event.modifyEntity('rottencreatures:frostbitten', table => {
		table.addPool(pool => {
			pool.addItem('iceandfire:dread_key').randomChance(0.01)
		})
	})

	event.modifyEntity('minecraft:zombie', table => {
		table.addPool(pool => {
			pool.addItem('minecraft:feather', 1, [0, 2])
		})
	})
})