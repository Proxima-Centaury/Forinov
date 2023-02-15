"use client";
import Head from 'next/head';
import styles from "../public/stylesheets/layout/AuthNavbar.module.css"
import { useState } from 'react';
import Link from 'next/link';

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
                    <p className={styles.userName}>Marie-Joséphine Brognon</p>
                </div>}
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.blocs}

            >
                <p className={styles.blocsTitle}
                    style={{ width: isRightOpen ? "100%" : "50px" }}
                >Blocs 1</p>
                <div className={styles.blocsWrapper} style={{ flexDirection: isRightOpen ? "row" : "column" }}>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>Envoyées</p>}
                    </div>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>Brouillons</p>}
                    </div>
                </div>
            </div>

            <div className={styles.blocs}

            >
                <p className={styles.blocsTitle}
                    style={{ width: isRightOpen ? "100%" : "50px" }}
                >Blocs 2</p>
                <div className={styles.blocsWrapper} style={{ flexDirection: isRightOpen ? "row" : "column" }}>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>Envoyées</p>}
                    </div>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>Brouillons</p>}
                    </div>
                </div>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.links}>
                <Link
                    href="/"
                    style={{ justifyContent: isRightOpen ? "flex-start" : "center" }}
                    className={styles.link}>
                    <i className='fa-light fa-bell'></i>
                    {isRightOpen && <p>Retour</p>}
                </Link>

                <Link
                    href="/"
                    style={{ justifyContent: isRightOpen ? "flex-start" : "center" }}
                    className={styles.link}>
                    <i className='fa-light fa-message'></i>
                    {isRightOpen && <p>Messages</p>}
                </Link>
            </div>

            <div className={styles.spacer}></div>

            {!isRightOpen ? <i className={'fa-light fa-calendar ' + styles.icon}></i> : <div className={styles.calendar}>
                <div className={styles.calendarButtons}>
                    <i className='fa-light fa-chevron-left'></i>
                    <i className='fa-light fa-chevron-right'></i>
                </div>
                <h1>Date</h1>
            </div>}

            {!isRightOpen ? <i className={'fa-light fa-circle-plus ' + styles.icon}></i> : <div className={styles.addTool}>
                <i className='fa-light fa-plus'></i>
                <p>Ajouter un outil</p>
            </div>}
        </div>
    </>
    )
}

export default AuthNavbar