// priority: 0

// Visit the wiki for more info - https://kubejs.com/

ServerEvents.recipes(event => {
    event.remove({output: 'suppsquared:copper_lantern'})

    event.shaped(
        'suppsquared:copper_lantern',
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
})

