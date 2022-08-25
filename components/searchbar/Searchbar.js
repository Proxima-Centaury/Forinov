import React from 'react'

const Searchbar = (props, results) => {

    console.log(results)

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

    const dropdownListClickHandler = (e) => {
        if (e.target.children[0]) {

        } else {
            console.log(e.target.parentElement.children[0])
        }
    }

    return (
        <div className='annuaire__searchbar'>

            {/* Title */}
            <div className='annuaire__searchbar-title'>
                <i className='fa-solid fa-rocket'></i>
                <h1>Startups ({props.count})</h1>
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
                <input type="text" class="annuaire__searchbar-input" placeholder="Rechercher dans l'annuaire des startups" />
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
                        <button className='annuaire__searchbar-select-list-item' onClick={dropdownListClickHandler}>
                            <div className='annuaire__searchbar-select-list-pastille'>

                            </div>
                            <span class="annuaire__searchbar-select-list-name">CATEGORIE 1</span>
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch('https://www.forinov.fr/remote/back/api.php?q=V5_GET_PUBLIC_COMMONS&authkey=Landing&ssid=5cpbs0k7574bv0jlrh0322boe7')
    const data = await res.json()

    return { results: { data } }
}

export default Searchbar