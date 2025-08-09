import Webhook from 'svix'
import User from '../models/User.js'
import 'dotenv/config'

// API controller function to manage clerk user with database

const clerkWebhooks = async (req,res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET )

        await whook.verify(JSON.stringify(req.body), {
            "svix:id": req.header["svix:id"],
            "svix:timestamp": req.header["svix:timestamp"],
            "svix:signature":req.header["svix:signature"],
        })
        const { data, type } = req.body
        
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                    
                }
                await User.create(userData)
                req.json({})
                break;
            }
            case 'user.updated': {
                const userData = {
                    email: data.email_addresse[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                 req.json({})
                break;
            }
            case 'user.delete': {
                await User.findByIdAndDelete(data.id)
                req.json({})
                break;
                }
        
            default:
                break;
        }



    } catch (error) {
        req.json({ success: false, message:error.message})
    }
    
}

export { clerkWebhooks }