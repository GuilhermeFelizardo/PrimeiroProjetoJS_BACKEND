module.exports = function parseStringAsArray(arrayAsString){
    const mama =  arrayAsString.split(',').map(tech => tech.trim());
    return mama
}