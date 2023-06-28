/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LineSeparator from "@separators/lineSeparator";
import Tooltip from "@tooltips/defaultTooltip";
import Tags from "@tags";
import PrimaryTag from "@tags/primaryTag";
import SecondaryTag from "@tags/secondaryTag";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TStartup } from "@typescript/types/TStartup";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startup Profile Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const StartupProfileCard = (params: TStartup) => {
    const { t } = useTranslation("common");
    const { banner, category, logo, name, tags, url } = params;
    return <Link className={ CardStyles.card } href={ url || "/404" }>
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <Image src={ banner || "/assets/placeholders/banner.png" } alt={ "" } width="500" height="150"/>
        </div>
        <div className={ CardStyles.body }>
            <div className={ CardStyles.leftContainer }>
                <Image src={ logo || "/assets/placeholders/logo.png" } alt={ "" } width="100" height="100"/>
            </div>
            <LineSeparator classList="vertical"/>
            <div className={ CardStyles.rightContainer }>
                <Tooltip tooltip={ name }>
                    <p className={ CardStyles.title }>{ name }</p>
                </Tooltip>
                <Tooltip tooltip={ category?.name }>
                    <PrimaryTag tag={ category?.name }/>
                </Tooltip>
                { (tags) ? <Tags tags={ tags } limit={ 2 }>
                    { tags.map((tag: string, key: number) => <Fragment key={ key }>
                        <Tooltip tooltip={ (tags.length <= 1 && tag.length <= 0) ? t("undefinedText") : tag }>
                            { (tags.length <= 1 && tag.length <= 0) ? <SecondaryTag tag={ t("undefinedText") }/> : <SecondaryTag tag={ tag }/> }
                        </Tooltip>
                    </Fragment>) }
                </Tags> : null }
            </div>
        </div>
        <div className={ CardStyles.footer }/>
    </Link>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default StartupProfileCard;