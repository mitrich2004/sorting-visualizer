import {swap} from "../utils/methods.js";

function quickSort(array, animations)
{
    quickSortHelper(array, 0, array.length - 1, animations);
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
        animations.push({accessed: [leftIndex, pivotIndex], swapped: false});

        while (array[leftIndex] <= array[pivotIndex])
        {
            animations.push({accessed: [leftIndex, pivotIndex], swapped: false});
            leftIndex += 1;
        }

        animations.push({accessed: [rightIndex, pivotIndex], swapped: false});

        while (array[rightIndex] > array[pivotIndex])
        {
            animations.push({accessed: [rightIndex, pivotIndex], swapped: false});
            rightIndex -= 1;
        }

        if (leftIndex < rightIndex)
        {
            animations.push({accessed: [leftIndex, array[rightIndex]], swapped: true}, {accessed: [rightIndex, array[leftIndex]], swapped: true});
            swap(array, leftIndex, rightIndex);
        }
    }

    animations.push({accessed: [rightIndex, pivotIndex], swapped: false});

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
        quickSortHelper(array, startIndex, pivotIndex - 1, animations);
    }

    if (endIndex > pivotIndex + 1)
    {
        quickSortHelper(array, pivotIndex + 1, endIndex, animations);
    }
}

export default quickSort;