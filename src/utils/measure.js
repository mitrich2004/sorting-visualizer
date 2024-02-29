import fs from "fs";
import { arrayGenerators, sortingAlgorithms } from "./constants.js";

//measurement parameters
const maxSize = 10000;
const gap = 100;
const times = 100;
const rounder = 1000;

const measure = (sortingAlgorithm, sortingAlgorithmName, arrayGenerator, inputType) =>
{
    const results = [];

    for (let size = gap; size <= maxSize; size += gap)
    {
        let totalTime = 0;

        for (let t = 1; t <= times; ++t)
        {
            const array = [];
            arrayGenerator(array, size, size, -size);

            const timeBefore = performance.now();
            sortingAlgorithm(array, []);
            const timeAfter = performance.now();
            
            totalTime += timeAfter - timeBefore;
        }

        const avgTime = Math.round(totalTime / times * rounder) / rounder;
        results.push({"size": size, "time": avgTime});
        console.log(size, avgTime);
    }

    saveResults(results, sortingAlgorithmName, inputType);
}

const saveResults = (results, algName, distName) => {
    const filename = `${algName}_${distName}.txt`;
    const writer = fs.createWriteStream(filename, {flags: "w"});
    
    results.forEach((measurement) => writer.write(`${measurement.size} ${measurement.time}\n`));
    writer.close();
    
    console.log("done");
}

measure(sortingAlgorithms.quick, "quick", arrayGenerators.reverse, "reverse");