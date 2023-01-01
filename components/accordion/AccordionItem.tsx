import React from "react";
import styles from "./AccordionItem.module.css";

const AccordionItem = (props:any) => {
	return (
		<>
			<button
				className={styles.collapseItem + " accordionHandler"}
				onClick={(e: any) => {
					let alreadyCollapsed: any = document.querySelector(
						"[data-collapsed='true']",
					);
					let collapseElement: any = document.getElementById(
						"collapse" + props.identifier,
					);
					let collapseIcon: any = document.getElementById(
						"collapseIcon" + props.identifier,
					);

					function buttonStyle() {
						let btnsArray = Array.from(
							document.querySelectorAll(".accordionHandler"),
						);

						btnsArray.forEach((element) => {
							let icon = element.children[1];
							let text = element.children[0];
							text.removeAttribute("style");
							element.removeAttribute("style");
							icon.removeAttribute("style");
						});

						
							if (props.textColor) {
								e.target.style.color = props.textColor;
								e.target.children[0].style.color = props.textColor
							}

							props.color
								? (e.target.style.background = props.color)
								: (e.target.style.background = "var(--background-main-color)");
							e.target.style.textDecoration = "underline";
							e.target.children[1].style.transform =
								"rotate(180deg)";
							e.target.children[1].style.color = props.textColor;
						
					}

					if (collapseElement!.getAttribute("data-collapsed") === "false") {
						buttonStyle();
						collapseElement!.style.height = "auto";
						collapseElement!.style.opacity = "100%";
						collapseIcon!.style.transform = "rotate(180deg)";

						if (alreadyCollapsed) {
							buttonStyle();
							alreadyCollapsed.setAttribute("data-collapsed", "false");
							alreadyCollapsed.style.height = "0";
							alreadyCollapsed.style.opacity = "0";
						}

						collapseElement!.setAttribute("data-collapsed", "true");
					} else {
						collapseElement!.style.height = "0";
						collapseElement!.style.opacity = "0";
						collapseElement!.style.color = "inherit";
						e.target.tagName === "BUTTON"
							? e.target.removeAttribute("style")
							: e.target.parentElement.removeAttribute("style");
						
						e.target.children[0].removeAttribute("style");

						collapseIcon!.removeAttribute("style");

						collapseElement!.setAttribute("data-collapsed", "false");
					}
				}}
			>
				<h1 className={styles.collapseItemTitle}>
					{props.title}
				</h1>
				<i
					className={"fa-solid fa-chevron-down " + styles.collapseItemIcon}
					id={"collapseIcon" + props.identifier}
				></i>
			</button>
			<div
				className={styles.collapseItemContent}
				id={"collapse" + props.identifier}
				style={{
					height: "0",
					opacity: "0",
					background: props.color ? props.color : "var(--background-main-color)",
				}}
				data-collapsed="false"
			>
				<p
					style={
						{color: props.textColor ? props.textColor : "var(--text-main-color)"}
					}
				>{props.content}</p>
			</div>
		</>
	);
};

export default AccordionItem;
