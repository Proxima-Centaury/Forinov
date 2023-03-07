"use client";
import Head from 'next/head';
import styles from "../public/stylesheets/layout/AuthNavbar.module.css"
import { useState, useRef } from 'react';
import Link from 'next/link';

function AuthNavbar(pageProps: any) {
    const { states } = pageProps;
    const { session, translations } = states;
    const [isRightOpen, setIsRightOpen] = useState<boolean>(false);
    const [rightOpenMobile, setRightOpenMobile] = useState<boolean>(false);
    const [profileHovered, setProfileHovered] = useState<boolean>(false);

    const user = {
        name: "Marie-Joséphine Brognon",
        company: "Startup",
        initials: "DJ"
    }

    return (<>
        {/* TOP BAR */}
        <div className={styles.topBar}>
            <div className={styles.topBarContent + " container"}><div className={styles.topLeftContent}>
                <div className={styles.logo}></div>
                <button className={styles.leftBarTrigger}></button>
            </div>
                <div className={styles.topRightContent}>
                    <Link
                        href={"/"}
                        className={styles.topRightLink}>
                        <i className='fa-light fa-search'></i>
                    </Link>
                    <Link
                        href={"/"}
                        className={styles.topRightLink + ' ' + styles.topRightMobileLink}>
                        <i className='fa-light fa-bell'></i>
                    </Link>
                    <Link
                        href={"/"}
                        className={styles.topRightLink + ' ' + styles.topRightMobileLink}>
                        <i className='fa-light fa-message'></i>
                    </Link>
                    <button
                        className={styles.topRightLink + ' ' + styles.topRightMobileLink}
                        onClick={() => {
                            if (!rightOpenMobile) {
                                setIsRightOpen(true);
                                setRightOpenMobile(true);
                            } else if (rightOpenMobile) {
                                setIsRightOpen(false);
                                setRightOpenMobile(false);
                            }
                            console.log("rightOpenMobile: " + rightOpenMobile);
                            console.log("isRightOpen: " + isRightOpen);
                        }}
                    >
                        <i className='fa-light fa-ellipsis'></i>
                    </button>
                </div>
            </div>

            <div className={styles.bottomBarContent}>
                <div className={styles.logo}></div>
                <button className={styles.leftBarTrigger}></button>
                <Link
                    href={"/"}
                    className={styles.topRightLink}>
                    <i className='fa-light fa-search'></i>
                </Link>
                <Link
                    href={"/"}
                    className={styles.topRightLink + ' ' + styles.topRightMobileLink}>
                    <i className='fa-light fa-bell'></i>
                </Link>
                <Link
                    href={"/"}
                    className={styles.topRightLink + ' ' + styles.topRightMobileLink}>
                    <i className='fa-light fa-message'></i>
                </Link>
                <button
                    className={styles.topRightLink + ' ' + styles.topRightMobileLink}
                    onClick={() => {
                        if (!rightOpenMobile) {
                            setIsRightOpen(true);
                            setRightOpenMobile(true);
                        } else if (rightOpenMobile) {
                            setIsRightOpen(false);
                            setRightOpenMobile(false);
                        }
                        console.log("rightOpenMobile: " + rightOpenMobile);
                        console.log("isRightOpen: " + isRightOpen);
                    }}
                >
                    <i className='fa-light fa-ellipsis'></i>
                </button>
            </div>
        </div>

        {/* LEFT BAR */}
        <div className={styles.left}>

        </div>

        {/* RIGHT BAR */}
        <div className={styles.right}
            onMouseEnter={() => !rightOpenMobile ? setIsRightOpen(true) : null}
            onMouseLeave={() => !rightOpenMobile ? setIsRightOpen(false) : null}
        >
            <div className={styles.rightAvatarWrapper}
                onMouseEnter={() => setProfileHovered(true)}
                onMouseLeave={() => setProfileHovered(false)}
            >


                {profileHovered && <div className={styles.profileModal}>
                    <h3>{translations['Profil']}</h3>
                    <Link href="/"><p>{translations["Profil de mon entreprise"]}</p></Link>
                    <Link href="/"><p>{translations["Profil personnel"]}</p></Link>

                    <div className={styles.modalSpacer}></div>
                    <h3>{translations['Paramètres']}</h3>
                    <Link href="/"><p>{translations["Général"]}</p></Link>
                    <Link href="/"><p>{translations["Langue"]}</p></Link>
                    <div className={styles.modalSpacer}></div>

                    <Link href="/"><p>{translations["Déconnexion"]}</p></Link>
                </div>}
                <div className={styles.company}>
                    <div className={styles.initials}>{user.initials}</div>
                </div>
                {isRightOpen && <div className={styles.rightUserDetails}>
                    <p className={styles.companyName}>{user.company}</p>
                    <p className={styles.userName}>{user.name}</p>
                </div>}
            </div>
            <div className={styles.spacer}></div>

            <div className={styles.blocs}

            >
                <p className={styles.blocsTitle}
                    style={{ width: isRightOpen ? "100%" : "50px" }}
                >{translations["Candidatures"]}</p>
                <div className={styles.blocsWrapper} style={{ flexDirection: isRightOpen ? "row" : "column" }}>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>{translations["Envoyées"]}</p>}
                    </div>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>{translations["Brouillons"]}</p>}
                    </div>
                </div>
            </div>

            <div className={styles.blocs}

            >
                <p className={styles.blocsTitle}
                    style={{ width: isRightOpen ? "100%" : "50px" }}
                >{translations["Profils"]}</p>
                <div className={styles.blocsWrapper} style={{ flexDirection: isRightOpen ? "row" : "column" }}>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>{translations["Visites"]}</p>}
                    </div>
                    <div className={styles.bloc}
                        style={{ width: isRightOpen ? "100px" : "50px" }}
                    >
                        <h1>0</h1>
                        {isRightOpen && <p>{translations["Abonnés"]}</p>}
                    </div>
                </div>
            </div>

            <div className={styles.spacer}></div>

            <div className={styles.links}>
                <Link
                    href="/"
                    style={{ justifyContent: isRightOpen ? "flex-start" : "center", left: isRightOpen ? "-1rem" : "0", width: isRightOpen ? "calc(100% + 1rem)" : "100%" }}
                    className={styles.link}>
                    <i className='fa-light fa-bell'></i>
                    {isRightOpen && <p>{translations['Notifications']}</p>}
                </Link>

                <Link
                    href="/"
                    style={{ justifyContent: isRightOpen ? "flex-start" : "center", left: isRightOpen ? "-1rem" : "0" }}
                    className={styles.link}>
                    <i className='fa-light fa-message'></i>
                    {isRightOpen && <p>{translations['Messages']}</p>}
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
                <p>{translations["Ajouter un outil"]}</p>
            </div>}
        </div>

        {/* RIGHT BAR MOBILE */}
        <div className={styles.rightMobile}
            style={{ display: rightOpenMobile ? "flex" : "none" }}
            onMouseEnter={() => !rightOpenMobile ? setIsRightOpen(true) : null}
            onMouseLeave={() => !rightOpenMobile ? setIsRightOpen(false) : null}
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

            <Link href={'/'} style={{ color: "#fff" }}>Profile de mon entreprise</Link>
            <Link href={'/'} style={{ color: "#fff" }}>Profil personnel</Link>
            <Link href={'/'} style={{ color: "#fff" }}>Paramètres</Link>
            <Link href={'/'} style={{ color: "#fff" }}>Langue</Link>
            <Link href={'/'} style={{ color: "#fff" }}>Déconnexion</Link>

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
                    style={{ justifyContent: isRightOpen ? "flex-start" : "center", left: isRightOpen ? "-1rem" : "0", width: isRightOpen ? "calc(100% + 1rem)" : "100%" }}
                    className={styles.link}>
                    <i className='fa-light fa-bell'></i>
                    {isRightOpen && <p>Retour</p>}
                </Link>

                <Link
                    href="/"
                    style={{ justifyContent: isRightOpen ? "flex-start" : "center", left: isRightOpen ? "-1rem" : "0" }}
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