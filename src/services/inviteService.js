const { Invite } = require('../../models');
const logger = require('../../utils/logger');
const { User } = require('../../models');

module.exports = {
  /**
   * Tracks a new invite code.
   *
   * @param {string} code The invite code to track.
   * @returns {Promise<Invite>} The newly created invite object.
   */
  async trackInvite(code) {
    try {
      // Check if the invite code already exists
      const existingInvite = await Invite.findOne({ code });

      if (existingInvite) {
        return existingInvite;
      }

      // Get invite details from Discord API
      const invite = await client.guilds.cache.get(config.guildId).invites.fetch(code);

      // Check if invite is valid
      if (!invite) {
        throw new Error('Invalid invite code.');
      }

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

      // Update the inviter's invite count
      const inviter = await User.findOne({ id: invite.inviter.id });

      if (inviter) {
        inviter.inviteCount++;
        await inviter.save();
      }

      logger.info(`New invite created: ${invite.code}`);
      return newInvite;
    } catch (error) {
      logger.error('Error tracking invite:', error);
      throw error;
    }
  },

  /**
   * Retrieves invites from the database based on optional criteria.
   *
   * @param {object} criteria Optional criteria to filter invites.
   * @param {string} criteria.inviter The Discord ID of the inviter.
   * @param {string} criteria.invitee The Discord ID of the invitee.
   * @param {number} criteria.limit The maximum number of invites to retrieve.
   * @returns {Promise<Invite[]>} An array of invite objects.
   */
  async getInvites(criteria = {}) {
    try {
      const { inviter, invitee, limit } = criteria;
      const query = {};
      if (inviter) {
        query.inviter = inviter;
      }
      if (invitee) {
        query.invitee = invitee;
      }

      // Find invites that match the criteria
      const invites = await Invite.find(query)
        .limit(limit)
        .sort({ timestamp: -1 });

      return invites;
    } catch (error) {
      logger.error('Error getting invites:', error);
      throw error;
    }
  },

  /**
   * Updates an existing invite in the database.
   *
   * @param {string} code The invite code to update.
   * @param {object} data The updated data for the invite.
   * @returns {Promise<Invite>} The updated invite object.
   */
  async updateInvite(code, data) {
    try {
      // Find the invite in the database
      const invite = await Invite.findOne({ code });

      if (!invite) {
        throw new Error('Invite not found.');
      }

      // Update the invite with the new data
      Object.assign(invite, data);
      await invite.save();

      logger.info(`Updated invite ${code}`);
      return invite;
    } catch (error) {
      logger.error('Error updating invite:', error);
      throw error;
    }
  },

  /**
   * Deletes an invite from the database.
   *
   * @param {string} code The invite code to delete.
   * @returns {Promise<Invite>} The deleted invite object.
   */
  async deleteInvite(code) {
    try {
      // Find the invite in the database
      const invite = await Invite.findOneAndDelete({ code });

      if (!invite) {
        throw new Error('Invite not found.');
      }

      logger.info(`Deleted invite ${code}`);
      return invite;
    } catch (error) {
      logger.error('Error deleting invite:', error);
      throw error;
    }
  },

  /**
   * Analyzes invite data.
   *
   * @param {object} criteria Optional criteria to filter invites for analysis.
   * @returns {Promise<object>} An object containing analysis results.
   */
  async analyzeInvites(criteria = {}) {
    try {
      // Implement your invite analysis logic here.
      // You can retrieve invites using `this.getInvites(criteria)`
      // and perform calculations based on the data.

      // For example, you could calculate:
      // - Total number of invites created
      // - Number of invites used
      // - Top recruiters (users who sent the most invites)
      // - Invite trends over time

      // Return an object containing the analysis results
      return {};
    } catch (error) {
      logger.error('Error analyzing invites:', error);
      throw error;
    }
  },
};