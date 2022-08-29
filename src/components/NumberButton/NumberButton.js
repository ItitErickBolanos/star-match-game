import { colors } from '../Game/Game';

const NumberButton = ({ number, status, onClick }) => {
    //Closures allow us to have 9 click handlers, each with their own number prop value (since it remembers the context)
    return (
        <button 
            className="number" 
            onClick={() => onClick(number, status)}
            style={{ backgroundColor: colors[status] }}
        >
            {number}
        </button>
    );
}

export {
    NumberButton
};