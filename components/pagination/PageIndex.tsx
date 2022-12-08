import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./PageIndex.module.css";

export default function PageIndex(props: any) {
	const [buttons, setButtons] = useState<Array<JSX.Element>>([]);
	
	useEffect(() => {
		console.log(props.nbPages);
		let tempButtons: Array<JSX.Element> = [];
		const url = props.url;
		
		for (let i = 1; i <= props.nbPages; i++) {
			tempButtons.push(
				<Link
					href={`${url}/${i}`}
					className={
						props.currentPage == i ? styles.pageButtonActive + ' ' + styles.pageButton : styles.pageButton
					}
					key={'to-page-' + i}
				>
					<button>{i}</button>
				</Link>
			);
		}

		setButtons(tempButtons);
	}, [props])

	return <div className={styles.paginationWrapper}>{buttons}</div>;
}
