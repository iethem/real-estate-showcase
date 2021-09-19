import { useState } from "react";
import PropTypes from "prop-types";

type onPageChanged = (page: number) => any;

interface Props {
  totalPages: number;
  onPageChanged: onPageChanged;
}

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = (from: number, to: number, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

function Pagination({ onPageChanged, totalPages = 0 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = range(1, totalPages);

  function handleClick(page: number) {
    setCurrentPage(page);
    onPageChanged(page);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <div
            key={index}
            className={currentPage === page ? 'active' : ''}
            onClick={() => {
              handleClick(page);
            }}
          >
            {page}
          </div>
        );
      })}
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func,
};

export default Pagination;
