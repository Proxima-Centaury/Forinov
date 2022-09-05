import React from 'react'
import { useState, useLayoutEffect } from 'react'

const Searchbar = (props) => {

    const categories = props.categories


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

    const dropdownListClickHandler = (e) => {            
        if (e.target.children[0]) {
            if (e.target.hasAttribute("data-select")){
                e.target.children[0].style.backgroundColor = '#FFF'
                e.target.removeAttribute("data-select")
                selectedElements.pop(e.target)
            } else {
                e.target.children[0].style.backgroundColor = '#006DFF'
                e.target.setAttribute("data-select","true")
                selectedElements.push(e.target)
            }
        } else {
            if (e.target.parentElement.hasAttribute("data-select")){
                e.target.parentElement.children[0].style.backgroundColor = '#FFF'
                e.target.parentElement.removeAttribute("data-select")
                selectedElements.pop(e.target.parentElement)
            } else {
                e.target.parentElement.children[0].style.backgroundColor = '#006DFF'
                e.target.parentElement.setAttribute("data-select","true")
                selectedElements.push(e.target.parentElement)
            }
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
                                return(
                                    <button className='annuaire__searchbar-select-list-item' onClick={dropdownListClickHandler} id={categorie.ID}>
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
    )
}

export default Searchbar