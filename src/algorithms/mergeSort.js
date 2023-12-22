//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

let animations = [];
let aux = [];

function mergeSort(array)
{
    let arrayLength = array.length;

    animations = [];
    aux = Array(arrayLength);
    array = mergeSortHelper(array, 0, arrayLength - 1);

    return {
        result: array,
        animations: animations
    };
}

function mergeSortHelper(array, startIndex, endIndex)
{
    if (startIndex < endIndex)
    {
        const midIndex = Math.floor((startIndex + endIndex) / 2);
        mergeSortHelper(array, startIndex, midIndex);
        mergeSortHelper(array, midIndex + 1, endIndex);
        merge(array, startIndex, midIndex, endIndex);
    }

    return array;
}

function merge(array, startIndex, midIndex, endIndex)
{
    for (let i = startIndex; i <= endIndex; i++)
    {
        aux[i] = array[i];
    } 
        
    let leftIndex = startIndex;
    let rightIndex = midIndex + 1;

    for (let k = startIndex; k <= endIndex; ++k)
    {
        if (leftIndex > midIndex)
        {
            animations.push({accessed: [rightIndex], swapped: false});
            animations.push({accessed: [k, aux[rightIndex]], swapped: true});
            array[k] = aux[rightIndex++];
        }
        else if (rightIndex > endIndex)
        {
            animations.push({accessed: [leftIndex], swapped: false});
            animations.push({accessed: [k, aux[leftIndex]], swapped: true});
            array[k] = aux[leftIndex++];
        }
        else if (aux[leftIndex] < aux[rightIndex])
        {
            animations.push({accessed: [leftIndex, rightIndex], swapped: false});
            animations.push({accessed: [k, aux[leftIndex]], swapped: true});
            array[k] = aux[leftIndex++]
        }
        else
        {
            animations.push({accessed: [leftIndex, rightIndex], swapped: false});
            animations.push({accessed: [k, aux[rightIndex]], swapped: true});
            array[k] = aux[rightIndex++];
        }
    }
}
export default mergeSort;