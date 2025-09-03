const lines_bigger = [
    "Booting up...",
    "Loading modules...",
    "Loading games, mods, and experiments...",
    "Done...",
    "░▒▓███████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓███████▓▒░ ░▒▓██████▓▒░░▒▓██████████████▓▒░░▒▓█▓▒░▒▓███████▓▒░░▒▓████████▓▒░░▒▓███████▓▒░       ░▒▓██████▓▒░ ░▒▓███████▓▒░ ",
    "░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        ",
    "░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░      ░▒▓█▓▒░             ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░        ",
    "░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓██████▓▒░  ░▒▓██████▓▒░       ░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░  ",
    "░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ ",
    "░▒▓█▓▒░░▒▓█▓▒░  ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░             ░▒▓█▓▒░      ░▒▓█▓▒░░▒▓█▓▒░      ░▒▓█▓▒░ ",
    "░▒▓███████▓▒░   ░▒▓█▓▒░   ░▒▓█▓▒░░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓████████▓▒░▒▓███████▓▒░        ░▒▓██████▓▒░░▒▓███████▓▒░  ",
    " ",
    "Type `help` to begin.",
    " "
];
const lines_smaller = [
	    "Booting up...",
    "Loading modules...",
    "Loading games, mods, and experiments...",
    "Done...",
	"    ____              ____  _____",
	"   / __ \\__  ______  / __ \\/ ___/",
	"  / / / / / / / __ \\/ / / /\\__ \\ ",
	" / /_/ / /_/ / / / / /_/ /___/ / ",
	"/_____/\\__, /_/ /_/\\____//____/  ",
	"       /____/                     ",
	"                                  ",
	"    D Y N O M I N E S   O S       ",
    " ",
    "Type `help` to begin.",
    " "
]

let lines = []
let cmdHistory = []
let cmdHistoryIndex = 0;
let cmdHistoryIndexShown = 0;

const README_MAIN = [
    "# dynomines.dev",
    " ",
    "**Status:** Under Construction 🚧",
    " ",
    "Welcome to dynomines.dev. A proper version will be here one day.",
    " ",
    "## Current Sections",
    "- dev/ – Development projects (coming soon)",
    "- about/ – Info about Dynomines (coming soon)",
    "- games/ – HTML5 and browser games (coming soon)",
    "- experiments/ – Fun or experimental content (coming soon)",
    "- scripts/ – Useful scripts and code snippets (coming soon)",
    "- .. – Navigate up one level in the terminal simulation",
    " ",
    "- - -",
	" ",
    "Created with help from ChatGPT-5"
];


let lineIndex = 0;
let promptNewline;

function getAspectRatio(width, height) {
	function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
	let divisor = gcd(width, height);
	return `${width / divisor}:${height / divisor}`;
}

let aspect_ratio = window.innerWidth / window.innerHeight
let smallBoot = false
if (aspect_ratio < (16/9)) {
	smallBoot = true;
	lines = lines_smaller;
} else { 
	smallBoot = false;
	lines = lines_bigger;
}

function typeLine() {
	return new Promise((resolve) => {
		const terminal = document.getElementById("terminal");

		function typeNextLine() {
			if (lineIndex >= lines.length) {
				resolve(); // Resolve when all lines typed
				return;
			}

			const line = document.createElement("p");
			terminal.appendChild(line);

			let charIndex = 0;

			function typeChar() {
				if (charIndex < lines[lineIndex].length) {
                    line.textContent += lines[lineIndex][charIndex++];
                    terminal.scrollTop = terminal.scrollHeight;
                    if (lineIndex > 3 && lineIndex <= 10) {
                        setTimeout(typeChar, 0);
                    } else {
                        setTimeout(typeChar, Math.random() * 30 + 15);
                    }
				} else {
					terminal.scrollTop = terminal.scrollHeight;
					lineIndex++;
                    if (lineIndex == 4) {
                        setTimeout(() => { terminal.innerHTML = ""; typeNextLine(); }, 1000);
                    } else if (lineIndex >= 3 && lineIndex <= 10) {
                        setTimeout(typeNextLine, 0);
                    } else { setTimeout(typeNextLine, Math.random() * 300 + 100); }
				}
			}

			typeChar();
		}

		typeNextLine();
	});
}

