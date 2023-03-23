import ButtonStyles from '../../public/stylesheets/components/buttons/Button.module.css'
import { useState } from 'react'

const SeeMore = (props: any) => {
    const { list, max } = props;

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
        <><div className="grid twoColumns">
            {list.slice(0, (max * iterations)).map((item: any, index: number) => (
                <div key={index}
                    style={{
                        width: '100%',
                        height: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: `hsl(${Math.floor(Math.random() * 360)}, 100%, 90%)`,
                        color: '#0D0D0D',
                        borderRadius: '1rem',
                        fontWeight: 'bold',
                    }}
                >
                    {item}
                </div>
            ))}
        </div>
            <div className="grid twoColumns">
                {isSeeLess && <button className={ButtonStyles.callToAction}
                    onClick={() => {
                        seeLessHandler()
                    }}
                >
                    See Less
                </button>}
                {isSeeMore && <button className={ButtonStyles.callToAction}
                    onClick={() => {
                        seeMoreHandler()
                    }}
                >
                    See More
                </button>}
            </div>
        </>
    )
}

export default SeeMore