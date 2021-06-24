export function createDatas(portfolio) {
    let experience = portfolio['experiences']
                        .map(data => data.duration)
                        .map(date => date.split('-'))
                        .map(([from, to]) => (((to ? Date.parse(to) : Date.now()) - Date.parse(from)) / 1000 / 60 / 60 / 24))
                        .reduce((p, c) => p + c, 0);
    experience /= 365;
    return {
        experience: experience.toFixed(1),
        name: portfolio["name"]
    };
}
export function prepareString(sentence, datas) {
    let placeholders = sentence.match(/\{(.*?)\}/g);
    placeholders?.forEach(placeholder => {
        let text = placeholder.substring(1, placeholder.length - 1);
        if (datas[text]) {
            sentence = sentence.replace(placeholder, datas[text]);
        }
    })
    return sentence;
}
