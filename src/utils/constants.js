import bubbleSort from "../algorithms/bubbleSort.js";
import cocktailSort from "../algorithms/cocktailSort.js";
import combSort from "../algorithms/combSort.js";
import heapSort from "../algorithms/heapSort.js";
import insertionSort from "../algorithms/insertionSort.js";
import mergeSort from "../algorithms/mergeSort.js";
import quickSort from "../algorithms/quickSort.js";
import selectionSort from "../algorithms/selectionSort.js";
import shakerSort from "../algorithms/shakerSort.js";
import shellSort from "../algorithms/shellSort.js";
import {exponentialGenerator, nearlySortedGenerator, normalGenerator, reverseGenerator, sortedGenerator, uniformGenerator} from "./methods.js";

const sortingAlgorithms = {
  bubble: bubbleSort,
  shaker: shakerSort,
  selection: selectionSort,
  cocktail: cocktailSort,
  insertion: insertionSort,
  shell: shellSort,
  comb: combSort,
  heap: heapSort,
  merge: mergeSort,
  quick: quickSort,
};

const arrayGenerators = {
  uniform: uniformGenerator,
  normal: normalGenerator,
  exponential: exponentialGenerator,
  nearlySorted: nearlySortedGenerator,
  sorted: sortedGenerator,
  reverse: reverseGenerator,
};

const sortingAlgorithmOptions = [
  { value: "bubble", label: 'Bubble Sort' },
  { value: "shaker", label: 'Shaker Sort' },
  { value: "selection", label: 'Selection Sort' },
  { value: "cocktail", label: 'Cocktail Sort' },
  { value: "insertion", label: 'Insertion Sort' },
  { value: "shell", label: 'Shell Sort' },
  { value: "comb", label: 'Comb Sort' },
  { value: "heap", label: 'Heap Sort' },
  { value: "merge", label: 'Merge Sort' },
  { value: "quick", label: 'Quick Sort' },
];

const inputTypeOptions = [
  { value: "uniform", label: 'Uniform' },
  { value: "normal", label: 'Normal' },
  { value: "exponential", label: 'Exponential' },
  { value: "nearlySorted", label: 'Nearly Sorted' },
  { value: "sorted", label: 'Sorted' },
  { value: "reverse", label: 'Reverse' },
];

const arrayLengthOptions = [
  { value: "25", label: 'Bars: 25' },
  { value: "50", label: 'Bars: 50' },
  { value: "75", label: 'Bars: 75' },
  { value: "100", label: 'Bars: 100' },
  { value: "125", label: 'Bars: 125' },
  { value: "150", label: 'Bars: 150' },
];

const animationSpeedOptions = [
  { value: "10", label: 'Speed: 0.5x' },
  { value: "5", label: 'Speed: 1x' },
  { value: "3.25", label: 'Speed: 1.5x' },
  { value: "2.5", label: 'Speed: 2x' }
];

export { sortingAlgorithms, arrayGenerators, sortingAlgorithmOptions, inputTypeOptions, arrayLengthOptions, animationSpeedOptions };
