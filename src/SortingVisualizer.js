import {useState, useEffect, useRef} from 'react';
import selectionSort from './algorithms/selectionSort.js';
import bubbleSort from './algorithms/bubbleSort.js';
import insertionSort from './algorithms/insertionSort.js';
import heapSort from './algorithms/heapSort.js';
import quickSort from './algorithms/quickSort.js';
import mergeSort from './algorithms/mergeSort.js';
import shellSort from './algorithms/shellSort.js';
import shakerSort from './algorithms/shakerSort.js';
import { exponentialDistributionGeneration, nearlySortedOrderGeneration, normalDistributionGeneration, reverseOrderGeneration, sortedOrderGeneration, uniformDistributionGeneration } from './utils/methods.js';
import combSort from './algorithms/combSort.js';
import cocktailSort from './algorithms/cocktailSort.js';

//sorting algorithms tags
const bubbleSortName = "bubble";
const shakerSortName = "shaker";
const selectionSortName = "selection";
const cocktailSortName = "cocktail";
const insertionSortName = "insertion";
const shellSortName = "shell";
const combSortName = "comb";
const heapSortName = "heap";
const mergeSortName = "merge";
const quickSortName = "quick";

//distribution types
const uniformDistName = "uniform";
const normalDistName = "normal";
const exponentialDistName = "exponential";
const nearlySortedOrderName = "nearlySorted";
const sortedOrderName = "sorted";
const reverseOrderName = "reverse";

//visual parameters
const minBarHeight = 1;
const maxBarHeight = 80;
const barWidthCoefficient = 0.7;
const baseColor = 'DarkBlue'
const accessColor = 'Red';
const sortedColor = 'LimeGreen';

