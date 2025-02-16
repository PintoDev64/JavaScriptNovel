const { spawn } = require("node:child_process");

console.log("Bin Command Start...");

const ls = spawn("electron", ["./dist/index.js"], {
    cwd: process.cwd(),
    shell: true,
    windowsHide: true
});

ls.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
});

ls.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
});