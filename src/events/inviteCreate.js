const { Invite } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  name: 'inviteCreate',
  async execute(invite) {
    try {
      // Create a new invite object in the database
      const newInvite = new Invite({
        code: invite.code,
        inviter: invite.inviter.id,
        invitee: invite.uses === 0 ? null : invite.uses.last(),
        uses: invite.uses,
        maxUses: invite.maxUses,
        timestamp: invite.createdAt,
      });

      // Save the new invite to the database
      await newInvite.save();

      logger.info(`New invite created: ${invite.code}`);
    } catch (error) {
      logger.error('Error creating invite:', error);
    }
  },
};