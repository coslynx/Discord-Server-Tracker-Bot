const { Message } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  /**
   * Parses a message from the Discord API and stores it in the database.
   *
   * @param {Message} message The Discord message object.
   * @returns {Promise<Message>} The newly created message object.
   */
  async parseMessage(message) {
    try {
      // Create a new message object
      const newMessage = new Message({
        content: message.content,
        author: message.author.id,
        channel: message.channel.id,
        timestamp: message.createdAt,
      });

      // Save the message to the database
      await newMessage.save();

      logger.info('Message saved:', newMessage.content);

      return newMessage;
    } catch (error) {
      logger.error('Error parsing message:', error);
      throw error;
    }
  },
};