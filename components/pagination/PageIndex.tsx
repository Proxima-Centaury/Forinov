import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./PageIndex.module.css";

export default function PageIndex(props: any) {
	const [buttons, setButtons] = useState<Array<JSX.Element>>([]);
	
	useEffect(() => {
		let tempButtons: Array<JSX.Element> = [];
		const url = props.url;
		const maxPageElements = 5;
		const around = Math.floor(maxPageElements / 2);

		const current = parseInt(props.currentPage);



		//render only buttons around the currentPage number 
		for (let i = current - around; i <= current + around; i++) {
			if (i > 0 && i <= props.nbPages) {
				tempButtons.push(
					<a
						href={`${url}/${i}`}
						className={
							props.currentPage == i ? styles.pageButtonActive + ' ' + styles.pageButton : styles.pageButton
						}
						key={'to-page-' + i}
					>
						<button>{i}</button>
					</a>
				);
			}
		}
					

		// for ( let i = 1; i <= props.nbPages; i++  ) {
		// 	tempButtons.push(
		// 		<Link
		// 			href={`${url}/${i}`}
		// 			className={
		// 				props.currentPage == i ? styles.pageButtonActive + ' ' + styles.pageButton : styles.pageButton
		// 			}
		// 			key={'to-page-' + i}
		// 		>
		// 			<button>{i}</button>
		// 		</Link>
		// 	);
		// }

		setButtons(tempButtons);
	}, [props])

	return <div className={styles.paginationWrapper}>{buttons}</div>;
}
