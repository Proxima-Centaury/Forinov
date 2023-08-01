/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CustomImage from "@contents/customImage";
import Tags from "@tags";
import PrimaryTag from "@tags/primaryTag";
import SecondaryTag from "@tags/secondaryTag";
import Tooltip from "@tooltips/defaultTooltip";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { StartupType } from "@typescript/types/StartupType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startup Profile Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const StartupProfileCard = (params: StartupType) => {
    const { t } = useTranslation("common");
    const { id, banner, category, description, location, logo, name, tags, url } = params;
    return <Link className={ CardStyles.card } href={ url || "/404" }>
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <CustomImage src={ banner || "/assets/placeholders/banner.png" } alt=""/>
        </div>
        <div className={ CardStyles.body }>
            <div className={ CardStyles.leftContainer }>
                <CustomImage src={ logo || "/assets/placeholders/logo.png" } alt=""/>
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