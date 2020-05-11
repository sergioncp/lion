import { Plugin } from '../../common/plugin';
import { IContainer, IMessage, ChannelType } from '../../common/types';
import { GuildChannel } from 'discord.js';

export class CreateTaRoles extends Plugin {
  public name: string = 'Creat Class TA Role';
  public description: string = 'Creates as custom TA role for each class';
  public usage: string = '!createtaroles';
  public permission: ChannelType = ChannelType.Admin;

  constructor(public container: IContainer) {
    super();
  }

  public async execute(message: IMessage, args?: string[]) {
    message.reply('yes')
  }
}
