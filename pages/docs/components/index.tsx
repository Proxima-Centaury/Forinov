import { GetStaticProps } from 'next';
import DocStyles from '../../../public/stylesheets/pages/Docs.module.css';

const ComponentsDocs = () => {
    return (
        <section className="containerFull">
            <div className={DocStyles.box}>
            <div className={DocStyles.wave + " " + DocStyles.one}></div>
            <div className={DocStyles.wave + " " + DocStyles.two}></div>
            <div className={DocStyles.wave + " " + DocStyles.three}></div>
            </div>
            <div className={DocStyles.hero}>
                <div className={DocStyles.heroCard}>
                    <h1 className={DocStyles.heroTitle}>Forinov</h1>
                    <h1 className={DocStyles.heroSub}>Components</h1></div>
            </div>
            <div className='container grid threeColumns'>
                <TypeCard icon="box" type="Container" tag="style" />
                <TypeCard icon="hand-pointer" type="Buttons" tag="style" />
                <TypeCard icon="cards-blank" type="Cards" tag="style" />
                <TypeCard icon="text" type="Text" tag="style" />
                <TypeCard icon="pen-field" type="Fields" tag="style" />
                <TypeCard icon="ranking-star" type="SEO" tag="style" />
                <TypeCard icon="filter" type="Filters" tag="style" />
                <TypeCard icon="align-center" type="Forms" tag="style" />
                <TypeCard icon="tag" type="Tags" tag="style" />
            </div>
        </section>
    )
}

const TypeCard = ({ icon, type, tag, link }: any) => {
    return (
        <div className={DocStyles.card + " lift"}>
            <i className={"fa-solid fa-" + icon}></i>
            <span className={DocStyles.cardTitle}>{type}</span>
            <span className={DocStyles.cardTag}>{tag}</span>
        </div>
    )
}


export default ComponentsDocs
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
export { getStaticProps };