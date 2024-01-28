import {swap} from "../utils/methods.js";

function quickSort(array, animations)
{
    array = quickSortHelper(array, 0, array.length - 1, animations);
}

function quickSortHelper(array, startIndex, endIndex, animations)
{
    let midIndex = Math.floor((startIndex + endIndex) / 2);

    animations.push({accessed: [startIndex, array[midIndex]], swapped: true}, {accessed: [midIndex, array[startIndex]], swapped: true});
    swap(array, startIndex, midIndex);

    let pivotIndex = startIndex;    
    let leftIndex = startIndex + 1;
    let rightIndex = endIndex;

    while (leftIndex < rightIndex)
    {
        while (array[leftIndex] <= array[pivotIndex] && leftIndex < rightIndex)
        {
            animations.push({accessed: [leftIndex, pivotIndex], swapped: false});
            leftIndex += 1;
        }

        while (array[rightIndex] > array[pivotIndex])
        {
            animations.push({accessed: [rightIndex, pivotIndex], swapped: false});
            rightIndex -= 1;
        }

        if (leftIndex <= rightIndex)
        {
            animations.push({accessed: [leftIndex, array[rightIndex]], swapped: true}, {accessed: [rightIndex, array[leftIndex]], swapped: true});
            swap(array, leftIndex, rightIndex);
        }
    }

    while (array[rightIndex] > array[pivotIndex])
    {
        animations.push({accessed: [rightIndex, pivotIndex], swapped: false});
        rightIndex -= 1;
    }

    animations.push({accessed: [pivotIndex, array[rightIndex]], swapped: true}, {accessed: [rightIndex, array[pivotIndex]], swapped: true});
    swap(array, pivotIndex, rightIndex);
    pivotIndex = rightIndex;


    if (startIndex < pivotIndex - 1)
    {
        array = quickSortHelper(array, startIndex, pivotIndex - 1, animations);
    }

    if (endIndex > pivotIndex + 1)
    {
        array = quickSortHelper(array, pivotIndex + 1, endIndex, animations);
    }

    return array;
}

export default quickSort;