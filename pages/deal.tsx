import { GetStaticProps } from 'next';
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
    authorImage: 'https://via.placeholder.com/150',
    localisation: "Paris, France",
    url: 'https://www.example.com',
    criterias: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam illo sequi mollitia aliquam rem laudantium. Omnis aliquid dolores placeat, autem, ipsa dolorem repudiandae numquam beatae exercitationem minus aut, quis excepturi."
}

const Deal = () => {
    return (
        <section className={'container'}>
            <div className={DealStyles.card + ' grid twoColumns'}>
                <div className={DealStyles.detailsContainer}>
                    <div className={DealStyles.authorDetails}>
                        <div className={DealStyles.avatar}>
                            <img
                                src={deal.authorImage}
                                alt={deal.authorName}
                            ></img>
                        </div>

                        <h1 className={DealStyles.name}>{deal.authorName} - <span className={DealStyles.description}>{deal.authorDescription}</span></h1>
                    </div>

                    <div className={DealStyles.dealDetails}>

                        {deal.isExclusive && <><div className={DealStyles.spacer}></div><span>Cette offre est reservée aux membres Forinov <i className='fa-solid fa-lock'></i></span></>}
                        <div className={DealStyles.spacer}></div>
                        <div className={DealStyles.timeDetails}>
                            <span>
                                Expire le : {deal.expiresAt}
                            </span>
                            <span>
                                temps restant : {deal.remainingTime} jour(s)
                            </span>
                            <span>
                                Localisation: {deal.localisation}
                            </span>
                            <Link href={deal.url}>
                                Site web
                            </Link>
                        </div>
                        <div className={DealStyles.spacer}></div>
                        <div className={DealStyles.productDescription}>
                            <p>{deal.productDescription}</p>
                        </div>

                        <div className={DealStyles.spacer}></div>
                        <span><span style={{ fontWeight: 700 }}>Critères d&apos;éligibilité : </span>{deal.criterias}</span>

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
                                Consulter le profil Forinov de {deal.authorName}
                            </Link>
                            <Link href={'/'}>
                                Consulter le site web de {deal.authorName}
                            </Link>
                        </div>

                        <div className={DealStyles.toOffer}>
                            <button className={ButtonStyles.callToAction}>J&apos;en profite</button>
                        </div>
                    </div>
                </div>
                <div>
                    {/* Right Side */}
                </div>
            </div>
        </section>
    )
}

/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getStaticProps };
export default Deal