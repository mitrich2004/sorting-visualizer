function swap(array, i, j)
{
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
}

const uniformGenerator = (numbers, size, max, min) =>
{
    for (let i = 0; i < size; ++i)
    {
        numbers.push(getRandomValue(Math.random(), max, min));
    }
}

const normalGenerator = (numbers, size, max, min) =>
{
    let mean = 0.5;
    let stddev = 0.2;
    
    while (numbers.length < size)
    {
        let u1 = 1 - Math.random();
        let u2 =  Math.random();

        let mag = stddev * Math.sqrt(-2.0 * Math.log(u1))
        let z0 = mag * Math.cos(2.0 * Math.PI * u2) + mean;
        let z1 = mag * Math.sin(2.0 * Math.PI * u2) + mean;
        
        if (z0 >= 0 && z0 <= 1) numbers.push(getRandomValue(z0, max, min));
        if (numbers.length >= size) break;
        if (z1 >= 0 && z1 <= 1) numbers.push(getRandomValue(z1, max, min));
    }
}

const exponentialGenerator = (numbers, size, max, min) =>
{
    let rate = 2.5;

    while (numbers.length < size)
    {
        const exp = Math.log(1 - Math.random()) / (-rate);
        if (exp <= 1) numbers.push(getRandomValue(exp, max, min));
    }
}

const nearlySortedGenerator = (numbers, size, max, min) =>
{
    let curr = min;

    for (let i = 0; i < size; ++i)
    {
        if (Math.random() < 0.1)
        {
            numbers.push(curr - getRandomValue(Math.random(), curr - min, 1));
        }
        else
        {
            numbers.push(curr);
        }

        let maxStep = (max - curr) / (size - i) * 2;
        let minStep = (max - curr) / (size - i) / 2;
        
        curr = Math.min(max, curr + getRandomValue(Math.random(), maxStep, minStep));
    }
}

const sortedGenerator = (numbers, size, max, min) =>
{
    let curr = min;

    for (let i = 0; i < size; ++i)
    {
        numbers.push(curr);

        let maxStep = (max - curr) / (size - i) * 2;
        let minStep = (max - curr) / (size - i) / 2;

        curr = Math.min(max, curr + getRandomValue(Math.random(), maxStep, minStep));
    }
} 

const reverseGenerator = (numbers, size, max, min) =>
{
    let curr = max;

    for (let i = 0; i < size; ++i)
    {
        numbers.push(curr);
        
        let maxStep = (curr - min) / (size - i) * 2;
        let minStep = (curr - min) / (size - i) / 2;

        curr = Math.max(min, curr - getRandomValue(Math.random(), maxStep, minStep));
    }
}

const getRandomValue = (coefficient, max, min) => {
    return Math.floor(coefficient * (max - min) + min)
}

export {swap, uniformGenerator, normalGenerator, exponentialGenerator, nearlySortedGenerator, sortedGenerator, reverseGenerator, getRandomValue};