//sorting parameters
var operationsMade = -1;
var arrayLength = 100;
var animationDelay = 5;
var distribution = uniformDistName;

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const reference = useRef(null);

    const initializeArray = () => 
    {
        if (isSorting) return;

        const numbers = [];

        operationsMade = -1;
        resetBarsColor();
        updateOperationsCounter();
        
        switch(distribution)
        {
            case uniformDistName: uniformDistributionGeneration(numbers, arrayLength, maxBarHeight, minBarHeight); break;
            case normalDistName: normalDistributionGeneration(numbers, arrayLength, maxBarHeight, minBarHeight); break;
            case exponentialDistName: exponentialDistributionGeneration(numbers, arrayLength, maxBarHeight, minBarHeight); break;
            case nearlySortedOrderName: nearlySortedOrderGeneration(numbers, arrayLength, maxBarHeight, minBarHeight); break;
            case sortedOrderName: sortedOrderGeneration(numbers, arrayLength, maxBarHeight, minBarHeight); break;
            case reverseOrderName: reverseOrderGeneration(numbers, arrayLength, maxBarHeight, minBarHeight); break;
            default: break;
        }

        setArray(numbers);   
    }

    const prepareSortingAnimation = (algorithmName) =>
    {
        let animations = [];
        let arrayCopy = [...array];
        
        switch (algorithmName)
        {
            case bubbleSortName: bubbleSort(arrayCopy, animations); break;
            case shakerSortName: shakerSort(arrayCopy, animations); break;
            case selectionSortName: selectionSort(arrayCopy, animations); break;
            case cocktailSortName: cocktailSort(arrayCopy, animations); break;
            case insertionSortName: insertionSort(arrayCopy, animations); break;
            case shellSortName: shellSort(arrayCopy, animations); break;
            case combSortName: combSort(arrayCopy, animations); break;
            case heapSortName: heapSort(arrayCopy, animations); break;
            case mergeSortName: mergeSort(arrayCopy, animations); break;
            case quickSortName: quickSort(arrayCopy, animations); break;
            default: break;
        }
        
        animateSorting(animations);
    }   
    
    const animateSorting = (animations) => {
        if (isSorting) return;

        resetBarsColor();
        setIsSorting(true);        
        
        animations.forEach((animation, index) => {
            let accessedBars = animation.accessed;
            let swapped = animation.swapped;
            
            setTimeout(() => {        
                if (!swapped)
                {
                    let firstBarIndex = accessedBars[0];
                    let secondBarIndex = accessedBars[1];
                    
                    updateOperationsCounter();
                    animateBarAccess(firstBarIndex);
                    animateBarAccess(secondBarIndex);
                }
                else
                {
                    updateOperationsCounter();

                    setArray((array) => {
                        let barIndex = accessedBars[0];
                        let newValue = accessedBars[1];
                        const newArray = [...array];
                        newArray[barIndex] = newValue;
                        return newArray;
                    })
                }
            }, index * animationDelay);
        });

        setTimeout(() => {
            operationsMade = -1;
            animateSortedArray();
        }, animations.length * animationDelay);
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

    const updateOperationsCounter = () => {
        document.getElementById("counterText").innerText = "Operations: " + ++operationsMade;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initializeArray(distribution), []);

    return (
        <div className="main-container">
            <div className="header">
                <button onClick={() => initializeArray()} disabled={isSorting}>Generate Array</button>
                <button onClick={() => prepareSortingAnimation(document.getElementById("sortingAlgorithmSelector").value)} disabled={isSorting}>Sort Array</button>
                
                <select id="sortingAlgorithmSelector" defaultValue={bubbleSortName} disabled={isSorting}>
                    <option value={bubbleSortName}>Bubble Sort</option>
                    <option value={shakerSortName}>Shaker Sort</option>
                    <option value={selectionSortName}>Selection Sort</option>
                    <option value={cocktailSortName}>Cocktail Sort</option>
                    <option value={insertionSortName}>Insertion Sort</option>
                    <option value={shellSortName}>Shell Sort</option>
                    <option value={combSortName}>Comb Sort</option>
                    <option value={heapSortName}>Heap Sort</option>
                    <option value={mergeSortName}>Merge Sort</option>
                    <option value={quickSortName}>Quick Sort</option>
                </select>

                <select id="distributionSelector" defaultValue={uniformDistName} onChange={() => {distribution = document.getElementById("distributionSelector").value; initializeArray()}} disabled={isSorting}>
                    <option value={uniformDistName}>Uniform</option>
                    <option value={normalDistName}>Normal</option>
                    <option value={exponentialDistName}>Exponential</option>
                    <option value={nearlySortedOrderName}>Nearly Sorted</option>
                    <option value={sortedOrderName}>Sorted</option>
                    <option value={reverseOrderName}>Reverse</option>
                </select>

                <select id="arrayLengthSelector" defaultValue={"100"} onChange={() => {arrayLength = document.getElementById("arrayLengthSelector").value; initializeArray()}} disabled={isSorting}>
                    <option value="25">Bars: 25</option>
                    <option value="50">Bars: 50</option>
                    <option value="75">Bars: 75</option>
                    <option value="100">Bars: 100</option>
                    <option value="125">Bars: 125</option>
                    <option value="125">Bars: 150</option>
                </select>

                <select id="animationSpeedSelector" defaultValue={"5"} onChange={() => {animationDelay = document.getElementById("animationSpeedSelector").value}} disabled={isSorting}>
                    <option value="10">Speed: 0.5x</option>
                    <option value="5">Speed: 1x</option>
                    <option value="3.3">Speed: 1.5x</option>
                    <option value="2.5">Speed: 2x</option>
                </select>

                <p id='counterText'>Operations: 0</p>
            </div>

            <div className="array-container" ref={reference}>
                {array.map((barHeight, index) => {
                    return <div style = {
                        {
                            height: barHeight + 'vh', 
                            width: 95 / arrayLength * barWidthCoefficient + '%', 
                            margin: 20 / arrayLength * barWidthCoefficient + '%'
                        }} 
                    className="array-bar" key={index}/>
                })}
            </div>
        </div>
    );
}

export default SortingVisualizer;