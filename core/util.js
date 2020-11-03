const jwt = require('jsonwebtoken') // token生成包
/***
 * 
 */
const findMembers = function (instance, {
    prefix,
    specifiedType,
    filter
}) {
    // 递归函数
    function _find(instance) {
        //基线条件（跳出递归）
        if (instance.__proto__ === null)
            return []

        let names = Reflect.ownKeys(instance)
        names = names.filter((name) => {
            // 过滤掉不满足条件的属性或方法名
            return _shouldKeep(name)
        })

        return [...names, ..._find(instance.__proto__)]
    }

    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) {
                return true
            }
        }
        if (prefix)
            if (value.startsWith(prefix))
                return true
        if (specifiedType)
            if (instance[value] instanceof specifiedType)
                return true
    }

    return _find(instance)
}

// 颁发令牌
const generateToken = function (uid, scope) { // 用户uid 用户权限scope
    const secretKey = global.config.security.secretKey // 私有钥匙
    const expiresIn = global.config.security.expiresIn // 有效时间
    const token = jwt.sign({ // 生成令牌调用
        uid,
        scope
    }, secretKey, {
        expiresIn
    })

    return token
}

module.exports = {
    findMembers,
    generateToken
}