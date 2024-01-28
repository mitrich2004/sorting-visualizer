function mergeSort(array, animations)
{
    const aux = Array(array.length);
    array = mergeSortHelper(array, 0, array.length - 1, animations, aux);
}

function mergeSortHelper(array, startIndex, endIndex, animations, aux)
{
    if (startIndex < endIndex)
    {
        const midIndex = Math.floor((startIndex + endIndex) / 2);
        
        mergeSortHelper(array, startIndex, midIndex, animations, aux);
        mergeSortHelper(array, midIndex + 1, endIndex, animations, aux);
        
        merge(array, startIndex, midIndex, endIndex, animations, aux);
    }

    return array;
}

function merge(array, startIndex, midIndex, endIndex, animations, aux)
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
            animations.push({accessed: [k, aux[rightIndex]], swapped: true}, {accessed: [k, aux[rightIndex]], swapped: true});
            array[k] = aux[rightIndex++];
        }
        else if (rightIndex > endIndex)
        {
            animations.push({accessed: [k, aux[leftIndex]], swapped: true}, {accessed: [k, aux[leftIndex]], swapped: true});
            array[k] = aux[leftIndex++];
        }
        else if (aux[leftIndex] < aux[rightIndex])
        {
            animations.push({accessed: [leftIndex, rightIndex], swapped: false});
            animations.push({accessed: [k, aux[leftIndex]], swapped: true}, {accessed: [k, aux[leftIndex]], swapped: true});
            array[k] = aux[leftIndex++]
        }
        else
        {
            animations.push({accessed: [leftIndex, rightIndex], swapped: false});
            animations.push({accessed: [k, aux[rightIndex]], swapped: true}, {accessed: [k, aux[rightIndex]], swapped: true});
            array[k] = aux[rightIndex++];
        }
    }
}
export default mergeSort;