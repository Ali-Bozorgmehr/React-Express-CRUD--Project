module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      owner: {
        type: String,
      },
      address: {
        type: String,
      },
      sold: {
        type: String,
      },
      noBedrooms: {
        type: Number,
      },
      area: {
        type: Number,
      },
      availFrom: {
        type: Date,
      },
      suitableFor: {
        type: Number,
      },
      parking: {
        type: String,
      },
      petFriendly: {
        type: String,
      },
      price: {
        type: Number,
      },
      description: {
        type: String,
      },
      imgCollection: [
        {
          data: Buffer,
          contentType: String,
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const sellHouse = mongoose.model("sell", schema);
  return sellHouse;
};
