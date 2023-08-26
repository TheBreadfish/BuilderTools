const minecraftData = require('minecraft-data')
const mcData = minecraftData('1.19.1')


exports.block = function(name) {
    console.log('test: '+JSON.stringify(mcData.blockByName, null, 2))

    return(mcData.blocksByName[name])
}
exports.blockId = function(id) {
    return(mcData[id])
}
exports.blockTexture = function(name) {
    return('https://raw.githubusercontent.com/PrismarineJS/minecraft-assets/a61c02ef597e56a6b961d62af1c9b02c05757e9d/data/1.19.1/blocks/'+name+'.png')
}



exports.item = function(name) {
    let food = mcData.foodsByName[name]

    if(food) {
        food['food'] = true
        return(food)
    } else {
        let item = mcData.itemsByName[name]
        item['food'] = false
        return(item)
    }
}
exports.itemId = function(id) {
    let food = mcData.foods[id]

    if(food) {
        food['food'] = true
        return(food)
    } else {
        let item = mcData.items[id]
        item['food'] = false
        return(item)
    }
}