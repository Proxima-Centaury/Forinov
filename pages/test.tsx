import { GetServerSideProps } from 'next';
import SeeMore from "../components/pagination/SeeMore";

import api from "../scripts/api";

const Test = (pageProps: any) => {

    const { states, opportunities } = pageProps;


    //list of 60 random titles
    const list = [
        "The Shawshank Redemption",
        "The Godfather",
        "The Godfather: Part II",
        "The Dark Knight",
        "12 Angry Men",
        "Schindler's List",
        "The Lord of the Rings: The Return of the King",
        "Pulp Fiction",
        "The Good, the Bad and the Ugly",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Fight Club",
        "Star Wars: Episode V - The Empire Strikes Back",
        "Forrest Gump",
        "Inception",
        "The Godfather",
        "The Godfather: Part II",
        "The Dark Knight",
        "12 Angry Men",
        "Schindler's List",
        "The Lord of the Rings: The Return of the King",
        "Pulp Fiction",
        "The Good, the Bad and the Ugly",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Fight Club",
        "Star Wars: Episode V - The Empire Strikes Back",
        "Forrest Gump",
        "Inception",
        "The Godfather",
        "The Godfather: Part II",
        "The Dark Knight",
        "12 Angry Men",
        "Schindler's List",
        "The Lord of the Rings: The Return of the King",
        "Pulp Fiction",
        "The Good, the Bad and the Ugly",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Fight Club",
        "Star Wars: Episode V - The Empire Strikes Back",
        "Forrest Gump",
        "Inception",
        "The Godfather",
        "The Godfather: Part II",
        "The Dark Knight",
        "12 Angry Men",
        "Schindler's List",
        "The Lord of the Rings: The Return of the King",
        "Pulp Fiction",
        "The Good, the Bad and the Ugly",
        "The Lord of the Rings: The Fellowship of the Ring",
        "Fight Club",
        "Star Wars: Episode V - The Empire Strikes Back",
        "Forrest Gump",
        "Inception"
    ]


    return <section className="container">
        <SeeMore
            list={opportunities}
            max={2}
            type="opportunities"
            states={states}
        />
    </section>;
};
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    // const products = await api.getProducts("entreprise", "5", "next", "Sorbonne", language);

    const opportunities = await api.getSearchEngine("opportunite", "next", "Sorbonne", language);

    return {
        props: {
            locale, locales, defaultLocale, opportunities
            // products
        },
    };
}

export default Test;
export { getServerSideProps };