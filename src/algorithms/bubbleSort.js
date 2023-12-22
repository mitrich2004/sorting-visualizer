//accessed: [index], swapped: false - access
//accessed: [index, index], swapped: false - comparison
//accessed: [index, value], swapped: true  - swap

function bubbleSort(array)
{
    const animations = [];
    let isSorted = false;
    let countSorted = 0;
    
    while (!isSorted)
    {
        isSorted = true;

        for (let i = 1; i < array.length - countSorted; ++i)
        {
            animations.push({accessed: [i - 1, i], swapped: false});

            if (array[i - 1] > array[i])
            {
                animations.push({accessed: [i - 1, array[i]], swapped: true});
                animations.push({accessed: [i, array[i - 1]], swapped: true});

                [array[i - 1], array[i]] = [array[i], array[i - 1]];
                isSorted = false;
            }
        }
        
        countSorted += 1;
    }
    
    return {
        result: array, 
        animations: animations
    };  
}

export default bubbleSort;