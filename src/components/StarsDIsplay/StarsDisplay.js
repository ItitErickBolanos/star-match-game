import { utils } from '../Game/Game';

const StarsDisplay = ({ count }) => {
    return (
        <>
            {utils.range(1, count).map(starId =>
                <div key={starId} className="star"></div>
            )}
        </>
    )
}

export {
    StarsDisplay
};