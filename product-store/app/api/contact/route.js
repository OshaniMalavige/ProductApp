import dbConnect from "@/lib/dbConnect";
import Contactus from "@/models/Contactus";

export const POST = async (req) => {
    try {
        await dbConnect();
        const { firstName, lastName, email, phone, message } = await req.json();

        const contact = new Contactus({
            firstName,
            lastName,
            email,
            phone,
            message
        });
        await contact.save();

        return new Response(JSON.stringify({
            message: "Message send successfully"
        }), { status: 201 });

    } catch (error) {
        console.error("Error occurred:", error);
        return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
    }
}