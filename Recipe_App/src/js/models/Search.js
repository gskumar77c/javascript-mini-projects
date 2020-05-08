// export default 'I am raavan string';
import {key} from '../config';

export default class Search{
    constructor(query){
        this.query = query;
    }

    async getResults(){
        try{
            const result = await fetch(`https://yummly2.p.rapidapi.com/feeds/search?FAT_KCALMax=1000&maxTotalTimeInSeconds=7200&q=${this.query}&start=0&maxResult=40`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "yummly2.p.rapidapi.com",
                        "x-rapidapi-key": key
                    }
                });
            const data = await result.json();
            this.res = data.feed;
            console.log(this.res);
        }
        catch(err){
            alert(err);
        }
    }



    setIds(){
        for(var i = 0;i<this.res.length;i++){
            this.res[i].id = i;
        }
    }

 

}
