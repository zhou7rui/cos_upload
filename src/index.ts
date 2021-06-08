import COS from "cos-nodejs-sdk-v5";
import { readdirSync, statSync } from "fs";
import path from "path";
import core, { info } from "@actions/core";

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

function lsFile(dir: string) {
  const pwd =  process.cwd();

  const basePath = path.resolve(pwd,dir)

  const fileStat = statSync(basePath);
  if (fileStat.isFile()) {
    return [basePath];
  }

  const result: string[] = [];
  (function iterator(dir: string, result: string[]) {
    const files = readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const fileStat = statSync(path.join(filePath));
      if (fileStat.isFile()) {
        result.push(filePath);
        return result;
      }
      iterator(basePath, result);
    });
  })(dir, result);
  return result;
}
