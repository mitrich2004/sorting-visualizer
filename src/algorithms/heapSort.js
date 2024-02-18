import {swap} from "../utils/methods.js";

function heapSort(array, animations)
{
    let startIndex = Math.floor(array.length / 2);
    let endIndex = array.length;

    while (endIndex > 1)
    {
        if (startIndex > 0)
        {
            startIndex -= 1;
        }
        else
        {
            endIndex -= 1;
            animations.push({accessed: [0, array[endIndex]], swapped: true}, {accessed: [endIndex, array[0]], swapped: true});
            swap(array, endIndex, 0);
        }

        let rootIndex = startIndex;

        while (2 * rootIndex + 1 < endIndex)
        {
            let biggestChildIndex = 2 * rootIndex + 1;

            if (biggestChildIndex + 1 < endIndex) 
            {
                animations.push({accessed: [biggestChildIndex, biggestChildIndex + 1], swapped: false});

                if (array[biggestChildIndex] < array[biggestChildIndex + 1])
                {
                    biggestChildIndex += 1;
                }
            }
            
            animations.push({accessed: [biggestChildIndex, rootIndex], swapped: false});

            if (array[rootIndex] < array[biggestChildIndex])
            {
                animations.push({accessed: [rootIndex, array[biggestChildIndex]], swapped: true}, {accessed: [biggestChildIndex, array[rootIndex]], swapped: true});
                swap(array, rootIndex, biggestChildIndex);
                rootIndex = biggestChildIndex;
            }
            else
            {
                break;
            }
        }
    }
}

export default heapSort;