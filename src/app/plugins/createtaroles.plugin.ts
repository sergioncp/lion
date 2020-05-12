import { Plugin } from '../../common/plugin';
import { IContainer, IMessage, ChannelType } from '../../common/types';
import { GuildChannel, TextChannel} from 'discord.js';

export class CreateTaRoles extends Plugin {
  public name: string = 'Creat Class TA Role';
  public description: string = 'Creates as custom TA role for each class';
  public usage: string = '!createtaroles';
  public permission: ChannelType = ChannelType.Admin;

  constructor(public container: IContainer) {
    super();
  }

  public async execute(message: IMessage, args?: string[]) {
    let channelFromCategoryCS = this._getChannelsFromCategory(message, 'CS-CLASSES')
    for (let i = 0; i < channelFromCategoryCS.length; i++) {
      const element = channelFromCategoryCS[i];
      this._createRole(message,element.name);
    }
    let channelFromCategoryIT = this._getChannelsFromCategory(message, 'IT-CLASSES')
    for (let i = 0; i < channelFromCategoryIT.length; i++) {
      const element = channelFromCategoryIT[i];
      this._createRole(message,element.name);
    }

    message.reply('TA Roles Created for CS and IT Classes')
  }

  private _getChannelsFromCategory(message: IMessage, categoryName: string) {
    let categoryChannels: TextChannel[] = []

    const category = message.guild.channels.filter(channel => channel.type === "category");

    let categoryChildren = category.map((channel:any) => {
      if (channel.name.toLowerCase() === categoryName.toLowerCase()) {
        return channel.children
      }
    })

    categoryChildren.forEach(element => {
      if (element) {
        for (const key of element.keys()) {
          categoryChannels.push(element.get(key))
        }
      }
    });
    return categoryChannels

  }

  private _createRole(message: IMessage, roleName: string) {
    let roles = message.guild.roles.filter( role => role.name === roleName)
    if(roles.size === 0){
      message.guild.createRole({
        name: roleName,
        hoist: true,
        mentionable: false,
      });
      return 1
    }else{
      return 0
    }

  }
}
