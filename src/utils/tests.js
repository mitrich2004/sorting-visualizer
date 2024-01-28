import selectionSort from "../algorithms/selectionSort.js";
import bubbleSort from "../algorithms/bubbleSort.js";
import insertionSort from "../algorithms/insertionSort.js";
import heapSort from "../algorithms/heapSort.js";
import quickSort from "../algorithms/quickSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import shellSort from "../algorithms/shellSort.js";
import shakerSort from "../algorithms/shakerSort.js";

const times = 100;
const maxSize = 150;
const minSize = 1;
const maxElement = 1000;
const minElement = -1000;

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
            case "selection":  selectionSort(array, []); break;
            case "bubble": bubbleSort(array, []); break;
            case "shaker": shakerSort(array, []); break;
            case "insertion": insertionSort(array, []); break;
            case "shell": shellSort(array, []); break;
            case "merge": mergeSort(array, []); break;
            case "heap": heapSort(array, []); break;
            case "quick": quickSort(array, []); break;
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

console.log("selection:", testSortingAlgorithm("selection"));
console.log("bubble:", testSortingAlgorithm("bubble"));
console.log("shaker:", testSortingAlgorithm("shaker"));
console.log("insertion:", testSortingAlgorithm("insertion"));
console.log("shell:", testSortingAlgorithm("shell"));
console.log("merge:", testSortingAlgorithm("merge"));
console.log("heap:", testSortingAlgorithm("heap"));
console.log("quick:", testSortingAlgorithm("quick"));
