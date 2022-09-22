import styles from '../../../public/stylesheets/components/OpportunityByID.module.css';

const OpportunityByID = ({ data }) => {

    console.log(data);

    if (data.ERROR.length > 0) {
        return (
            <>
                <h1>Opportunity not found</h1>
            </>
        )
    } else {
        return (
            <>
                <div className={styles.card}>

                    <div className={styles.banner}>
                        <img src={data.opportunity_background} alt="Opportunity Background" />
                    </div>

                    <div className={styles.content}>
                        <div className={styles.avatar_wrapper}>
                            <div className={styles.avatar}>
                                <img src={data.opportunity_owner_logo} alt="Opportunity Avatar" />
                            </div>
                        </div>

                        <div className={styles.details_wrapper}>
                            <h1 className={styles.opportunity_name}>
                                <span className={styles.owner_name}>{data.opportunity_owner_name} -</span> {data.opportunity_name}
                            </h1>
                            <div className={styles.opportunity_type}>
                                {data.opportunity_type[1].NAME}
                            </div>
                            <hr className={styles.spacer} />

                        </div>
                    </div>
                </div>
            </>
        )
    }


}

export async function getServerSideProps(context) {
    const apiParameters = {
        id: context.query.id,
        authkey: 'Sorbonne',
        lang: 'fr',
        environment: 'dev'
    }

    const url = `https://${apiParameters.environment}.forinov.fr/remote/back/api.php?q=V5_GET_OPPORTUNITY&ID=${apiParameters.id}&authkey=${apiParameters.authkey}&lg=${apiParameters.lang}`

    const res = await fetch(url)
    const data = await res.json()

    return {
        props: {
            data
        }, // will be passed to the page component as props
    }
}


export default OpportunityByID;