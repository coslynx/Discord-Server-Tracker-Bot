const { Message } = require('../../models');
const logger = require('../../utils/logger');
const parseMessage = require('../../utils/parse-message');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    try {
      // Ignore messages sent by the bot itself
      if (message.author.bot) {
        return;
      }

      // Parse the message and store it in the database
      const newMessage = await parseMessage.parseMessage(message);

      // Update the user's message count
      const user = await User.findOne({ id: message.author.id });
      if (user) {
        user.messageCount++;
        await user.save();
      }
    } catch (error) {
      logger.error('Error handling messageCreate event:', error);
    }
  },
};