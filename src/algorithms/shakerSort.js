import {swap} from "../utils/methods.js";

function shakerSort(array, animations)
{
    let startIndex = 0;
    let endIndex = array.length - 1;

    while (endIndex > startIndex)
    {
        let newEndIndex = 0;
        let newStartIndex = 0;

        for (let i = startIndex; i < endIndex; ++i)
        {
            animations.push({accessed: [i, i + 1], swapped: false});
            
            if (array[i] > array[i + 1])
            {
                animations.push({accessed: [i, array[i + 1]], swapped: true}, {accessed: [i + 1, array[i]], swapped: true});
                swap(array, i, i + 1);
                newEndIndex = i;
            }
        }

        endIndex = newEndIndex;
        
        for (let i = endIndex; i > startIndex; --i)
        {
            animations.push({accessed: [i - 1, i], swapped: false});

            if (array[i] < array[i - 1])
            { 
                animations.push({accessed: [i, array[i - 1]], swapped: true}, {accessed: [i - 1, array[i]], swapped: true});
                swap(array, i - 1, i);
                newStartIndex = i;
            }
        }

        startIndex = newStartIndex;
    }
}

export default shakerSort;