export function groupBy(datas, property) {
    return datas.reduce((acc, obj) => {
        let key = obj[property];
        if(!acc[key]) acc[key] = [];
        acc[key].push(obj);
        return acc;
    }, {});
}