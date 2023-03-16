import { GetServerSideProps } from "next";
import { HomeInterface } from "../typescript/interfaces";

import FolderStyles from "../public/stylesheets/pages/Folder.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
import SearchbarStyles from "../public/stylesheets/components/searchbar/Searchbar.module.css";

import api from "../scripts/api";

import FolderCard from "../components/cards/folder";
import Filters from "../components/filters/filters";

export default function Folder(pageProps: any) {
    const { folder, states, stateSetters } = pageProps;
    const { translations } = states;
    console.log(folder);


    return (
        <section className={"container"}>
            <div className={SearchbarStyles.searchbar}>
                {/* breadcrumb */}
                <ul className={SearchbarStyles.breadcrumb}>
                    <li className={SearchbarStyles.breadcrumbItem + ' ' + SearchbarStyles.breadcrumbItemDisabled}>
                        <i className='fa-solid fa-book'></i>
                        <span>Toutes les startups</span>
                    </li>

                    <li className={SearchbarStyles.breadcrumbItem + ' ' + SearchbarStyles.breadcrumbItemActive}>
                        <i className="fa-solid fa-heart"></i>
                        <span>Portefeuille</span>
                    </li>

                    <li className={SearchbarStyles.breadcrumbItem + ' ' + SearchbarStyles.breadcrumbItemDisabled}>
                        <i className="fa-solid fa-globe"></i>
                        <span>Écosystème</span>
                    </li>

                    <li className={SearchbarStyles.breadcrumbItem + ' ' + SearchbarStyles.breadcrumbItemDisabled}>
                        <i className="fa-solid fa-share-from-square"></i>
                        <span>Recommandations</span>
                    </li>
                </ul>
                {/* input */}
                <div className={SearchbarStyles.wrapper}>
                    <input type="text" className={SearchbarStyles.input} />
                    <button className={SearchbarStyles.trigger}>
                        <i className="fa-light fa-search"></i>
                    </button>
                </div>
                {/* multi-select */}
                <div className={SearchbarStyles.multiselectWrapper}>
                    <div style={{ marginRight: '1rem' }}>
                        <button className={SearchbarStyles.select}
                            onClick={() => {
                                const filter1List = document.getElementById('filter1List');
                                if (filter1List) {
                                    filter1List.style.display = filter1List.style.display === 'none' ? 'block' : 'none';
                                }
                            }}>
                            <p style={{ margin: 0 }}>Catégories</p>
                            <i className="fa-solid fa-caret-down"></i>
                        </button>
                        <ul className={SearchbarStyles.selectList} id="filter1List" style={{ display: 'none' }}>
                            {/* map through filters */}
                            <button className='annuaire__searchbar-select-list-item' id={categorie.ID}>
                      <span className="annuaire__searchbar-select-list-name">{categorie.NAME}</span>
                      <span className="annuaire__searchbar-select-list-count">{nbPerCategory[categorie.NAME]}</span>
                      <div className='annuaire__searchbar-select-list-pastille'></div>
                    </button>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}



const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    const folder = await api.getFolders("entreprise", "5", "next", "Landing", language);

    return {
        props: {
            locale, locales, defaultLocale, folder
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
