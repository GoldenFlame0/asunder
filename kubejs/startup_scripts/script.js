// priority: 0

console.info('Startup script says hello!')

StartupEvents.registry('item', event => {
	event.create('slumbering_eye')
})

MoreJSEvents.registerPotionBrewing((event) => {
	event.addPotionBrewing('#forge:dusts/lead', 'minecraft:awkward', 'minecraft:poison');
	event.addPotionBrewing('minecraft:poisonous_potato', 'minecraft:awkward', 'minecraft:poison');
});
