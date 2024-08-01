const { VoiceState } = require('discord.js');
const { User } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState) {
    try {
      // Check if the user's voice state has changed
      if (oldState.channel !== newState.channel) {
        // Update the user's voice time in the database
        const user = await User.findOne({ id: newState.member.id });

        if (user) {
          // Calculate the time spent in the voice channel
          const timeDifference = newState.member.joinedAt - oldState.member.joinedAt;

          // Update the voice time
          user.voiceTime += timeDifference;

          // Save the updated user document
          await user.save();

          logger.info(
            `Updated voice time for user ${newState.member.user.tag}: ${user.voiceTime}`
          );
        } else {
          logger.warn(`User not found in database: ${newState.member.user.tag}`);
        }
      }
    } catch (error) {
      logger.error('Error updating voice state:', error);
    }
  },
};