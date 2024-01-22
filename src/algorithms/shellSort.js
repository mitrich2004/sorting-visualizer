//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

function shellSort(array)
{
    const animations = [];

    for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2))
    {
        for (let i = gap; i < array.length; ++i)
        {
            animations.push({accessed: [i], swapped: false});

            let tmp = array[i];
            let j = i;

            for (j = i; j >= gap && array[j - gap] > tmp; j -= gap)
            {
                animations.push({accessed: [j - gap, i], swapped: false});
                animations.push({accessed: [j, array[j - gap]], swapped: true});
                animations.push({accessed: [j, array[j - gap]], swapped: true});

                array[j] = array[j - gap]; 
            }

            animations.push({accessed: [j, tmp], swapped: true});
            animations.push({accessed: [j, tmp], swapped: true});
            
            array[j] = tmp;
        }
    }

    return {
        result: array,
        animations: animations
    }
}

export default shellSort;