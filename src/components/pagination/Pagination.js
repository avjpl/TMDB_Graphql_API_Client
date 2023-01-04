import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../hooks';

import styles from './pagination.module.css';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  totalPage = 500,
  className
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames(styles.pagination__container, { [className]: className })}
    >
      <li
        className={classnames(styles.pagination__item, {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className={styles.pagination__arrow__left} />
      </li>
      {paginationRange.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return <li key={`${pageNumber}${idx}--dot`}  className={`${styles.pagination__item} ${styles.pagination__dots}`}>&#8230;</li>;
        }

        return (
          <li
            key={`${pageNumber}${idx}`}
            className={classnames(styles.pagination__item, {
              [styles.pagination__selected]: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames(styles.pagination__item, {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className={styles.pagination__arrow__right} />
      </li>
    </ul>
  );
};

export default Pagination;
