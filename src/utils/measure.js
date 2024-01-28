import fs from "fs";
import selectionSort from "../algorithms/selectionSort.js";
import bubbleSort from "../algorithms/bubbleSort.js";
import shakerSort from "../algorithms/shakerSort.js";
import insertionSort from "../algorithms/insertionSort.js";
import shellSort from "../algorithms/shellSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import heapSort from "../algorithms/heapSort.js";
import quickSort from "../algorithms/quickSort.js";
import { exponentialDistributionGeneration, normalDistributionGeneration, uniformDistributionGeneration } from "./methods.js";

const measure = () =>
{
    const maxSize = 10000;
    const times = 100;
    const algName = "quick";
    const distName = "exponential";
    const results = [];

    for (let size = 100; size <= maxSize; size += 100)
    {
        let totalTime = 0;
        for (let t = 1; t <= times; ++t)
        {
            const array = [];

            switch(distName)
            {
                case "uniform": uniformDistributionGeneration(array, size, size, -size); break;
                case "normal": normalDistributionGeneration(array, size, size, -size); break;
                case "exponential": exponentialDistributionGeneration(array, size, size, -size); break;
                default: break;
            }

            let timeBefore = performance.now();

            switch (algName)
            {
                case "selection": selectionSort(array, []); break;
                case "bubble": bubbleSort(array, []); break;
                case "shaker": shakerSort(array, []); break;
                case "insertion": insertionSort(array, []); break;
                case "shell": shellSort(array, []); break;
                case "merge": mergeSort(array, []); break;
                case "heap": heapSort(array, []); break;
                case "quick": quickSort(array, []); break;
                default: break;
            }
        
            let timeAfter = performance.now();
            totalTime += timeAfter - timeBefore;
        }

        const avgTime = Math.round(totalTime / times * 1000) / 1000;
        console.log(size, avgTime);
        results.push({"size": size, "time": avgTime});
    }

    saveResults(results, algName, distName);
}

const saveResults = (results, algName, distName) => {
    const filename = `${algName}_${distName}.txt`;
    const writer = fs.createWriteStream(filename, {flags: "w"});
    
    results.forEach((measurement) => writer.write(`${measurement.size} ${measurement.time}\n`));
    writer.close();
    
    console.log("done");
}

measure();