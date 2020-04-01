
const swap = (arr, firstIndex, secondIndex) => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};

const bubbleSort = (arr) => {

    const len = arr.length;
    let i;
    let j;
    let stop;

    for (i = 0; i < len; i++) {
        for (j = 0, stop = len - i; j < stop - 1; j++) {
            if ((arr[j + 1]) && (arr[j].localeCompare(arr[j + 1]) >= 0)) {
                swap(arr, j, j + 1);
            }
        }
    }

    return arr;
};

const insertionSort = arr => {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const element = arr[i];
        let j;
        for (j = i - 1; j >= 0 && (arr[j].localeCompare(element) >= 0); j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = element;
    }
    return arr;
};

const selectionSort = (arr) => {
    const len = arr.length;
    let i;
    let j;
    for (i = 0; i < len - 1; i = i + 1) {
        let min = i;
        for (j = i + 1; j < len; j = j + 1) {
            if ((arr[j]) && (arr[j].localeCompare(arr[min]) <= 0)) {
                min = j;
            }
        }
        if (min !== i) {
            swap(arr, i, min);
        }
    }
    return arr;
};

const merge = (left, right) => {
    const arr = [];
    while (left.length && right.length) {
        if ((left[0].localeCompare(right[0]) <= 0)) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }
    return arr.concat(left.slice().concat(right.slice()));
};

const mergeSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(this.mergeSort(left), this.mergeSort(right));
};

const adjust = (arr, object, sortFunction) => {

    const temp = Object.keys(object);
    let i;
    let j;
    const newObj = {};
    let result;
    for (i = 0; i < arr.length; i++) {

        for (j = 0; j < arr.length; j++) {
            if (arr[i] === temp[j]) {
                if (typeof (object[temp[j]]) === 'object' && !Array.isArray(object[temp[j]])) {

                    result = sortFunction(Object.keys(object[temp[j]]));
                    const tempObject = adjust(result, object[temp[j]], sortFunction);
                    newObj[arr[i]] = { ...tempObject };
                }
                else {
                    newObj[arr[i]] = object[temp[j]];
                }
            }
        }
    }
    return newObj;

};

export { bubbleSort, mergeSort, selectionSort, insertionSort , adjust };