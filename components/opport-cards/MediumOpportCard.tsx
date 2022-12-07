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
								? { background: "var(--project-color) !important" }
								: type === "2"
								? { background: "var(--program-color) !important" }
								: { background: "var(--event-color) !important" }
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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({
	props: { ...context },
});

export { getStaticProps };
