const { Message } = require('../../models');
const logger = require('../../utils/logger');
const { User } = require('../../models');
const { formatMessages } = require('../../commands/utils/format-data');

module.exports = {
  /**
   * Creates a new message in the database.
   *
   * @param {object} messageData The message data to store.
   * @returns {Promise<Message>} The newly created message object.
   */
  async createMessage(messageData) {
    try {
      const newMessage = new Message(messageData);
      await newMessage.save();
      logger.info('Message saved:', newMessage.content);
      return newMessage;
    } catch (error) {
      logger.error('Error creating message:', error);
      throw error;
    }
  },

  /**
   * Retrieves a message from the database by ID.
   *
   * @param {string} id The ID of the message to retrieve.
   * @returns {Promise<Message>} The message object.
   */
  async getMessage(id) {
    try {
      const message = await Message.findById(id);
      if (!message) {
        throw new Error('Message not found.');
      }
      return message;
    } catch (error) {
      logger.error('Error getting message:', error);
      throw error;
    }
  },

  /**
   * Retrieves multiple messages from the database based on criteria.
   *
   * @param {object} criteria Optional criteria to filter messages.
   * @param {string} criteria.author The Discord ID of the message author.
   * @param {string} criteria.channel The Discord ID of the channel.
   * @param {number} criteria.limit The maximum number of messages to retrieve.
   * @returns {Promise<Message[]>} An array of message objects.
   */
  async getMessages(criteria = {}) {
    try {
      const { author, channel, limit } = criteria;
      const query = {};
      if (author) {
        query.author = author;
      }
      if (channel) {
        query.channel = channel;
      }

      const messages = await Message.find(query)
        .limit(limit)
        .sort({ timestamp: -1 });

      return messages;
    } catch (error) {
      logger.error('Error getting messages:', error);
      throw error;
    }
  },

  /**
   * Updates an existing message in the database.
   *
   * @param {string} id The ID of the message to update.
   * @param {object} data The updated data for the message.
   * @returns {Promise<Message>} The updated message object.
   */
  async updateMessage(id, data) {
    try {
      const message = await Message.findByIdAndUpdate(id, data, { new: true });
      if (!message) {
        throw new Error('Message not found.');
      }
      logger.info(`Updated message ${id}`);
      return message;
    } catch (error) {
      logger.error('Error updating message:', error);
      throw error;
    }
  },

  /**
   * Deletes a message from the database.
   *
   * @param {string} id The ID of the message to delete.
   * @returns {Promise<Message>} The deleted message object.
   */
  async deleteMessage(id) {
    try {
      const message = await Message.findByIdAndDelete(id);
      if (!message) {
        throw new Error('Message not found.');
      }
      logger.info(`Deleted message ${id}`);
      return message;
    } catch (error) {
      logger.error('Error deleting message:', error);
      throw error;
    }
  },

  /**
   * Analyzes message data and returns trending topics.
   *
   * @returns {Promise<object[]>} An array of trending topic objects.
   */
  async getTrendingTopics() {
    try {
      // Find the top 10 most mentioned words in the database
      const trendingTopics = await Message.aggregate([
        {
          $unwind: '$content',
        },
        {
          $group: {
            _id: '$content',
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10,
        },
      ]);

      return trendingTopics.map((topic) => ({
        topic: topic._id,
        count: topic.count,
      }));
    } catch (error) {
      logger.error('Error getting trending topics:', error);
      throw error;
    }
  },

  /**
   * Gets the top 10 users with the most messages sent.
   *
   * @returns {Promise<object[]>} An array of user objects with their message counts.
   */
  async getTopMessengers() {
    try {
      const topUsers = await User.aggregate([
        {
          $sort: { messageCount: -1 },
        },
        {
          $limit: 10,
        },
      ]);

      return topUsers.map((user) => ({
        id: user.id,
        username: user.username,
        messageCount: user.messageCount,
      }));
    } catch (error) {
      logger.error('Error getting top messengers:', error);
      throw error;
    }
  },

  /**
   * Formats message data for display in embeds.
   *
   * @param {Message[]} messages An array of message objects.
   * @returns {string} Formatted message data.
   */
  formatMessages(messages) {
    return formatMessages(messages);
  },
};