/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { GetServerSideProps } from "next";
import DealStyles from '../public/stylesheets/components/deal/Deal.module.css';
import TagsStyles from '../public/stylesheets/components/tags/Tags.module.css';
import ButtonStyles from '../public/stylesheets/components/buttons/Button.module.css';
import Image from 'next/image';
import Link from 'next/link';

const deal = {
    id: 1,
    authorName: 'Deal Author',
    authorDescription: 'Deal Author Description',
    productDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam illo sequi mollitia aliquam rem laudantium. Omnis aliquid dolores placeat, autem, ipsa dolorem repudiandae numquam beatae exercitationem minus aut, quis excepturi.',
    dealOfferTitle: 'Deal Offer Title',
    dealOffer: '30% on Deal Offer',
    isExclusive: true,
    expiresAt: '12/12/2023',
    isExpired: false,
    remainingTime: '1',
    tags: "crm,marketing,automation",
    authorId: 1,
    authorImage: '/assets/placeholders/woman.jpg',
    localisation: "Paris, France",
    url: 'https://www.example.com',
    criterias: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam illo sequi mollitia aliquam rem laudantium. Omnis aliquid dolores placeat, autem, ipsa dolorem repudiandae numquam beatae exercitationem minus aut, quis excepturi."
}

const Deal = (pageProps: any) => {

    const { states, router } = pageProps;
    const { translations } = states;

    
    

    return (
        <section className={'container'}>
            <div className={DealStyles.card + ' grid twoColumns'}>
                <div className={DealStyles.detailsContainer}>
                    <div className={DealStyles.authorDetails}>
                        <div className={DealStyles.avatar}>
                            <Image
                                src={router.basePath + deal.authorImage}
                                alt={deal.authorName}
                                width="3840"
                                height="2160"
                            ></Image>
                        </div>

                        <h1 className={DealStyles.name}>{deal.authorName} - <span className={DealStyles.description}>{deal.authorDescription}</span></h1>
                    </div>

                    <div className={DealStyles.dealDetails}>

                        {deal.isExclusive && <><div className={DealStyles.spacer}></div><span>{translations["Cette offre est reservée aux membres Forinov"]}  <i className='fa-solid fa-lock'></i></span></>}
                        <div className={DealStyles.spacer}></div>
                        <div className={DealStyles.timeDetails}>
                            <span>
                                {translations["Expire le"]} {" : "} {deal.expiresAt}
                            </span>
                            <span>
                            {translations["Restant"]} : {deal.remainingTime} jour(s)
                            </span>
                            <span>
                            {translations["Localisation"]}  : {deal.localisation}
                            </span>
                            <Link href={deal.url}>
                            {translations["Site web"]} 
                            </Link>
                        </div>
                        <div className={DealStyles.spacer}></div>
                        <div className={DealStyles.productDescription}>
                            <p>{deal.productDescription}</p>
                        </div>

                        <div className={DealStyles.spacer}></div>
                        <span><span style={{ fontWeight: 700 }}>{translations["Critères d'éligibilité"]} : </span>{deal.criterias}</span>

                        <div className={DealStyles.spacer}></div>
                        <div className={DealStyles.dealOffer}>
                            <h2>{deal.dealOfferTitle}</h2>
                            <span>{deal.dealOffer}</span>
                        </div>

                        <div className={DealStyles.spacer}></div>

                        <div className={TagsStyles.tags}>
                            {
                                deal.tags.split(',').map((tag, index) => (
                                    <span key={index} className={TagsStyles.tag + ' ' + TagsStyles.main}>{tag}</span>
                                ))
                            }
                        </div>

                        <div className={DealStyles.spacer}></div>

                        <div className={DealStyles.links}>
                            <Link href={'/'}>
                            {translations["Consulter le profil Forinov de"]} {deal.authorName}
                            </Link>
                            <Link href={'/'}>
                            {translations["Consulter le site web de"]} {deal.authorName}
                            </Link>
                        </div>

                        <div className={DealStyles.toOffer}>
                            <button className={ButtonStyles.callToAction}>{translations["J'en profite"]}</button>
                        </div>
                    </div>
                </div>
                <div className={DealStyles.rightContent}>
                    <div className={DealStyles.callToSignWrapper}>
                        <h1 className={DealStyles.offer}>{deal.dealOffer}</h1>
                        {deal.isExclusive && <><span>{translations["Cette offre est reservée aux membres Forinov"]}  <i className='fa-solid fa-lock'></i></span></>}

                        <div className={DealStyles.rightSpacer}></div>
                        <div className={DealStyles.callToSign}>
                            <span>{translations["Inscrivez-vous gratuitement sur Forinov et profitez de l'offre"]}</span>
                        </div>
                        <Link href={'/'}><i className='fa-solid fa-share'></i>{translations["Partager l'offre"]}</Link>
                    </div>

                    <div className={DealStyles.ForinovBanner}>
                        <Image
                            src={router.basePath + '/assets/logo_full_white.png'}
                            alt={'Forinov Logo'}
                            width={100}
                            height={50}
                            className={DealStyles.logo}
                        ></Image>
                        <span>{translations["La plateforme des acteurs de l'innovation"]}</span>
                        <div className={DealStyles.rightSpacer}></div>
                        <Link href={'/'}>{translations["Inscrivez vous gratuitement pour profiter de toute la plateforme"]}</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales, defaultLocale } = context;
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const language = locale?.substring(0, 2);
	return {
		props: {
			locale, locales, defaultLocale
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Deal;
export { getServerSideProps };