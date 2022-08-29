const NumberButton = ({ number }) => {
    return (
        <button className="number" onClick={() => console.log('Num', number)}>
            {number}
        </button>
    );
}

export {
    NumberButton
};