function createPrompt() {
	const terminal = document.getElementById("terminal");

	let url = new URL(window.location.href);
	let folder = url.pathname;

	if (folder === "/") { promptNewline = ""; } else { promptNewline = folder.slice(0, -1); }

	const promptLine = document.createElement("p");
	promptLine.innerHTML = `<span class="prompt">guest@dynomines.dev:~` + promptNewline + `$ </span>`;

	const input = document.createElement("input");
	input.type = "text";
	input.style.width = (window.innerWidth - promptLine.offsetWidth - (window.innerWidth/100)) + "px";
	input.autofocus = true;
	input.spellcheck = false;
	input.style.background = "transparent";
	input.style.border = "none";
	input.style.color = "#0f0";
	input.style.outline = "none";
	input.style.fontFamily = "'JetBrains Mono', monospace";
	input.style.fontSize = "1rem";

	promptLine.appendChild(input);
	terminal.appendChild(promptLine);

	input.focus();

	let currentText = "";

	input.addEventListener("keydown", (e) => {
		let el = document.activeElement;

		switch (e.key) {
			case "Enter":
				const command = input.value.trim();
				if (command.length > 0) {
					cmdHistory.push(command);
				}
				cmdHistoryIndexShown = -1;
				currentText = "";
				if (command.length === 0) {
					// Empty command: just re-show prompt
					terminal.removeChild(promptLine);
					createPrompt();
					return;
				}
				terminal.removeChild(promptLine);

				// Print the command entered:
				const cmdPrint = document.createElement("p");
				cmdPrint.innerHTML = `<span class="prompt">guest@dynomines.dev:~` + promptNewline + `$ </span>${command}`;
				terminal.appendChild(cmdPrint);

				// Process the command:
				processCommand(command);
				break;
			
			case "ArrowUp":
				e.preventDefault();
				if (el && el.tagName === "INPUT") {
					if (cmdHistoryIndexShown == -1) {
						currentText = el.value;
						cmdHistoryIndexShown = cmdHistory.length - 1;
					} else if (cmdHistoryIndexShown > 0) {
						cmdHistoryIndexShown--;
					}
					if (cmdHistory[cmdHistoryIndexShown] !== undefined) {
						el.value = cmdHistory[cmdHistoryIndexShown];
					}
					el.setSelectionRange(el.value.length, el.value.length);
					el.focus();
				}
				break;
			
			case "ArrowDown":
				e.preventDefault();
				if (el && el.tagName === "INPUT") {
					if (cmdHistoryIndexShown !== -1) {
						if (cmdHistoryIndexShown < cmdHistory.length - 1) {
							cmdHistoryIndexShown++;
							el.value = cmdHistory[cmdHistoryIndexShown] ?? "";
						} else {
							cmdHistoryIndexShown = -1;
							el.value = currentText;
						}
					}
					el.setSelectionRange(el.value.length, el.value.length);
					el.focus();
				}
				break;
			default:
				setTimeout(() => {
					if (cmdHistoryIndexShown === -1) {
						currentText = el.value;
					}
				}, 0);
		}
		console.log(cmdHistoryIndexShown);
	});

	terminal.scrollTop = terminal.scrollHeight;
}

