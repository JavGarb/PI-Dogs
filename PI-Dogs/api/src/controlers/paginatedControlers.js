
function arrayPaginated(arr, page) {
    let begin = 0;
    let end = 7;
    let temp = [];
    let result = [];
    while (begin < arr.length) {
        for (let i = begin; i <= end; i++) {
            if (arr[i]) temp.push(arr[i])
        }
        result.push(temp)
        console.log(temp, 'cantidad ', temp.length)
        temp = [];
        begin = end + 1;
        end = end + 8;
    }
    console.log(result.length)
    if(result.length >= page)return result[page - 1];
    else throw new Error('no existe esa pagina')
}

module.exports = {arrayPaginated}