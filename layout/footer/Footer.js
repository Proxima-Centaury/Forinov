import translation from '../../translations.json';
import { useState } from 'react';


const Footer = () => {
    const [lang, setLang] = useState('fr')

    return (
        <footer className="layout__footer">
            <div className="footer__about-forinov">
                <svg width="50px" height="50px" viewBox="0 0 47 54">
                    <g fill="none" fillRule="evenodd">
                        <path fill="#65D318" d="M27.174 47.028c.011 3.779-3.036 6.846-6.81 6.857-1.097.002-2.135-.25-3.055-.71-.108-.055-.22-.113-.327-.174l.02.008.005.002c-.012-.008-.023-.017-.034-.027l-.04-.036c-.067-.052-.133-.107-.196-.165-1.32-1.18-2.15-2.899-2.154-4.808-.006-1.38.422-2.658 1.153-3.715l.018-.026.02-.028c.21-.3.446-.582.703-.843.633-.638 1.403-1.141 2.256-1.477l.154-.055c.682-.25 1.416-.385 2.18-.385l6.088-.019.02 5.6z"></path>
                        <path fill="#FE6A28" d="M46.14 12.58c.012 3.97-2.24 7.421-5.544 9.127-.428.187-.872.344-1.328.469l-.097.026-.123.027c-.018-.024-.038-.047-.057-.07-2.475-3.026-6.191-3.584-6.191-3.584-11.002-1.65-16.778-4.951-16.778-4.951C6.67 8.948 15.23 3.211 15.23 3.211c.396-.292.822-.59 1.279-.894.332-.22.682-.44 1.053-.666.27-.11.558-.226.861-.342l.059-.02C22.08.042 26.488 0 26.488 0c.926-.003 1.84.033 2.73.102 5.06.388 9.487 1.895 12.457 4.065.673.459 1.288 1.001 1.835 1.604 1.628 1.805 2.62 4.189 2.63 6.809"></path>
                        <path fill="#005AEB" d="M27.155 41.427l-6.087.02c-.765 0-1.5.134-2.181.384l-.154.055c-.853.336-1.623.84-2.256 1.477-.257.261-.493.543-.704.843l-.02.028-.017.026c-.73 1.057-1.16 2.335-1.153 3.715.003 1.909.834 3.628 2.154 4.808.063.058.13.113.195.165l.041.036c.011.01.022.019.034.027L17 53.01l-.02-.008-.068-.03C6.973 48.76 0 38.917 0 27.444 0 15.725 7.278 5.703 17.562 1.651c-.371.226-.72.445-1.053.666-.457.305-.883.602-1.28.894 0 0-8.559 5.737.793 10.413 0 0 5.776 3.3 16.778 4.95 0 0 3.716.56 6.191 3.585.02.023.039.046.057.07.814 1 1.54 2.051 2.037 3.258.541 1.334.841 2.792.847 4.321.022 6.381-5.133 11.574-11.514 11.593l-3.263.026z"></path>
                    </g>
                </svg>

                <p className="footer__about-text">
                {translation[lang]["Forinov connecte startups, entreprises et partenaires pour matcher l’offre et le besoin d’innovation."]}
                </p>

                <ul className="footer__social-icons">
                    <li>
                        <a target="_blank" href="https://twitter.com/Forinov1" className="text-decoration-none">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://www.linkedin.com/company/forinov/" className="text-decoration-none">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </li>
                </ul>

                <a className="footer__to-contact" href="https://www.forinov.fr/contact.php">
                {translation[lang]["Aide et support"]}
                </a>
            </div>
            <div className="footer__link-list">
                <h2 className="footer__link-list-title">
                {translation[lang]["Nos offres"]}
                </h2>

                <ul className="footer__link-list-items">
                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Solutions entreprises"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Solutions startups"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Solutions partenaires"]}
                        </a>
                    </li>
                </ul>
            </div>

            <div className="footer__link-list">
                <h2 className="footer__link-list-title">
                    Forinov
                </h2>

                <ul className="footer__link-list-items">
                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Qui sommes-nous ?"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Contacts et recrutement"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["CGU"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["CGV"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Mentions légales"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Protection des données"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                            Blog
                        </a>
                    </li>
                </ul>
            </div>

            <div className="footer__link-list">
                <h2 className="footer__link-list-title">
                {translation[lang]["Communauté"]}
                </h2>

                <ul className="footer__link-list-items">
                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Annuaire Startups"]} 
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Annuaire Entreprises"]} 
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Annuaire Partenaires"]} 
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Annuaire d'appels à projet"]}
                        </a>
                    </li>

                    <li className="footer__link-list-item">
                        <a href="https://www.forinov.fr/">
                        {translation[lang]["Concours et challenges startups"]}
                        </a>
                    </li>
                </ul>
            </div>

            <div className="footer__credits">
                <p>© Forinov 2021</p>
            </div>
        </footer>
    )
}
export default Footer