import { Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class BotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    ctx.reply('Salom');
  }
  /******************************************************************** */
  @Hears('hi')
  async heirsHi(@Ctx() ctx: Context) {
    await ctx.reply('Hey there');
  }
  /******************************************************************* */
  @Command('help')
  async helpCommand(@Ctx() ctx: Context) {
    await ctx.reply('Helps');
  }

  /****************************************************************** */
  @On('document') // to'lovlar uchun
  async onDocumen(@Ctx() ctx: Context) {
    if ('document' in ctx.message) {
      console.log(ctx.message.document);
      await ctx.reply(String(ctx.message.document.file_name));
      await ctx.reply(String(ctx.message.document.file_size));
      await ctx.reply(String(ctx.message.document.file_id));
      await ctx.reply(String(ctx.message.document.mime_type));
    }
  }

  /****************************************************************** */
  @On('invoice') // to'lovlar uchun
  async onInvoice(@Ctx() ctx: Context) {
    if ('invoice' in ctx.message) {
      console.log(ctx.message.invoice);
      await ctx.reply(String(ctx.message.invoice.title));
    }
  }

  /***************************************************************** */
  @On('voice')
  async onVoice(@Ctx() ctx: Context) {
    if ('voice' in ctx.message) {
      console.log(ctx.message.voice);
      await ctx.reply(String(ctx.message.voice.duration));
      await ctx.reply(String(ctx.message.voice.file_size));
      //   await ctx.reply(String(ctx.message.voice.file_id));
    }
  }
  /**************************************************************** */
  @On('location')
  async onLocation(@Ctx() ctx: Context) {
    if ('location' in ctx.message) {
      console.log(ctx.message.location);
      await ctx.reply(String(ctx.message.location.latitude));
      await ctx.reply(String(ctx.message.location.longitude));
      await ctx.replyWithLocation(
        ctx.message.location.latitude,
        ctx.message.location.longitude,
      );
    }
  }

  /*************************************************************** */
  @On('contact')
  async onContact(@Ctx() ctx: Context) {
    if ('contact' in ctx.message) {
      console.log(ctx.message.contact);
      await ctx.reply(String(ctx.message.contact.first_name));
      await ctx.reply(String(ctx.message.contact.phone_number));
      await ctx.reply(String(ctx.message.contact.user_id));
    }
  }
  /************************************************************** */
  @On('animation')
  async onAnimation(@Ctx() ctx: Context) {
    if ('animation' in ctx.message) {
      console.log(ctx.message.animation);
      await ctx.reply(String(ctx.message.animation.file_name));
    }
  }

  /***************************************************************/
  @On('sticker')
  async onStiker(@Ctx() ctx: Context) {
    if ('stiker' in ctx.message) {
      console.log(ctx.message.stiker);
      await ctx.reply(String(ctx.message.stiker));
    }
  }

  /************************************************************** */
  @On('video')
  async onVideo(@Ctx() ctx: Context) {
    if ('video' in ctx.message) {
      // console.log(ctx.message.video)
      await ctx.reply(String(ctx.message.video.file_name));
    }
  }

  /************************************************************/
  @On('photo')
  async onPhoto(@Ctx() ctx: Context) {
    if ('photo' in ctx.message) {
      console.log(ctx.message.photo);
      await ctx.replyWithPhoto(
        String(ctx.message.photo[ctx.message.photo.length - 1].file_id),
      );
    }
  }

  /*********************************************************/
  @On('text')
  async onText(@Ctx() ctx: Context) {
    // console.log(ctx);
    if ('text' in ctx.message) {
      if (ctx.message.text == 'salom') {
        await ctx.replyWithHTML('<b>Hello</b>');
      } else {
        await ctx.replyWithHTML(ctx.message.text);
      }
    }
  }

  /*********************************************************** */
  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    console.log(ctx.botInfo);
    console.log(ctx.chat);
    console.log(ctx.chat.id);
    console.log(ctx.from);
    console.log(ctx.from.first_name);
  }
}
