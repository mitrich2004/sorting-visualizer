//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

let animations = [];

function heapSort(array)
{
    animations = [];
    array = buildHeap(array);
    
    let borderIndex = array.length;

    while (borderIndex-- > 0)
    {
        animations.push({accessed: [0, array[borderIndex]], swapped: true});
        animations.push({accessed: [borderIndex, array[0]], swapped: true});

        [array[0], array[borderIndex]] = [array[borderIndex], array[0]];
        heapify(array, 0, borderIndex);
    }

    return {
        result: array,
        animations: animations
    };
}

function buildHeap(array)
{
    for (let i = array.length - 1; i > 0; --i)
    {
        const parentIndex = Math.floor((i - 1) / 2);

        if (array[parentIndex] < array[i])
        {
            animations.push({accessed: [i, array[parentIndex]], swapped: true});
            animations.push({accessed: [parentIndex, array[i]], swapped: true});

            [array[parentIndex], array[i]] = [array[i], array[parentIndex]];
            array = heapify(array, i, array.length);
        }
        else
        {
            animations.push({accessed: [i], swapped: false});
        }
    }

    return array;
}

function heapify(array, index, length)
{
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let biggestChildIndex = leftChildIndex;

    if (rightChildIndex < length && leftChildIndex < length)
    {
        animations.push({accessed: [leftChildIndex, rightChildIndex], swapped: false});
    }

    if (rightChildIndex < length && array[rightChildIndex] > array[leftChildIndex])
    {
        biggestChildIndex = rightChildIndex;
    }

    if (biggestChildIndex < length && array[biggestChildIndex] > array[index])
    {
        animations.push({accessed: [biggestChildIndex, array[index]], swapped: true});
        animations.push({accessed: [index, array[biggestChildIndex]], swapped: true});

        [array[biggestChildIndex], array[index]] = [array[index], array[biggestChildIndex]];
        array = heapify(array, biggestChildIndex, length);
    }

    return array;
}

export default heapSort;