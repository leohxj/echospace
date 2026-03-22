import { describe, expect, it } from "vitest";
import { getInitialFileToOpen } from "./initial-file";

describe("getInitialFileToOpen", () => {
  it("returns the first file after initial load when no file is active", () => {
    expect(
      getInitialFileToOpen({
        hasHandledInitialSelection: false,
        isInitialLoadComplete: true,
        activeFile: null,
        rememberedFile: null,
        files: [{ name: "first.echo" }, { name: "second.echo" }],
      }),
    ).toBe("first.echo");
  });

  it("prefers the remembered file when it still exists", () => {
    expect(
      getInitialFileToOpen({
        hasHandledInitialSelection: false,
        isInitialLoadComplete: true,
        activeFile: null,
        rememberedFile: "second.echo",
        files: [{ name: "first.echo" }, { name: "second.echo" }],
      }),
    ).toBe("second.echo");
  });

  it("falls back to the first file when the remembered file is missing", () => {
    expect(
      getInitialFileToOpen({
        hasHandledInitialSelection: false,
        isInitialLoadComplete: true,
        activeFile: null,
        rememberedFile: "missing.echo",
        files: [{ name: "first.echo" }, { name: "second.echo" }],
      }),
    ).toBe("first.echo");
  });

  it("does not auto-open when the initial load completes with no files", () => {
    expect(
      getInitialFileToOpen({
        hasHandledInitialSelection: false,
        isInitialLoadComplete: true,
        activeFile: null,
        rememberedFile: null,
        files: [],
      }),
    ).toBeNull();
  });

  it("does not override an already active file", () => {
    expect(
      getInitialFileToOpen({
        hasHandledInitialSelection: false,
        isInitialLoadComplete: true,
        activeFile: "current.echo",
        rememberedFile: "first.echo",
        files: [{ name: "first.echo" }],
      }),
    ).toBeNull();
  });

  it("does not auto-open again after the one-shot selection has run", () => {
    expect(
      getInitialFileToOpen({
        hasHandledInitialSelection: true,
        isInitialLoadComplete: true,
        activeFile: null,
        rememberedFile: "first.echo",
        files: [{ name: "first.echo" }],
      }),
    ).toBeNull();
  });
});
