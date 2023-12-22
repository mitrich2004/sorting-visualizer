//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

let animations = [];

function quickSort(array)
{
    animations = [];
    array = quickSortHelper(array, 0, array.length - 1);

    return {
        result: array,
        animations: animations
    };
}

function quickSortHelper(array, startIndex, endIndex)
{
    let midIndex = Math.floor((startIndex + endIndex) / 2);

    animations.push({accessed: [startIndex, array[midIndex]], swapped: true});
    animations.push({accessed: [midIndex, array[startIndex]], swapped: true});
    [array[startIndex], array[midIndex]] = [array[midIndex], array[startIndex]];

    let pivotIndex = startIndex;    
    let leftIndex = startIndex + 1;
    let rightIndex = endIndex;

    while (leftIndex < rightIndex)
    {
        while (array[leftIndex] <= array[pivotIndex] && leftIndex < rightIndex)
        {
            animations.push({accessed: [leftIndex], swapped: false});
            leftIndex += 1;
        }

        while (array[rightIndex] > array[pivotIndex])
        {
            animations.push({accessed: [rightIndex], swapped: false});
            rightIndex -= 1;
        }

        if (leftIndex <= rightIndex)
        {
            animations.push({accessed: [leftIndex, array[rightIndex]], swapped: true});
            animations.push({accessed: [rightIndex, array[leftIndex]], swapped: true});
            [array[leftIndex], array[rightIndex]] = [array[rightIndex], array[leftIndex]];
        }
    }

    while (array[rightIndex] > array[pivotIndex])
    {
        animations.push({accessed: [rightIndex], swapped: false});
        rightIndex -= 1;
    }

    animations.push({accessed: [pivotIndex, array[rightIndex]], swapped: true});
    animations.push({accessed: [rightIndex, array[pivotIndex]], swapped: true});
    [array[pivotIndex], array[rightIndex]] = [array[rightIndex], array[pivotIndex]];
    pivotIndex = rightIndex;


    if (startIndex < pivotIndex - 1)
    {
        array = quickSortHelper(array, startIndex, pivotIndex - 1);
    }

    if (endIndex > pivotIndex + 1)
    {
        array = quickSortHelper(array, pivotIndex + 1, endIndex);
    }

    return array;
}

export default quickSort;