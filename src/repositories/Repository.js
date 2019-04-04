class Repository {

  constructor(model) {
    this.model = model;
  }

  /**
   *
   * @param {Number} id
   * @param {Object} include
   * @param {Object} attributes
   */
  async getById(id, { include = [], attributes = {} } = {}) {
    try {
      let model = await this.model.findByPk(id, {
        include,
        attributes
      });

      if (model) {
        model = model.get({ plain: true });
      }

      return model;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Object} where object to find
   * @param {Object} include
   * @param {Object} attributes 
   */
  async getOne(where, { include = [], attributes = {} } = {}) {
    try {
      let model = await this.model.findOne({ 
        where,
        include,
        attributes
      });

      if (model) {
        model = model.get({ plain: true });
      }

      return model;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Number} page page
   * @param {Number} limit number of records
   * @param {Object} where where
   * @param {Object} include association
   * @param {Object} order sort order
   * @param {Object} attributes columns
   */
  async getAll({ page = 0, limit, where = {}, include = [], order = [['id', 'DESC']], attributes = {} }) {
    try {
      page = +page;
      limit = +limit;

      page = page >= 1 ? page - 1 : 0;

      /** Option to query */
      const options = {
        order,
        where,
        include,
        attributes
      }

      if (limit) {
        options.limit = limit;
        options.offset = page * limit;
      }

      const model = await this.model.findAll(options);
      return model
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Number} id
   * @param {Object} attributes
   */
  async updateById(id, attributes) {
    try {
      let foundModel = await this.model.findByPk(id);

      // Check model exist
      if (foundModel) {
        foundModel = await foundModel.update(attributes);
        foundModel = foundModel.get({ plain: true });
      }

      return foundModel;
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Object} attributes Object to update
   * @param {Object} where Object to find
   */
  async update(attributes, where) {
    try {
      const result = await this.model.update(attributes, { where });
      //-- result = [affectedRows, affectedCount]

      return result[1];
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Number} id
   */
  async deleteById(id) {
    try {
      return await this.model.destroy({
        where: {
          id
        }
      });
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Object} where Object to find
   */
  async delete(where) {
    try {
      return await this.model.destroy({ where });
    } catch (e) {
      throw e;
    }
  }

  /**
   *
   * @param {Object} attributes
   */
  async create(attributes) {
    try {
      const model = await this.model.create(attributes);
      return model.get({ plain: true });
    } catch (e) {
      throw e;
    }
  }
}

module.exports = Repository;
