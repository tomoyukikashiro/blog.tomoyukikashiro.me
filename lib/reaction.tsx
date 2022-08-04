type Emoji = "🎉" | "❤️" | "👍" | "👎" | "😄" | "😕" | "🚀" | "👀";

const getReactionEmoji = (reaction: Reaction["content"]): Emoji => {
  const emojis: Record<Reaction["content"], Emoji> = {
    HOORAY: "🎉",
    HEART: "❤️",
    THUMBS_UP: "👍",
    THUMBS_DOWN: "👎",
    LAUGH: "😄",
    CONFUSED: "😕",
    ROCKET: "🚀",
    EYES: "👀",
  };
  return emojis[reaction];
};

type EmojiTable = Record<Emoji, number>;

export const emojiTable = (reactions: Reaction[]): EmojiTable => {
  return reactions.reduce((table, reaction) => {
    const emoji = getReactionEmoji(reaction.content);
    if (table[emoji]) {
      table[emoji] = table[emoji] + 1;
    } else {
      table[emoji] = 1;
    }
    return table;
  }, {} as EmojiTable);
};
