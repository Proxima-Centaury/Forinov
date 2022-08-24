import React from 'react'

const Searchbar = (props) => {

    const categorieDropdown = (e) => {
        console.log(e.target.children)
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
                <input type="text" class="annuaire__searchbar-input" placeholder="Rechercher dans l'annuaire des startups"/>
                <button className="annuaire__searchbar-trigger">
                <i className="fa-solid fa-search"></i>
                </button>
            </div>

            {/* Multiselect */}
            <div className='annuaire__searchbar-multiselect-wrapper'>
                <label className='annuaire__searchbar-select' onClick={categorieDropdown}>
                    <span>
                        Catégories
                    </span>
                    <i className="fa-solid fa-caret-down"></i>
                    <ul>
                        <li>
                            CATEGORIE 1
                        </li>
                    </ul>
                </label>
            </div>
        </div>
    )
}

export default Searchbar