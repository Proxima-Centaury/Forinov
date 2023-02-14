import Head from 'next/head';
import styles from "../public/stylesheets/layout/AuthNavbar.module.css"

function AuthNavbar() {
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
        <div className={styles.right}>
        
    </div>
        </>
  )
}

export default AuthNavbar