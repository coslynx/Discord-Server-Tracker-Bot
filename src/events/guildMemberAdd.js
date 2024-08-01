const { User } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    try {
      // Check if the user already exists in the database
      const existingUser = await User.findOne({ id: member.id });

      if (!existingUser) {
        // Create a new user document in the database
        const newUser = new User({
          id: member.id,
          username: member.user.username,
          discriminator: member.user.discriminator,
          joinDate: member.joinedAt,
        });

        await newUser.save();
        logger.info(`New user joined the server: ${member.user.tag}`);
      } else {
        // Update the existing user's join date if it has changed
        if (existingUser.joinDate !== member.joinedAt) {
          existingUser.joinDate = member.joinedAt;
          await existingUser.save();
          logger.info(`Updated join date for user: ${member.user.tag}`);
        }
      }
    } catch (error) {
      logger.error('Error handling guildMemberAdd event:', error);
    }
  },
};