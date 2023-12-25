
import mongoose from "mongoose"

async function connectDB(url) {
    await mongoose.connect(url)
        .then(console.log("📟 DB Connected"))
}

export default connectDB