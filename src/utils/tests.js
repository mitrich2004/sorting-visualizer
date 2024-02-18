import selectionSort from "../algorithms/selectionSort.js";
import bubbleSort from "../algorithms/bubbleSort.js";
import insertionSort from "../algorithms/insertionSort.js";
import heapSort from "../algorithms/heapSort.js";
import quickSort from "../algorithms/quickSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import shellSort from "../algorithms/shellSort.js";
import shakerSort from "../algorithms/shakerSort.js";
import combSort from "../algorithms/combSort.js";
import cocktailSort from "../algorithms/cocktailSort.js";

const times = 100;
const maxSize = 1000;
const minSize = 100;
const maxElement = 1000;
const minElement = -1000;

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

function testSortingAlgorithm(algorithm)
{
    for (let t = 0; t < times; ++t)
    {
        let array = [];
        let size = Math.floor(Math.random() * (maxSize - minSize) + minSize);
    
        for (let i = 0; i < size; ++i)
        {
            array.push(Math.floor(Math.random() * (maxElement - minElement) + minElement));
        }

        switch (algorithm)
        {
            case bubbleSortName: bubbleSort(array, []); break;
            case shakerSortName: shakerSort(array, []); break;
            case selectionSortName: selectionSort(array, []); break;
            case cocktailSortName: cocktailSort(array, []); break;
            case insertionSortName: insertionSort(array, []); break;
            case shellSortName: shellSort(array, []); break;
            case combSortName: combSort(array, []); break;
            case heapSortName: heapSort(array, []); break;
            case mergeSortName: mergeSort(array, []); break;
            case quickSortName: quickSort(array, []); break;
            default: return false;
        }
        
        if (array.length !== size) return false;

        for (let i = 1; i < size; ++i)
        {
            if (array[i] < array[i - 1]) return false;
        }
    }

    return true;
}

console.log(bubbleSortName, testSortingAlgorithm(bubbleSortName));
console.log(shakerSortName, testSortingAlgorithm(shakerSortName));
console.log(selectionSortName, testSortingAlgorithm(selectionSortName));
console.log(cocktailSortName, testSortingAlgorithm(cocktailSortName));
console.log(insertionSortName, testSortingAlgorithm(insertionSortName));
console.log(shellSortName, testSortingAlgorithm(shellSortName));
console.log(combSortName, testSortingAlgorithm(combSortName));
console.log(heapSortName, testSortingAlgorithm(heapSortName));
console.log(mergeSortName, testSortingAlgorithm(mergeSortName));
console.log(quickSortName, testSortingAlgorithm(quickSortName));
