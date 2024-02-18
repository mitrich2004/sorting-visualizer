import fs from "fs";
import selectionSort from "../algorithms/selectionSort.js";
import cocktailSort from "../algorithms/cocktailSort.js";
import bubbleSort from "../algorithms/bubbleSort.js";
import shakerSort from "../algorithms/shakerSort.js";
import insertionSort from "../algorithms/insertionSort.js";
import combSort from '../algorithms/combSort.js';
import shellSort from "../algorithms/shellSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import heapSort from "../algorithms/heapSort.js";
import quickSort from "../algorithms/quickSort.js";
import { exponentialDistributionGeneration, nearlySortedOrderGeneration, normalDistributionGeneration, reverseOrderGeneration, sortedOrderGeneration, uniformDistributionGeneration } from "./methods.js";

//sorting algorithms tags
const bubbleSortName = "bubble";
const shakerSortName = "shaker";
const selectionSortName = "selection";
const cocktailSortName = "cocktail";
const insertionSortName = "insertion";
const shellSortName = "shell";
const combSortName = "comb";
const heapSortName = "heap";
const mergeSortName = "merge";
const quickSortName = "quick";

//distribution types
const uniformDistName = "uniform";
const normalDistName = "normal";
const exponentialDistName = "exponential";
const nearlySortedOrderName = "nearlySorted";
const sortedOrderName = "sorted";
const reverseOrderName = "reverse";

//measurement parameters
const maxSize = 10000;
const gap = 100;
const times = 100;
const rounder = 1000;

const measure = (algName, distName) =>
{
    const results = [];

    for (let size = gap; size <= maxSize; size += gap)
    {
        let totalTime = 0;
        for (let t = 1; t <= times; ++t)
        {
            const array = [];
 
            switch(distName)
            {
                case uniformDistName: uniformDistributionGeneration(array, size, size, -size); break;
                case normalDistName: normalDistributionGeneration(array, size, size, -size); break;
                case exponentialDistName: exponentialDistributionGeneration(array, size, size, -size); break;
                case nearlySortedOrderName: nearlySortedOrderGeneration(array, size, size, -size); break;
                case sortedOrderName: sortedOrderGeneration(array, size, size, -size); break;
                case reverseOrderName: reverseOrderGeneration(array, size, size, -size); break;
                default: break;
            }

            let timeBefore = performance.now();

            switch (algName)
            {
                case bubbleSortName: bubbleSort(array); break;
                case shakerSortName: shakerSort(array); break;
                case selectionSortName: selectionSort(array); break;
                case cocktailSortName: cocktailSort(array); break;
                case insertionSortName: insertionSort(array); break;
                case shellSortName: shellSort(array); break;
                case combSortName: combSort(array); break;
                case heapSortName: heapSort(array); break;
                case mergeSortName: mergeSort(array); break;
                case quickSortName: quickSort(array); break;
                default: break;
            }
        
            let timeAfter = performance.now();
            totalTime += timeAfter - timeBefore;
        }

        const avgTime = Math.round(totalTime / times * rounder) / rounder;
        results.push({"size": size, "time": avgTime});
        
        console.log(size, avgTime);
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

measure(quickSortName, reverseOrderName);