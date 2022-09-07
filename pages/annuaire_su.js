import { useState, useEffect } from 'react'


// const Searchbar = (props) => {

//   const categories = props.categories

//   let catArray = []

//   for (let catIndex in categories) {
//     catArray.push(categories[catIndex])
//   }

//   const categorieDropdown = (e) => {
//     let listElement = e.target.parentElement.children[1]
//     let iconElement = e.target.children[0]

//     const hide = () => {
//       listElement.style.display = 'none'
//       iconElement.classList.remove("fa-caret-up")
//       iconElement.classList.add("fa-caret-down")
//     }

//     const show = () => {
//       listElement.style.display = 'flex'
//       iconElement.classList.remove("fa-caret-down")
//       iconElement.classList.add("fa-caret-up")
//     }
//     listElement.style.display === 'none' ? show() : hide()
//   }

//   const dropdownListClickHandler = (e) => {
//     if (e.target.children[0]) {
//       if (e.target.hasAttribute("data-select")) {
//         setSelectedCategories(e.target.getAttribute("data-name"))
//       } else {
//         setSelectedCategories(e.target.getAttribute("data-name"))
//       }
//     } else {
//       if (e.target.parentElement.hasAttribute("data-select")) {
//         setSelectedCategories(e.target.parentElement.getAttribute("data-name"))

//       } else {
//         setSelectedCategories(e.target.parentElement.getAttribute("data-name"))
//       }
//     }
//   }

//   return (
//     <div className='annuaire__searchbar'>

//       {/* Title */}
//       <div className='annuaire__searchbar-title'>
//         <i className='fa-solid fa-rocket'></i>
//         <h1>Startups ({props.count})</h1>
//         <i className='fa-solid fa-caret-down'></i>
//       </div>

//       {/* Breadcrumbs */}
//       <ul className='annuaire__searchbar-breadcrumb'>
//         <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-active'>
//           <i className='fa-solid fa-book'></i>
//           <span>Toutes les startups</span>
//         </li>

//         <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled'>
//           <i className="fa-solid fa-heart"></i>
//           <span>Portefeuille</span>
//         </li>

//         <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled'>
//           <i className="fa-solid fa-globe"></i>
//           <span>Écosystème</span>
//         </li>

//         <li className='annuaire__searchbar-breadcrumb-item breadcrumb-item-disabled'>
//           <i className="fa-solid fa-share-from-square"></i>
//           <span>Recommandations</span>
//         </li>
//       </ul>

//       {/* Searchbar Input */}
//       <div className='annuaire__searchbar-wrapper'>
//         <input type="text" className="annuaire__searchbar-input" placeholder="Rechercher dans l'annuaire des startups" />
//         <button className="annuaire__searchbar-trigger">
//           <i className="fa-solid fa-search"></i>
//         </button>
//       </div>

//       {/* Multiselect */}
//       <div className='annuaire__searchbar-multiselect-wrapper'>
//         <div>
//           <button onClick={categorieDropdown} className='annuaire__searchbar-select'>
//             Catégories
//             <i className="fa-solid fa-caret-down"></i>
//           </button>
//           <ul className='annuaire__searchbar-select-list' style={{ display: 'none' }}>
//             {
//               catArray.map((categorie, i) => {
//                 return (
//                   <button className='annuaire__searchbar-select-list-item' onClick={dropdownListClickHandler} id={categorie.ID} data-name={categorie.NAME}>
//                     <div className='annuaire__searchbar-select-list-pastille'></div>
//                     <span className="annuaire__searchbar-select-list-name">{categorie.NAME}</span>
//                   </button>
//                 )
//               })
//             }
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }



const AnnuaireSu = ({ data, categories }) => {
  
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSelected, setIsSelected] = useState(false)
  const [startupCards, setStartupCards] = useState([])

  var categorieClickHandler = (e) => {
    var value = e.target.getAttribute("data-name")
    const selectElement = (element) => {
      element.children[0].style.backgroundColor = '#006DFF'
      element.setAttribute("data-select", "true")
      selectedCategories.push(value)
      setIsSelected(true)
    }

    const deselectElement = (element) => {
      element.children[0].style.backgroundColor = '#FFF'
      element.setAttribute("data-select", "false")
      selectedCategories.pop(value)
      selectedCategories.length === 0 ? setIsSelected(false) : null
    }
    if (e.target.getAttribute("data-name")) {
      selectedCategories.includes(value) ? deselectElement(e.target) : selectElement(e.target)
    } else {
      value = e.target.parentElement.getAttribute("data-name")
      selectedCategories.includes(value) ? deselectElement(e.target.parentElement) : selectElement(e.target.parentElement)
    }
    
    console.log(selectedCategories);
  }

  categories = categories[0]['CATEGORY']

  let catArray = []

  for (let catIndex in categories) {
    catArray.push(categories[catIndex])
  }

  const categorieDropdown = (e) => {
    let listElement = e.target.parentElement.children[1]
    let iconElement = e.target.children[0]

    const hide = () => {
      listElement.style.display = 'none'
      iconElement.classList.remove("fa-caret-up")
      iconElement.classList.add("fa-caret-down")
    }

    const show = () => {
      listElement.style.display = 'flex'
      iconElement.classList.remove("fa-caret-down")
      iconElement.classList.add("fa-caret-up")
    }
    listElement.style.display === 'none' ? show() : hide()
  }


  const categoriesObject = []
  for (let catIndex in categories) {
    categoriesObject.push(categories[catIndex])
  }

  const setCardsByCategories = (cat) => {
    const suCards = []
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

  categoriesObject.forEach(category => {
    catCards.push(
      <div className='annuaire__category lift' key={category.ID} onClick={
        () => {
          setSelectedCategories(category.NAME)
          setCardsByCategories(category.NAME)
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
          <div>
            <button onClick={categorieDropdown} className='annuaire__searchbar-select'>
              Catégories
              <i className="fa-solid fa-caret-down"></i>
            </button>
            <ul className='annuaire__searchbar-select-list' style={{ display: 'none' }}>
              {
                catArray.map((categorie, i) => {
                  return (
                    <button className='annuaire__searchbar-select-list-item' onClick={categorieClickHandler} id={categorie.ID} data-name={categorie.NAME}>
                      <div className='annuaire__searchbar-select-list-pastille'></div>
                      <span className="annuaire__searchbar-select-list-name">{categorie.NAME}</span>
                    </button>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>

      {isSelected === true ? <h1>true</h1> : <h1>false</h1>}

      {isSelected === false ?
        <div className="annuaire__categories">
          {catCards}
        </div> : <div className="annuaire__cards">
          {startupCards}
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