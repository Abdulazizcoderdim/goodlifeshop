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
  const showTotalText = `Показано с ${
    (currentPage - 1) * itemsPerPage + 1
  } по ${Math.min(
    currentPage * itemsPerPage,
    totalItems
  )}, всего ${totalItems}`;

  return (
    <div className="custom-pagination-wrapper">
      <div className="custom-pagination-left">{showTotalText}</div>
      <div className="custom-pagination-right">
        <Pagination
          current={currentPage}
          total={totalItems}
          pageSize={itemsPerPage}
          onChange={onPageChange}
          hideOnSinglePage={hideOnSinglePage}
        />
      </div>
    </div>
  );
};

export default MyPagination;
