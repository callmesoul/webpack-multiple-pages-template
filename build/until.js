var glob = require('glob');

function getEntry() {
    var entry = {};
    //读取src目录所有page入口
    glob.sync('./src/js/**/*.js').forEach(function (name) {
        var start = name.indexOf('src/') + 4;
        var end = name.length - 3;
        var eArr = [];
        var n = name.slice(start, end);
        n = n.split('/')[1];
        eArr.push(name);
        eArr.push('babel-polyfill'); //引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
        entry[n] = eArr;
    })
    return entry;
}

function getHtmlConfig(name, chunks) {
    return {
        template: `./src/pages/${name}.html`,
        filename: `pages/${name}.html`,
        inject: true,
        hash: false,
        chunks: [name]
    }
}

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = {
    getEntry: function () {
        var entry = {};
        //读取src目录所有page入口
        glob.sync('./src/js/**/*.js').forEach(function (name) {
            var start = name.indexOf('src/') + 4;
            var end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.split('/')[1];
            eArr.push(name);
            eArr.push('babel-polyfill'); //引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
            entry[n] = eArr;
        })
        return entry;
    },
    getHtmlConfig: function (name, chunks) {
        let env = process.env.NODE_ENV;
        let isMini = env === 'development' ? false : true;
        return {
            template: `./src/pages/${name}.html`,
            filename: `${name}.html`,
            inject: true,
            hash: isMini,
            chunks: [name],
            minify: {
                minimize: isMini, // 是否打包为最小值
                removeAttributeQuotes: isMini, //去除引号
                removeComments: isMini, //去除注释
                collapseWhitespace: isMini, // 去除空格
                minifyCSS: isMini, // 压缩html内的样式
                minifyJS: isMini, // 压缩html内的js
                removeEmptyElements: isMini, // 清理内容为空的元素
            },
        }
    },
};