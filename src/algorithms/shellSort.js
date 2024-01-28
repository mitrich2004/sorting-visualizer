function shellSort(array, animations)
{
    for (let gap = Math.floor(array.length / 2); gap > 0; gap = Math.floor(gap / 2))
    {
        for (let i = gap; i < array.length; ++i)
        {
            let tmp = array[i];
            let j;

            for (j = i; j >= gap && array[j - gap] > tmp; j -= gap)
            {
                animations.push({accessed: [j - gap, i], swapped: false});
                animations.push({accessed: [j, array[j - gap]], swapped: true}, {accessed: [j, array[j - gap]], swapped: true});

                array[j] = array[j - gap]; 
            }

            animations.push({accessed: [j, i], swapped: false});
            animations.push({accessed: [j, tmp], swapped: true}, {accessed: [j, tmp], swapped: true});
            array[j] = tmp;
        }
    }
}

export default shellSort;