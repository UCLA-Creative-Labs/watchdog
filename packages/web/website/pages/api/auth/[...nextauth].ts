import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import fetch from 'node-fetch';

export default NextAuth({
  secret: process.env.SECRET,
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({user}) {
      const res = await fetch(`https://discord.com/api/guilds/761436732398764052/members/${user.id}`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_TOKEN}`,
        },
      });
      if (!res.ok) {
        return false;
      }

      const data: { roles: string[] } = await res.json();
      const isBoardMember = (data?.roles ?? []).find(role => role === '761437487838789643');

      return !!isBoardMember;
    },
  },
});
