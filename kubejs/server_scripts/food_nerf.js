let bowls = ['minecraft:bowl','ecologics:coconut_husk']
function consolidate(e) {
	global.consolidate(bowls, 'minecraft:bowls', e)
}

function reduceStackSize(item, i) {
	item.setMaxStackSize(Math.min(i, item.maxStackSize))
}

var foodItems = []
Ingredient.all.stacks.toList().forEach(stack => {
	let item = stack.item
	if (item.foodProperties) {
		foodItems.push(item)
		if (item.id.split(':')[0] == 'chestcavity')
			return
		reduceStackSize(item, 8)
	}
})

ServerEvents.recipes(e => {
	consolidate(e)
	e.shapeless(Item.of(bowls[0]), [bowls[1]]) //TODO add this to consolidate() ?
	e.remove({type: 'minecraft:crafting_shaped', output: 'minecraft:bread'})

	function replaceByServingContainer(container) {
		if (typeof container == 'string') 
			container = [container]

		e.forEachRecipe(container.map(itm => {
			return {not: {mod: 'farmersdelight'}, input: itm, type: 'minecraft:crafting_shapeless'}
		}), r => {
			r.remove()
			let o = JSON.parse(r.json)

			if (e.countRecipes({type:'farmersdelight:cooking'}))

			e.custom({
				type: 'farmersdelight:cooking',
				ingredients: o.ingredients.filter(i => !container.includes(i.item)),
				result: o.result,
				container: {item: container[0]} //FD doesn't allow tags or lists for container :(
			})
		})
	}
	replaceByServingContainer(bowls)
	replaceByServingContainer('aquamirae:sea_stew')

	//make all prepared food stack to only one
	foodItems.forEach(item => {
		//ignore food that can be cooked
		if (e.countRecipes({input: item.id, type: 'minecraft:smelting'}))
			return

		var maxCreatable = 0
		e.forEachRecipe({output: item.id, not: {type: 'farmersdelight:cutting'}}, r => {
			let o = JSON.parse(r.json)
			var count = o.result.count ? o.result.count : 1
			maxCreatable = Math.max(maxCreatable, count)
			//TODO this would be a great place to handle maxCreatable > 8
		})
		if (maxCreatable)
			reduceStackSize(item, maxCreatable)
	})

})

ServerEvents.tags('item', e => {
	consolidate(e)
})

