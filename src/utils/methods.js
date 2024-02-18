function swap(array, i, j)
{
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

const uniformDistributionGeneration = (numbers, size, max, min) =>
{
    for (let i = 0; i < size; ++i)
    {
        numbers.push(getRandomHight(Math.random(), max, min));
    }
}

const normalDistributionGeneration = (numbers, size, max, min) =>
{
    while (numbers.length < size)
    {
        const u = Math.random();
        const prob = 1 - Math.abs(0.5 - u) * 2;
        if (prob > Math.random()) numbers.push(getRandomHight(u, max, min));
    }
}

const exponentialDistributionGeneration = (numbers, size, max, min) =>
{
    while (numbers.length < size)
    {
        const exp = Math.log(1 - Math.random()) / (-3);
        if (exp <= 1) numbers.push(getRandomHight(exp, max, min));
    }
}

const nearlySortedOrderGeneration = (numbers, size, max, min) =>
{
    let curr = min;

    for (let i = 0; i < size; ++i)
    {
        if (Math.random() < 0.9)
        {
            numbers.push(curr);
        }
        else
        {
            numbers.push(curr - getRandomHight(Math.random(), curr - min, 1));
        }

        curr = Math.min(max, curr + getRandomHight(Math.random(), (max - curr) / (size - i) * 2, (max - curr) / (size - i) / 2));
    }
}

const sortedOrderGeneration = (numbers, size, max, min) =>
{
    let curr = min;

    for (let i = 0; i < size; ++i)
    {
        numbers.push(curr);
        curr = Math.min(max, curr + getRandomHight(Math.random(), (max - curr) / (size - i) * 2, (max - curr) / (size - i) / 2));
    }
} 

const reverseOrderGeneration = (numbers, size, max, min) =>
{
    let curr = max;

    for (let i = 0; i < size; ++i)
    {
        numbers.push(curr);
        curr = Math.max(min, curr - getRandomHight(Math.random(), (curr - min) / (size - i) * 2, (curr - min) / (size - i) / 2));
    }
}

const getRandomHight = (coefficient, max, min) => {
    return Math.floor(coefficient * (max - min) + min)
}

export {swap, uniformDistributionGeneration, normalDistributionGeneration, exponentialDistributionGeneration, nearlySortedOrderGeneration, sortedOrderGeneration, reverseOrderGeneration};