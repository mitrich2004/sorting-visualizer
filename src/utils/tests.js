import { sortingAlgorithms } from "./constants.js";
import { uniformGenerator } from "./methods.js";

//testing parameters
const times = 10;
const size = 1000;

function testSortingAlgorithm(sortingAlgorithm)
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
    console.log(name, testSortingAlgorithm(sortingAlgorithm));
}
