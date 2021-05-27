import { readFile } from "fs/promises";
import { LogState, parseLog } from "./parseLog";

describe("parseLog", () => {
  it("handles an empty log", () => {
    const buf = new ArrayBuffer(0);

    let state: LogState | undefined;
    for (const iterationState of parseLog(buf)) {
      state = iterationState;
    }

    expect(state).toBeDefined();
    expect(Array.from(state!.entries())).toHaveLength(0);
  });

  it("parses short log correctly", () => {
    const testBuffer = Buffer.from(`/help_page/1 126.318.035.038
/contact 184.123.665.067
/home 184.123.665.067
/about/2 444.701.448.104
/help_page/1 929.398.951.889
/index 444.701.448.104
/help_page/1 929.398.951.889
/help_page/1 722.247.931.582
`);

    let state: LogState | undefined;
    for (const iterationState of parseLog(testBuffer)) {
      state = iterationState;
    }

    expect(state?.get("/help_page/1")?.uniqueViews).toEqual(3);
    expect(state?.get("/help_page/1")?.views).toEqual(4);
  });

  it("doesn't choke on long files", async () => {
    const logs = await readFile("test/webserver.log");

    let logStatus: LogState | undefined;
    for (const status of parseLog(logs, 512)) {
      logStatus = status;
    }

    expect(logStatus?.get("/help_page/1")?.views).toBe(80);
    expect(logStatus?.get("/about/2")?.views).toBe(90);
  });
});
