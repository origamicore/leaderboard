import OrigamiCore, { ConfigModel } from "@origamicore/core";  
import LeaderboardRouter from "../src/LeaderboardRouter";
import LeaderboardConfig from "../src/models/LeaderboardConfig";
class lbSample
{
    constructor()
    {
        this.init()
    }
    async init()
    {
        var config=new ConfigModel({
            packageConfig:[
                  new LeaderboardConfig({ 
                      
                  })
            ]
        }); 
        var origamicore = new OrigamiCore(config);
        await origamicore.start()   
        var gameid='samplegame'
        var userid='1234'
        await LeaderboardRouter.removeGame(gameid)
        for(let a=0;a<30;a++)
        {
            await LeaderboardRouter.setScore(gameid,100+a,'123'+a) ;
            await LeaderboardRouter.updateUser('123'+a,'vahid '+a)
        }
        console.log(await LeaderboardRouter.getScore(gameid,'1235'));
        console.log(await LeaderboardRouter.getCount(gameid));
        console.log(await LeaderboardRouter.getRange(gameid,10,15));
        console.log(await LeaderboardRouter.getBoard(gameid,'12328',3,5));
        console.log(await LeaderboardRouter.getBoard(gameid,'12320',1,5));
        console.log(await LeaderboardRouter.getTop(gameid,5));
        // console.log(await LeaderboardRouter.setScore(gameid,12.4,userid));
        // console.log(await LeaderboardRouter.getScore(gameid,userid));
        // console.log(await LeaderboardRouter.getScore(gameid,'userid'));
        // console.log(await LeaderboardRouter.addScore(gameid,1,userid));
        // console.log(await LeaderboardRouter.addScore(gameid,3,'vh1'));
        // console.log(await LeaderboardRouter.addScore(gameid,5,'vh3'));
        // console.log(await LeaderboardRouter.getCount(gameid));
        // console.log(await LeaderboardRouter.updateUser(userid,'vahid'));
        // console.log(await LeaderboardRouter.getTop(gameid,1));
        // console.log(await LeaderboardRouter.getRange(gameid,0,5));
        // console.log(await LeaderboardRouter.removeGame(gameid));
        // console.log(await LeaderboardRouter.removeGame(gameid));
        
    }
}
new lbSample()