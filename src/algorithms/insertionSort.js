function insertionSort(array, animations)
{
    for (let i = 1; i < array.length; ++i)
    {
        let newElement = array[i];
        let j = i;
        
        animations.push({accessed: [i - 1, i], swapped: false});

        while (j > 0 && array[j - 1] > newElement)
        {
            animations.push({accessed: [j - 1, j], swapped: false});
            animations.push({accessed: [j, array[j - 1]], swapped: true});
            
            array[j] = array[j - 1];
            j -= 1;
        }

        animations.push({accessed: [j, newElement], swapped: true}); 
        array[j] = newElement;
    }
}

export default insertionSort;