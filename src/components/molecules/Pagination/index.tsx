import React from 'react'
import Router from 'next/router'
import styled from 'styled-components'
import ReactPaginate from 'react-paginate'

type PaginationProps = {
  rootPath?: string
  pageRangeDisplayed? : number
  marginPagesDisplayed?: number,
  listLimit?: number
  totalCount: number
  currentNum: number
  onChangePagination: (page: number) => void
}

// NOTE：react-paginateの仕様的にstyled-componentsの書き方でないとスタイル上書き出来ない
const PaginationWrapper = styled.div`
& ul {
  display: flex;
  justify-content: center;
  gap: 14px;
}
& li {
  list-style-type: none;
  cursor: pointer;
  transition: .2s;

  &:active {
    transform: scale(.95);
  }

  @media (min-width: 1024px) {
    &:hover {
      opacity: .75;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    color: #212529;
    background: #fff;
    border: 1px solid #212529;
    border-radius: 100%;
    font-weight: bold;
  }
  &.active {
    pointer-events: none;
    a {
      color: #6F42C1 !important;
      background: #F0EBF9 !important;
      border: 1px solid #6F42C1;
    }
  }
  &.previous,
  &.next {
    a {
      line-height: .8;
    }
  }
  &.break {
    pointer-events: none;
    a {
      background: transparent !important;
      border: none;
    }
  }
  &.disabled {
    display: none;
  }
}

@media (max-width: 600px) {
  & ul {
    gap: 8px;
  }
  & li {
    a {
      width: 25px;
      height: 25px;
      font-size: 14px;
    }
    &.active {
      pointer-events: none;
      a {
        color: #6F42C1 !important;
        background: #F0EBF9 !important;
        border: 1px solid #6F42C1;
      }
    }
    &.previous,
    &.next {
      a {
        font-size: 12px;
        line-height: .8;
      }
    }
  }

}
`

const Pagination = ({
  rootPath = '/',
  listLimit = 10,
  pageRangeDisplayed = 5,
  marginPagesDisplayed = 0,
  totalCount,
  currentNum,
  onChangePagination
}: PaginationProps) => {

  const handlePaginate = (selectedItem: { selected: number }) => {
    onChangePagination(selectedItem.selected)
  }

  return (
    <PaginationWrapper>
      <ReactPaginate
        pageCount={totalCount}
        previousLabel="&lt;"
        nextLabel="&gt;"
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handlePaginate}
        activeClassName="active"
        forcePage={currentNum - 1}
      />
    </PaginationWrapper>
  )
}

export default Pagination
