import { useState, useRef } from 'react';

const AnnuaireSu = ({ data, categories }) => {

  const nbPerCategory = {};

  const icon = useRef(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSelected, setIsSelected] = useState(false)
  const [startupCards, setStartupCards] = useState([])

  categories = categories[0]['CATEGORY']

  let catArray = []

  for (let catIndex in categories) {
    catArray.push(categories[catIndex])
  }

  var suCards = []
  const setCardsByCategories = (cat) => {
    data.forEach(item => {
      if (item.categorie === cat) {
        suCards.push(
          <div className='annuaire__card lift' key={item.id}>
            <div className='annuaire__card-avatar-wrapper'>
              <div className='annuaire__card-avatar'><img src={item.logo} /></div>
            </div>
            <div className='annuaire__card-content-wrapper'>
              <h3 className='annuaire__card-name'>{item.name}</h3>
              <p className='annuaire__card-category'>{item.categorie}</p>
              {Object.keys(item.tags).length > 0 ? <div className='annuaire__card-tags'>
                {item.tags[0] ? <p className='annuaire__card-tag'>{item.tags[0]}</p> : null}
                {item.tags[1] ? <p className='annuaire__card-tag'>{item.tags[1]}</p> : null}
                {item.tags[2] ? <p className='annuaire__card-tag'>{item.tags[2]}</p> : null}
                {Object.keys(item.tags).length > 3 ? <p className='annuaire__card-tag'>+{Object.keys(item.tags).length - 3}</p> : null}
              </div> : null}
              <p className='annuaire__card-description'>{item.comment}</p>
              <div className='annuaire__card-suivre'>
                <i className='fa-solid fa-folder-open'></i>
                <p>suivre</p>
              </div>
            </div>
          </div>
        )
      }
    });
    setStartupCards(suCards)
  }

  const catCards = []

  catArray.forEach(category => {
    nbPerCategory[category.NAME] = category.NB
    catCards.push(
      <div className='annuaire__category lift' key={category.ID} onClick={
        () => {
          categorieClickHandler(category.NAME)
        }}>
        <img src={category.LOGO} alt={category.ID} className="annuaire__category-logo" />
        <div className='annuaire__category-count'>{category.NB}</div>
        <h1 className='annuaire__category-title'>{category.NAME}</h1>
        <div className='annuaire__category-tags'>
          {category.SSCAT[0] ? <div className='annuaire__category-tag'>{category.SSCAT[0].NAME}</div> : null}
          {category.SSCAT[1] ? <div className='annuaire__category-tag'>{category.SSCAT[1].NAME}</div> : null}
          {category.SSCAT[2] ? <div className='annuaire__category-tag'>{category.SSCAT[2].NAME}</div> : null}
        </div>
      </div>
    )
  })


  var categorieClickHandler = (categorie) => {
    let element = document.querySelector('[data-name="' + categorie + '"]')

    if (selectedCategories.includes(categorie)) {
      if (element) {
        element.children[0].style.backgroundColor = '#fff'
      }
      for (let i = 0; i < selectedCategories.length; i++) {
        if (selectedCategories[i] === categorie) {
          selectedCategories.splice(i, 1)
        }
      }
    } else {
      if (element) {
        element.children[0].style.backgroundColor = '#006DFF'
      }
      selectedCategories.push(categorie)
    }

    selectedCategories.length > 0 ? setIsSelected(true) : setIsSelected(false)

    selectedCategories.forEach(element => {
      setCardsByCategories(element)
    });
  }


  return (
    <section>
      <div className='annuaire__searchbar'>

        {/* Title */}
        <div className='annuaire__searchbar-title'>
          <i className='fa-solid fa-rocket'></i>
          <h1>Startups ({data.length})</h1>
          <i className='fa-solid fa-caret-down'></i>
        </div>

        {/* Breadcrumbs */}
        <ul className='annuaire__searchbar-breadcrumb'>
          <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-active'>
            <i className='fa-solid fa-book'></i>
            <span>Toutes les startups</span>
          </li>

          <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled'>
            <i className="fa-solid fa-heart"></i>
            <span>Portefeuille</span>
          </li>

          <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled'>
            <i className="fa-solid fa-globe"></i>
            <span>Écosystème</span>
          </li>

          <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled'>
            <i className="fa-solid fa-share-from-square"></i>
            <span>Recommandations</span>
          </li>
        </ul>

        {/* Searchbar Input */}
        <div className='annuaire__searchbar-wrapper'>
          <input type="text" className="annuaire__searchbar-input" placeholder="Rechercher dans l'annuaire des startups" />
          <button className="annuaire__searchbar-trigger">
            <i className="fa-solid fa-search"></i>
          </button>
        </div>

        {/* Multiselect */}
        <div className='annuaire__searchbar-multiselect-wrapper'>
          <div style={{ marginRight: '1rem' }}>
            <button onClick={
              (e) => {
                let element;
                let list = document.querySelector('.annuaire__searchbar-select-list')
                e.preventDefault()
                e.target.tagName.toLowerCase() === 'button' ? element = e.target : element = e.target.parentElement;
                list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                element.children[1].classList.toggle('fa-caret-up')
              }
            } className='annuaire__searchbar-select'>
              <p style={{ margin: 0 }}>Catégories {selectedCategories.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedCategories.length}</span> : null}</p>
              <i className="fa-solid fa-caret-down" ref={icon}></i>
            </button>
            <ul className='annuaire__searchbar-select-list' style={{ display: 'none' }}>
              {
                catArray.map((categorie) => {
                  return (
                    <button className='annuaire__searchbar-select-list-item' onClick={
                      () => {
                        categorieClickHandler(categorie.NAME)
                      }
                    } id={categorie.ID} data-name={categorie.NAME}>
                      <div className='annuaire__searchbar-select-list-pastille'></div>
                      <span className="annuaire__searchbar-select-list-name">{categorie.NAME}</span>
                      <span className="annuaire__searchbar-select-list-count">{nbPerCategory[categorie.NAME]}</span>
                    </button>
                  )
                })
              }
            </ul>
          </div>


          <button className='annuaire__searchbar-select-disabled'>
            <p style={{ margin: 0 }}>Sous-catégories</p>
            <i className="fa-solid fa-caret-down"></i>
          </button>

          <button className='annuaire__searchbar-select-disabled'>
            <p style={{ margin: 0 }}>Secteurs</p>
            <i className="fa-solid fa-caret-down"></i>
          </button>

          <button className='annuaire__searchbar-select-disabled'>
            <p style={{ margin: 0 }}>Technologies</p>
            <i className="fa-solid fa-caret-down"></i>
          </button>

          <button className='annuaire__searchbar-select-disabled'>
            <p style={{ margin: 0 }}>Métiers cibles</p>
            <i className="fa-solid fa-caret-down"></i>
          </button>
        </div>

        {/* Plus de filtres */}
        <p className='annuaire__searchbar-more'>Plus de filtres</p>
      </div>
      {isSelected === false ?
        <div className="annuaire__categories">
          {catCards}
        </div> : <div className="annuaire__cards">
          {startupCards.length > 0 ? startupCards : <div className='annuaire__no-results'>
            <h1>Aucun résultat !</h1>
          </div>}
        </div>}
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