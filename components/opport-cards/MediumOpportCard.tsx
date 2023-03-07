import Image from "next/image";
import Link from "next/link";
import { GetStaticProps } from "next";
import styles from "./MediumOpportCard.module.css";

export default function MediumOpportCard({
	background,
	logo,
	company,
	title,
	type,
	typename,
	remaining,
	translations,
}: any) {

	let bg: string;
	switch (type) { 
		case "1":
			bg = "var(--project-color)";
			break;
		case "2":
			bg = "var(--program-color)";
			break;
		case "3":
			bg = "var(--challenge-color)";
			break;
		case "4":
			bg = "var(--event-color)";
			break;
		case "5":
			bg = "var(--offer-color)";
			break;
		default:
			bg = "var(--project-color)";
			break;	
	}

	return (
		<Link
			href={"/"}
			className={styles.card + " lift"}
		>
			<div className={styles.background}>
				<Image
					alt="background opport card"
					src={background}
					fill
					sizes="100%"
					style={{ objectFit: "cover" }}
					priority
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
							{
								backgroundColor: bg,
							}
						}
					>
						{typename}
					</div>
					<div className={styles.separator}></div>
					<p className={styles.remaining}>
						<i
							style={{ marginRight: "0.5rem" }}
							className="fa-solid fa-calendar"
						></i>
						{remaining + " " + translations["jour(s) restant(s)"]}
					</p>
				</div>
			</div>
		</Link>
	);
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({
	props: { ...context },
});

export { getStaticProps };
