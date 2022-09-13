import { useState, useRef, useEffect } from 'react';


// JSX SU CARD
{/* <a className='annuaire__card lift' id={item.id} key={item.id} href={item.url}>
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
        </a> */}


const AnnuaireSu = ({ data, filters }) => {

  const nbPerCategory = {};

  const icon = useRef(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategoriesLength, setSelectedCategoriesLength] = useState(0);
  const [isSelected, setIsSelected] = useState(false)
  const [currentInput, setCurrentInput] = useState('');
  var tempCards = [];

  const categories = filters[0]['CATEGORY']

  let catArray = []
  const catCards = []

  for (let catIndex in categories) {
    catArray.push(categories[catIndex])
  }

  catArray.forEach(category => {
    nbPerCategory[category.NAME] = category.NB
    catCards.push(
      <div className='annuaire__category lift' key={category.ID} onClick={
        () => {
          categorieClickHandler(category.ID)
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

  const [startupCards, setStartupCards] = useState([])

  const setCards = (categorie = [], input = '') => {
    tempCards.length = 0
    if (categorie.length > 0) {
      if (input.length > 0) {
        data.filter(item => {
          if (item.categorie_id.toString() === categorie.toString() && item.name.toLowerCase().includes(input.toLowerCase())) {
            tempCards.push(item)
          }
        })
      } else {
        data.filter(item => {
          if (item.categorie_id.toString() === categorie.toString()) {
            tempCards.push(item)
          }
        })
      }
    } else {
      data.map(item => {
        if (item.name.toLowerCase().includes(input.toLowerCase())) {
          tempCards.push(item)
        }
      })
    }
    setStartupCards(tempCards)
  }


  const categorieClickHandler = (categorie) => {
    startupCards.length = 0
    let element = document.getElementById(categorie)

    if (selectedCategories.includes(categorie)) {
      if (element) {
        element.children[0].style.color = '#232324'
        element.children[2].style.display = 'none'
        for (let i = 0; i < selectedCategories.length; i++) {
          if (selectedCategories[i] === categorie) {
            selectedCategories.splice(i, 1)
          }
        }
      }
    } else {
      if (element) {
        element.children[0].style.color = '#006dff'
        element.children[2].style.display = 'block'
      }
      selectedCategories.push(categorie)
    }

    if (selectedCategories.length > 0) {
      setIsSelected(true)
      setSelectedCategoriesLength(selectedCategories.length)
      selectedCategories.forEach(categorie => {
        setCards(categorie)
      })
      if (currentInput.length > 0) {
        setIsSelected(true)
        setSelectedCategoriesLength(selectedCategories.length)
        selectedCategories.forEach(categorie => {
          setCards(categorie, currentInput)
        })
      }
    } else {
      if (currentInput.length > 0) {
        setIsSelected(true)
        setCards([], currentInput)
      } else {
        setIsSelected(false)
        startupCards.length = 0
      }
    }


  }

  const handleSearch = (input) => {
    setCurrentInput(input)
    if (selectedCategories.length > 0) {
      startupCards.length = 0
      selectedCategories.forEach(categorie => {
        setCards(categorie, input)
      })
    } else {
      if (input.length > 0) {
        startupCards.length = 0
        setIsSelected(true)
        setCards([], input)
      } else {
        startupCards.length = 0
        setIsSelected(false)
      }
    }
    console.log(startupCards);
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
          <input type="text" className="annuaire__searchbar-input" placeholder="Rechercher dans l'annuaire des startups" onChange={
            (e) => {
              handleSearch(e.target.value)
            }} />
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
                e.target.tagName.toLowerCase() === 'button' ? element = e.target : e.target.parentElement.tagName.toLowerCase() === 'p' ? element = e.target.parentElement.parentElement : element = e.target.parentElement;
                list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                element.children[1].classList.toggle('fa-caret-up')
              }
            } className='annuaire__searchbar-select'>
              <p style={{ margin: 0 }}>Catégories {selectedCategories.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedCategoriesLength}</span> : null}</p>
              <i className="fa-solid fa-caret-down" ref={icon}></i>
            </button>
            <ul className='annuaire__searchbar-select-list' style={{ display: 'none' }}>
              {
                catArray.map((categorie) => {
                  return (
                    <button className='annuaire__searchbar-select-list-item' onClick={
                      () => {
                        categorieClickHandler(categorie.ID)
                      }
                    } id={categorie.ID}>
                      <span className="annuaire__searchbar-select-list-name">{categorie.NAME}</span>
                      <span className="annuaire__searchbar-select-list-count">{nbPerCategory[categorie.NAME]}</span>
                      <div className='annuaire__searchbar-select-list-pastille'></div>
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
        </div> : 
          startupCards.length > 0 ? <div className="annuaire__cards">
          {startupCards.map(item => {
            return (
              <a className='annuaire__card lift' id={item.id} key={item.id} href={item.url}>
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
              </a>
            )
          })}
        </div> : <div className='annuaire__no-results'>
          <h1>Aucun résultat</h1>
        </div>
        }
    </section>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://dev.forinov.fr/remote/back/api.php?q=SEARCH_FULLSU&authkey=Landing')
  const data = await res.json()

  const fetchFilters = await fetch('https://www.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7')
  const filters = await fetchFilters.json()



  // Pass data to the page via props
  return { props: { data, filters } }
}


export default AnnuaireSu