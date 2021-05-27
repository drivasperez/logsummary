import React from "react";

type IpListProps = { ips: string[]; path: string };

export default function IpList({ ips, path }: IpListProps) {
  return (
    <ol className="ip-list">
      {ips.map((ip) => (
        <li key={path + ip}>{ip}</li>
      ))}
    </ol>
  );
}
