import ButtonStyles from '../../public/stylesheets/components/buttons/Button.module.css'
import { useState } from 'react'
import ProductCard from '../cards/product';
import OpportunityCard from '../cards/opportunity';

const SeeMore = (props: any) => {
    const { list, max, type, states } = props;

    const { translations } = states;


    const [iterations, setIterations] = useState(1);

    const [isSeeMore, setIsSeeMore] = useState(true);
    const [isSeeLess, setIsSeeLess] = useState(false);



    const checkButtons = (iterations: number) => {
        if (iterations === 1) {
            setIsSeeLess(false)
        } else {
            setIsSeeLess(true)
        }

        if (iterations === Math.ceil(list.length / max)) {
            setIsSeeMore(false)
        } else {
            setIsSeeMore(true)
        }
    }

    const seeMoreHandler = () => {
        //if next iterations is less than the max iterations, then add 1 to iterations
        if (iterations < Math.ceil(list.length / max)) {
            setIterations(iterations + 1)
        }
        checkButtons(iterations + 1)
    }

    const seeLessHandler = () => {
        //if next iterations is greater than 1, then subtract 1 from iterations
        if (iterations > 1) {
            setIterations(iterations - 1)
        }

        checkButtons(iterations - 1)
    }



    return (
        <>
            <div className='grid twoColumns'>
                {
                    type === 'products' ?
                        list.slice(0, iterations * max).map((product: any, index: number) => {
                            return <ProductCard
                                key={index}
                                product={product}
                                states={states}
                            />
                        })
                        :
                        type === 'opportunities' ?
                            list.slice(0, iterations * max).map((opportunity: any, index: number) => {
                                return <OpportunityCard
                                    key={index}
                                    opportunity={opportunity}
                                    states={states}
                                />
                            }) :
                            <h1>ahahah</h1>
                }
            </div>
            <div className="grid twoColumns"
                style={{
                    justifyContent: 'center',
                }}
            >
                {isSeeLess && <button className={ButtonStyles.callToAction}
                    onClick={() => {
                        seeLessHandler()
                    }}
                >
                    {translations['Voir moins']}
                </button>}
                {isSeeMore && <button className={ButtonStyles.callToAction}
                    onClick={() => {
                        seeMoreHandler()
                    }}
                >
                    {translations['Voir plus']}
                </button>}
            </div>
        </>
    )
}

export default SeeMore