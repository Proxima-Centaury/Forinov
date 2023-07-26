/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from  "next/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { TImage } from "@typescript/types/TImage";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Custom Image */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const CustomImage = (params: TImage) => {
    const { src, alt } = params;
    const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";
    return <Image src={ src || "" } alt={ alt || "" } fill sizes={ sizes } placeholder="blur" blurDataURL={ src }/>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default CustomImage;