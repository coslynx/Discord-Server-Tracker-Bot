const { Collection } = require('discord.js');
const { Message, User, Invite } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  /**
   * Formats message data for display in embeds.
   *
   * @param {Collection<Snowflake, Message>} messages A collection of messages.
   * @returns {string} Formatted message data.
   */
  formatMessages(messages) {
    if (messages.size === 0) {
      return 'No messages found.';
    }

    return messages.map((message) => {
      return `**Author:** ${message.author.tag}\n**Channel:** ${message.channel}\n**Content:** ${message.content}\n**Timestamp:** ${new Date(
        message.timestamp
      ).toLocaleString()}`;
    }).join('\n\n');
  },

  /**
   * Formats user activity data for display in embeds.
   *
   * @param {User} user The user.
   * @returns {string} Formatted user activity data.
   */
  formatUserActivity(user) {
    const activity = user.activity;
    if (!activity) {
      return 'No activity found for this user.';
    }

    return `**Messages Sent:** ${activity.messageCount.toString()}\n**Voice Time (Hours):** ${(
      activity.voiceTime / 3600
    ).toFixed(2)}\n**Invites Sent:** ${activity.inviteCount.toString()}\n**Invites Accepted:** ${
      activity.inviteAcceptedCount.toString()
    }\n**Join Date:** ${activity.joinDate.toLocaleString()}`;
  },

  /**
   * Formats invite data for display in embeds.
   *
   * @param {Collection<Snowflake, Invite>} invites A collection of invites.
   * @returns {string} Formatted invite data.
   */
  formatInvites(invites) {
    if (invites.size === 0) {
      return 'No invites found.';
    }

    return invites.map((invite) => {
      return `**Inviter:** ${invite.inviter.tag}\n**Invitee:** ${
        invite.invitee.tag
      }\n**Code:** ${invite.code}\n**Uses:** ${invite.uses}/${
        invite.maxUses
      }\n**Timestamp:** ${new Date(invite.timestamp).toLocaleString()}`;
    }).join('\n\n');
  },
};