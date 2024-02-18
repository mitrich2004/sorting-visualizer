import {swap} from "../utils/methods.js";

function cocktailSort(array, animations)
{
    let minIndex = 0;
    let maxIndex = array.length - 1;

    while (minIndex < maxIndex)
    {
        let minValueIndex = minIndex;
        let maxValueIndex = maxIndex;

        for (let i = minIndex; i <= maxIndex; ++i)
        {
            animations.push({accessed: [i, maxValueIndex], swapped: false});

            if (array[i] > array[maxValueIndex])
            {
                maxValueIndex = i;
            }     
            else 
            {
                animations.push({accessed: [i, minValueIndex], swapped: false});
            
                if (array[i] < array[minValueIndex])
                {
                    minValueIndex = i;

                }
            }
        }

        if (minValueIndex !== minIndex)
        {
            animations.push({accessed: [minIndex, array[minValueIndex]], swapped: true}, {accessed: [minValueIndex, array[minIndex]], swapped: true});
            swap(array, minIndex, minValueIndex);
        }

        if (maxValueIndex !== maxIndex)
        {
            animations.push({accessed: [maxValueIndex, minValueIndex], swapped: false});
            
            if (array[maxValueIndex] > array[minValueIndex])
            {
                animations.push({accessed: [maxIndex, array[maxValueIndex]], swapped: true}, {accessed: [maxValueIndex, array[maxIndex]], swapped: true});
                swap(array, maxIndex, maxValueIndex);
            }
            else
            {
                animations.push({accessed: [maxIndex, array[minValueIndex]], swapped: true}, {accessed: [minValueIndex, array[maxIndex]], swapped: true});
                swap(array, maxIndex, minValueIndex);
            }
        }

        minIndex += 1;
        maxIndex -= 1;
    }
}

export default cocktailSort;