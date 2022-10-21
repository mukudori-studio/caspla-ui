import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/organisms/ProductionSearchCard.module.scss'
import getProductionList from '@/apis/productions/productionSearch'
import Nodata from '@/components/atoms/Nodata'

type ProductionSearchProps = {
    title: string
    productionList : Array<any>
}

const ProductionSearchCard = ({
    title, 
    productionList
}: ProductionSearchProps) => {
    const [productions, setProductions] = useState(productionList)

    useEffect(()=>{
        setProductions(productionList)
    },[])

  return (
    <div className={styles['c-production-search-header']} key={`${title}-production-list`}>
        <h1>{title}</h1>
        { !productions && <Nodata text="現在データが取得されていません。" />}
        { productions && (
            <ul className={styles['c-production-search__list']}>
                {productions.map(prod => {
                    return (
                        <>
                        { prod.productionName[0] === title && (
                            <li key={`${title}-${prod.productionId}-${prod.productionName}`}>
                                <a  className={styles['c-production-search__link']} href={`productions/detail/${prod.productionId}`}>
                                    {prod.productionName}
                                </a>
                            </li>
                        )}
                        </>
                    )
                })}
            </ul>
        )}
    </div>
  )
}

export default ProductionSearchCard