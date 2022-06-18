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
}

// NOTE：react-paginateの仕様的にstyled-componentsの書き方でないとスタイル上書き出来ない
const PaginationWrapper = styled.div`
& ul {
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 80px;
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
      opacity: 0.8;
    }
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65px;
    height: 65px;
    color: #815296;
    background: #E6E8EA;
    border-radius: 100%;
    font-weight: bold;
  }
  &.active {
    pointer-events: none;
    a {
      background: #3F4D5F !important;
      color: #fff !important;
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
      width: 32px;
      height: 32px;
      font-size: 14px;
    }
    &.active {
      pointer-events: none;
      a {
        background: #3F4D5F !important;
        color: #fff !important;
      }
    }
  }
  
}
`

const Pagination = ({
  rootPath = '/',
  listLimit = 50,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 1,
  totalCount,
  currentNum
}: PaginationProps) => {

  const handlePaginate = (selectedItem: { selected: number }) => {
    // if(selectedItem.selected === 0) {
    //   Router.push(rootPath)
    // } else {
    //   Router.push(`${rootPath || ''}/page/${selectedItem.selected}`)
    // }
  }

  return (
    <PaginationWrapper>
      <ReactPaginate
        pageCount={Math.ceil(totalCount / listLimit)}
        initialPage={currentNum}
        previousLabel="<"
        nextLabel=">"
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        onPageChange={handlePaginate}
        activeClassName="active"
      />
    </PaginationWrapper>
  )
}

export default Pagination
