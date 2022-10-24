import React, { useEffect, useState } from 'react'
import styles from '@/styles/components/organisms/ProductionSearchCard.module.scss'

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
        { productions && productions.length !== 0 && (
            <h1>{title}</h1>
        )}
        { productions && (
            <ul className={styles['c-production-search__list']}>
                {productions.map(prod => {
                    return (
                        <li key={`${title}-${prod.productionId}-${prod.productionName}`}>
                            <a  className={styles['c-production-search__link']} href={`productions/detail/${prod.productionId}`}>
                                {prod.productionName}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )}
    </div>
  )
}

export default ProductionSearchCard