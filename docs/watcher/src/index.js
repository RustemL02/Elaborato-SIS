import * as Process from 'child_process';
import { Source } from './source.js';
import { Command } from './command.js';
let src = new Source('..', '../out', ['../out']);
src.watchFiles('md', (src, out, name) => {
    let srcFile = `${src}/${name}`, outFile = `${out}/${name}`;
    outFile = outFile.replace('md', 'pdf');
    let cmd = new Command('pandoc', [
        '-H', '../preamble.tex',
        '../header.yaml',
        srcFile, '-o', outFile
    ]);
    let prc = Process.spawn(cmd.command(), cmd.options());
    prc.on('exit', (code) => {
        if (code == 0) {
            console.log(`Translating \x1b[32m'${srcFile}'\x1b[0m`, `=> \x1b[32m'${outFile}'\x1b[0m... `, `\x1b[34mDone\x1b[0m!`);
        }
        else {
            console.error(`\x1b[31mERROR\x1b[0m: translation of \x1b[32m'${srcFile}\x1b[0m' failed.`);
        }
    });
});
