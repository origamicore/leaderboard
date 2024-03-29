import {ModuleConfig, OriInjectable, OriService, PackageIndex, ResponseDataModel, RouteResponse} from '@origamicore/core' 
import LeaderboardConfig from './models/LeaderboardConfig';
var redis=require("redis");
@OriInjectable({domain:'leaderboard'})
export default class TsOriLeaderboard implements PackageIndex
{
    name: string='leaderboard';
    config:LeaderboardConfig;
    connection:any;
    async jsonConfig(config: LeaderboardConfig): Promise<void> {
        this.config=config;
    }
    async start(): Promise<void> {
        
        this.connection= redis.createClient(this.config.port, this.config.host);
        await  this.connection.connect()
        console.log('Leaderboard -> redis connected '+this.config.host);
        await this.connection.select(this.config.db)
        console.log('Leaderboard -> redis on db : '+this.config.db);
    }
    restart(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    stop(): Promise<void> {
        throw new Error('Method not implemented.');
    }
    
    @OriService({isInternal:true})
    async addScore(gameId:string,score:number,userid:string):Promise<RouteResponse>
    {  
        var data =await this.connection.sendCommand(['zincrby',gameId,score.toString(),userid])
        return RouteResponse.success(data);
    }
    @OriService({isInternal:true})
	async getScore(gameId:string,userid:string)
	{   
        var data =await this.connection.sendCommand(['zscore',gameId,userid])
        return RouteResponse.success(data);
        
	}
    @OriService({isInternal:true})
	async setScore(gameId:string,score:number,userid:string)
	{   
        var data =await this.connection.sendCommand(['zadd',gameId,score.toString(),userid])
        return RouteResponse.success(data);
        
	} 
    @OriService({isInternal:true})
	async removeScore(gameId:string,userid:string)
	{   
        var data =await this.connection.sendCommand(['zrem',gameId,userid])
        return RouteResponse.success(data);
        
	} 
    @OriService({isInternal:true})
	async getBoard(gameId:string,userid:string,count:number,top:number)
	{
        let topborad=[];
        if(top>-1)
        {
            var topdata = await this.connection.sendCommand(['zrevrange',gameId,'0', top.toString(), 'withscores'])
            topborad=await this.convertUser(topdata) 
        }
        if(!topborad.filter(p=>p.name==userid)[0])
        {
            var val =await this.connection.sendCommand(['zrevrank',gameId,userid])
            var begin=val-count
            var end=val+count
            if(begin<0)begin=0;
            var data = await this.connection.sendCommand(['zrevrange',gameId,begin.toString(), end.toString(), 'withscores'])
            let board=await this.convertUser(data)
            for(var a=0;a<board.length;a++)
            {

                board[a].rank=begin+a
                if(!topborad.filter(p=>p.name==board[a].name)[0])
                {
                    topborad.push(board[a])
                }
            }
            
        }
        return topborad
         
	}
    @OriService({isInternal:true})
	async getTopTen(gameId:string)
	{
        var data = await this.connection.sendCommand(['zrevrange',gameId,'0', '9', 'withscores'])
        return this.convertUser(data) 
	}
    @OriService({isInternal:true})
	async getTop(gameId:string,top:number)
	{ 
        var data = await this.connection.sendCommand(['zrevrange',gameId,'0', top.toString(), 'withscores'])
        return this.convertUser(data) 
	}
    @OriService({isInternal:true})
	async getRange(gameId:string,begin:number,end:number,isReverse:boolean)
	{ 
        var func='ZRANGE';
        if(isReverse)
        {
          func='ZREVRANGE';
        }
        var data = await this.connection.sendCommand([func,gameId,begin.toString(), end.toString(), 'withscores'])
        return this.convertUser(data) 
	}
    @OriService({isInternal:true})
	async getCount(gameId:string)
	{
        var data =await this.connection.sendCommand(['zcount',gameId,'-inf', '+inf'])
        return RouteResponse.success(data); 
	}

    @OriService({isInternal:true})
	async removeGame(gameId:string)
	{
        var data =await this.connection.sendCommand(['del',gameId ])
        return RouteResponse.success(data); 
	}

    @OriService({isInternal:true})
	async updateUser(userid:string,value:string)
	{ 
        var data =await this.connection.sendCommand(['set',userid,value])
        return RouteResponse.success(data);  
	}




    async convertUser(data)
    {
		var p=[];
		for(var a=0;a<data.length;a+=2)
		{
			var px= await this.getProfile(data[a])
			p.push({
				name:data[a],
				score:data[a+1],
				profile:px
			});
		}
        return p
    }
	async getProfile(id)
	{ 
		var data = await await this.connection.sendCommand(['get',id])
		return data;
	}
}