import { GetStaticProps, GetServerSideProps } from 'next';
import { Fragment } from "react";

import SeeMore from "../components/pagination/SeeMore";

import api from "../scripts/api";

const Test = (pageProps: any) => {

    const { states, opportunities } = pageProps;
    const { translations } = states;
    console.log('TEST PAGE LIST: ', opportunities);
    

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
            max={10}
            translations={translations}
            type="opportunities"
        />
    </section>;
};
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;

    return {
        props: {
			locale, locales, defaultLocale,
            opportunities: await api.getOpportunities()
        },
    };
}

export default Test;
export { getServerSideProps };