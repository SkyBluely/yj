var fs = require('fs');
/**
 * 创建文件
 */
exports.createFile = function (obj) {
    const { path, data } = obj;
    return new Promise((resolve, reject) => {
        fs.writeFileSync(path, data, (err) => {
            if (err) {
                reject({ status: 1, data: err, message: "失败" })
            } else {
                resolve({ status: 0, data: [], message: "成功" })
            }
        })
    })

}
/**
 * 创建文件夹
 */
exports.createMkdir = function (obj) {
    const { path } = obj;
    return new Promise((resolve, reject) => {
        fs.mkdir(path, (err) => {
            if (err) {
                reject({ status: 1, data: err, message: "失败" })
            } else {
                resolve({ status: 0, data: [], message: "成功" })
            }
        })
    })

}
//这种暴露的方式，和上面暴露的方式，相同
// module.exports = {
//     createFile,
//     createMkdir
// }