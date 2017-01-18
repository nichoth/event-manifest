// create from an object with function leaf nodes
function Manifest (obj) {
    var m = Object.keys(obj).map(function (k) {
        return {
            key: k,
            val: obj[k]
        }
    }).reduce(function reduce (acc, node) {
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

    return m
}

module.exports = Manifest

