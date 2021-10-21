/*
* The de-facto unbiased shuffle algorithm is the Fisher-Yates (aka Knuth) Shuffle.
* https://stackoverflow.com/a/25984542
*/

export function shuffle(array) {
    var count = array.length,
        randomnumber,
        temp;
    while( count ){
        randomnumber = Math.random() * count-- | 0;
        temp = array[count];
        array[count] = array[randomnumber];
        array[randomnumber] = temp
    }
    return array;
}