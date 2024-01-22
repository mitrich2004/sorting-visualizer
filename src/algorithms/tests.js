import selectionSort from "./selectionSort";
import bubbleSort from "./bubbleSort";
import insertionSort from "./insertionSort";
import heapSort from "./heapSort";
import quickSort from "./quickSort";
import mergeSort from "./mergeSort";
import shellSort from "./shellSort";
import shakerSort from "./shakerSort";

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
        
        let sortedArray = [];

        switch (algorithm)
        {
            case "selection": sortedArray = selectionSort(array).result; break;
            case "bubble": sortedArray = bubbleSort(array).result; break;
            case "shaker": sortedArray = shakerSort(array).result; break;
            case "insertion": sortedArray = insertionSort(array).result; break;
            case "shell": sortedArray = shellSort(array).result; break;
            case "merge": sortedArray = mergeSort(array).result; break;
            case "heap": sortedArray = heapSort(array).result; break;
            case "quick": sortedArray = quickSort(array).result; break;
            default: return false;
        }
        
        if (sortedArray.length !== size)
        {
            return false;
        }

        for (let i = 1; i < size; ++i)
        {
            if (sortedArray[i] < sortedArray[i - 1])
            {
                return false;
            }
        }
    }

    return true;
}

export default testSortingAlgorithm;