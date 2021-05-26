import { readFile } from "fs/promises";
import { LogState, parseLog } from "./parseLog";

describe("parseLog", () => {
  it("parses short log correctly", () => {
    const testString = `/help_page/1 126.318.035.038
/contact 184.123.665.067
/home 184.123.665.067
/about/2 444.701.448.104
/help_page/1 929.398.951.889
/index 444.701.448.104
/help_page/1 929.398.951.889
/help_page/1 722.247.931.582
`;

    let state: LogState | undefined;
    for (const iterationState of parseLog(testString)) {
      state = iterationState;
    }

    expect(state?.get("/help_page/1")?.uniqueViews).toEqual(3);
    expect(state?.get("/help_page/1")?.views).toEqual(4);
  });

  it("doesn't choke on long files", async () => {
    const logs = await readFile("test/webserver.log", "utf-8");

    expect(() => {
      for (const status of parseLog(logs, 512)) {
        status.entries();
      }
    }).not.toThrow();
  });
});
