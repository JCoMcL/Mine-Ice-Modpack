global.consolidate = function (itemList, tag, event) {
	let recipeTypeExclusion = ['farmersdelight:cooking'].map(s => {return {type: s}})
	let eventType = event.toString().match(/\.([^.@]+)@/)[1]
	if (eventType == 'RecipesEventJS') {
		itemList.forEach(itm => {
			event.replaceInput({input: itm, not: recipeTypeExclusion}, itm, '#' + tag)
		})
	} else if (eventType == 'PreTagEventJS') {
		itemList.forEach(itm => {
			event.add(tag, itm)

		})
	}
}
