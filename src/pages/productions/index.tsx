import type { GetServerSideProps, NextPage } from 'next'
import Meta from '@/components/Meta'
import styles from '@/styles/ProductionSearch.module.scss'
import Select from '@/components/atoms/Forms/Select'
import { useEffect, useState } from 'react'
import getProductionList from '@/apis/productions/productionSearch'
import ProductionSearchCard from '@/components/organisms/ProductionSearchCard'
import Loading from '@/components/atoms/Loading'

export const getServerSideProps : GetServerSideProps = async() => {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  const response = await getProductionList(letters).then(res=>{return res.data.response_message})
  console.log('GetServerSideProps')
  return {
    props: {
      productions: response,
      letters: letters, 
    }
  }
}

const productions: NextPage = ({productions, letters}: any) => {
  const [selected, setSelected] = useState(0)
  const [letterSet, setLetterSet] = useState<string[]>(letters);
  const [resultSet, setResultSet] = useState(productions)
  const [isLoading, setLoading] = useState(true)

  const optionList = [
    {value: 0, text: 'A～Z'},
    {value: 1, text: 'ア行'},
    {value: 2, text: 'カ行'},
    {value: 3, text: 'サ行'},
    {value: 4, text: 'タ行'},
    {value: 5, text: 'ナ行'},
    {value: 6, text: 'ハ行'},
    {value: 7, text: 'マ行'},
    {value: 8, text: 'ヤ行'},
    {value: 9, text: 'ラ行'},
    {value: 10, text: 'ワ行'},
  ]

  const alphabet = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], 
    ['ア', 'イ', 'ウ', 'エ', 'オ'],
    ['カ', 'キ', 'ク', 'ケ', 'コ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'キャ', 'キュ', 'キョ', 'ギャ', 'キュ', 'キョ'],
    ['サ', 'シ', 'ス', 'セ', 'ソ', 'ザ', 'ジ', 'ヅ', 'ゼ', 'ゾ', 'シャ', 'シュ', 'ショ', 'ジャ', 'ジュ', 'ジョ'],
    ['タ', 'チ', 'ツ', 'テ', 'ト', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'チャ', 'チュ', 'チョ', 'ヂャ', 'ヂュ', 'ヂョ'],
    ['ナ', 'ニ', 'ヌ', 'ネノ', 'ニャ', 'ニュ', 'ニョ'],
    ['ハ', 'ヒ', 'フ', 'ヘホ', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'ヒャ', 'ヒュ', 'ヒョ', 'ビャ', 'ビュ', 'ビョ'],
    ['マ', 'ミ', 'ム', 'メ', 'モ', 'ミャ', 'ミュ', 'ミョ'],
    ['ヤ', 'ユ', 'ヨ' ],
    ['ラ', 'リ', 'ル', 'レ', 'ロ',	'リャ', 'リュ', 'リョ' ],
    ['ワ', 'ヲ', 'ン']
  ]
  const changeSelectValue = (e: any) => {
    setSelected(e.target.value)
    setLetterSet(alphabet[e.target.value])
  }
  
  useEffect(()=>{
    setLoading(true)
    getProductionList(letterSet)
     .then(res=>{ 
        setResultSet(res.data.response_message)
        setLoading(false)
      })
  }, [letterSet])

  return (
    <div className={styles.container}>
      <Meta title="プロダクション一覧" />
      <main className={styles['p-production-search']}> 
        <h1 className={styles['p-production-search__heading']}>プロダクション一覧</h1>
        <div className={styles['p-production-search__selection']}>
          <Select options={optionList} required selected={selected.toString()} onChange={changeSelectValue}/>
        </div>
        {isLoading && <Loading/>}
        { !isLoading && (
          <div className={styles['p-production-search__content']}>
            { 
              letterSet.map((letter:string, index:number)=> {
                return ( 
                  <ProductionSearchCard title={letter} productionList={resultSet[index]} />                 
                )
            })}
          </div>
        )}
      </main>
    </div>
  )
}

export default productions
