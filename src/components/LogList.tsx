import React from "react";
import { LogState } from "../utils/parseLog";
import { ListOrdering } from "../utils/reducer";
import IpList from "./IpList";

type LogListProps = { ordering: ListOrdering; logs: LogState };

export default function LogList({ ordering, logs }: LogListProps) {
  const sortedLogs = Array.from(logs.entries()).sort(
    ([, aPathState], [, bPathState]) =>
      ordering === "all"
        ? bPathState.views - aPathState.views
        : bPathState.uniqueViews - aPathState.uniqueViews
  );

  return (
    <ul className="log-list">
      {sortedLogs.map(([path, stats]) => (
        <li key={path}>
          <details>
            <summary>
              {path}: {stats.views} views ({stats.uniqueViews} unique)
            </summary>
            <IpList path={path} ips={Array.from(stats.ipSet)} />
          </details>
        </li>
      ))}
    </ul>
  );
}
