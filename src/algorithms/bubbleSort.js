import {swap} from "../utils/methods.js";

function bubbleSort(array, animations)
{
    let endIndex = array.length;
    
    while (endIndex > 1)
    {
        let newEndIndex = 0;

        for (let i = 1; i < endIndex; ++i)
        {
            animations.push({accessed: [i - 1, i], swapped: false});

            if (array[i - 1] > array[i])
            {
                animations.push({accessed: [i - 1, array[i]], swapped: true}, {accessed: [i, array[i - 1]], swapped: true});
                swap(array, i, i - 1);
                newEndIndex = i;
            }
        }
        
        endIndex = newEndIndex;
    }
}

export default bubbleSort;