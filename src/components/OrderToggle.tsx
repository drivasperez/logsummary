import React from "react";
import { ListOrdering } from "../utils/reducer";

type OrderToggleProps = {
  ordering: ListOrdering;
  changeOrdering(ordering: ListOrdering): void;
};

export default function OrderToggle({
  ordering,
  changeOrdering,
}: OrderToggleProps) {
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (e.target.value) {
      changeOrdering(e.target.value as ListOrdering);
    }
  };
  return (
    <select value={ordering} onChange={handleChange}>
      <option value="all">total views</option>
      <option value="unique">unique views</option>
    </select>
  );
}
