// Language: TypeScript

// The supported operating systems
type OperatingSystem = "darwin" | "linux" | "windows";

// The Clipboard interface
interface Clipboard {
	readonly os: OperatingSystem;

    readText(): Promise<string>;
    writeText(text: string): Promise<void>;
}

// The Clipboard implementation for macOS
const darwin: Clipboard = {
    os: "darwin",
    async readText() {
		const command = await Deno.run({
			cmd: ["pbpaste"],
			stdout: "piped",
		});
		const output = await command.output();
		command.close();
		return new TextDecoder().decode(output);
    },
	async writeText(text: string) {
		const command = await Deno.run({
			cmd: ["pbcopy"],
			stdin: "piped",
		});
		await command.stdin?.write(new TextEncoder().encode(text));
		command.stdin?.close();
		command.close();
	}
};

// The Clipboard implementation for Linux
const linux: Clipboard = {
    os: "linux",
    async readText() {
		const command = await Deno.run({
			cmd: ["xclip", "-selection", "clipboard", "-o"],
			stdout: "piped",
		});
		const output = await command.output();
		command.close();
		return new TextDecoder().decode(output);
    },
    async writeText(text: string) {
		const command = await Deno.run({
			cmd: ["xclip", "-selection", "clipboard", "-i"],
			stdin: "piped",
		});
		await command.stdin?.write(new TextEncoder().encode(text));
		command.stdin?.close();
		command.close();
	}
};

// The Clipboard implementation for Windows
const windows: Clipboard = {
    os: "windows",
    async readText() {
		const command = await Deno.run({
			cmd: ["powershell", "-Command", "Get-Clipboard"],
			stdout: "piped",
		});
		const output = await command.output();
		command.close();
		return new TextDecoder().decode(output);
    },
    async writeText(text: string) {
		const command = await Deno.run({
			cmd: ["powershell", "-Command", "Set-Clipboard"],
			stdin: "piped",
		});
		await command.stdin?.write(new TextEncoder().encode(text));
		command.stdin?.close();
		command.close();
	}
};

// Select the correct implementation for the current operating system
const clipboard: Clipboard = Deno.build.os === "darwin" ? darwin :
  Deno.build.os === "linux" ? linux : windows;

export default clipboard;