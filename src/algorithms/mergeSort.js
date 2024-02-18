function mergeSort(array, animations)
{
    const aux = Array(array.length);

    for (let length = 1; length < array.length; length *= 2)
    {
        for (let startIndex = 0; startIndex < array.length; startIndex += 2 * length)
        {
            let midIndex = Math.min(startIndex + length, array.length);
            let endIndex = Math.min(startIndex + 2 * length, array.length);

            merge(array, startIndex, midIndex, endIndex, aux, animations);
        }

        for (let i = 0; i < array.length; ++i)
        {
            array[i] = aux[i];
        }
    }
}

function merge(array, startIndex, midIndex, endIndex, aux, animations)
{
    let leftIndex = startIndex;
    let rightIndex = midIndex;

    for (let k = leftIndex; k < endIndex; ++k)
    {
        if (leftIndex < midIndex && rightIndex < endIndex)
        {
            animations.push({accessed: [leftIndex, rightIndex], swapped: false});
        }

        if (leftIndex < midIndex && (rightIndex >= endIndex || array[leftIndex] <= array[rightIndex]))
        {
            animations.push({accessed: [k, array[leftIndex]], swapped: true});
            aux[k] = array[leftIndex++];
        }
        else
        {
            animations.push({accessed: [k, array[rightIndex]], swapped: true});
            aux[k] = array[rightIndex++];
        }
    }
}

export default mergeSort;