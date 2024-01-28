import {swap} from "../utils/methods.js";

function shakerSort(array, animations)
{
    let start = 0;
    let end = array.length - 1;
    let isSorted = false;

    while (!isSorted)
    {
        isSorted = true;

        for (let i = start; i < end; ++i)
        {
            animations.push({accessed: [i, i + 1], swapped: false});
            
            if (array[i] > array[i + 1])
            {
                animations.push({accessed: [i, array[i + 1]], swapped: true}, {accessed: [i + 1, array[i]], swapped: true});
                swap(array, i, i + 1);
                isSorted = false;
            }
        }

        if (isSorted) break;
        end -= 1;
        
        for (let i = end; i > start; --i)
        {
            animations.push({accessed: [i - 1, i], swapped: false});

            if (array[i] < array[i - 1])
            { 
                animations.push({accessed: [i, array[i - 1]], swapped: true}, {accessed: [i - 1, array[i]], swapped: true});
                swap(array, i - 1, i);
                isSorted = false;
            }
        }

        start += 1;
    }
}

export default shakerSort;