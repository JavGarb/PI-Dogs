
function arrayPaginated(arr, page, order, value) {
    let begin = 0;
    let end = 7;
    let temp = [];
    let result = [];
    while (begin < arr.length) {
        for (let i = begin; i <= end; i++) {
            if (arr[i]) temp.push(arr[i])
        }
        result.push(temp)
        temp = [];
        begin = end + 1;
        end = end + 8;
    }
    if(result.length >= page)return result[page - 1];
    else throw new Error('no existe esa pagina')
}

module.exports = {arrayPaginated}
