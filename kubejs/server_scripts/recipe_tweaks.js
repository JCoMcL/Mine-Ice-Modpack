// priority: 0

// Visit the wiki for more info - https://kubejs.com/

function replace_shaped(event, item_id, pattern, pattern_keys) {
	event.remove({output: item_id})
	event.shaped(item_id, pattern, pattern_keys)
}

ServerEvents.recipes(event => {
	replace_shaped(event, 'suppsquared:copper_lantern',
		['C','T','C'],
		{
			C: 'minecraft:copper_ingot', 
			T: 'minecraft:torch'
		})

	event.shaped(
		'minecraft:item_frame',
		['SSS','SHS','SSS'],
		{
			S: 'minecraft:stick', 
			H: 'minecraft:rabbit_hide'
	})

	event.remove({output: 'minecraft:ender_eye'})
	function special_eye(a, b, c, d) {
		event.shaped(
			'minecraft:ender_eye', 
			[' A ','BPC',' D '],
			{P:'minecraft:ender_pearl',A:a,B:b,C:c,D:d}
		)
	}
	special_eye('graveyard:corruption', 'minecraft:blaze_powder', 'minecraft:prismarine_crystals', 'bewitchment:demon_heart')
	special_eye('spelunkery:raw_magnetite_nugget','netherexp:will_o_wisp','aquamirae:ship_graveyard_echo','chestcavity:ender_heart')
})

