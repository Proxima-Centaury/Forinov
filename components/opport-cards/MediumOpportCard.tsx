import Image from "next/image";
import Link from "next/link";
import styles from "./MediumOpportCard.module.css";

export default function MediumOpportCard(props) {
	console.log(props.background);
	return (
		<Link href={"/"}>
			<div className={styles.card + " lift"}>
				<div className={styles.background}>
					<Image
						alt="background opport card"
						src={props.background}
						fill
					></Image>
				</div>
				<div className={styles.content}>
					<div className={styles.avatarWrapper}>
						<img
							alt="avatar opport card"
							src={props.logo}
							layout="fill"
							className={styles.avatar}
						></img>
					</div>
					<div className={styles.info}>
						<h5 className={styles.name}>{props.company}</h5>
						<h2 className={styles.title}>{props.title}</h2>
						<div
							className={styles.type}
							style={
								props.type === "1"
									? { backgroundColor: "rgb(var(--project-color))" }
									: props.type === "2"
									? { backgroundColor: "rgb(var(--program-color))" }
									: { backgroundColor: "rgb(var(--event-color))" }
							}
						>
							{props.typename}
						</div>
						<div className={styles.spacer}></div>
						<p>{props.remaining}</p>
					</div>
				</div>
			</div>
		</Link>
	);
}
