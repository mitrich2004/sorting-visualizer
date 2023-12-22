//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

function insertionSort(array)
{
    const animations = [];

    for (let i = 1; i < array.length; ++i)
    {
        let index = i;

        while (index > 0 && array[index - 1] > array[index])
        {
            animations.push({accessed: [index - 1, index], swapped: false});
            animations.push({accessed: [index - 1, array[index]], swapped: true});
            animations.push({accessed: [index, array[index - 1]], swapped: true});

            [array[index], array[index - 1]] = [array[index - 1], array[index]];
            index -= 1;
        }

        if (index > 0)
        {
            animations.push({accessed: [index - 1, index], swapped: false});
        }
        else
        {
            animations.push({accessed: [index], swapped: false});
        }
    }

    return {
        result: array,
        animations: animations
    }
}

export default insertionSort;