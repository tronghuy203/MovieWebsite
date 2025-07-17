const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

categorySchema.pre("save",function(next){
    if(!this.slug && this.title){
        this.slug = slugify(this.title,{lower: true, strict: true});
    };
    next();
})
module.exports = mongoose.model("Category", categorySchema);
