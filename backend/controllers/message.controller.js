import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message({ senderId, receiverId, message });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
      // spcket io func here

      // await conversation.save();
      // await newMessage.save();
      await Promise.all([conversation.save(), newMessage.save()]);
    }
    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      message: newMessage,
    });
  } catch (error) {
    console.log("error sending message", error.message);

    res.status(500).json({ success: false, error: error.message });
  }
};
export const getMessage = async (req, res) => {
  try {
    const { id: userToChartId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChartId] },
    }).populate("messages");
    console.log("🚀 ~ getMessage ~ conversation:", conversation);

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("error in getMessage", error);

    res.status(500).json({ error: "Internal Server Error" });
  }
};
