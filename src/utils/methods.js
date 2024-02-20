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
        let mean = 0.5;
        let stddev = 0.2;

        let u1 = 1 - Math.random();
        let u2 =  Math.random();

        let mag = stddev * Math.sqrt(-2.0 * Math.log(u1))
        let z0 = mag * Math.cos(2.0 * Math.PI * u2) + mean;
        let z1 = mag * Math.sin(2.0 * Math.PI * u2) + mean;
        
        if (z0 >= 0 && z0 <= 1) numbers.push(getRandomHight(z0, max, min));
        if (z1 >= 0 && z1 <= 1) numbers.push(getRandomHight(z1, max, min));
    }
}

const exponentialDistributionGeneration = (numbers, size, max, min) =>
{
    let rate = 2.5;

    while (numbers.length < size)
    {
        const exp = Math.log(1 - Math.random()) / (-rate);
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