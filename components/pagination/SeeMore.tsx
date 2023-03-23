import ButtonStyles from '../../public/stylesheets/components/buttons/Button.module.css'
import { useState } from 'react'

const SeeMore = (props: any) => {
    const { list, max, translations, type } = props;

    const [iterations, setIterations] = useState(1);

    const [isSeeMore, setIsSeeMore] = useState(true);
    const [isSeeLess, setIsSeeLess] = useState(false);

    console.log('list', list);
    console.log('type', type);
    
    

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
            {
                //render the list of items based on the type of list
            }
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