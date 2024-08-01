const { User } = require('../../models');
const logger = require('../../utils/logger');

module.exports = {
  /**
   * Gets the activity details for a user.
   *
   * @param {User} user The user to get activity details for.
   * @returns {Promise<User>} The user's activity details.
   */
  async getUserActivity(user) {
    try {
      const dbUser = await User.findOne({ id: user.id });

      if (!dbUser) {
        return null;
      }

      return dbUser;
    } catch (error) {
      logger.error('Error getting user activity:', error);
      throw error;
    }
  },

  /**
   * Gets the statistics for a user.
   *
   * @param {User} user The user to get statistics for.
   * @returns {Promise<User>} The user's statistics.
   */
  async getUserStats(user) {
    try {
      const dbUser = await User.findOne({ id: user.id });

      if (!dbUser) {
        return null;
      }

      return dbUser;
    } catch (error) {
      logger.error('Error getting user statistics:', error);
      throw error;
    }
  },
};