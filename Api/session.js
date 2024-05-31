// // session.js
// const Session = (req, res) => {
//     try {
//       const userDatas = req.session.userExist;
//       if (!userDatas) {
//         return res.status(401).json({ message: "No session created" });
//       }
//       return res.status(200).json({ sessionData: userDatas, success: true, message: "Session created successfully" });
//     } catch (err) {
//       console.error("Error checking session:", err);
//       return res.status(500).json({ success: false, message: "Internal server error" });
//     }
//   };
  
//   module.exports = { Session };
  