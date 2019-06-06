import React from "react";
import { Pagination } from "reactstrap";

export default function PaginationList({ children }) {
  return (
    <div>
      <Pagination aria-label="User list">{children}</Pagination>
    </div>
  );
}
