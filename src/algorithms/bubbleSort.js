import {swap} from "../utils/methods.js";

function bubbleSort(array, animations)
{
    let isSorted = false;
    let countSorted = 0;
    
    while (!isSorted)
    {
        isSorted = true;

        for (let i = 1; i < array.length - countSorted; ++i)
        {
            animations.push({accessed: [i - 1, i], swapped: false});

            if (array[i - 1] > array[i])
            {
                animations.push({accessed: [i - 1, array[i]], swapped: true}, {accessed: [i, array[i - 1]], swapped: true});
                swap(array, i, i - 1);
                isSorted = false;
            }
        }
        
        countSorted += 1;
    }
}

export default bubbleSort;