import {useState, useEffect, useRef} from 'react';
import selectionSort from './algorithms/selectionSort';
import bubbleSort from './algorithms/bubbleSort';
import insertionSort from './algorithms/insertionSort';
import heapSort from './algorithms/heapSort';
import quickSort from './algorithms/quickSort';
import mergeSort from './algorithms/mergeSort';
import testSortingAlgorithm from './algorithms/tests';
import shellSort from './algorithms/shellSort';
import shakerSort from './algorithms/shakerSort';

//sorting algorithms tags
const selectionSortName = "selection";
const bubbleSortName = "bubble";
const shakerSortName = "shaker";
const insertionSortName = "insertion";
const shellSortName = "shell";
const heapSortName = "heap";
const quickSortName = "quick";
const mergeSortName = "merge";
//pancake, comb

//distribution types
const uniformDistName = "uniform";
const normalDistName = "normal";
const exponentialDistName = "exponential";

//visual parameters
const minBarHeight = 1;
const maxBarHeight = 80;
const barWidthCoefficient = 0.7;
const baseColor = 'DarkBlue'
const accessColor = 'Red';
const sortedColor = 'LimeGreen';

//sorting parameters
var operationsMade = 0;
var arrayLength = 100;
var animationDelay = 5;
var distribution = "uniform";

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const reference = useRef(null);

    // test all sorting algorithms
    //console.log("Selection: " + testSortingAlgorithm(bubbleSortName));
    //console.log("Bubble: " + testSortingAlgorithm(selectionSortName));
    //console.log("Shaker: " + testSortingAlgorithm(shakerSortName));
    //console.log("Insertion: " + testSortingAlgorithm(insertionSortName));
    //console.log("Shell: " + testSortingAlgorithm(shellSortName));
    //console.log("Merge " + testSortingAlgorithm(mergeSortName));
    //console.log("Heap " + testSortingAlgorithm(heapSortName));
    //console.log("Quick " + testSortingAlgorithm(quickSortName));

    const initializeArray = () => 
    {
        if (isSorting)
        {
            return;
        }
        
        resetBarsColor();
        operationsMade = -1;
        updateOperationsCounter();
        
        var numbers = [];
        
        switch(distribution)
        {
            case uniformDistName: numbers = uniformDistributionGeneration(); break;
            case normalDistName: numbers = normalDistributionGeneration(); break;
            case exponentialDistName: numbers = exponentialDistributionGeneration(); break;
            default: break;
        }

        setArray(numbers);   
    }

    const uniformDistributionGeneration = () =>
    {
        const numbers = [];

        for (let i = 0; i < arrayLength; ++i)
        {
            const num = Math.floor(Math.random() * (maxBarHeight - minBarHeight) + minBarHeight);
            numbers.push(num);
        }

        return numbers;
    }

    const normalDistributionGeneration = () =>
    {
        const numbers = [];

        for (let i = 0; i < arrayLength; ++i)
        {
            const u = Math.random();
            const prob = 1 - Math.abs(0.5 - u) * 2;
            
            if (prob > Math.random())
            {
                const num = Math.floor(u * (maxBarHeight - minBarHeight) + minBarHeight);
                numbers.push(num);
            }
            else
            {
                i -= 1;
            }
        }

        return numbers;
    }

    const exponentialDistributionGeneration = () =>
    {
        const numbers = [];

        for (let i = 0; i < arrayLength; ++i)
        {
            const u = Math.random();
            const exp = Math.log(1 - u) / (-3);
            if (exp <= 1)
            {
                const num = Math.floor(exp * (maxBarHeight - minBarHeight) + minBarHeight);
                numbers.push(num);
            }
            else
            {
                i -= 1;
            }
        }

        return numbers;
    }

    const prepareSortingAnimation = (algorithmName) =>
    {
        let sortedArray = [...array];
        let animations = [];
        
        switch (algorithmName)
        {
            case selectionSortName: animations = selectionSort(sortedArray).animations; break;
            case bubbleSortName: animations = bubbleSort(sortedArray).animations; break;
            case shakerSortName: animations = shakerSort(sortedArray).animations; break;
            case insertionSortName: animations = insertionSort(sortedArray).animations; break;
            case shellSortName: animations = shellSort(sortedArray).animations; break;
            case mergeSortName: animations = mergeSort(sortedArray).animations; break;
            case heapSortName: animations = heapSort(sortedArray).animations; break;
            case quickSortName: animations = quickSort(sortedArray).animations; break;
            default: break;
        }
        animateSorting(animations);
    }   
    
    const animateSorting = (animations) => {
        if (isSorting)
        {
            return;
        }

        resetBarsColor();
        setIsSorting(true);
        let countSwap = false;
        animations.forEach((animation, index) => {
            let accessedBars = animation.accessed;
            let swapped = animation.swapped;
            setTimeout(() => {        
                if (!swapped)
                {
                    updateOperationsCounter();

                    if (accessedBars.length === 2)
                    {
                        let firstBarIndex = accessedBars[0];
                        let secondBarIndex = accessedBars[1];
                        animateBarAccess(firstBarIndex);
                        animateBarAccess(secondBarIndex);
                    }
                    else
                    {
                        let barIndex = accessedBars[0];
                        animateBarAccess(barIndex);
                    }
                }
                else
                {
                    countSwap = !countSwap;

                    if (countSwap)
                    {
                        updateOperationsCounter();
                    }

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
        let bars = reference.current.children;
        let barStyle = bars[index].style;
        
        setTimeout(() => {
            barStyle.backgroundColor = accessColor;
          }, animationDelay);

        setTimeout(() => {
            barStyle.backgroundColor = baseColor;
        }, animationDelay * 2);
    }

    const animateSortedArray = () =>
    {
        let bars = reference.current.children;
        for (let i = 0; i < bars.length; ++i)
        {
            setTimeout(() => {
                let barStyle = bars[i].style;
                barStyle.backgroundColor = sortedColor;
            }, i * animationDelay * 2)
        }

        setTimeout(() => {
            setIsSorting(false);
        }, bars.length * animationDelay * 2);
    }

    const resetBarsColor = () => {
        let bars = reference.current.children;
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
                
                <select id="sortingAlgorithmSelector" disabled={isSorting}>
                    <option value={selectionSortName} selected>Selection Sort</option>
                    <option value={bubbleSortName}>Bubble Sort</option>
                    <option value={shakerSortName}>Shaker Sort</option>
                    <option value={insertionSortName}>Insertion Sort</option>
                    <option value={shellSortName}>Shell Sort</option>
                    <option value={mergeSortName}>Merge Sort</option>
                    <option value={heapSortName}>Heap Sort</option>
                    <option value={quickSortName}>Quick Sort</option>
                </select>

                <select id="distributionSelector" onChange={() => {distribution = document.getElementById("distributionSelector").value; initializeArray()}} disabled={isSorting}>
                    <option value={uniformDistName} selected>Uniform Dist</option>
                    <option value={normalDistName}>Normal Dist</option>
                    <option value={exponentialDistName}>Exponential Dist</option>
                </select>

                <select id="arrayLengthSelector" onChange={() => {arrayLength = document.getElementById("arrayLengthSelector").value; initializeArray()}} disabled={isSorting}>
                    <option value="25">Bars: 25</option>
                    <option value="50">Bars: 50</option>
                    <option value="75">Bars: 75</option>
                    <option value="100" selected>Bars: 100</option>
                    <option value="125">Bars: 125</option>
                    <option value="125">Bars: 150</option>
                </select>

                <select id="animationSpeedSelector" onChange={() => {animationDelay = document.getElementById("animationSpeedSelector").value}} disabled={isSorting}>
                    <option value="10">Speed: 0.5x</option>
                    <option value="5" selected>Speed: 1x</option>
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