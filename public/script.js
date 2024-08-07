// Functions
function findSummation(n) {
    var result = 0;
    if (n > 0) {
        for (var i = 1; i <= n; i++) {
            result = result + i;
        }
    } else if (n == 0) {
        result = 1;
    } else {
        result = false;
    }
    return result;
}

function uppercaseFirstandLast(word) {
    if (typeof word !== 'string' || word.trim().length === 0) {
        return false;
    }

    var wordLength = word.length;
    var firstUpper = word[0].toUpperCase() + word.substring(1, wordLength);
    var lastUpper = firstUpper.substring(0, wordLength - 1) + firstUpper[wordLength - 1].toUpperCase();

    return lastUpper;
}

function findAverageAndMedian(arr) {
    var median = 0;
    var average = 0;

    for (var i = 0; i < arr.length; i++) {
        average = average + arr[i];
    }
    average = (average / arr.length).toFixed(2);

    if (arr.length % 2 != 0) {
        median = arr[Math.floor(arr.length / 2)];
    } else {
        var firstMedian = arr[Math.floor(arr.length / 2) - 1];
        var secondMedian = arr[Math.ceil(arr.length / 2)];
        median = (firstMedian + secondMedian) / 2;
    }
    median = median.toFixed(2);
    return { average, median};
}




function find4Digits(str) {
    if (typeof str !== 'string' || str.trim().length === 0) {
        return false;
    }

    var splitArray = str.split(" ");
    var joinedString = splitArray.join("");

    if (joinedString.length < 4) {
        return false;
    }
    var fourDigit = joinedString.substring(0, 4);
    return fourDigit;
}
