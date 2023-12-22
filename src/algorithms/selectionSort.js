//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

function selectionSort(array)
{
    const arrayLength = array.length;
    const animations = [];

    for (let i = 0; i < arrayLength; ++i)
    {
        animations.push({accessed: [i], swapped: false});
        let minNumIndex = i;

        for (let j = i + 1; j < arrayLength; ++j)
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
            animations.push({accessed: [i, array[minNumIndex]], swapped: true});
            animations.push({accessed: [minNumIndex, array[i]], swapped: true});
            [array[i], array[minNumIndex]] = [array[minNumIndex], array[i]];
        }
    }

    return {
        result: array,
        animations: animations
    };
}

export default selectionSort;