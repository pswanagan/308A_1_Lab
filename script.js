
// Part One - Stack Overflow

let counter = 0; // Global counter variable

function recursiveFunction() {
    counter++;  // Increment the counter
    recursiveFunction();  // Call the function recursively
}

try {
    recursiveFunction();  // Initial call wrapped in a try block
} catch (e) {
    console.error("Stack overflow error caught!");
    console.log("Maximum stack size reached at counter value:", counter);
    console.error(e); // Log the actual error message
}


// Part Two - Trampolines

// Recursive Flattening Function
function flattenArray(array) {
    return array.reduce((acc, val) => {
        if (Array.isArray(val)) {
            // Recursively flatten the array and append its elements to the accumulator
            return acc.concat(flattenArray(val));
        } else {
            // Append non-array elements directly to the accumulator
            return acc.concat(val);
        }
    }, []);
}

// A trampoline function takes another function and repeatedly calls it until it returns a non-function
function trampoline(fn) {
    return function trampolined(...args) {
        let result = fn.apply(this, args);
        while (typeof result === 'function') {
            result = result();
        }
        return result;
    };
}
/* To trampoline the flattenArray function, we need to adjust it to return a function for the recursive call instead of making the recursive call directly. */

function flattenArrayTrampolined(array) {
    return array.reduce((accumulator, val) => {
        if (Array.isArray(val)) {
            // Flatten the nested array and concatenate it to the accumulator
            return accumulator.concat(flattenArrayTrampolined(val));
        } else {
            accumulator.push(val);
            return accumulator;
        }
    }, []);
}

// Trampolined version
const flattenArrayTrampoline = trampoline(flattenArrayTrampolined);

let nestedArray = [1, [2, [3, [4, 5]], 6]];
let flattenedArray = flattenArrayTrampoline(nestedArray);
console.log(flattenedArray);


// Part Three - Deferred Execution

// Cache the HTML element
const primeContainer = document.getElementById('primeContainer');

// Function to check if a number is prime
function isPrime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return num > 1;
}

// Function to add prime numbers to the HTML element in chunks
function addPrimes(n) {
    let current = 2;

    function processChunk() {
        let chunkEnd = current + 100; // Process 100 numbers at a time, adjust as needed
        while (current <= n && current < chunkEnd) {
            if (isPrime(current)) {
                const node = document.createElement("div");
                node.textContent = current;
                primeContainer.appendChild(node);
            }
            current++;
        }

        if (current <= n) {
            // Use setTimeout to break into next event loop iteration
            setTimeout(processChunk, 0);
        } else {
            // Alert the user when done
            alert('Calculation finished!');
        }
    }

    processChunk();
}

// Run the function with n = 10000
addPrimes(10000);