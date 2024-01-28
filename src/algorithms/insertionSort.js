import {swap} from "../utils/methods.js";

function insertionSort(array, animations)
{
    for (let i = 1; i < array.length; ++i)
    {
        let j = i;

        while (j > 0 && array[j - 1] > array[j])
        {
            animations.push({accessed: [j - 1, j], swapped: false});
            animations.push({accessed: [j - 1, array[j]], swapped: true}, {accessed: [j, array[j - 1]], swapped: true});
            
            swap(array, j - 1, j);
            j -= 1;
        }
    }
}

export default insertionSort;