import {useState, useEffect, useRef} from 'react';
import selectionSort from './algorithms/selectionSort';
import bubbleSort from './algorithms/bubbleSort';
import insertionSort from './algorithms/insertionSort';
import heapSort from './algorithms/heapSort';
import quickSort from './algorithms/quickSort';
import mergeSort from './algorithms/mergeSort';
//import testSortingAlgorithm from './algorithms/tests';

//sorting algorithms tags
const selectionSortName = "selection";
const bubbleSortName = "bubble";
const insertionSortName = "insertion";
const heapSortName = "heap";
const quickSortName = "quick";
const mergeSortName = "merge";

//visual parameters
const minBarHeight = 1;
const maxBarHeight = 80;
var arrayLength = 100;
var animationDelay = 5;
const barWidthCoefficient = 0.7;
const baseColor = 'DarkBlue'
const accessColor = 'Red';
const sortedColor = 'LimeGreen';

const SortingVisualizer = () => {
    const [array, setArray] = useState([]);
    const [isSorting, setIsSorting] = useState(false);
    const reference = useRef(null);

    // test all sorting algorithms
    //console.log("Selection: " + testSortingAlgorithm(bubbleSortName));
    //console.log("Bubble: " + testSortingAlgorithm(selectionSortName));
    //console.log("Insertion: " + testSortingAlgorithm(insertionSortName));
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
        const numbers = [];

        for (let i = 0; i < arrayLength; ++i)
        {
            numbers.push(Math.floor(Math.random() * (maxBarHeight - minBarHeight) + minBarHeight));
        }

        setArray(numbers);   
    }

    const prepareSortingAnimation = (algorithmName) =>
    {
        let sortedArray = [...array];
        let animations = [];
        
        switch (algorithmName)
        {
            case selectionSortName: animations = selectionSort(sortedArray).animations; break;
            case bubbleSortName: animations = bubbleSort(sortedArray).animations; break;
            case insertionSortName: animations = insertionSort(sortedArray).animations; break;
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
        animations.forEach((animation, index) => {
            let accessedBars = animation.accessed;
            let swapped = animation.swapped;
            setTimeout(() => {
                if (!swapped)
                {
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

    const setArrayLength = (newLength) => {
        arrayLength = newLength;
        initializeArray();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => initializeArray(), []);

    return (
        <div className="main-container">
            <div className="header">
                <button onClick={() => initializeArray()} disabled={isSorting}>Generate Array</button>
                <button onClick={() => prepareSortingAnimation(selectionSortName)} disabled={isSorting}>Selection Sort</button>
                <button onClick={() => prepareSortingAnimation(bubbleSortName)} disabled={isSorting}>Bubble Sort</button>
                <button onClick={() => prepareSortingAnimation(insertionSortName)} disabled={isSorting}>Insertion Sort</button>
                <button onClick={() => prepareSortingAnimation(mergeSortName)} disabled={isSorting}>Merge Sort</button>
                <button onClick={() => prepareSortingAnimation(heapSortName)} disabled={isSorting}>Heap Sort</button>
                <button onClick={() => prepareSortingAnimation(quickSortName)} disabled={isSorting}>Quick Sort</button>

                <select id="arrayLengthSelector" onChange={() => setArrayLength(document.getElementById("arrayLengthSelector").value)} disabled={isSorting}>
                    <option value="25">Bars: 25</option>
                    <option value="50">Bars: 50</option>
                    <option value="75">Bars: 75</option>
                    <option value="100" selected="selected">Bars: 100</option>
                    <option value="125">Bars: 125</option>
                    <option value="125">Bars: 150</option>
                </select>

                <select id="animationSpeedSelector" onChange={() => {animationDelay = document.getElementById("animationSpeedSelector").value}} disabled={isSorting}>
                    <option value="10">Speed: 0.5x</option>
                    <option value="5" selected="selected">Speed: 1x</option>
                    <option value="3.3">Speed: 1.5x</option>
                    <option value="2.5">Speed: 2x</option>
                </select>
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