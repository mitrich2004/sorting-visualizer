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

    let pivot = array[midIndex];    
    let leftIndex = startIndex - 1;
    let rightIndex = endIndex + 1;

    while (true)
    {
        do
        {
            leftIndex += 1;
            animations.push({accessed: [leftIndex, array.indexOf(pivot)], swapped: false});
        } while (array[leftIndex] < pivot)

        do
        {
            rightIndex -= 1;
            animations.push({accessed: [rightIndex, array.indexOf(pivot)], swapped: false});
        } while (array[rightIndex] > pivot)

        if (leftIndex >= rightIndex)
        {
            return rightIndex;
        }

        animations.push({accessed: [rightIndex, array[leftIndex]], swapped: true}, {accessed: [leftIndex, array[rightIndex]], swapped: true});
        swap(array, rightIndex, leftIndex);
    }
}

export default quickSort;