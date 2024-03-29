// priority: 0

console.info('Hello, World! (You will only see this line once in console, during startup)')

onEvent('item.registry', event => {
	// Register new items here
	// event.create('example_item').displayName('Example Item')
})

onEvent('block.registry', event => {
	// Register new blocks here
	// event.create('example_block').material('wood').hardness(1.0).displayName('Example Block')
})

onEvent("morejs.potion_brewing.register", event => { 
	// https://github.com/AlmostReliable/morejs/wiki/Potion-Brewing
	event.addPotionBrewing('#forge:dusts/lead', 'minecraft:awkward', 'minecraft:poison')
	event.addPotionBrewing('minecraft:poisonous_potato', 'minecraft:awkward', 'minecraft:poison')
})