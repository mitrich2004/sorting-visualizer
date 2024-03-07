import {useState, useEffect, useRef} from 'react';
import { arrayGenerators, inputTypeOptions, sortingAlgorithms, sortingAlgorithmOptions, arrayLengthOptions, animationSpeedOptions } from './utils/constants.js';

//visual parameters
const minBarHeight = 1;
const maxBarHeight = 80;
const baseColor = 'DarkBlue'
const accessColor = 'Red';
const sortedColor = 'LimeGreen';

//sorting parameters
var sortingAlgorithm = sortingAlgorithms.bubble;
var arrayGenerator = arrayGenerators.uniform;
var arrayLength = 100;
var animationDelay = 5;
var operationsMade = 0;

const SortingVisualizer = () => {
    //hooks
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const reference = useRef(null);

    //selectors
    const sortingAlgorithmSelector = document.getElementById("sortingAlgorithmSelector");
    const arrayLengthSelector = document.getElementById("arrayLengthSelector");
    const animationSpeedSelector = document.getElementById("animationSpeedSelector");
    const distributionSelector = document.getElementById("distributionSelector");

    const initializeArray = () => 
    {   
        const array = [];
        resetBarsColor();
        updateOperationsCounter(0);

        arrayGenerator(array, arrayLength, maxBarHeight, minBarHeight);
        setArray(array);   
    }

    const prepareSortingAnimation = () =>
    {
        let animations = [];
        let arrayCopy = [...array];
        
        updateOperationsCounter(0);
        sortingAlgorithm(arrayCopy, animations);
        animateSorting(animations);
    }   
    
    const animateSorting = (animations) => {
        resetBarsColor();
        setIsSorting(true);        
        
        animations.forEach((animation, index) => {
            let accessedBars = animation.accessed;
            let swapped = animation.swapped;
            
            setTimeout(() => {    
                if (!swapped)
                {
                    animateBarAccess(accessedBars[0]);
                    animateBarAccess(accessedBars[1]);
                }
                else
                {
                    const bars = reference.current.children;
                    const barStyle = bars[accessedBars[0]].style;
                    barStyle.height = `${accessedBars[1]}vh`;
                }
                
                updateOperationsCounter(++operationsMade);
            }, index * animationDelay);
        });

        setTimeout(() => animateSortedArray(), animations.length * animationDelay);
    }

    const animateBarAccess = (index) => 
    {
        const bars = reference.current.children;
        const barStyle = bars[index].style;

        setTimeout(() => barStyle.backgroundColor = accessColor, animationDelay);
        setTimeout(() => barStyle.backgroundColor = baseColor, animationDelay * 2);
    }

    const animateSortedArray = () =>
    {
        const bars = reference.current.children;

        for (let i = 0; i < bars.length; ++i)
        {
            setTimeout(() => {
                let barStyle = bars[i].style;
                barStyle.backgroundColor = sortedColor;
            }, i * animationDelay * 2)
        }

        setTimeout(() => setIsSorting(false), bars.length * animationDelay * 2);
    }

    const resetBarsColor = () => {
        const bars = reference.current.children;

        for (let i = 0; i < bars.length; ++i)
        {
            let barStyle = bars[i].style;
            barStyle.backgroundColor = baseColor;
        }
    }

    const updateOperationsCounter = (operations) => {
        operationsMade = operations;
        document.getElementById("operationsCounter").innerText = "Operations: " + operations;
    }

    //eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initializeArray(arrayGenerator), []);

    return (
        <div className="main-container">
            <div className="header">
                <button onClick={() => initializeArray()} disabled={isSorting}>Generate Array</button>
                <button onClick={() => prepareSortingAnimation()} disabled={isSorting}>Sort Array</button>
                
                <select id="sortingAlgorithmSelector" defaultValue={"bubble"} disabled={isSorting} 
                onChange={() => sortingAlgorithm = sortingAlgorithms[sortingAlgorithmSelector.value]}>
                    {sortingAlgorithmOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
                </select>

                <select id="distributionSelector" defaultValue={"uniform"} disabled={isSorting}
                onChange={() => {arrayGenerator = arrayGenerators[distributionSelector.value]; initializeArray()}}>
                    {inputTypeOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
                </select>

                <select id="arrayLengthSelector" defaultValue={"100"} disabled={isSorting}
                onChange={() => {arrayLength = arrayLengthSelector.value; initializeArray()}}>
                    {arrayLengthOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
                </select>

                <select id="animationSpeedSelector" defaultValue={"5"} disabled={isSorting}
                onChange={() => animationDelay = animationSpeedSelector.value}>
                    {animationSpeedOptions.map(({ value, label }) => <option value={value}>{label}</option>)}
                </select>

                <p id="operationsCounter">Operations: 0</p>
            </div>

            <div className="array-container" ref={reference}>
                {
                    array.map((barHeight, index) => {
                        return <div style = {{
                            height: `${barHeight}vh`, 
                            width: `${70 / arrayLength}%`, 
                            margin: `${14 / arrayLength}%`
                        }} 
                        className="array-bar" key={index}/>
                    })
                }
            </div>
        </div>
    );
}

export default SortingVisualizer;