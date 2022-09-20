import { useState, useRef, useEffect, version } from 'react';

const AnnuaireSu = ({ data, filtersJson }) => {

    const nbPerCategory = {};

    const icon = useRef(null);


    const [selectedFiltersLength, setSelectedFiltersLength] = useState(0);
    const [isSelected, setIsSelected] = useState(false)
    const [currentInput, setCurrentInput] = useState('');
    const [moreFiltersClicked, setMoreFiltersClicked] = useState(false);

    const [totalSelected, setTotalSelected] = useState(0);
    var tempCards = [];

    const [categorieCards, setCategorieCards] = useState([]);

    const filters = {
        'categories': filtersJson[0]['CATEGORY'],
        'secteurs': filtersJson[1]['SECTEURS'],
        'sous_cat': filtersJson[4]['SOUS_CAT'],
        'technologies': filtersJson[5]['TECHNOLOGIES'],
        'metier': filtersJson[6]['METIER'],
    }

    const [selectedFilters, setSelectedFilters] = useState({
        'categories': [],
        'secteurs': [],
        'sous_cat': [],
        'technologies': [],
        'metier': [],
    });

    let tempFilterCards = []
    const setFilterCards = (filter) => {
        let filterLength = Object.keys(filter).length
        tempFilterCards.length = 0;
        for (let i = 0; i < filterLength - 1; i++) {
            tempFilterCards.push(
                <div className='annuaire__category lift' key={filter[i].ID} onClick={
                    () => {
                        filterClickHandler(filter[i].ID, 'categories', '')
                    }}>
                    <img src={filter[i].LOGO} alt={filter[i].ID} className="annuaire__category-logo" />
                    <div className='annuaire__category-count'>{filter[i].NB}</div>
                    <h1 className='annuaire__category-title'>{filter[i].NAME}</h1>
                    <div className='annuaire__category-tags'>
                        {filter[i].SSCAT[0] ? <div className='annuaire__category-tag'>{filter[i].SSCAT[0].NAME}</div> : null}
                        {filter[i].SSCAT[1] ? <div className='annuaire__category-tag'>{filter[i].SSCAT[1].NAME}</div> : null}
                        {filter[i].SSCAT[2] ? <div className='annuaire__category-tag'>{filter[i].SSCAT[2].NAME}</div> : null}
                    </div>
                </div>
            )
        }
        return tempFilterCards;
    }
    const catCards = setFilterCards(filters.categories);

    const setFilterList = (filter, type) => {
        let tempFilterList = []
        let filterLength = Object.keys(filter).length - 1
        for (let i = 0; i < filterLength; i++) {
            nbPerCategory[filter[i].NAME] = filter[i].NB
            tempFilterList.push(
                <button className='annuaire__searchbar-select-list-item' key={filter[i].ID} onClick={
                    () => {
                        filterClickHandler(filter[i].ID, type, currentInput)
                    }
                } id={type + '-' + filter[i].ID}>
                    <span className="annuaire__searchbar-select-list-name">{filter[i].NAME}</span>
                    <span className="annuaire__searchbar-select-list-count">{nbPerCategory[filter[i].NAME]}</span>
                    <div className='annuaire__searchbar-select-list-pastille'></div>
                </button>
            )
        }
        return tempFilterList;
    }

    const catList = setFilterList(filters.categories, 'categories');
    const sscatList = setFilterList(filters.sous_cat, 'sous_cat');
    const sectList = setFilterList(filters.secteurs, 'secteurs');
    const techList = setFilterList(filters.technologies, 'technologies');
    const metierList = setFilterList(filters.metier, 'metier');

    const [startupCards, setStartupCards] = useState([])

    const setCards = (id = '', input = '', filter = '') => {
        // Si au moins un filtre est sélectionné
        if (filter.length > 0) {
            // si l'input à plus de 3 caractères
            if (input) {
                data.map(item => {
                    if (tempCards.includes(item) === false && (
                        // Vérification des filtres : pour chaque filtre sélectionnés, on vérifie si l'item correspond à un de ces filtre
                        (filter === 'categories' && item.categorie_id.toString() === id.toString())
                        || (filter === 'sous_cat' && Object.values(item.sous_categorie_id).indexOf(id) > -1)
                        || (filter === 'secteurs' && Object.values(item.secteur).indexOf(id) > -1)
                        || (filter === 'technologies' && Object.values(item.technologie).indexOf(id) > -1)
                        || (filter === 'metier' && Object.values(item.metier).indexOf(id) > -1))
                        // Vérification de l'input : si l'input est contenu dans le nom de la startup ou dans les filtres
                        && (
                            item.name.toLowerCase().includes(input.toLowerCase())
                            || item.categorie.includes(input.toLowerCase())
                            || Object.values(item.sous_categorie_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                            || Object.values(item.secteur_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                            || Object.values(item.technologie_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                            || Object.values(item.metier_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                        )) {
                        console.log(Object.values(item.technologie_names));
                        tempCards.push(item)
                    }
                })
                // Si il n'y a pas d'input mais au moins un filtre
            } else {
                data.map(item => {
                    if (
                        tempCards.includes(item) === false && ((filter === 'categories' && item.categorie_id.toString() === id.toString())
                            || (filter === 'sous_cat' && Object.values(item.sous_categorie_id).indexOf(id) > -1)
                            || (filter === 'secteurs' && Object.values(item.secteur).indexOf(id) > -1)
                            || (filter === 'technologies' && Object.values(item.technologie).indexOf(id) > -1)
                            || (filter === 'metier' && Object.values(item.metier).indexOf(id) > -1))) {
                        tempCards.push(item)
                    }
                })
            }
        } if (filter.length === 0 && input) {
            data.map(item => {
                if (tempCards.includes(item) === false && (item.name.toLowerCase().includes(input.toLowerCase())
                    || item.categorie.toLowerCase().includes(input.toLowerCase())
                    || Object.values(item.sous_categorie_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                    || Object.values(item.secteur_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                    || Object.values(item.technologie_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                    || Object.values(item.metier_names).toString().toLowerCase().indexOf(input.toLowerCase()) > -1
                )
                ) {
                    console.log(item);
                    tempCards.push(item)
                }
            })
        }
        setStartupCards(tempCards)
    }


    const filterClickHandler = (id, filter, input) => {
        startupCards.length = 0;
        let element = document.getElementById(filter + '-' + id)
        if (selectedFilters[filter].includes(filter + '-' + id)) {
            if (element) {
                element.children[0].style.color = '#232324'
                element.children[2].style.display = 'none'
                for (let i = 0; i < selectedFilters[filter].length; i++) {
                    if (selectedFilters[filter][i] === filter + '-' + id) {
                        selectedFilters[filter].splice(i, 1)
                    }
                }
            }
        } else {
            if (element) {
                element.children[0].style.color = '#006dff'
                element.children[2].style.display = 'block'
            }
            selectedFilters[filter].push(filter + '-' + id)
        }


        for (const [key, value] of Object.entries(selectedFilters)) {
            totalSelected += value.length
            if (totalSelected > 0) {
                if (input.length > 2) {
                    startupCards.length = 0
                    for (let i = 0; i < value.length; i++) {
                        let id = value[i].split('-')[1]
                        setCards(id, input, key)
                    }
                } if (input.length < 3) {
                    startupCards.length = 0
                    for (let i = 0; i < value.length; i++) {
                        let id = value[i].split('-')[1]
                        setCards(id, '', key)
                    }
                }
                setIsSelected(true)
            } if (totalSelected === 0 && input.length > 2) {
                startupCards.length = 0
                setCards('', input, '')
                setIsSelected(true)
            } if (totalSelected === 0 && input.length === 0) {
                setIsSelected(false)
                setTotalSelected(0)
            }
        }
    }

    const handleSearch = (input) => {
        setCurrentInput(input)

        for (const [key, value] of Object.entries(selectedFilters)) {
            totalSelected += value.length
        }
        //Si un filtre est séléctionné ET que l'input fait plus de 3 caractères
        if (totalSelected > 0 && input.length > 2) {
            //On réinitialise le tableau des cartes
            startupCards.length = 0
            //On parcourt les filtres sélectionnés

            for (const [key, value] of Object.entries(selectedFilters)) {
                totalSelected += value.length
                if (totalSelected > 0) {
                    for (let i = 0; i < value.length; i++) {
                        let id = value[i].split('-')[1]
                        setCards(id, input, key)
                    }
                }
            }
        } else {
            if (input.length > 2 || totalSelected > 0) {
                startupCards.length = 0
                setIsSelected(true)
                setCards([], input)
            } if (input.length === 0 && totalSelected === 0) {
                startupCards.length = 0
                setIsSelected(false)
            }
        }
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
                    <div className='annuaire__searchbar-principal-filters'>
                        <button onClick={
                            (e) => {
                                let element;
                                let list = document.getElementById('catCollapse')
                                e.preventDefault()
                                e.target.tagName.toLowerCase() === 'button' ? element = e.target : e.target.parentElement.tagName.toLowerCase() === 'p' ? element = e.target.parentElement.parentElement : element = e.target.parentElement;
                                list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                                element.children[1].classList.toggle('fa-caret-up')
                            }
                        } className='annuaire__searchbar-select' style={{ zIndex: '14' }}>
                            <p style={{ margin: 0 }}>Catégories {selectedFilters.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedFiltersLength}</span> : null}</p>
                            <i className="fa-solid fa-caret-down" ref={icon}></i>
                        </button>
                        <ul className='annuaire__searchbar-select-list' style={{ display: 'none', zIndex: '13' }} id='catCollapse'>
                            {
                                catList
                            }
                        </ul>
                    </div>

                    <div className='annuaire__searchbar-principal-filters'>
                        <button onClick={
                            (e) => {
                                let element;
                                let list = document.getElementById('sscatCollapse')
                                e.preventDefault()
                                e.target.tagName.toLowerCase() === 'button' ? element = e.target : e.target.parentElement.tagName.toLowerCase() === 'p' ? element = e.target.parentElement.parentElement : element = e.target.parentElement;
                                list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                                element.children[1].classList.toggle('fa-caret-up')
                            }
                        } className='annuaire__searchbar-select' style={{ zIndex: '12' }}>
                            <p style={{ margin: 0 }}>Sous-catégories {selectedFilters.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedFiltersLength}</span> : null}</p>
                            <i className="fa-solid fa-caret-down" ref={icon}></i>
                        </button>
                        <ul className='annuaire__searchbar-select-list' style={{ display: 'none', zIndex: '11' }} id='sscatCollapse'>
                            {
                                sscatList
                            }
                        </ul>
                    </div>

                    <div className='annuaire__searchbar-principal-filters'>
                        <button onClick={
                            (e) => {
                                let element;
                                let list = document.getElementById('sectCollapse')
                                e.preventDefault()
                                e.target.tagName.toLowerCase() === 'button' ? element = e.target : e.target.parentElement.tagName.toLowerCase() === 'p' ? element = e.target.parentElement.parentElement : element = e.target.parentElement;
                                list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                                element.children[1].classList.toggle('fa-caret-up')
                            }
                        } className='annuaire__searchbar-select' style={{ zIndex: '10' }}>
                            <p style={{ margin: 0 }}>Secteurs {selectedFilters.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedFiltersLength}</span> : null}</p>
                            <i className="fa-solid fa-caret-down" ref={icon}></i>
                        </button>
                        <ul className='annuaire__searchbar-select-list' style={{ display: 'none', zIndex: '9' }} id='sectCollapse'>
                            {
                                sectList
                            }
                        </ul>
                    </div>


                    <div className='annuaire__searchbar-additional-select'>
                        <div className='annuaire__searchbar-principal-filters'>
                            <button onClick={
                                (e) => {
                                    let element;
                                    let list = document.getElementById('techCollapse')
                                    e.preventDefault()
                                    e.target.tagName.toLowerCase() === 'button' ? element = e.target : e.target.parentElement.tagName.toLowerCase() === 'p' ? element = e.target.parentElement.parentElement : element = e.target.parentElement;
                                    list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                                    element.children[1].classList.toggle('fa-caret-up')
                                }
                            } className='annuaire__searchbar-select' style={{ zIndex: '8' }}>
                                <p style={{ margin: 0 }}>Technologies {selectedFilters.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedFiltersLength}</span> : null}</p>
                                <i className="fa-solid fa-caret-down" ref={icon}></i>
                            </button>
                            <ul className='annuaire__searchbar-select-list' style={{ display: 'none', zIndex: '7' }} id='techCollapse'>
                                {
                                    techList
                                }
                            </ul>
                        </div>

                        <div className='annuaire__searchbar-principal-filters'>
                            <button onClick={
                                (e) => {
                                    let element;
                                    let list = document.getElementById('metierCollapse')
                                    e.preventDefault()
                                    e.target.tagName.toLowerCase() === 'button' ? element = e.target : e.target.parentElement.tagName.toLowerCase() === 'p' ? element = e.target.parentElement.parentElement : element = e.target.parentElement;
                                    list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none'
                                    element.children[1].classList.toggle('fa-caret-up')
                                }
                            } className='annuaire__searchbar-select'>
                                <p style={{ margin: 0 }}>Metiers cibles {selectedFilters.length > 0 ? <span className='annuaire__searchbar-select-count'>{selectedFiltersLength}</span> : null}</p>
                                <i className="fa-solid fa-caret-down" ref={icon}></i>
                            </button>
                            <ul className='annuaire__searchbar-select-list' style={{ display: 'none' }} id='metierCollapse'>
                                {
                                    metierList
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Plus de filtres */}
                <p className='annuaire__searchbar-more' id='moreFilters' onClick={() => {
                    if (moreFiltersClicked) {
                        document.querySelector('.annuaire__searchbar-additional-select').style.display = 'none'
                        setMoreFiltersClicked(false)
                    } else {
                        document.querySelector('.annuaire__searchbar-additional-select').style.display = 'flex'
                        setMoreFiltersClicked(true)
                    }
                }}>{moreFiltersClicked ? 'Moins de filtres' : 'Plus de filtres'}</p>
            </div>
            {
                isSelected === false ?
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
        </section >
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch('https://dev.forinov.fr/remote/back/api.php?q=SEARCH_FULLSU&authkey=Landing')
    const data = await res.json()

    const fetchFilters = await fetch('https://www.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7')
    const filtersJson = await fetchFilters.json()



    // Pass data to the page via props
    return { props: { data, filtersJson } }
}


export default AnnuaireSu