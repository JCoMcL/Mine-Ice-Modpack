// priority: 0

// Visit the wiki for more info - https://kubejs.com/

let remove = [
	"purecoppertools:copper_nugget",
]
let replace = {
	"supplementaries:altimeter": "spelunkery:depth_gauge"
}

ServerEvents.recipes(e => {
	for (var itm in remove) {
		e.remove({input: itm})
		e.remove({output: itm})
	}
	for (var k in replace) {
		e.replaceInput({input:k}, k, replace[k])
		e.remove({output: k})
	}
})

/*
RecipeViewerEvents.removeEntriesCompletely('item', event => {
	for (var itm in remove) {
		e.remove(itm)
	}
	for (var k in replace) {
		e.remove(k)
	}
})
*/
