function shakerSort(array)
{
    let start = 0;
    let end = array.length - 1;
    let isSorted = false;

    const animations = [];

    while (!isSorted)
    {
        isSorted = true;

        for (let i = start; i < end; ++i)
        {
            animations.push({accessed: [i, i + 1], swapped: false});
            if (array[i] > array[i + 1])
            {
                animations.push({accessed: [i, array[i + 1]], swapped: true});
                animations.push({accessed: [i + 1, array[i]], swapped: true});
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                isSorted = false;
            }
        }

        if (isSorted)
        {
            break;
        }

        end -= 1;
        
        for (let i = end; i > start; --i)
        {
            animations.push({accessed: [i - 1, i], swapped: false});
            if (array[i] < array[i - 1])
            { 
                animations.push({accessed: [i, array[i - 1]], swapped: true});
                animations.push({accessed: [i - 1, array[i]], swapped: true});

                [array[i - 1], array[i]] = [array[i], array[i - 1]];
                isSorted = false;
            }
        }

        start += 1;
    }

    return {
        result: array, 
        animations: animations
    };  

}

export default shakerSort;