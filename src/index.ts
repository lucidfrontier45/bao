export function hello(name: string) {
	return `Hello, ${name}!`;
}

export type { FixOptions } from "./fix.ts";
export { fixShebang } from "./fix.ts";
