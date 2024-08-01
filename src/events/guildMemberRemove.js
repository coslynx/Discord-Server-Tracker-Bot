const { User } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  name: 'guildMemberRemove',
  async execute(member) {
    try {
      // Find the user in the database
      const user = await User.findOne({ id: member.id });

      if (user) {
        // Update the user's leave date
        user.leaveDate = new Date();

        // Save the updated user document
        await user.save();

        logger.info(`User ${member.user.tag} left the server.`);
      } else {
        logger.warn(`User ${member.user.tag} not found in database.`);
      }
    } catch (error) {
      logger.error('Error handling guildMemberRemove event:', error);
    }
  },
};