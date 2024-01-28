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

const getRandomHight = (coefficient, max, min) => {
    return Math.floor(coefficient * (max - min) + min)
}

export {swap, uniformDistributionGeneration, normalDistributionGeneration, exponentialDistributionGeneration};