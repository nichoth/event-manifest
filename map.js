var Event = require('./event')

var map = {
    categories: {
        update: function () {},
        del: function () {}
    },
    keywords: {
        update: function () {},
        delete: function () {}
    }
}

var manifest = [
    ['categories', ['update', 'del']],
    ['keywords', ['update', 'delete']]
]

var oneEvent = ['categories', ['update', { id: '123' }]]

function handleEvent (handlers, ev) {
    var type = Event.type(ev)
    if (typeof handlers[type] === 'function') {
        return handlers[type](Event.data(ev))
    }
    if (typeof handlers[type] === 'object') {
        return handleEvent(handlers[type], Event.data(ev))
    }
    throw new Error('invalid event ' + JSON.stringify(ev))
}

handleEvent(map, oneEvent) // this is ok

// this is bad
// handleEvent(map, ['categories', ['bad method', { id: '123' }]])

var m = Object.keys(map).map(function (k) {
    return {
        key: k,
        val: map[k]
    }
})
.reduce(function reduce (acc, node) {
    if (typeof node.val === 'function') {
        acc.push(node.key)
        return acc
    }

    var children = Object.keys(node.val).map(function (k) {
        return { key: k, val: node.val[k] }
    }).reduce(reduce, [])
    var _node = [node.key, children]
    acc.push(_node)
    return acc
}, [])

console.log(m)

