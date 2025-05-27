import { Pagination } from "antd";
import React from "react";

interface MyPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  hideOnSinglePage?: boolean;
}

const MyPagination: React.FC<MyPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  hideOnSinglePage = true,
}) => {
  const showTotal = (total: number, range: [number, number]) =>
    `Показано с ${range[0]} по ${range[1]}, всего ${total}`;

  return (
    <Pagination
      className="custom-pagination"
      style={{ color: "white" }}
      current={currentPage}
      total={totalItems}
      pageSize={itemsPerPage}
      onChange={onPageChange}
      hideOnSinglePage={hideOnSinglePage}
      showTotal={showTotal}
    />
  );
};

export default MyPagination;
