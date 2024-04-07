import { useState } from 'react'

function calculateFlames(name1, name2) {
    // Convert names to lowercase and remove spaces
    const name1Lower = name1.toLowerCase().replace(/\s/g, '');
    const name2Lower = name2.toLowerCase().replace(/\s/g, '');

    // Convert names to arrays of characters
    const name1Array = name1Lower.split('');
    const name2Array = name2Lower.split('');

    // Remove common letters
    const commonLetters = name1Array.filter(letter => name2Array.includes(letter));
    const remainingLetters = [...name1Array, ...name2Array].filter(letter => !commonLetters.includes(letter));

    // Calculate the length of remaining letters
    const totalCount = remainingLetters.length;

    // Determine the result based on the length
    const resultOptions = ['Friends', 'Lovers', 'Affectionate', 'Marriage', 'Enemies', 'Siblings'];
    let index = totalCount % resultOptions.length;

    // Output the result
    return resultOptions[index];
}

/*const calculateFlamesLogic = (name1, name2) => {
    // Combine names, removing duplicates (case-insensitive)
    const combinedName = (name1 + name2)
        .toLowerCase()
        .split('')
        .filter((char, index) => combinedName.indexOf(char) === index);

    let flames = 'FLAMES';
    let count = combinedName.length;

    while (count > 1) {
        for (let i = 0; i < flames.length; i++) {
            count--;
            if (count === 0) {
                flames = flames.slice(i + 1) + flames.slice(0, i);
                break;
            }
        }
    }

    return flames[0];
};*/



const Result = ({ result }) => {
    return (
        <div>
            <h2>Your Relationship is: {result}</h2>
        </div>
    );
};

const InputFields = ({ name1, name2, handleInputChange, calculateFLAMES }) => {
    return (
        <div>
            <input
                type="text"
                placeholder="Enter Name 1"
                value={name1}
                onChange={(e) => handleInputChange(e, 'name1')}
            />
            <input
                type="text"
                placeholder="Enter Name 2"
                value={name2}
                onChange={(e) => handleInputChange(e, 'name2')}
            />
            <button onClick={calculateFLAMES}>Calculate FLAMES</button>
        </div>
    );
};




function Flames() {
  const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [result, setResult] = useState('');
    const handleInputChange = (event, name) => {
    if (name === 'name1') {
        setName1(event.target.value);
    } else {
        setName2(event.target.value);
    }
};

const calculateFLAMES = () => {
    // Function to calculate FLAMES based on names (implementation details in next step)
    const flamesResult = calculateFlames(name1, name2);
    setResult(flamesResult);
};

  return (
    <div className="App">
        <h1>FLAMES Game</h1>
        <InputFields
            name1={name1}
            name2={name2}
            handleInputChange={handleInputChange}
            calculateFLAMES={calculateFLAMES}
        />
        {result && <Result result={result} />}
    </div>
);
}

export default Flames
