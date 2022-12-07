import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import styles from "./MediumOpportCard.module.css";

export default function MediumOpportCard({background, logo, company, title, type, typename, remaining, translations}: any) {
	console.log(translations);
	
	return (
		<Link href={"/"} className={styles.card + " lift"}>
				<div className={styles.background}>
					<Image
						alt="background opport card"
						src={background}
						fill
						style={{ objectFit: "cover" }}
					></Image>
				</div>
				<div className={styles.content}>
					<div className={styles.avatarWrapper}>
						<Image
							alt="avatar opport card"
							src={logo}
							width={64}
							height={64}
							className={styles.avatar}
						></Image>
					</div>
					<div className={styles.info}>
						<h5 className={styles.name}>{company}</h5>
						<h2 className={styles.title}>{title}</h2>
						<div
							className={styles.type}
							style={
								type === "1"
									? { backgroundColor: "rgb(var(--project-color))" }
									: type === "2"
									? { backgroundColor: "rgb(var(--program-color))" }
									: { backgroundColor: "rgb(var(--event-color))" }
							}
						>
							{typename}
						</div>
						<div className={styles.spacer}></div>
					<p>{remaining + ' ' + translations["jour(s) restant(s)"]}</p>
					</div>
				</div>
		</Link>
	);
}
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });

export { getStaticProps };