const core = require('@actions/core');
const child_process = require('child_process');
const commandExists = require('command-exists');

const managers = {
    "apt": {
        "check": "apt",
        "command": "sudo apt update && sudo apt install"
    },
    "apt-get": {
        "check": "apt-get",
        "command": "sudo apt-get update && sudo apt-get install"
    },
    "brew": {
        "check": "brew",
        "command": "brew update && brew install"
    },
    "vcpkg": {
        "check": "vcpkg",
        "command": "vcpkg update && vcpkg install"
    }
};

try {
    let pkgs;
    for (let [mgr, info] of Object.entries(managers)) {
        if (commandExists.sync(info.check)) {
            pkgs = core.getInput(mgr);
            if (pkgs) {
                child_process.execSync(info.command + " " + pkgs)
            }
        }
    }
} catch (error) {
    core.setFailed(error.message);
}

