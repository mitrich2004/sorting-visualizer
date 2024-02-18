import { swap } from "../utils/methods.js";

function combSort(array, animations)
{
    let gap = array.length;
    let isSorted = false;

    while (!isSorted)
    {
        gap = Math.floor(gap / 1.3);

        if (gap <= 1)
        {
            gap = 1;
            isSorted = true;
        }

        for (let i = 0; i < array.length - gap; ++i)
        {
            animations.push({accessed: [i, i + gap], swapped: false});

            if (array[i] > array[i + gap])
            { 
                animations.push({accessed: [i + gap, array[i]], swapped: true}, {accessed: [i, array[i + gap]], swapped: true});
                swap(array, i, i + gap);
                isSorted = false;
            }
        }
    }
}

export default combSort;