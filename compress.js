// require modules
const fs = require('fs');
const archiver = require('archiver');
const output = fs.createWriteStream(__dirname + '/archive.zip');
const archive = archiver('zip', {
  zlib: { level: 9 }
});
const rootPath = __dirname + '/output';

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);
function createArchive() {

    const appendRecursive = (dirs, path = rootPath, prefix = '') => {

        for(let dir of dirs) {
            const actualDir = `${path}/${dir}`;
            const isDir = fs.existsSync(actualDir) && fs.lstatSync(actualDir).isDirectory();

            if(isDir) {
                archive.file(actualDir, { name: `${prefix}${dir}` });
                appendRecursive(fs.readdirSync(actualDir), actualDir, `${dir}/`);
            } else {
                archive.file(actualDir, { name: `${prefix}${dir}` });
            }

        }

    }

    appendRecursive(fs.readdirSync(rootPath));
    archive.finalize();
}

createArchive();


