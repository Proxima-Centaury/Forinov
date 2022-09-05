import { useState, useLayoutEffect } from 'react'
import Searchbar from '../components/searchbar/Searchbar'

const AnnuaireSu = ({ data, categories }) => {

  const [selectedCategories, setSelectedCategories] = useState([]);

  categories = categories[0]['CATEGORY']

  console.log(categories);

  const categoriesObject = []
  const catCards = []

  for (let catIndex in categories) {
    categoriesObject.push(categories[catIndex])
  }


  categoriesObject.forEach(category => {
    catCards.push(
      <div className='annuaire__category'>
        <img src={category.LOGO} alt={category.ID} className="annuaire__category-logo" />
        <div className='annuaire__category-count'>{category.NB}</div>
        <h1 className='annuaire__category-title'>{category.NAME}</h1>
      </div>
    )
  })

  const suCards = []

  data.forEach(item => {
    suCards.push(
      <div className='annuaire__card'>
        <h1 >{item.name}</h1>
      </div>
    )
  });

  return (
    <section>
      <Searchbar count={"1658"} selectedCategories={selectedCategories} categories={categories} />
      {selectedCategories !== [] ? (
        <div className="annuaire__categories">
          {catCards}
        </div>
      ) : (<div className="annuaire__cards">
        {suCards}
      </div>)}
    </section>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://dev.forinov.fr/remote/back/api.php?q=SEARCH_FULLSU&authkey=Landing')
  const data = await res.json()

  const fetchCategories = await fetch('https://www.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7')
  const categories = await fetchCategories.json()



  // Pass data to the page via props
  return { props: { data, categories } }
}


export default AnnuaireSu