module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: Number,
      },
      subject: {
        type: String,
      },
      type: {
        type: String,
      },
      noPeople: {
        type: Number,
      },
      area: {
        type: String,
      },
      noRooms: {
        type: Number,
      },
      contract: {
        type: String,
      },
      income: {
        type: String,
      },
      availDate: {
        type: Date,
      },
      message: {
        type: String,
      },
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Request = mongoose.model("request", schema);
  return Request;
};
