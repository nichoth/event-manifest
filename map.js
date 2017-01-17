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

