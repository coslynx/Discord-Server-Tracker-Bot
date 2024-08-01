const { Invite } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  name: 'inviteDelete',
  async execute(invite) {
    try {
      // Find the invite in the database
      const dbInvite = await Invite.findOne({ code: invite.code });

      if (!dbInvite) {
        logger.warn(`Invite not found in database: ${invite.code}`);
        return;
      }

      // Update the invite's usage count
      dbInvite.uses = invite.uses;

      // Save the updated invite document
      await dbInvite.save();

      logger.info(`Updated invite usage count for code ${invite.code}: ${invite.uses}`);
    } catch (error) {
      logger.error('Error updating invite usage count:', error);
    }
  },
};