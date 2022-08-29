import { colors } from '../StarMatch/StarMatch';

const NumberButton = ({ number, status }) => {
    //Closures allow us to have 9 click handlers, each with their own number prop value (since it remembers the context)
    return (
        <button 
            className="number" 
            onClick={() => console.log('Num', number)}
            style={{ backgroundColor: colors[status] }}
        >
            {number}
        </button>
    );
}

export {
    NumberButton
};