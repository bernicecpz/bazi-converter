import * as fs from 'fs';
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let rawdata = fs.readFileSync(__dirname + '/data/dizi.json')
const $dizi = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/tiangan.json');
const $tiangang = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/dates_mapping.json');
const $dates_mapping = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/hour_mapping.json');
const $hour_mapping = JSON.parse(rawdata);

rawdata = fs.readFileSync(__dirname + '/data/earthly_branches_english.json');
const $earthly_branches_english = JSON.parse(rawdata);

export default class BaziConverter{

    constructor(year,month,day,hour){
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
    }

    getEarthNumberFromHour(hour){
        if(hour >= 23 || (hour < 1)){
            return "E1"
        }
        else if (hour < 3){
            return "E2"
        }
        else if (hour < 5){
            return "E3"
        }
        else if (hour < 7){
            return "E4"
        }
        else if (hour < 9){
            return "E5"
        }
        else if (hour < 11){
            return "E6"
        }
        else if (hour < 13){
            return "E7"
        }
        else if (hour < 15){
            return "E8"
        }
        else if (hour < 17){
            return "E9"
        }
        else if (hour < 19){
            return "E10"
        }
        else if (hour < 21){
            return "E11"
        }
        else if (hour < 23){
            return "E12"
        }
    }

    convertToTianGangNumber(HNumber){
        return "H" + HNumber;
    }

    convertToDiziNumber(ENumber){
        return "E" + ENumber;
    }

    getBaziJson(){
        const baziDate = $dates_mapping[this.year][this.month][this.day];
        const earthHour = this.getEarthNumberFromHour(this.hour);
        const hourMapping = $hour_mapping[earthHour][baziDate.HDay];

        const baziChineseYear = $tiangang[this.convertToTianGangNumber(baziDate.HYear)] + $dizi[this.convertToDiziNumber(baziDate.EYear)];

        const baziChineseMonth = $tiangang[this.convertToTianGangNumber(baziDate.HMonth)] + $dizi[this.convertToDiziNumber(baziDate.EMonth)];
        const baziChineseDay = $tiangang[this.convertToTianGangNumber(baziDate.HDay)] + $dizi[this.convertToDiziNumber(baziDate.EDay)];
        const baziChineseTime = $tiangang[hourMapping] + $dizi[earthHour];
        return {"year":baziChineseYear, "month":baziChineseMonth, "day":baziChineseDay, "time":baziChineseTime};
    }

    getBaziChineseFullString(){
        let data = this.getBaziJson();
        return data.year + "年" + data.month + "月" +  data.day + "日"+ data.time + "时";
    }
}
