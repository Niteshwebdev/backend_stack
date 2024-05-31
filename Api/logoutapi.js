// const Logoutapi = (req, res) => {
//     try {
//       if (!req.session || !req.session.userExist) {
//         return res.status(401).json({ success: false, message: "No session created" });
//       }
//       req.session.destroy((err) => {
//         if (err) {
//           console.error("Error destroying session:", err);
//           return res.status(500).json({ success: false, message: "Logout failed" });
//         }
//         return res.status(200).json({ success: true, message: "Logout successfully" });
//       });
//     } catch (err) {
//       console.error("Error logging out:", err);
//       return res.status(500).json({ success: false, message: "Logout failed" });
//     }
//   };
  
//   module.exports = { Logoutapi };
  