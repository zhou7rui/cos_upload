"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// const sourceDir = core.getInput("source_dir");
// const targetDir = core.getInput("target_dir");
// const bucket = core.getInput("bucket");
// const region = core.getInput("region");
// const secretId = core.getInput("secretId");
// const secretKey = core.getInput("secretKey");
// const cos = new COS({
//     SecretId: secretId,
//     SecretKey: secretKey,
//   });
// const files = lsFile(sourceDir).map((file) => {
//   return {
//     Bucket: bucket,
//     Region: region,
//     Key: `${targetDir}/${file}`,
//     FilePath: file,
//   };
// });
// cos.uploadFiles(
//   {
//     files,
//     SliceSize: 1024 * 1024,
//     onProgress:  (info) => {
//         const percent = info.percent * 10000 / 100;
//         const speed = info.speed / 1024 / 1024 * 100 / 100;
//         console.log('进度：' + percent + '%; 速度：' + speed + 'Mb/s;');
//     },
//     onFileFinish:(err, data) => {
//         console.log(data + '上传' + (err ? '失败' : '完成'));
//     },
//   },
//   (err, data) => {
//     console.log(err || data);
//   }
// );
console.log(lsFile("./test.txt"));
function lsFile(dir) {
    const pwd = process.cwd();
    const basePath = path_1.default.resolve(pwd, dir);
    const fileStat = fs_1.statSync(basePath);
    if (fileStat.isFile()) {
        return [basePath];
    }
    const result = [];
    (function iterator(dir, result) {
        const files = fs_1.readdirSync(dir);
        files.forEach((file) => {
            const filePath = path_1.default.join(dir, file);
            const fileStat = fs_1.statSync(path_1.default.join(filePath));
            if (fileStat.isFile()) {
                result.push(filePath);
                return result;
            }
            iterator(basePath, result);
        });
    })(dir, result);
    return result;
}