function processCommand(cmd) {
	const terminal = document.getElementById("terminal");

	switch(cmd.toLowerCase()) {
		case "help":
			printLines([
				"Available commands:",
                "    - help: Show this help message",
                "    - neofetch: Display system information",
                "    - clear: Clear the terminal",
                "    - echo [text]: Print the text to the terminal",
                "    - reboot: Reboot the terminal",
                "    - ls: List directories",
                "    - curl [url]: Open the URL in a new tab",
                "    - cd [directory]: Change into a directory"
			]);
			break;
		case "neofetch":
			printLines([
"                                           guest@dynomines.dev ",
"                                           ----------------------- ",
"                                           OS: Dynomines OS 404.1337 (Error Edition) ",
"                                           Host: Nokia FridgeBook Pro ",
"                                           Kernel: MEGALINUX vX.Y.Z-alpha+++ ",
"                                           Uptime: ∞ ",
"         ____              ____  _____     Packages: 420 (pkg), 68 (flatpak) ",
"        / __ \\__  ______  / __ \\/ ___/     Shell: bashed ",
"       / / / / / / / __ \\/ / / /\\__ \\      Resolution: 7680x4320 (quantum upscaled) ",
"      / /_/ / /_/ / / / / /_/ /___/ /      DE: Minecraft 1.8.9 GUI ",
"     /_____/\\__, /_/ /_/\\____//____/       WM: Performance Destroyer 9000 ",
"           /____/                          WM Theme: SurvivalHUD Classic ",
"                                           Theme: SurvivalHUD Classic ",
"        D Y N O M I N E S   O S            Icons: SurvivalHUD Classic ",
"                                           Terminal: The TerminaTor™ ",
"                                           CPU: Intel BrainCell i0-000 @ -9001GHz (passively unstable) ",
"                                           GPU: 1337PB / 9999PB (neural cache enabled) ",
"                                           Memory: 25657MiB / 32011MiB ",
"                                                                   ",
"                                                                   				"
			]);
			break;
		case "clear":
			terminal.innerHTML = "";
			createPrompt();
			break;
        case "reboot":
            window.location.reload();
            break;
        case "ls":
			let url = new URL(window.location.href);
			let folder = url.pathname;
			if (folder === "/") {
				printLines([
					"dev/  about/  games/  experiments/  scripts/  README.md",
					"Use 'cd <directory>' to change into a directory."
				]);
			} else {
				printLines([
					"README.md"
				]);
			}
            break;
        case "curl":
            printLines([
                "curl: (6) Could not resolve host: dynomines.dev",
                "curl: (6) Could not resolve host: dynomines.dev",
                "curl: (6) Could not resolve host: dynomines.dev"
            ]);
            break;
		case "cat":
			printLines(["cat: Missing filename. Usage: cat [filename]"]);
			break;
		default:
			if (cmd.toLowerCase().startsWith("echo ")) {
				printLines([cmd.slice(5)]);
			} else if (cmd.toLowerCase().startsWith("curl ")) { // curl
                printLines(["Opening "+ cmd.slice(5) + " in a new tab..."]);
                if (cmd.slice(5).startsWith("http://") || cmd.slice(5).startsWith("https://")) {
                    window.open(cmd.slice(5), "_blank");
                } else {
                    window.open("https://" + cmd.slice(5), "_blank");
                }
                
            } else if (cmd.toLowerCase().startsWith("cd ")) { // cd
                const dir = cmd.slice(3).trim();
				if (dir.endsWith("/")) { dir = dir.slice(0, -1); }
                if (
					dir === ".." ||
					dir === "dev" || 
					dir === "about" || 
					dir === "games" || 
					dir === "experiments" || 
					dir === "scripts"
				) {
					if (dir === "..") {
						history.pushState({}, "", "/");
					} else {
						history.pushState({}, "", "/" + dir + "/");
					}
                }
				printLines([""]);
            } else if (cmd.toLowerCase().startsWith("cat ")) { // cat
				let url = new URL(window.location.href);
				let folder = url.pathname;
				if ((cmd.slice(4).trim() === "README.md")) {
					if (folder === "/") {
						printLines(README_MAIN);
					} else { printLines(README_MAIN);}
					
				}
			} else {
				printLines([`Command not found: ${cmd}`]);
			}
			break;
	}
}

function printLines(lines) {
	const terminal = document.getElementById("terminal");
	let i = 0;

	function printNext() {
		if (i >= lines.length) {
			createPrompt();
			return;
		}
		const p = document.createElement("p");
		p.textContent = lines[i++];
		terminal.appendChild(p);
		terminal.scrollTop = terminal.scrollHeight;
		setTimeout(printNext, 100);
	}

	printNext();
}

window.onload = async () => {
    const terminal = document.getElementById("terminal");
    terminal.innerHTML = ""; // Clear any existing content
    lineIndex = 0;
    await typeLine(); // Start typing the first line

    createPrompt();
};