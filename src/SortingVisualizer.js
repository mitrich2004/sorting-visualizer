import {useState, useEffect, useRef} from 'react';
import selectionSort from './algorithms/selectionSort';
import bubbleSort from './algorithms/bubbleSort';
import insertionSort from './algorithms/insertionSort';
import heapSort from './algorithms/heapSort';
import quickSort from './algorithms/quickSort';
//import testSortingAlgorithm from './algorithms/tests';
import mergeSort from './algorithms/mergeSort';

//sorting algorithms tags
const selectionSortName = "selection";
const bubbleSortName = "bubble";
const insertionSortName = "insertion";
const heapSortName = "heap";
const quickSortName = "quick";
const mergeSortName = "merge";

//visual parameters
const minBarHeight = 10;
const maxBarHeight = 900;
const arrayLength = 100;
const animationDelay = 5;
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

    useEffect(() => initializeArray(), []);

    return (
        <div>
            <button onClick={() => initializeArray()}>Generate Array</button>
            <button onClick={() => prepareSortingAnimation(selectionSortName)}>Selection Sort</button>
            <button onClick={() => prepareSortingAnimation(bubbleSortName)}>Bubble Sort</button>
            <button onClick={() => prepareSortingAnimation(insertionSortName)}>Insertion Sort</button>
            <button onClick={() => prepareSortingAnimation(mergeSortName)}>Merge Sort</button>
            <button onClick={() => prepareSortingAnimation(heapSortName)}>Heap Sort</button>
            <button onClick={() => prepareSortingAnimation(quickSortName)}>Quick Sort</button>

            <div className="array-container" ref={reference}>
                {array.map((value, index) => {
                    return <div style={{height: value + 'px'}} className="array-bar" key={index}/>
                })}
            </div>
        </div>
    );
}

export default SortingVisualizer;