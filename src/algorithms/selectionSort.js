import {swap} from "../utils/methods.js";

function selectionSort(array, animations)
{
    for (let i = 0; i < array.length; ++i)
    {
        let minNumIndex = i;

        for (let j = i + 1; j < array.length; ++j)
        {
            animations.push({accessed: [minNumIndex, j], swapped: false});

            if (array[j] < array[minNumIndex])
            {
                minNumIndex = j;
            }
        }
        
        if (i !== minNumIndex)
        {
            animations.push({accessed: [minNumIndex, i], swapped: false});
            animations.push({accessed: [i, array[minNumIndex]], swapped: true}, {accessed: [minNumIndex, array[i]], swapped: true});
            swap(array, i, minNumIndex);
        }
    }
}

export default selectionSort;