import {swap} from "../utils/methods.js";

function heapSort(array, animations)
{   
    for (let i = Math.floor((array.length - 1) / 2); i >= 0; --i)
    {
        heapify(array, i, array.length, animations);
    }

    for (let i = array.length - 1; i >= 0; --i)
    {
        animations.push({accessed: [0, array[i]], swapped: true}, {accessed: [i, array[0]], swapped: true});
        swap(array, 0, i);
        heapify(array, 0, i, animations);
    }
}

function heapify(array, index, length, animations)
{
    let biggest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    
    if (left < length)
    {
        animations.push({accessed: [left, biggest], swapped: false});
        if (array[left] > array[biggest]) biggest = left;
    }

    if (right < length)
    {
        animations.push({accessed: [right, biggest], swapped: false});
        if (array[right] > array[biggest]) biggest = right;
    }

    if (biggest !== index)
    {
        animations.push({accessed: [biggest, array[index]], swapped: true}, {accessed: [index, array[biggest]], swapped: true});
        swap(array, biggest, index);
        heapify(array, biggest, length, animations);
    }
}

export default heapSort;