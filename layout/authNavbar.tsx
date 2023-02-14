"use client";
import Head from 'next/head';
import styles from "../public/stylesheets/layout/AuthNavbar.module.css"
import { useState } from 'react';

function AuthNavbar(pageProps: any) {
    const { states } = pageProps;
    const { session } = states;
    console.log(session);
    const [isRightOpen, setIsRightOpen] = useState<boolean>(false);


    return (<>
        <Head>
            <style>
                {`
                    #__next {
                        margin: 0 !important;
                    }
                `}
            </style>
        </Head>
        <div className={styles.left}>

        </div>
        <div className={styles.right}
            onMouseEnter={() => setIsRightOpen(true)}
            onMouseLeave={() => setIsRightOpen(false)}
        >
            <div className={styles.rightAvatarWrapper}>
                <div className={styles.company}>
                    <div className={styles.initials}>DJ</div>
                </div>
                {isRightOpen && <div className={styles.rightUserDetails}>
                    <p className={styles.companyName}>Startup</p>
                    <p className={styles.userName}>DOE John</p>
                </div>}
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.blocs}

            >
                <p className={styles.blocsTitle}>Candidatures</p>
                <div className={styles.blocsWrapper} style={{ flexDirection: isRightOpen ? "row" : "column" }}>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "100%" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>Envoyées</p>}
                    </div>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "100%" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>Brouillons</p>}
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default AuthNavbar