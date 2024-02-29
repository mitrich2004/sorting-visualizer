import {swap} from "../utils/methods.js";

function quickSort(array, animations)
{
    quickSortHelper(array, 0, array.length - 1, animations);
}

function quickSortHelper(array, startIndex, endIndex, animations)
{
    if (startIndex < endIndex)
    {
        let pivotIndex = partition(array, startIndex, endIndex, animations);

        quickSortHelper(array, startIndex, pivotIndex, animations);
        quickSortHelper(array, pivotIndex + 1, endIndex, animations);
    }
}

function partition(array, startIndex, endIndex, animations)
{
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    animations.push({accessed: [startIndex, array[midIndex]], swapped: true}, {accessed: [midIndex, array[startIndex]], swapped: true});
    swap(array, startIndex, midIndex);

    let pivotIndex = startIndex;    
    let leftIndex = startIndex - 1;
    let rightIndex = endIndex + 1;

    while (true)
    {
        do
        {
            leftIndex += 1;
            animations.push({accessed: [leftIndex, pivotIndex], swapped: false});
        } while (array[leftIndex] < array[pivotIndex])

        do
        {
            rightIndex -= 1;
            animations.push({accessed: [rightIndex, pivotIndex], swapped: false});
        } while (array[rightIndex] > array[pivotIndex])

        if (leftIndex >= rightIndex)
        {
            return rightIndex;
        }

        animations.push({accessed: [rightIndex, array[leftIndex]], swapped: true}, {accessed: [leftIndex, array[rightIndex]], swapped: true});
        swap(array, rightIndex, leftIndex);
    }
}

export default quickSort;