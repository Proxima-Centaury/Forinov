import { GetStaticProps } from "next";
import { Fragment } from "react";

import SeeMore from "../components/pagination/SeeMore";

const Test = (pageProps: any) => {

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
        {"Longueur liste: " + list.length}
        <SeeMore
            list={list}
            max={10}
        />
    </section>;
};

const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });

export default Test;
export { getStaticProps };