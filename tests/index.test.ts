import { describe, expect, test } from "bun:test";
import { hello } from "../src/index";

describe("hello function", () => {
	test("should return a greeting message", () => {
		expect(hello("World")).toBe("Hello, World!");
	});
});
