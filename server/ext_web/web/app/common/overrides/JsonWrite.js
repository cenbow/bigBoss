/**
 * Base Writer class used by most subclasses of {@link Ext.data.proxy.Server}. This class
 * is responsible for taking a set of {@link Ext.data.operation.Operation} objects and a
 * {@link Ext.data.Request} object and modifying that request based on the Operations.
 *
 * For example a Ext.data.writer.Json would format the Operations and their
 * {@link Ext.data.Model} instances based on the config options passed to the JsonWriter's
 * constructor.
 *
 * Writers are not needed for any kind of local storage - whether via a
 * {@link Ext.data.proxy.WebStorage Web Storage proxy} (see
 * {@link Ext.data.proxy.LocalStorage localStorage} and
 * {@link Ext.data.proxy.SessionStorage sessionStorage})
 * or just in memory via a {@link Ext.data.proxy.Memory MemoryProxy}.
 *
 * # Dates
 *
 * Before sending dates to the server, they can be formatted using an {@link Ext.Date}
 * format. These formats can be specified both on the field and the writer itself. In terms
 * of precedence, from highest to lowest:
 *
 * - {@link #dateFormat Writer.dateFormat} The writer `dateFormat` will always have the
 *   highest precedence.
 * - {@link Ext.data.field.Date#dateWriteFormat} The `dateWriteFormat` given to the field
 *   instance. This is handled by {@link Ext.data.field.Date#method-serialize}.
 * - {@link Ext.data.field.Date#dateFormat Field.dateFormat} This is handled by the field's
 *   `serialize` method.
 * - {@link Ext.data.field.Date#dateReadFormat Field.dateReadFormat} Also handled by the
 *   field's `serialize` method.
 */
Ext.define('Common.overrides.JsonWrite', {
  override: 'Ext.data.writer.Writer',

  /**
   * Formats the data for each record before sending it to the server. This method should
   * be overridden to format the data in a way that differs from the default.
   *
   * @param {Ext.data.Model} record The record that we are writing to the server.
   * @param {Ext.data.operation.Operation} [operation] An operation object.
   * @return {Object} An object literal of name/value keys to be written to the server.
   * By default this method returns the data property on the record.
   */
  getRecordData: function (record, operation) {
    var me = this,
      nameProperty = me.getNameProperty(),
      mapping = nameProperty !== 'name',
      idField = record.self.idField,
      key = idField[nameProperty] || idField.name, // setup for idField first
      value = record.id,
      writeAll = me.getWriteAllFields(),
      ret, dateFormat, phantom,
      options, clientIdProperty,
      fieldsMap, data, field;

    if (idField.serialize) {
      value = idField.serialize(value);
    }

    dateFormat = me.getDateFormat();
    phantom = record.phantom;
    options = (phantom || writeAll) ? me.getAllDataOptions() : me.getPartialDataOptions();
    clientIdProperty = phantom && me.getClientIdProperty();
    fieldsMap = record.getFieldsMap();

    options.serialize = false; // we must take over this here
    data = record.getData(options);

    // If we are mapping we need to pour data into a new object, otherwise we do
    // our work in-place:
    ret = mapping ? {} : data;

    if (clientIdProperty) { // if (phantom and have clientIdProperty)
      ret[clientIdProperty] = value; // must read data and write ret
      delete data[key];  // in case ret === data (must not send "id")
    }
    else if (!me.getWriteRecordId()) {
      delete data[key];
    }

    for (key in data) {
      value = data[key];

      if (!(field = fieldsMap[key])) {
        // No defined field, so clearly no nameProperty to look up for this field
        // but if we are mapping we need to copy over the value. Also there is no
        // serializer to call in this case.
        if (mapping) {
          ret[key] = value;
        }
      } else {
        // Allow this Writer to take over formatting date values if it has a
        // dateFormat specified. Only check isDate on fields declared as dates
        // for efficiency.
        if (field.isDateField && dateFormat && Ext.isDate(value)) {
          value = Ext.Date.format(value, dateFormat);
        } else if (field.serialize) {
          value = field.serialize(value, record);
        }

        if (mapping) {
          key = field[nameProperty] || key;
        }

        ret[key] = value;
      }
    }

    return ret;
  }
});