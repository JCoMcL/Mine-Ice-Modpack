// priority: 0

// Visit the wiki for more info - https://kubejs.com/

var s = "purecoppertools:copper_nugget"

ServerEvents.recipes(event => {
    event.remove({input: s})
    event.remove({output: s})
})

