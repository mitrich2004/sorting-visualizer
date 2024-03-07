import { sortingAlgorithms } from "./constants.js";
import { uniformGenerator } from "./methods.js";

function testSortingAlgorithm(sortingAlgorithm, times, size)
{
    for (let t = 0; t < times; ++t)
    {
        let array = [];
        
        uniformGenerator(array, size, size, -size);
        sortingAlgorithm(array, []); 

        if (array.length !== size)
        {
            return false;
        } 

        for (let i = 1; i < size; ++i)
        {
            if (array[i] < array[i - 1]) return false;
        }
    }

    return true;
}

for (const [name, sortingAlgorithm] of Object.entries(sortingAlgorithms)) {
    console.log(name, testSortingAlgorithm(sortingAlgorithm, 10, 1000));
}
