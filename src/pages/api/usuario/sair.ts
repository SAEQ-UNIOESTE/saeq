import withSession from "../../../../lib/session";

export default withSession(async (req, res) => {
  console.log(req.session)
  req.session.destroy();
  res.json({ isLoggedIn: false });
});
